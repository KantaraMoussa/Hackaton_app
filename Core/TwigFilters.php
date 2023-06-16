<?php

namespace Core;

class TwigFilters
{

    public function __construct($twig)
    {
        $twig->addFilter(new \Twig\TwigFilter('url', function ($url) {
            return Helpers::url($url);
        }));
    }

}
