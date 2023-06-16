<?php

namespace Core;

use App\Config\Config;

class Router
{

    /**
     * Associative array of routes (the routing table)
     * @var array
     */
    protected $routes = [];

    /**
     * Parameters from the matched route
     * @var array
     */
    protected $params = [];

    /**
     * Add a route to the routing table
     *
     * @param string $route  The route URL
     * @param array  $params Parameters (controller, action, etc.)
     *
     * @return void
     */
    public function add($route, $params = [])
    {
        // Convert the route to a regular expression: escape forward slashes
        $route = preg_replace('/\//', '\\/', $route);

        // Convert variables e.g. {controller}
        $route = preg_replace('/\{([a-z]+)\}/', '(?P<\1>[a-z-]+)', $route);

        // Convert variables with custom regular expressions e.g. {id:\d+}
        $route = preg_replace('/\{([a-z]+):([^\}]+)\}/', '(?P<\1>\2)', $route);

        // Add start and end delimiters, and case insensitive flag
        $route = '/^' . $route . '$/i';

        $this->routes[$route] = $params;
    }

    /**
     * Get all the routes from the routing table
     *
     * @return array
     */
    public function getRoutes()
    {
        return $this->routes;
    }

    private function removeRegexChar($route){
       // $route_array = explode('/', $this->removeRegexChar($route));

       $ret = [];
        foreach (explode('/', $route) as $value) {
            if($value == 'i' || $value == '') continue;
            array_push($ret, preg_replace('/[$\/^]?/', '', $value));
        }
        return implode('/', $ret);
    }

    private function builFinalRoute(array $search, array $param_array, string $route){

        $param_array_i = 0;
        $route_array = explode('/', $route);
        foreach ( $route_array as $k_route=>$v_route) {
          //  var_dump($v_route);
           //if($v_route == 'i') continue;
            if(str_starts_with($v_route, ':')){
                $route_array[$k_route] = $param_array[$param_array_i];
                 $route_array[$k_route] = ( $param_array_i == count($param_array)-1 ) ? $route_array[$k_route].'$' : $route_array[$k_route]."\\";
                $param_array_i++;
            }
        }

        return implode('/',$route_array);
    }

    /**
     * Match the route in the routing table, setting the $params
     * property if a route is found.
     *
     * @param string $url The route URL
     *
     * @return boolean  true if a match found, false otherwise
     */
    public function match($url)
    {
        $m_GET = array();

        foreach ($this->routes as $route => $params) {

            preg_match_all('/(:[a-z0-9]+)/', $route, $matches_url_get, PREG_PATTERN_ORDER);
            //$route2 = preg_replace('/(:[a-z0-9]+)/', '/.+/', $route);


            if (count($matches_url_get[0]) != 0) {
                $url_array = explode('/', $url);
                $route_array = explode('/', $this->removeRegexChar($route));
                $param_array = [];

                if(count($route_array) != count($url_array)) continue;


               // echo '<br/>Start<br/>';
               /*var_dump($url_array);echo '-->';
               var_dump($route_array);
               echo'<br/>';*/
                foreach ($route_array as $k_route=>$v_route) {
                    
                 // var_dump($v_route);
                   // var_dump(str_starts_with($v_route, ':'));
                    if(str_starts_with($v_route, ':')){
                       // var_dump($v_route); echo '-->';
                        //var_dump($url_array[$k_route]);
                      //  echo'<br/>';
                        array_push($param_array, $url_array[$k_route]);
                    }
                }
            
             //   echo '<br/>End<br/><br/>';
               // var_dump($url);
               // var_dump($url_array);
             // var_dump($matches_url_get[0]);
           //  echo '---------------------------';
            // var_dump($param_array); echo '<br/>';


                //array_shift($url_array);
                if (count($matches_url_get[0]) == count($param_array)) {
                    $m_GET = array_combine($matches_url_get[0], $param_array);
                   //var_dump($matches_url_get[0]); echo '<br/>';
                 //  var_dump($param_array); echo '<br/>';
                    $route = $this->builFinalRoute($matches_url_get[0], $param_array, $route);

                }
            }

            if (preg_match($route, $url, $matches)) {
                // Get named capture group values
                foreach ($matches as $key => $match) {
                    if (is_string($key)) {
                        $params[$key] = $match;
                    }
                }

                $this->params = $params;

                //Get param from url e.g. controllerName/:param1/:param2/...../:param_n
                foreach ($m_GET as $key => $value) {
                    $this->params[\substr($key, 1)] = $value;
                }

                return true;
            }
        }

        return false;
    }

    /**
     * Get the currently matched parameters
     *
     * @return array
     */
    public function getParams()
    {
        return $this->params;
    }

    /**
     * Dispatch the route, creating the controller object and running the
     * action method
     *
     * @param string $url The route URL
     *
     * @return void
     */
    public function dispatch($url)
    {
        $url = $this->removeQueryStringVariables($url);

        if ($this->match($url)) {
            $controller = $this->params['controller'];
            $controller = $this->convertToStudlyCaps($controller);
            $controller = $this->getNamespace() . $controller;

            if (class_exists($controller)) {

                $controller_object = new $controller($this->params);

                $action = $this->params['action'];
                $action = $this->convertToCamelCase($action);

                if (preg_match('/action$/i', $action) == 0) {
                    $controller_object->$action($this->params);
                } else {
                    throw new \Exception("Method $action in controller $controller cannot be called directly - remove the Action suffix to call this method");
                }
            } else {
                throw new \Exception("Controller class $controller not found");
            }
        } else {

            if(Config::URL_404) header("Location:".Config::URL_404);
            else throw new \Exception("No route matched. [$url]", 404);
        
        }
    }

    /**
     * Convert the string with hyphens to StudlyCaps,
     * e.g. post-authors => PostAuthors
     *
     * @param string $string The string to convert
     *
     * @return string
     */
    protected function convertToStudlyCaps($string)
    {
        return str_replace(' ', '', ucwords(str_replace('-', ' ', $string)));
    }

    /**
     * Convert the string with hyphens to camelCase,
     * e.g. add-new => addNew
     *
     * @param string $string The string to convert
     *
     * @return string
     */
    protected function convertToCamelCase($string)
    {
        return lcfirst($this->convertToStudlyCaps($string));
    }

    /**
     * Remove the query string variables from the URL (if any). As the full
     * query string is used for the route, any variables at the end will need
     * to be removed before the route is matched to the routing table. For
     * example:
     *
     *   URL                           $_SERVER['QUERY_STRING']  Route
     *   -------------------------------------------------------------------
     *   localhost                     ''                        ''
     *   localhost/?                   ''                        ''
     *   localhost/?page=1             page=1                    ''
     *   localhost/posts?page=1        posts&page=1              posts
     *   localhost/posts/index         posts/index               posts/index
     *   localhost/posts/index?page=1  posts/index&page=1        posts/index
     *
     * A URL of the format localhost/?page (one variable name, no value) won't
     * work however. (NB. The .htaccess file converts the first ? to a & when
     * it's passed through to the $_SERVER variable).
     *
     * @param string $url The full URL
     *
     * @return string The URL with the query string variables removed
     */
    public function removeQueryStringVariables($url)
    {
        if ($url != '') {
            $parts = explode('&', $url, 2);

            if (strpos($parts[0], '=') === false) {
                $url = $parts[0];
            } else {
                $url = '';
            }
        }
        return $url;
    }

    /**
     * Get the namespace for the controller class. The namespace defined in the
     * route parameters is added if present.
     *
     * @return string The request URL
     */
    protected function getNamespace()
    {
        $namespace = 'App\Controllers\\';

        if (array_key_exists('namespace', $this->params)) {
            $namespace .= $this->params['namespace'] . '\\';
        }

        return $namespace;
    }
}
