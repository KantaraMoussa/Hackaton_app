/*!
 * jLive JavaScript Library v0.0.5
 * http://jLive-lib.com/
 *
 * Copyright 2015 JASON.
 * Released under the MIT license
 * http://jLive-lib/license
 *
 * objectif fixé pour le moment:
- rendre presque toutes les fonctions frequement utilisé en PHP disponible en JS.

 */

(function (window) {
	"use strict";
	var

		htmEntitie,
		constList = {},
		classType = {},
		__core_toString = classType.toString,
		// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		jLive = function (selector, context) {
			context = context || document;
			return new jLive.fn.init(selector, context);
		};
	constList.Core = {};
	constList.user = {};
	htmEntitie = {
		nbsp: ' ',
		quot: '"',
		// Caractères généraux
		laquo: '«',
		raquo: '»',
		lsaquo: '‹',
		rsaquo: '›',
		ldquo: '“',
		// Caractères alphabétiques accentués et spéciaux
		aacute: 'á',
		Aacute: 'Á',
		Acirc: 'Â',
		agrave: 'à',
		Agrave: 'À',
		aring: 'å',
		Aring: 'Å',
		atilde: 'ã',
		Atilde: 'Ã',
		auml: 'ä',
		Auml: 'Ä',
		aelig: 'æ',
		Aelig: 'Æ',
		ccedil: 'ç',
		Ccedil: 'Ç',
		eacute: 'é',
		Eacute: 'É',
		ecirc: 'ê',
		Ecirc: 'Ê',
		egrave: 'è',
		Egrave: 'È',
		apos: "'",
		// Sciences
		lt: '<',
		gt: '>'
	};
	jLive.fn = jLive.prototype = {

		init: function (selectors, context) {

			if (typeof selectors == 'undefined')
				jLive.error('something wrong with your selector :' + selectors);
			else if (jLive.checkType(selectors) == 'function') {
				(function (jLive) {
					selectors.call();
					return this;
				})(this);
				return;
			}

			var selObj = jLive.getElement(selectors, context);

			this[0] = selObj;
			this.length = 1;
			this.prevObject;
			this.selector = selectors;
			this.type = 'JLIVE';
			this.el = selObj;
			if (!this.el) {
				this.el = selectors;
			}

			return this;
		}
	};

	jLive.fn.init.prototype = jLive.fn;

	// Return first selector
	jLive.raw = function (obj) {
		if (typeof obj == 'undefined')
			jLive.error('Warning: raw is work only with DOM');
		obj.el = obj[0];
		return obj;
	}

	// -------------------------------------utils------------------------------
	// */

	jLive.overwrite = function (obj, obj2) {

		if (jLive.checkType(obj) == 'object' && jLive.checkType(obj2) == 'object') {
			// console.log(obj);
			for (var obj2p in obj2) {
				if (typeof obj[obj2p] != 'undefined')
					obj[obj2p] = obj2[obj2p];
			}

			return obj;
		}
	};

	// -------------------------------------end
	// utils------------------------------ */


	// -------------------------------------variable------------------------------
	// */

	jLive.isFunction = function (obj) {
		return jLive.checkType(obj) === "function";
	};

	jLive.is_object = function (obj) {
		return jLive.checkType(obj) === "object";
	};

	jLive.isJliveObject = function (obj) {
		return obj.type === 'JLIVE' && jLive.checkType(obj) == 'object';
	};

	jLive.isWindow = function (obj) {
		return obj != null && obj == obj.window;
	};

	jLive.is_array = Array.isArray || function (obj) {
		return jLive.checkType(obj) === "array";
	};

	jLive.is_numeric = function (obj) {
		return !isNaN(parseFloat(obj)) && isFinite(obj);
	};

	jLive.is_boolean = function (obj) {
		return jLive.checkType(obj) === "boolean";
	};

	jLive.empty = function ($var) {
		if (typeof ($var) == 'undefined')
			return true;
		var tvar = jLive.checkType($var),
			varLen;
		if ('string' == tvar && tvar == 'number') {
			varLen = jLive.strlen(jLive.trimAll($var));
		} else if ('object' == tvar || tvar == 'array') {
			varLen = jLive.count($var);
		}
		return (isDigitChar($var) && $var == 0) || $var == "" || varLen == 0 || $var == null || $var == false || $var == undefined || typeof $var == 'undefined';
	};

	jLive.isEmptyObject = function (obj) {
		var name;
		for (name in obj) {
			return false;
		}
		return true;
	};

	jLive.error = function (msg) {
		throw new Error(msg);
	};

	jLive.settype = function ($var, type) {

		switch (type) {
			case 'string':
				return '' + $var + '';
				break;
			case 'integer':
			case 'int':
				if ($var == "")
					$var = 0;
				return parseInt($var);
				break;
			case 'float':
			case 'double':
				if ($var == "")
					$var = 0;
				return parseFloat($var);
				break;
			case 'boolean':
				if ($var == "")
					$var = 0;
				return stringToBoolean($var);
				break;

			default:
				jLive.error(type + ' is not a type');
				break;
		}
	};

	jLive.gettype = function ($var) {
		return jLive.checkType($var);
	};

	/*
	 * ! arg is internal use ne support pas case_insensitive;
	 */
	jLive.define = function (name, value, arg) {
		if (arg == undefined)
			arg = 'user';
		if (value == undefined)
			jLive.error('Warning: define() expects at least 1 parameter');
		if (window['JLIVE' + name])
			jLive.error('Notice: Constant ' + name + ' already defined');
		if (typeof window[name] !== 'undefined')
			jLive.error('Notice: redeclaration of var ' + name);
		if (window[name] = value) {
			if (arg == 'user')
				constList.user[name] = value;
			else
				constList.Core[name] = value;
			return window['JLIVE' + name] = value;
		} else
			return window['JLIVE' + name] = false;
	};

	// name correspond au nom du constante et non la variable ex:
	// defined('nomconst') au lieu de defined(nomconst)
	jLive.defined = function (name) {
		if (typeof (window['JLIVE' + name]) !== 'undefined')
			return true;
		if (jLive.array_key_exists('JLIVE' + name, window))
			return true;
		else
			return false;
	};

	jLive.define('STR_PAD_RIGHT', 'STR_PAD_RIGHT', 'CORE');
	jLive.define('STR_PAD_LEFT', 'STR_PAD_LEFT', 'CORE');
	jLive.define('STR_PAD_BOTH', 'STR_PAD_BOTH', 'CORE');
	jLive.define('COUNT_RECURSIVE', 'COUNT_RECURSIVE', 'CORE');
	jLive.define('COUNT_NORMAL', 'COUNT_NORMAL', 'CORE');
	jLive.define('CASE_UPPER', 1, 'CORE');
	jLive.define('CASE_LOWER', 0, 'CORE');

	jLive.get_defined_constants = function (categorize) {
		var listTrue = {};
		if (categorize == undefined) {
			categorize = false;
			jLive.foreach(constList, function (i, v) {
				jLive.foreach(v, function (i2, v2) {
					listTrue[i2] = v2;
				});
			});
		}
		return (categorize) ? constList : listTrue;
	}
	// -------------------------------------fonction
	// math------------------------------ */

	jLive.abs = function (num) {

		if (jLive.is_numeric(num) || isNumberInString(num)) {
			// var numReg = /^(-)([0-9.]+)$/.test(num);
			// return (numReg) ? RegExp.$2 : num;
			return (num < 0) ? - (num) : num;
		} else {
			jLive.error(num + ' is not a number');
		}

	};

	// integer n'existe pas en PHP, c'est un bonus, il sert à définir si l'on
	// souhaite obtenir un nombre entier ou non
	jLive.rand = function (min, max, integer) {
		if (min && undefined == max)
			return jLive.error('Warning: rand() expects exactly 2 parameters, 1 given');
		if (undefined == max)
			max = 32767; // Sur quelques plates-formes (par exemple,
		// Windows), mt_getrandmax() est limité à 32767
		if (undefined == min)
			min = 0;
		if (undefined == integer)
			integer = true;
		if (jLive.checkType(min) !== 'number')
			return jLive.error('Warning: rand() expects parameter 1 to be long, ' + jLive.checkType(min) + ' given');
		if (jLive.checkType(max) !== 'number')
			return jLive.error('Warning: rand() expects parameter 2 to be long, ' + jLive.checkType(max) + ' given');
		var ret;
		if (!integer)
			return Math.random() * (max - min) + min;
		else
			return Math.floor(Math.random() * (max - min + 1) + min);
	};

	// -------------------------------------fonction
	// string----------------------------- */

	jLive.addslashes = function (str) {
		var strFind = '',
			strCopie,
			strReg;
		for (var i = 0; i < str.length; i++) {
			strCopie = str.charAt(i),
				strReg = /["\']+/.test(strCopie);
			strFind += (strReg) ? strCopie.replace(/["\']+/, "\\" + strCopie) : strCopie;
		}
		return strFind;
	};

	jLive.strlen = function (string) {
		var tString = jLive.checkType(string);
		if (tString !== 'string' && tString != 'number')
			return jLive.error(' Warning: strlen() expects parameter 1 to be string, ' + tString + ' given');
		return jLive.settype(string, 'string').length;
	};

	/*
	 * ! natcompare.js -- Perform 'natural order' comparisons of strings in
	 * JavaScript. Copyright (C) 2005 by SCK-CEN (Belgian Nucleair Research
	 * Centre) Written by Kristof Coomans <kristof[dot]coomans[at]sckcen[dot]be>
	 *
	 * Based on the Java version by Pierre-Luc Paour, of which this is more or
	 * less a straight conversion. Copyright (C) 2003 by Pierre-Luc Paour
	 * <natorder@paour.com>
	 */

	jLive.strnatcmp = function (a, b) {
		a = jLive.settype(a, 'string');
		b = jLive.settype(b, 'string');
		var ia = 0,
			ib = 0;
		var nza = 0,
			nzb = 0;
		var ca,
			cb;
		var result;
		while (true) {
			// only count the number of zeroes leading the last number compared
			nza = nzb = 0;

			ca = a.charAt(ia);
			cb = b.charAt(ib);

			// skip over leading spaces or zeros
			while (isWhitespaceChar(ca) || ca == '0') {
				if (ca == '0') {
					nza++;
				} else {
					// only count consecutive zeroes
					nza = 0;
				}
				ca = a.charAt(++ia);
			}
			while (isWhitespaceChar(cb) || cb == '0') {
				if (cb == '0') {
					nzb++;
				} else {
					// only count consecutive zeroes
					nzb = 0;
				}

				cb = b.charAt(++ib);
			}

			// process run of digits
			if (isDigitChar(ca) && isDigitChar(cb)) {
				if ((result = compareRight(a.substring(ia), b.substring(ib))) != 0) {
					return result;
				}
			}

			if (ca == 0 && cb == 0) {
				// The strings compare the same. Perhaps the caller
				// will want to call strcmp to break the tie.
				return nza - nzb;
			}
			if (ca < cb) {
				return -1;
			} else if (ca > cb) {
				return +1;
			}
			++ia;
			++ib;
		}
	}

	jLive.strnatcasecmp = function (a, b) {
		a = jLive.str(a, 'string');
		b = jLive.settype(b, 'string');
		a = a.toUpperCase();
		b = b.toUpperCase();
		return jLive.strnatcmp(a, b);
	}

	jLive.ucfirst = function (str) {
		if (undefined == str)
			return jLive.error('Warning: ucfirst() expects exactly 1 parameter, 0 given');
		var fletter = str.charAt(0);
		return fletter.toUpperCase() + jLive.substr(str, 1);
	}

	jLive.ucwords = function (str) {
		if (undefined == str)
			return jLive.error('Warning: ucwords() expects exactly 1 parameter, 0 given');
		var words = str.split(/\s+/),
			ret;
		ret = jLive.array_map(function (sw) {
			return jLive.ucfirst(sw);
		}, words);
		return jLive.implode(' ', ret);
	};

	jLive.stripslashes = function (str) {
		return jLive.str_replace(["\\'", '\\"'], ["'", '"'], str);
	};

	jLive.explode = function (delimiter, str, limit) {
		if (jLive.checkType(delimiter) !== 'string')
			jLive.error('Warning: explode() expects parameter 1 to be string, ' + jLive.checkType(delimiter) + ' given');
		if (jLive.checkType(str) !== 'string')
			jLive.error('Warning: explode() expects parameter 2 to be string, ' + jLive.checkType(str) + ' given');
		if (delimiter == '')
			jLive.error('Warning: explode(): Empty delimiter');
		str = str.split(delimiter);
		if (limit && limit > 0 && limit < str.length) {
			var i = 0,
				j = limit - 1,
				str2 = [],
				str3 = '';
			for (; i < limit - 1; i++) {
				str2[i] = str[i];
			}
			for (; j < str.length; j++) {
				str3 += delimiter + str[j];
			}
			str3 = str3.replace('|', '');
			str2[limit - 1] = str3;
			str = str2;
		}
		if (limit < 0 && limit > -str.length) {
			var i = 0,
				str2 = [],
				lim2 = str.length - jLive.abs(limit);
			for (; i < lim2; i++) {
				str2[i] = str[i];
			}
			str = str2;
		}
		return str;
	};

	jLive.implode = function (glue, pieces) {
		var t,
			tGlue = jLive.checkType(glue);
		if (tGlue == 'array' && undefined == pieces) {
			pieces = glue;
			glue = '';
		} else {
			t = jLive.checkType(pieces);
		}
		if (jLive.checkType(pieces) !== 'array')
			jLive.error('Warning: implode(): Invalid arguments passed');
		pieces = pieces.join(glue);
		return pieces;
	};

	jLive.chr = function (n) {
		return (jLive.is_numeric(n)) ? String.fromCharCode(n) : jLive.error(n + ' is not a nombre');
	};

	jLive.trim = function (str) {
		str = jLive.settype(str, 'string');
		if ('undefined' !== typeof String.trim) {
			return str == null ? "" : str.trim(str);
		} else {
			return str == null ? "" : str.replace(rtrim, "");
		}
	};

	jLive.ord = function (str) {
		return 'undefined' !== typeof String.prototype.charCodeAt ? str.charCodeAt(0) : String.charCodeAt(str.charAt(0));
	};

	jLive.chunk_split = function (str, n, sep) {
		if (undefined == str)
			return jLive.error('Warning: chunk_split() expects at least 1 parameter, 0 given');
		if (undefined == n)
			return str;
		if (undefined == sep)
			sep = '\r\n';
		var strFind = '',
			strLength = str.length,
			strdiv = strLength / n,
			strboucleMin = Math.floor(strdiv);
		for (var i = 0; i < strboucleMin; i++) {
			strFind += str.substr(i * n, n) + sep;
		}
		strFind += str.substr(strboucleMin * n);
		if ((strFind.length - sep.length) == strFind.lastIndexOf(sep))
			strFind = strFind.substring(0, strFind.lastIndexOf(sep));
		return strFind;
	};

	jLive.count_chars = function (string, mode) { // reste a tourner la boucle
		// avec tous le code ASCII
		if (undefined == mode)
			mode = 0;
		if (mode > 4 || mode < 0)
			return jLive.error('Warning: count_chars(): Unknown mode');
		var tab = {},
			nbre;
		switch (mode) {
			case 0:
			case 2:
			case 4:
				for (var i = 0; i <= 127; i++) {
					nbre = 0;
					for (var j = 0; j < string.length; j++) {
						if (i == jLive.ord(string.charAt(j)))
							nbre++;
						tab[i] = nbre;
					}
				}
				if (mode == 2) {
					var tab2 = {};
					jLive.foreach(tab, function (i, n) {
						if (n == 0)
							tab2[i] = n;
					});
					var tab = tab2;
				}
				if (mode == 4) {
					var tabStr = '';
					jLive.foreach(tab, function (i, n) {
						if (n == 0)
							tabStr += jLive.chr(i);
					});
					tab = tabStr;
				}
				break;
			case 1:
			case 3:
				for (var i = 0; i < string.length; i++) {
					nbre = 0;
					for (var j = 0; j < string.length; j++) {
						if (string.charAt(i) == string.charAt(j))
							nbre++;
						tab[jLive.ord(string.charAt(i))] = nbre;
					}
				}
				if (mode == 3) {
					var tabStr = '';
					jLive.foreach(tab, function (i, n) {
						tabStr += jLive.chr(i);
					});
					tab = tabStr;
				}
				break;
		}
		return tab;
	};

	jLive.get_meta_tags = function (filename) { // en cours
		alert(filename);
	};

	jLive.strip_tags = function (str, allowable_tag) {
		if (str == undefined)
			return '';

		var pattern = /<[a-z]+\s*.*?>|<\/[a-z]+>/gi,
			regTst;
		if (allowable_tag) {
			allowable_tag = allowable_tag.replace(/\s*/g, '');
			var allow = allowable_tag.match(/<[a-z]+\s*.*?>/g);

			return str.replace(pattern, function (f) {
				for (var i = 0; i < allow.length; i++) {

					regTst = /<([a-z]+)>/.exec(allow[i]);
					var pattern2 = new RegExp('<([a-z]+)\s*.*?>|<\/([a-z]+)\s*>', 'gi'),
						ret;

					if (pattern2.test(f)) {
						var regCap = RegExp.$1 || RegExp.$2;
						if ($j.in_array('<' + regCap + '>', allow))
							ret = f;
						else
							ret = '';
					}
				}
				return ret;
			});

		} else
			return str.replace(pattern, '');

	};

	jLive.strcasecmp = function (str1, str2) {
		return jLive.strcmp(str1.toLowerCase(), str2.toLowerCase());
	};

	jLive.strcmp = function (str1, str2) {
		return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
	};

	jLive.htmlentities = function (string) { // en cours NB: reste a finir
		// les $flags et les entite dans
		// le tableau htmEntitie
		var regex;
		jLive.foreach(htmEntitie, function (i, v) {
			regex = new RegExp(v, 'g');
			string = string.replace(regex, '&' + i + ';');
		});
		return string;
	};

	jLive.htmlspecialchars = function (string) { // en cours NB: reste a
		// finir les $flags et les
		// entite dans le tableau
		// htmEntitie
		var regex;
		jLive.foreach(htmEntitie, function (i, v) {
			if ($j.in_array(v, ['&', '"', "'", '<', '>'])) {
				regex = new RegExp(v, 'g');
				string = string.replace(regex, '&' + i + ';');
			}
		});
		return string;
	};

	/*
	 * ! arg is internal use NB:strLength ne prend pas pour le moment la valeur
	 * negative du a ma mal comprehension dans la documentation PHP
	 */
	jLive.strcspn = function (str1, str2, start, strLength, arg) { // doit
		// subir
		// encore d
		// test
		if (arg == undefined)
			arg = {
				func: 'strcspn'
			};
		if (str2 == undefined)
			return jLive.error('Warning: ' + arg.func + '() expects at least 2 parameters');
		if (start && start > 0)
			str1 = str1.substring(jLive.abs(start));
		else if (start && start < 0)
			str1 = str1.substr(str1.length - jLive.abs(start), jLive.abs(start));
		var start = (start == undefined) ? 0 : jLive.abs(start),
			strLength = (strLength == undefined) ? str1.length : jLive.abs(strLength),
			i = 0;
		for (; i < strLength; i++) {
			if (arg.func == 'strspn') {
				if (str2.indexOf(str1.charAt(i)) === -1) {
					return i;
				}
			} else {
				if (str2.indexOf(str1.charAt(i)) > -1) {
					return i;
				}
			}
		}
		return (strLength == undefined) ? str1.length : strLength;
	}

	jLive.strspn = function (str1, str2, start, strLength) { // doit subir
		// encore bocoup
		// d test
		return jLive.strcspn(str1, str2, start, strLength, {
			func: 'strspn'
		});
	}

	jLive.str_pad = function (str, pad_length, pad_string, pad_type) {
		if (isNumberInString(str))
			str = jLive.settype(str, 'string');
		var strLen = str.length;
		if (pad_string == undefined)
			pad_string = " ";
		if (pad_type == undefined)
			pad_type = "STR_PAD_RIGHT";
		if (pad_length < 0 || strLen == pad_length || strLen > pad_length)
			return str;
		if (!jLive.defined(pad_type))
			return jLive.error('Notice: Use of undefined constant ' + pad_type);
		pad_string = jLive.str_repeat(pad_string, pad_length - strLen);
		if (pad_type == 'STR_PAD_LEFT')
			return pad_string.substr(0, pad_length - strLen) + str;
		else if (pad_type == 'STR_PAD_RIGHT')
			return str + pad_string.substr(0, pad_length - strLen);
		else {
			var pad_stringR = Math.ceil((pad_length - strLen) / 2),
				pad_stringL = (pad_length - strLen) - pad_stringR;
			return pad_string.substr(0, pad_stringL) + str + pad_string.substr(0, pad_stringR);
		}
	}

	jLive.str_repeat = function (input, multiplier) {
		if (multiplier == undefined)
			return jLive.error('Warning: str_repeat() expects exactly 2 parameters');
		if (multiplier < 0)
			return jLive.error('Warning: str_repeat(): Second argument has to be greater than or equal to 0');
		var i = 0,
			str = "";
		for (; i < multiplier; i++)
			str += input;
		return str;
	}

	jLive.strpbrk = function (haystack, char_list) {
		if (haystack == undefined || char_list == undefined)
			return jLive.error('Warning: strpbrk() expects exactly 2 parameters');
		var i = 0,
			reg;
		for (; i < haystack.length; i++) {
			reg = new RegExp(haystack.charAt(i));
			if (reg.test(char_list)) {
				return haystack.substr(i);
			}
		}
	};

	jLive.strrpos = function (haystack, needle, offset) {
		return jLive.strpos(haystack, needle, offset, {
			func: 'strrpos'
		});
	};

	jLive.strrchr = function (haystack, needle) {
		// Seul le premier caractère de needle sera utilisé;
		return jLive.strstr(haystack, needle.charAt(0), false, {
			func: 'strrchr'
		});
	};

	// arg is internal use
	jLive.strstr = function (haystack, needle, before_needle, arg) {
		if (arg == undefined)
			arg = {
				func: 'strstr'
			};
		if (before_needle == undefined)
			before_needle = false;
		if (needle == undefined)
			return jLive.error('Warning: ' + arg.func + '() expects at least 2 parameters');
		if (typeof needle !== 'string')
			needle = jLive.chr(jLive.settype(needle, 'integer'));
		var unhaystack = haystack; // on stock la valeur d'origine
		if (arg.func == 'stristr') {
			if (typeof haystack == 'string')
				haystack = haystack.toLowerCase();
			if (typeof needle == 'string')
				needle = needle.toLowerCase();
		}
		var pos = (arg.func == 'strrchr') ? jLive.strrpos(haystack, needle) : jLive.strpos(haystack, needle);
		if (before_needle)
			return (pos !== false) ? unhaystack.substring(0, pos) : false;
		else
			return (pos !== false) ? unhaystack.substr(pos) : false;
	};

	jLive.stristr = function (haystack, needle, before_needle) {
		return jLive.strstr(haystack, needle, before_needle, {
			func: 'stristr'
		});
	};

	jLive.strripos = function (haystack, needle, offset) {
		if (typeof haystack == 'string')
			haystack = haystack.toLowerCase();
		if (typeof needle == 'string')
			needle = needle.toLowerCase();
		return jLive.strpos(haystack, needle, offset, {
			func: 'strripos'
		});
	};

	jLive.stripos = function (haystack, needle, offset) {
		if (typeof haystack == 'string')
			haystack = haystack.toLowerCase();
		if (typeof needle == 'string')
			needle = needle.toLowerCase();
		return jLive.strpos(haystack, needle, offset, {
			func: 'stripos'
		});
	};

	// arg is internal use
	jLive.strpos = function (haystack, needle, offset, arg) {
		if (arg == undefined)
			arg = {
				func: 'strpos'
			};
		if (needle == undefined || haystack == undefined)
			return jLive.error('Warning: ' + arg.func + '() expects at least 2 parameters');
		if (offset > haystack.length)
			return jLive.error('Warning: ' + arg.func + '() Offset is greater than the length of haystack string');
		if (offset == undefined && (arg.func == 'strrpos' || arg.func == 'strripos'))
			offset = haystack.length;
		if (offset == undefined && (arg.func !== 'strrpos' || arg.func !== 'strripos'))
			offset = offset = 0;
		if (typeof needle == 'number' || typeof needle == 'string') {
			if (typeof needle == 'number')
				needle = jLive.chr(needle);
			if (arg.func == 'stripos')
				needle = needle.toLowerCase();
		} else
			return jLive.error('Warning: ' + arg.func + '(): needle is not a string or an integer');
		if ((arg.func == 'strrpos' || arg.func == 'strripos') && offset < 0) {
			var haystack2Len = haystack.length - jLive.abs(offset);
			haystack = haystack.substring(0, haystack2Len + 1);
			offset = haystack.length;
		} else if ((arg.func == 'strrpos' || arg.func == 'strripos') && offset >= 0) {
			if (offset !== haystack.length) {
				needleTest = haystack.substring(offset);
				if (needleTest.indexOf(needle) > -1)
					offset = haystack.length;
				else
					haystack = needleTest;
			}
		}
		if (arg.func == 'strpos')
			if (offset < 0)
				return jLive.error('Warning: ' + arg.func + '(): Offset not contained in string');
		var pos = (arg.func == 'stripos' || arg.func == 'strpos') ? haystack.indexOf(needle, offset) : haystack.lastIndexOf(needle, offset);
		return (pos > -1) ? pos : false;
	};

	/*
	 * ! arg is internal use
	 */
	jLive.str_replace = function (search, replace, subject, counter, arg) {
		if (arg == undefined)
			arg = {
				func: 'str_replace'
			};
		if (subject == undefined)
			return jLive.error('Warning: ' + arg.func + '() expects at least 3 parameters');
		var isArrayReplace = jLive.is_array(replace),
			isArraySubject = jLive.is_array(subject),
			result = [];
		if (counter != undefined)
			window[counter] = 0;
		if (!isArraySubject)
			subject = [subject];
		jLive.foreach(subject, function () {
			var i = 0,
				subject_ = this;
			if (jLive.is_array(search)) {
				for (; i < search.length; i++) {
					search[i] = $j.quotemeta(search[i]);
					var reg = (arg.func == 'str_replace') ? new RegExp(search[i], 'g') : new RegExp(search[i], 'gi');
					if (isArrayReplace && replace[i] == undefined)
						replace[i] = "";
					subject_ = (isArrayReplace) ? subject_.replace(reg, function (f) {
						if (counter != undefined)
							window[counter]++;
						return replace[i];
					})
						: subject_.replace(reg, function (f) {
							if (counter != undefined)
								window[counter]++;
							return replace;
						});
				}
				/*
				 * !Si le paramètre search est une chaîne de caractères et que
				 * le paramètre replace est un tableau, alors n'a pas de sens et
				 * on renvoie l'erreur que php genere dans ses genres de cas.
				 */
			} else if (('string' == typeof search) && isArrayReplace) {
				return jLive.error('Notice: Array to string conversion');
			} else {
				search = $j.quotemeta(search);
				subject_ = subject_.replace(new RegExp(search, 'g'), function (f) {
					if (counter != undefined)
						window[counter]++;
					return replace;
				});
			}
			result.push(subject_);
		});
		return (isArraySubject) ? result : result[0];
	}

	jLive.str_ireplace = function (search, replace, subject, g) {
		return jLive.str_replace(search, replace, subject, g, {
			func: 'ireplace'
		});
	}

	jLive.strrev = function (str) {
		var string = "",
			i = str.length - 1;
		for (; i >= 0; i--) {
			string += str.charAt(i);
		}
		return jLive.trim(string);
	};

	jLive.parse_str = function (string, output) {
		string = decodeURIComponent(string);
		var firstStr = jLive.explode("&", string),
			secndStr,
			ret = {},
			name,
			value,
			isArray = false;

		jLive.foreach(firstStr, function (i, v) {
			secndStr = jLive.explode("=", v);
			name = secndStr[0];

			value = secndStr[1] ? secndStr[1] : '';

			value = value.indexOf('#') != -1 ? jLive.substr(value, 0, jLive.strrpos(value, '#')) : value;

			isArray = /[A-Z0-9]+\[\]/i.test(name);

			// console.log(name);

			if (output) {
				if (isArray) {
					name = name.replace(/\[\]/, '');
					if (!ret[name])
						ret[name] = [];
					ret[name].push(value);
				} else {
					ret[secndStr[0]] = value;
				}
			} else {
				if (isArray) {
					name = name.replace(/\[\]/, '');
					if (!window[name])
						window[name] = [];
					window[name].push(secndStr[1]);
				}
				window[secndStr[0]] = value;
			}
		});

		return ret;
	};

	jLive.substr = function (string, start, length) {
		if ('undefined' == typeof start)
			return jLive.error('substr() expects at least 2 parameters, 1 given');
		if (undefined == string)
			return 0;
		if (undefined == length)
			length = string.length;
		if (length == false || length == null || length == 0)
			return "";
		if (length > 0)
			string = string.substr(start, length);
		else {
			var str = string.substr(start, string.length);
			string = str.substr(0, str.length - jLive.abs(length));
		}
		return (string == "") ? 0 : string;
	}

	jLive.str_split = function (string, split_length) {
		if (undefined == string)
			return jLive.error('Warning: str_split() expects at least 1 parameter, 0 given');
		if (undefined == split_length)
			split_length = 1;
		if (split_length < 1)
			return false;
		var stringFind = [],
			stringLength = string.length,
			stringdiv = stringLength / split_length,
			stringboucleMin = Math.floor(stringdiv);
		for (var i = 0; i < stringboucleMin; i++) {
			stringFind.push(string.substr(i * split_length, split_length));
		}
		stringFind.push(string.substr(stringboucleMin * split_length));
		return stringFind;
	}

	jLive.substr_replace = function (string, replacement, start, length) {
		var i = 0,
			stringArray = [];
		if (undefined == start)
			return jLive.error('Warning: substr_replace() expects at least 3 parameters, 2 given');
		if (jLive.checkType(string) == 'object' || jLive.checkType(replacement) == 'object' || jLive.checkType(start) == 'object'
			|| jLive.checkType(length) == 'object')
			return jLive.error('Object not Supported in substr_replace() Parameters');
		if (!jLive.is_array(string))
			string = [string];
		for (; i < string.length; i++) {
			var startCopy,
				lengthCopy,
				replacement,
				replacementCopy,
				thisStringValue = string[i],
				thisStringValueArray = [];
			startCopy = (jLive.is_array(start)) ? start[i] : start;
			lengthCopy = (jLive.is_array(length)) ? length[i] : length;
			replacementCopy = (jLive.is_array(replacement)) ? replacement[i] : replacement;
			if (undefined == startCopy)
				startCopy = 0;
			if (undefined == lengthCopy)
				lengthCopy = thisStringValue.length;
			if (undefined == replacementCopy)
				replacementCopy = "";
			for (var j = 0; j < thisStringValue.length; j++) {
				thisStringValueArray.push(thisStringValue[j]);
			}
			jLive.array_splice(thisStringValueArray, startCopy, lengthCopy, replacementCopy);
			stringArray.push(jLive.implode("", thisStringValueArray));
		}
		return stringArray;
	};

	jLive.substr_count = function (haystack, needle, offset, length) {
		if (undefined == offset)
			offset = 0;
		if (((offset + length) > haystack.length) && undefined !== length)
			return jLive.error('Warning: substr_count(): Length and offset value exceeds string length');
		if (undefined == length)
			length = haystack.length;
		if (undefined == needle)
			return jLive.error('Warning: substr_count() expects at least 2 parameters, 1 given');
		haystack = jLive.substr(haystack, offset, length);
		haystack = haystack.match(new RegExp(needle, 'g'));

		return (haystack) ? haystack.length : 0;
	}

	jLive.substr_compare = function (main_str, str, offset, length, case_insensitivity) {
		if (undefined == case_insensitivity)
			case_insensitivity = false;
		if (undefined == offset)
			jLive.error('Warning: substr_compare() expects at least 3 parameters, 2 given');
		if (jLive.abs(offset) > str.length)
			jLive.error('Warning: substr_compare(): The start position cannot exceed initial string length');
		main_str = jLive.substr(main_str, offset, length);
		return (case_insensitivity) ? jLive.strcasecmp(main_str, jLive.substr(str, 0, length)) : jLive.strcmp(main_str, jLive.substr(str, 0, length));
	}

	jLive.quotemeta = function (str) {
		var typStr = jLive.checkType(str);
		if (typStr != 'string' && typStr != 'number')
			jLive.error('Warning: quotemeta() expects parameter 1 to be string, ' + typStr + ' given');
		str = jLive.settype(str, 'string');
		return str.replace(/(.?)/g, function (str, index) {
			return (jLive.in_array(str, ['.', '\\', '+', '*', '?', '[', '^', ']', '(', '$', ')'])) ? '\\' + str : str;
		});
	}

	jLive.preg_quote = function (str) {
		var typStr = jLive.checkType(str);
		if (typStr != 'string' && typStr != 'number')
			jLive.error('Warning: preg_quote() expects parameter 1 to be string, ' + typStr + ' given');
		str = jLive.settype(str, 'string');
		return str.replace(/(.?)/g, function (str, index) {
			return (jLive.in_array(str, ['.', '\\', '+', '*', '?', '[', '^', ']', '(', '$', ')', '=', '{', '}', '!', '<', '>', '|', ':', '-'])) ? '\\' + str : str;
		});
	}

	jLive.strtolower = function (str) {
		var typStr = jLive.checkType(str);
		if (typStr != 'string' && typStr != 'number')
			jLive.error('Warning: quotemeta() expects parameter 1 to be string, ' + typStr + ' given');
		return str.toLowerCase();
	}

	jLive.strtoupper = function (str) {
		var typStr = jLive.checkType(str);
		if (typStr != 'string' && typStr != 'number')
			jLive.error('Warning: quotemeta() expects parameter 1 to be string, ' + typStr + ' given');
		return str.toUpperCase();
	}

	jLive.wordwrap = function (str, width, sbreak, cut) { // en cours( rest
		// gestion cut )

		var i = 0,
			j = 0,
			ret = [],
			strProcess = [];
		for (; i < str.length; i += width) {
			strProcess.push(jLive.substr(str, i, width));
		}

		for (; j < strProcess.length; j++) {
			if (!cut) {
				if (strProcess[j][width - 1] !== ' ') {
					var nxtStr = '';
					if (strProcess[j + 1]) {
						nxtStr = jLive.substr(strProcess[j + 1], 0, jLive.strpos(strProcess[j + 1], ' '));
						strProcess[j + 1] = jLive.str_replace(nxtStr, '', strProcess[j + 1]);
					}
					ret.push(strProcess[j] + nxtStr);
				} else
					ret.push(strProcess[j]);

			} else {
				ret.push(strProcess[j]);
			}

		}
		// console.log(ls);
		return jLive.implode(sbreak || '\n', ret);
	};

	/* NOT A PHP STRING Function */

	jLive.acronym = function (str, caseMatch) {
		var typStr = jLive.checkType(str),
			ret = "";
		caseMatch = caseMatch || 'none';
		if (typStr != 'string')
			jLive.error('Warning: acronym() expects parameter 1 to be string, ' + typStr + ' given');

		$j(str.split(' ')).foreach(function () {

			if (caseMatch == 'upper') {
				var strASCII = $j.ord(this[0]);
				if (strASCII >= 65 && strASCII <= 90)
					ret += this[0];

			} else if (caseMatch == 'lower') {
				var strASCII = $j.ord(this[0]);
				if (strASCII >= 97 && strASCII <= 122)
					ret += this[0];
			} else
				ret += this[0];

		});

		return ret;
	};

	jLive.trimAll = function (str) {
		str = jLive.settype(str, 'string');
		str = str.replace(/[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+/g, " ");
		return jLive.trim(str);
	};

	/* END NOT A PHP Function */

	/* !----------------cookies---------------------------------- */

	function cookies() {

		this.getCookies = function () {

			var $_COOKIE = {};

			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}

				c = c.split("=");

				$_COOKIE[c[0]] = c[1];

			}

			window.$_COOKIE = $_COOKIE;

		}

		this.setcookie = function (name, value, expire, path, domain, secure, httponly) {
			var d = new Date();
			d.setTime(d.getTime() + (expire * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toGMTString();
			document.cookie = name + "=" + value + ";" + expires + ";path=" + path;
			//document.cookie = name + "=" + value + ";" + expires + ";path=" + path + ";domain=" + domain + ";secure=" + secure;

			this.getCookies(); //update cookies

		}

		this.deletecookie = function (name, path) {
			document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" + path;
		}
	}

	var cookies = new cookies();
	cookies.getCookies();

	jLive.setcookie = function (name, value, expire, path, domain, secure, httponly) {

		value = value || "";
		path = path || "/";
		domain = domain || "";
		secure = secure || "";
		httponly = httponly || "";

		cookies.setcookie(name, value, expire, path, domain, secure, httponly);
	}

	jLive.deletecookie = function (name, path) {

		path = path || "/";
		cookies.deletecookie(name, path);
	}

	/* END cookies */

	/* !----------------function array---------------------------------- */

	jLive.array_combine = function (keys, values) {
		if ('object' !== jLive.checkType(values) && jLive.checkType(values) !== 'array')
			jLive.error('Warning: array_combine() expects parameter 2 to be array');
		if (jLive.count(keys) !== jLive.count(values))
			jLive.error('Warning: array_combine(): Both parameters should have an equal number of elements');
		var ret = {};
		values = jLive.array_values(values);
		jLive.foreach(keys, function (ki, kv) {
			ret[kv] = values[ki];
		});
		return ret;
	}

	jLive.array_count_values = function (input) {
		if ('object' !== jLive.checkType(input) && jLive.checkType(input) !== 'array')
			jLive.error('Warning: array_count_values() expects parameter 1 to be array');
		var ret = {};
		jLive.foreach(input, function (i, v) {
			var n = 0;
			jLive.foreach(input, function (ii, vv) {
				if ('number' !== jLive.checkType(v) && jLive.checkType(v) !== 'string')
					jLive.error('Warning: array_count_values(): Can only count STRING and NUMBER values!');
				if (v === vv)
					n++;
			});
			ret[v] = n;
		});
		return ret;
	};

	jLive.array_diff = function (array1, array2) {
		var typArr1 = jLive.checkType(array1),
			typArr2 = jLive.checkType(array2);
		if ('object' !== typArr1 && typArr1 !== 'array')
			jLive.error('Warning: array_diff(): Argument #1 is not an array');
		if ('object' !== typArr2 && typArr2 !== 'array')
			jLive.error('Warning: array_diff(): Argument #2 is not an array');
		var ret = {};
		jLive.foreach(array1, function (i, v) {
			if (!jLive.in_array(v, array2, true))
				ret[i] = v;
		});
		return (typArr1 == 'object' || 'object' == typArr2) ? ret : jLive.objectToArray(ret);
	};

	jLive.array_fill_keys = function (keys, value) {
		if ('object' !== jLive.checkType(keys) && jLive.checkType(keys) !== 'array')
			jLive.error('Warning: array_fill_keys() expects parameter 1 to be array, ' + jLive.checkType(keys) + ' given');
		if (undefined == value)
			jLive.error('Warning: array_fill_keys() expects exactly 2 parameters, 1 given');
		var ret = {};
		jLive.foreach(keys, function (i, v) {
			ret[v] = value;
		});
		return ret;
	};

	jLive.array_filter = function (input, callback) {
		var t = jLive.checkType(input);
		if ('object' !== t && t !== 'array')
			jLive.error('Warning: array_filter() expects parameter 1 to be array, ' + t + ' given');
		if (callback && jLive.checkType(callback) !== 'function')
			jLive.error('Warning: array_filter() expects parameter 2 to be a valid callback, function not found or invalid function name');
		var ret = t == 'array' ? [] : {};
		jLive.foreach(input, function (i, v) {

			if (callback) {
				if (callback.call(v, v, i, input))
					t == 'array' ? ret.push(v) : ret[i] = v;
			} else if (jLive.settype(v, 'boolean')) {
				t == 'array' ? ret.push(v) : ret[i] = v;
			}
		});
		return ret;
	};

	jLive.array_flip = function (trans) {
		if ('object' !== jLive.checkType(trans) && jLive.checkType(trans) !== 'array')
			jLive.error('Warning: array_flip() expects parameter 1 to be array, ' + jLive.checkType(trans) + ' given');
		var ret = {};
		jLive.foreach(trans, function (i, v) {
			if ('number' == jLive.checkType(v) || jLive.checkType(v) == 'string')
				ret[v] = i;
			else
				jLive.error('Warning: array_flip(): Can only flip STRING and NUMBER values!');
		});
		return ret;
	};

	jLive.array_intersect = function (array1, array2) {
		if ('object' !== jLive.checkType(array1) && jLive.checkType(array1) !== 'array')
			jLive.error('Warning: array_intersect(): Argument #1 is not an array');
		if ('object' !== jLive.checkType(array2) && jLive.checkType(array2) !== 'array')
			jLive.error('Warning: array_intersect(): Argument #2 is not an array');
		var ret = {};
		jLive.foreach(array1, function (i, v) {
			if (jLive.in_array(v, array2))
				ret[i] = v;
		});
		return ret;
	};

	jLive.array_keys = function (input, search_value, strict) {
		if ('object' !== jLive.checkType(input) && jLive.checkType(input) !== 'array')
			jLive.error('Warning: array_keys(): expects parameter 1 to be array');
		if (undefined == search_value)
			search_value = false;
		if (undefined == strict)
			strict = false;
		var ret = [];
		if (search_value) {
			jLive.array_filter(input, function (val, i) {
				if (strict) {
					if (val === search_value) {
						ret.push(i);
						return true
					}
				} else {
					if (val == search_value) {
						ret.push(i);
						return true
					}
				}
			});
		} else {
			jLive.foreach(input, function (i, v) {
				ret.push(i);
			});
		}
		return ret;
	}

	// option g isn't include in_array within PHP, i just added
	jLive.in_array = function (needle, haystack, strict, g) {
		var i;
		if (undefined == haystack)
			jLive.error('Warning: in_array() expects at least 2 parameters, 1 given');
		if (undefined == g)
			g = false;
		if (undefined == strict)
			strict = false;
		if (haystack) {
			for (i in haystack) {
				if (g && (jLive.checkType(haystack[i]) == 'object' || jLive.checkType(haystack[i]) == 'array')) {
					if (jLive.in_array(needle, haystack[i], strict, g))
						return true;
				} else {

					if (strict) {
						if (haystack[i] === needle)
							return true;
					} else {
						if (haystack[i] == needle)
							return true;
					}

				}
			}
		}

		return false;
	};

	/*
	 * ! return un objet;
	 */
	jLive.array_merge = function () {
		var first = {},
			index = 0;
		jLive.foreach(Array.prototype.slice.call(arguments), function (iarg, varg) {
			var t = jLive.checkType(varg);
			if ('object' !== t && t !== 'array')
				jLive.error('Warning: array_merge(): Argument #' + parseInt(iarg + 1) + ' is not an array');
			jLive.foreach(varg, function (i, v) {
				if (t == 'array') {
					first[index] = v;
					index++;
				} else
					first[i] = v;
			});
		});
		return first;
	};

	// option g ne fait pas partie de array_key_exists dans PHP, c'est un plus
	// que j'ai ajouter
	jLive.array_key_exists = function (key, search, g) {
		if ('number' !== jLive.checkType(key) && jLive.checkType(key) !== 'string')
			jLive.error('Warning: array_key_exists(): The first argument should be either a string or an integer');
		if ('object' !== jLive.checkType(search) && jLive.checkType(search) !== 'array')
			jLive.error('Warning: array_key_exists() expects parameter 2 to be array, ' + jLive.checkType(search) + ' given');
		if (undefined == g)
			g = false;
		var ret = false;
		jLive.foreach(search, function (i, val) {
			if (g && (jLive.checkType(val) == 'object' || jLive.checkType(val) == 'array')) {
				if (jLive.array_key_exists(key, val, g))
					return ret = true;
			} else {
				if (i === key)
					return ret = true;
			}
		});
		return ret;
	};

	jLive.array_map = function (callback, array) {
		var t = jLive.checkType(array);
		if ('object' !== t && t !== 'array')
			jLive.error('Warning: array_map() expects parameter 1 to be array, ' + t + ' given');
		if (jLive.checkType(callback) !== 'function')
			jLive.error('Warning: array_map() expects parameter 2 to be a valid callback, function not found or invalid function name');
		var value,
			ret = [];
		jLive.foreach(array, function (i, val) {
			value = callback(val);
			if (value != null) {
				ret[i] = value;
			}
		});
		return ret;
	}

	jLive.array_pad = function (input, pad_size, pad_value) {
		if (undefined == input || undefined == pad_size || undefined == pad_value)
			jLive.error('Warning: array_pad() expects exactly 3 parameters');
		if (jLive.checkType(pad_size) !== 'number')
			jLive.error('Warning: array_pad() expects parameter 2 to be long, ' + jLive.checkType(pad_size) + ' given');
		if (jLive.checkType(input) !== 'array')
			jLive.error('Warning: array_pad() expects parameter 1 to be array, ' + jLive.checkType(input) + ' given');
		var i = input.length;
		for (; i < jLive.abs(pad_size); i++) {
			if (pad_size < 0)
				input.unshift(pad_value);
			else
				input.push(pad_value);
		}
		return input;
	};

	// ne supportera pas "preserve_keys";
	jLive.array_reverse = function (array) {
		if (undefined == array)
			jLive.error('Warning: array_reverse() expects at least 1 parameter, 0 given');
		var t = jLive.checkType(array);
		if (t !== 'array')
			jLive.error('Warning: array_reverse() expects parameter 1 to be array, ' + t + ' given');
		return array.reverse();
	};

	jLive.array_reduce = function (input, func, initial) {
		if (undefined == func || undefined == input)
			jLive.error('Warning: array_reduce() expects at least 2 parameters');
		var t = jLive.checkType(input);
		if ('object' !== t && t !== 'array')
			jLive.error('Warning: array_reduce() expects parameter 1 to be array, ' + t + ' given');
		if (jLive.checkType(func) !== 'function')
			jLive.error('Warning: array_reduce() expects parameter 2 to be a valid callback, function not found or invalid function name');
		if (undefined == initial)
			initial = null;
		var ret = initial;
		jLive.foreach(input, function (i, val) {
			ret = func(ret, val);
		});
		return ret;
	};

	jLive.array_sum = function (array) {
		if (undefined == array)
			jLive.error('Warning: array_sum() expects exactly 1 parameter, 0 given');
		var t = jLive.checkType(array);
		if ('object' !== t && t !== 'array')
			jLive.error('Warning: array_sum() expects parameter 1 to be array, ' + t + ' given');
		return jLive.array_reduce(array, function (a, b) {
			b = parseFloat(b);
			if (isNaN(b))
				b = 0;
			return a += b;
		}, 0);
	};

	jLive.array_change_key_case = function (array, _case) {
		if (undefined == array)
			jLive.error('Warning: array_sum() expects exactly 1 parameter, 0 given');
		var t = jLive.checkType(array),
			array2 = array;
		if ('object' !== t && t !== 'array')
			jLive.error('Warning: array_sum() expects parameter 1 to be array, ' + t + ' given');
		_case = _case || 0;
		jLive.array_walk(array = jLive.array_keys(array), function (val) {
			return (_case == 0) ? val.toLowerCase() : val.toUpperCase();
		});

		return jLive.array_combine(array, array2);
	};

	jLive.array_product = function (array) {
		if (undefined == array)
			jLive.error('Warning: array_product() expects exactly 1 parameter, 0 given');
		var t = jLive.checkType(array);
		if ('object' !== t && t !== 'array')
			jLive.error('Warning: array_product() expects parameter 1 to be array, ' + t + ' given');
		return jLive.array_reduce(array, function (a, b) {
			b = parseFloat(b);
			if (isNaN(b))
				b = 0;
			return a *= b;
		}, 1);
	};

	// ne supportera pas "preserve_keys";
	jLive.array_slice = function (array, offset, length) {
		if (undefined == offset)
			jLive.error('Warning: array_slice() expects at least 2 parameters, 1 given');
		var t = jLive.checkType(array);
		if ('object' !== t && t !== 'array')
			jLive.error('Warning: array_slice() expects parameter 1 to be array, ' + t + ' given');
		return array.slice(offset, length);
	};

	jLive.array_push = function () {
		var args = Array.prototype.slice.call(arguments),
			t = jLive.checkType(args[0]);
		if (t !== 'array')
			jLive.error('Warning: array_push() expects parameter 1 to be array, ' + t + ' given');
		if (args.length < 2)
			jLive.error('Warning: array_push() expects at least 2 parameters, 1 given');
		jLive.foreach(args, function (i, val) {
			if (i > 0)
				args[0].push(val);
		});
		return args[0].length;
	};

	jLive.array_unshift = function () {
		var args = Array.prototype.slice.call(arguments),
			t = jLive.checkType(args[0]);
		if (t !== 'array')
			jLive.error('Warning: array_unshift() expects parameter 1 to be array, ' + t + ' given');
		if (args.length < 2)
			jLive.error('Warning: array_unshift() expects at least 2 parameters, 1 given');
		jLive.foreach(jLive.array_reverse(args), function (i, val) {
			if (i < args.length - 1)
				args[args.length - 1].unshift(val);
		});
		return args[args.length - 1].length;
	};

	jLive.array_shift = function (array) {
		var t = jLive.checkType(array),
			ret = array[0];
		if (t !== 'array')
			jLive.error('Warning: array_shift() expects parameter 1 to be array, ' + t + ' given');
		array.shift();
		return ret;
	};

	jLive.array_pop = function (array) {
		var t = jLive.checkType(array),
			ret = array[array.length - 1];
		if (t !== 'array')
			jLive.error('Warning: array_pop() expects parameter 1 to be array, ' + t + ' given');
		array.pop();
		return ret;
	};

	jLive.array_splice = function (array, offset, length, replacement) {
		if (undefined == offset)
			jLive.error('Warning: array_splice() expects at least 2 parameters, 1 given');
		if (jLive.checkType(offset) !== 'number')
			jLive.error('Warning: array_splice() expects parameter 2 to be long, ' + jLive.checkType(offset) + ' given');
		if (undefined == length)
			length = array.length;
		if (jLive.checkType(length) !== 'number')
			jLive.error('Warning: array_splice() expects parameter 3 to be long, ' + jLive.checkType(length) + ' given');
		var t = jLive.checkType(array),
			ret = [],
			ret2 = [],
			suppElem = [],
			arrayCop = jLive.arrayClone(array),
			i;
		jLive.array_clear(array);
		offset = (jLive.abs(offset) > arrayCop.length) ? arrayCop.length : offset;
		if (offset < 0) {
			for (i = 0; i < arrayCop.length - jLive.abs(offset); i++) {
				array.push(arrayCop[i]);
			}
		} else {
			for (i = 0; i < offset; i++) {
				array.push(arrayCop[i]);
			}
		}
		if (length < 0) {
			if (offset < 0) {
				for (i = array.length; i < arrayCop.length; i++) {
					ret.push(arrayCop[i]);
				}
			} else {
				for (i = offset; i < arrayCop.length; i++) {
					ret.push(arrayCop[i]);
				}
			}
			var lengthRet = (jLive.abs(length) > ret.length) ? 0 : ret.length - jLive.abs(length);
		} else {
			for (i = array.length; i < arrayCop.length; i++) {
				ret.push(arrayCop[i]);
			}
			var lengthRet = (jLive.abs(length) > ret.length) ? ret.length : jLive.abs(length);
		}

		for (i = lengthRet; i < ret.length; i++) {
			ret2.push(ret[i]);
		}

		// moment ideal pour recuperer les elements supprimes
		for (i = offset; i < arrayCop.length - ret2.length; i++) {
			suppElem.push(arrayCop[i]);
		}

		if (undefined !== replacement) {
			if (jLive.checkType(replacement) !== 'array')
				array.push(replacement);
			else {
				jLive.foreach(replacement, function (i, val) {
					array.push(val);
				});
			}
		}
		for (i = 0; i < ret2.length; i++) {
			array.push(ret2[i]);
		}
		return suppElem;
	};

	// ne supporte pas sort_flags, mal compris dans PHP.
	jLive.array_unique = function (array, sort_flags) {
		var t = jLive.checkType(array),
			ret = {};
		if (t !== 'array' && t !== 'object')
			jLive.error('Warning: array_unique() expects parameter 1 to be array, ' + t + ' given');

		var array2 = (t == 'array') ? jLive.arrayToObject(array) : array;

		jLive.foreach(array2, function (i, v) {
			if (!jLive.in_array(v, ret))
				ret[i] = v;
		});
		return (t == 'array') ? jLive.objectToArray(ret) : ret;
	};

	jLive.array_values = function (input) {
		var t = jLive.checkType(input),
			ret = [];
		if (t !== 'array' && t !== 'object')
			jLive.error('Warning: array_values() expects parameter 1 to be array, ' + t + ' given');
		jLive.foreach(input, function (i, v) {
			ret.push(v);
		});
		return ret;
	};

	jLive.array_rand = function (input, num_req) {
		if (undefined == num_req)
			num_req = 1;
		var t = jLive.checkType(input),
			t2 = jLive.checkType(num_req);
		if (t !== 'array')
			jLive.error('Warning: array_rand() expects parameter 1 to be array, ' + t + ' given');
		if (t2 !== 'number')
			jLive.error('Warning: array_rand() expects parameter 2 to be long, ' + t2 + ' given');
		if (input.length < num_req)
			jLive.error('Warning: array_rand(): Second argument has to be between 1 and the number of elements in the array');
		var t = jLive.checkType(input),
			ret = [],
			i = 0,
			res;
		for (; i < num_req; i++) {
			do {
				res = jLive.substr(jLive.settype(Math.random(), 'string'), 3, 1);
			} while ((res > input.length - 1) || jLive.in_array(res, ret));
			ret.push(res);
		}
		return ret;
	};

	jLive.count = function ($var, mode) {

		if (undefined === $var)
			return jLive.error('Warning: count() expects at least 1 parameter, 0 given');
		var typVar = jLive.checkType($var);
		if (typVar !== 'array' && typVar !== 'object' && typVar !== 'nodelist')
			return 1;
		if (undefined == mode)
			mode = COUNT_NORMAL;
		if (!jLive.defined(mode))
			return jLive.error('Notice: Use of undefined constant ' + mode);
		var cpt_count = 0;

		if ((typVar == 'array' || typVar == 'nodelist') && mode == COUNT_NORMAL) {
			return $var.length;
		}

		jLive.foreach($var, function (i, val) {
			if (mode !== COUNT_NORMAL && ((jLive.checkType(val) == 'array') || (jLive.checkType(val) == 'object'))) {
				cpt_count++;
				cpt_count += jLive.count(val, COUNT_RECURSIVE);
			} else
				cpt_count++;
		});
		return cpt_count;
	};

	jLive.fn.count = function () {

		// console.log(this.el);
		// console.log(this.el.length);

		return jLive.count(this.el);
	};

	// Pour directement modifiés dans le tableau, funcname doit se terminer par
	// un return
	jLive.array_walk = function (array, funcname, userdata) { // en test
		var value,
			t = jLive.checkType(array);
		if (t !== 'array' && t !== 'object')
			jLive.error('Warning: array_walk() expects parameter 1 to be array, ' + t + ' given');
		if (jLive.checkType(funcname) !== 'function')
			jLive.error('Warning: array_walk() expects parameter 2 to be a valid callback, function not found or invalid function name');
		jLive.foreach(array, function (i, val) {
			value = (undefined == userdata) ? funcname(val, i) : funcname(val, i, userdata);
			if (value != null) {
				array[i] = value;
			};
		});
	};

	jLive.sort = function (array, sort_flags) { // encoursb

		if (undefined == sort_flags)
			sort_flags = 'SORT_REGULAR';
		var value = jLive.array_values(array),
			sorter_flags = sorter(sort_flags);
		// alert(sorter_flags);
		value.sort(sorter_flags);

		return value;
	};

	function sorter(sort_flags) {
		// alert(sort_flags);
		switch (sort_flags) {
			case 'SORT_STRING':
				// compare items as strings
				return sorter = function (a, b) {
					return jLive.strnatcmp(a, b);
				};
				break;
			case 'SORT_LOCALE_STRING':
				// compare items as strings, based on the current locale
				return function (a, b) {
					a = jLive.settype(a, 'string');
					return a.localeCompare(b);
				};
				break;
			case 'SORT_NUMERIC':
				// compare items numerically
				return function (a, b) {
					return (a - b);
				};
				break;
			case 'SORT_REGULAR':
			// compare items normally (don't change types)
			default:
				return sorter = function (a, b) {
					return jLive.strcmp(a, b);
				};
				break;
		}
		n
	}

	jLive.asort = function (array, sort_flags) { // en cours
		var key = [],
			value = [],
			i = 0,
			ret = {},
			arrayCopie = jLive.arrayClone(array);
		jLive.foreach(array, function (ii, val) {
			key[i] = ii;
			value[i] = val;
			i++;
		});

		value = value.sort(sort_flags);
		return value;
	};

	jLive.array_merge_recursive = function (array1, array2) {
		var t1 = jLive.checkType(array1),
			t2 = jLive.checkType(array2);
		if ('object' !== t1 && t1 !== 'array')
			jLive.error('Warning: array_merge_recursive(): Argument #1 is not an array');
		if ('object' !== t2 && t2 !== 'array')
			jLive.error('Warning: array_merge_recursive(): Argument #2 is not an array');
		var key = '',
			array1Len = jLive.count(array1) - 1;
		for (key in array2) {
			if (key in array1) {
				if (typeof array1[key] === 'object' && typeof array2[key] === 'object') {
					array1[key] = arrayMergeLike(array1[key], array2[key]);
				} else
					array1[array1Len] = array2[key];
			} else
				array1[key] = array2[key];
		}
		return array1;
	};

	jLive.array_search = function (needle, haystack, strict) {
		if ('object' !== jLive.checkType(haystack) && jLive.checkType(haystack) !== 'array')
			jLive.error('Warning: array_search(): expects parameter 2 to be array');
		if (undefined == needle)
			needle = false;
		if (undefined == strict)
			strict = false;
		return jLive.array_keys(haystack, needle, strict)[0];
	}

	jLive.array_fill = function (start_index, num, value) {
		var ret = {},
			i = 0;
		if (arguments.length < 3)
			jLive.error('Warning: array_fill() expects exactly 3 parameters, ' + arguments.length + ' given');
		if (num < 1)
			jLive.error('Warning: array_fill(): Number of elements must be positive');
		if (jLive.checkType(start_index) !== 'number')
			return jLive.error('Warning: array_fill() expects parameter 1 to be long, ' + jLive.checkType(start_index) + ' given');
		if (jLive.checkType(num) !== 'number')
			return jLive.error('Warning: array_fill() expects parameter 2 to be long, ' + jLive.checkType(num) + ' given');
		if (start_index < 0) {
			ret[start_index] = value;
			num--;
			start_index = 0;
		}
		for (; i < num; i++) {
			var index = start_index + i;
			ret[index] = value;
		}
		return ret;
	}

	jLive.range = function (start, limit, step) {
		if (undefined == limit)
			jLive.error('Warning: range() expects at least 2 parameters, 1 given');
		if (undefined == step)
			step = 1;
		var startTyp = jLive.checkType(start),
			limitTyp = jLive.checkType(limit),
			sl_isString = ('string' == startTyp && !isNumberInString(start)) && ('string' == limitTyp && !isNumberInString(limit));

		if ((startTyp == 'string' && !isNumberInString(start)) && isNumberInString(limit)) {
			start = 0;
		} else if (isNumberInString(start) && ('string' == limitTyp && !isNumberInString(limit))) {
			limit = 0;
		}

		if (sl_isString) {
			start = jLive.ord(start);
			limit = jLive.ord(limit);
		} else {
			start = parseFloat(start);
			limit = parseFloat(limit);
		}
		var ret = [],
			i = start;
		if (start > limit) {
			for (; i >= limit; i -= step) {
				if (sl_isString)
					ret.push(jLive.chr(i));
				else
					ret.push(i);
			}
		} else {
			for (; i <= limit; i += step) {
				if (sl_isString)
					ret.push(jLive.chr(i));
				else
					ret.push(i);
			}
		}
		return ret;
	}

	jLive.shuffle = function (array) {
		if (jLive.checkType(array) !== 'array')
			jLive.error('Warning: shuffle() expects parameter 1 to be array, ' + jLive.checkType(array) + ' given');
		var arr = [],
			arrtest = [],
			j = 0,
			index,
			keyList = [];
		jLive.foreach(jLive.array_values(array), function (i, val) {
			do {
				index = jLive.rand(0, array.length * 2);
			} while (jLive.in_array(index, keyList));
			keyList.push(index);
			arr[index] = val;
		});
		jLive.foreach(arr, function (i, val) {
			if (undefined !== val) {
				array[j] = val;
				arrtest[j] = j;
				j++;
			}
		});
		return arrtest.length == array.length;
	}

	jLive.foreach = function (obj, callback, args) {
		if (!obj)
			return;
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike(obj);
		if (args) {
			if (isArray) {
				for (; i < length; i++) {
					value = callback.apply(obj[i], args);
					if (value === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					value = callback.apply(obj[i], args);
					if (value === false) {
						break;
					}
				}
			}

		} else {
			if (isArray) {
				for (; i < length; i++) {
					value = callback.call(obj[i], i, obj[i]);
					if (value === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					value = callback.call(obj[i], i, obj[i]);
					if (value === false) {
						break;
					}
				}
			}
		}
		return obj;
	};

	// Les paramètres ne peuvent être que de variables sauf si c un tableau de
	// chaînes
	jLive.compact = function () {
		var ret = {};
		if (arguments.length == 0)
			jLive.error('Warning: compact() expects at least 1 parameter, 0 given');
		jLive.foreach(arguments, function (i, val) {

			if (jLive.checkType(val) == 'array' || jLive.checkType(val) == 'object') {
				jLive.foreach(val, function (ii, val2) {
					ret = jLive.array_merge(jLive.compact(val2), ret);
				});
			} else if (typeof window[val] !== 'undefined')
				ret[val] = window[val];

		});
		return ret;
	};

	/* !----------------JSON---------------------------------- */
	jLive.json_encode = function (value) { // array to json
		if ('object' !== jLive.checkType(value) && jLive.checkType(value) !== 'array')
			jLive.error('Warning: json_encode() expects parameter 1 to be array');
		return JSON.stringify(value);
	}

	jLive.json_decode = function (json, assoc) { // json to array
		assoc = assoc || false;

		if (!isJson(json))
			return null;

		var ret = JSON.parse(json);
		if (!assoc)
			return jLive.objectToArray(ret);
		else
			return ret;
	}

	/*
	 * !----------------fonctions de date et
	 * d'heures----------------------------------
	 */

	function stdTimezoneOffset() {
		var d = new Date();
		var jan = new Date(d.getFullYear(), 0, 1);
		var jul = new Date(d.getFullYear(), 6, 1);
		return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
	}

	function isDST() {
		return new Date().getTimezoneOffset() < stdTimezoneOffset();
	}

	function calcTime(utc, offset, is_dst) {

		is_dst = is_dst || isDST();
		offset = offset || stdTimezoneOffset();

		return utc + (- (60 * offset));
	}

	jLive.checkdate = function (month, day, year) {
		if (arguments.length < 3)
			return jLive.error('Warning: checkdate() expects exactly 3 parameters, ' + arguments.length + ' given');
		if (!isNumberInString(month) || !isNumberInString(day) || !isNumberInString(year))
			return jLive.error('Warning: checkdate() expects parameter 3 to be long');
		return month > 0 && month < 13 && year > 0 && year < 32768 && day > 0 && day <= (new Date(year, month, 0)).getDate();
	}

	jLive.date = function (format, timestamp) {

		if (timestamp && !isNumberInString(timestamp))
			jLive.error('Warning: date() expects parameter 2 to be number, ' + jLive.checkType(timestamp) + ' given');
		timestamp = (timestamp) ? new Date(timestamp * 1000) : new Date();
		return format.replace(/\\?(.?)/gi, function (f) {
			return dateFormat(f, timestamp);
		});
	}

	jLive.time = function () {
		return calcTime(Math.floor(new Date().getTime() / 1000));
	}

	jLive.mktime = function (hour, minute, second, month, day, year, is_dst) {
		is_dst = is_dst || isDST();
		if (undefined == hour)
			hour = jLive.date("H");
		if (undefined == minute)
			minute = jLive.date("i");
		if (undefined == second)
			second = jLive.date("s");
		if (undefined == month)
			month = jLive.date("n");
		if (undefined == day)
			day = jLive.date("j");
		if (undefined == year)
			year = jLive.date("Y");
		if (arguments.length == 0)
			console.log('Strict standards: mktime(): You should be using the time() function instead');
		return calcTime(new Date(parseInt(year), parseInt(month - 1), parseInt(day), parseInt(hour), parseInt(minute), parseInt(second)).getTime() / 1000, false, is_dst);
	}

	jLive.getdate = function (timestamp) {
		var d = (timestamp) ? new Date(timestamp * 1000) : new Date(),
			w = d.getDay(),
			m = d.getMonth(),
			y = d.getFullYear(),
			ret = {};
		ret.seconds = d.getSeconds();
		ret.minutes = d.getMinutes();
		ret.hours = d.getHours();
		ret.mday = d.getDate();
		ret.wday = w;
		ret.mon = m + 1;
		ret.year = y;
		ret.yday = Math.floor((d - (new Date(y, 0, 1))) / 86400000);
		ret.weekday = dateFormat('txt_day', 0)[w] + 'day';
		ret.month = dateFormat('txt_month', 0)[m];
		ret['0'] = parseInt(d.getTime() / 1000, 10);
		return ret;
	}

	jLive.microtime = function (get_as_float) {
		var now = (Date.now ? Date.now() : new Date().getTime()) / 1e3;
		if (get_as_float)
			return now;
		var s = now | 0;
		return (Math.round((now - s) * 1e3) / 1e3) + ' ' + s;
	}

	/*
	 * !----------------la gestion des
	 * fonctions----------------------------------
	 */
	jLive.func_get_args = function () { // bad
		return Array.prototype.slice.call(arguments);
	}

	/* !----------------function file---------------------------------- */

	jLive.file_get_contents = function (fileInput) { // en cours

		var reader = new FileReader();
		reader.onload = function () {
			alert('Contenu du fichier "' + fileInput.files[0].name + '":\n\n' + reader.result);
		};
		reader.readAsText(fileInput.files[0]);
		// return filename;

	};

	/* !----------------DOM---------------------------------- */
	jLive.getScript = function (src, callback, arg) {
		if ('undefined' == typeof src)
			return jLive.error('getScript() expects at least 1 parameters, 0 given');
		if (callback) {
			var newScriptTag = document.createElement('script'),
				firstScriptTag = document.getElementsByTagName('script')[0];
			newScriptTag.src = src;
			newScriptTag.async = false;
			// console.log(newScriptTag);
			newScriptTag.onload = newScriptTag.onreadystatechange = function () {
				if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
					callback.call(this, arg);
				};
			};
			firstScriptTag.parentNode.insertBefore(newScriptTag, firstScriptTag);
		}
	};

	jLive.getElement = function (selector, context) {

		if (selector == window)
			return 'window';

		var parserHTMLObj1 = new parserHTML(selector);

		if (parserHTMLObj1.isHTMLTag()) {
			return toNodeList(createElement(parserHTMLObj1, true));
		} else
			return getQuery(jLive.isJliveObject(selector) ? selector.el : selector, context);

	};

	jLive.attrib = function (obj, attrib, value, callback, prefix) {

		prefix = prefix || '';
		var
			el = obj.el,
			r = attrib,
			rTyp = jLive.checkType(attrib),
			vTyp = jLive.checkType(value);

		//console.log(el);
		//console.log(el);
		//console.log(attrib);

		callback = callback || function () { };

		// if (jLive.checkType(el) != 'nodelist')
		// el = toNodeList(el);

		if ((rTyp == 'array' || rTyp == 'string') && (undefined == value || vTyp == 'function')) { // set
			// to
			// getter
			var get = {},
				lastNodeName;
			if (rTyp == 'string') {
				r = [attrib];
			}

			jLive.foreach(el, function () {
				var hiEl = this,
					nodeName = indentifierElem(hiEl),
					hiElAttrList = {};
				lastNodeName = nodeName;

				//console.log(hiEl);

				jLive.foreach(r, function (i, prop) {
					hiElAttrList[prefix + prop] = hiEl.getAttribute(prefix + prop) || undefined;
				});
				get[nodeName] = hiElAttrList;
			});

			callback.call(this, get);
			return (rTyp == 'string') ? jLive.objectToArray(get[lastNodeName])[0] : get[lastNodeName];

		} else { // set to setter
			if (rTyp == 'string') {
				var r = {};
				r[attrib] = value;
			}


			jLive.foreach(r, function (prop, val) {
				jLive.foreach(el, function () {
					this.setAttribute(prefix + prop, val);
					callback.call(this, this);
				});
			});
		}
		return obj;
	};

	jLive.attrData = function (obj, attrib, value, callback) {

		return jLive.attrib(obj, attrib, value, callback, 'data-');

	};

	jLive.removeAttrib = function (obj, attrib, callback) {
		var el = obj.el || toNodeList(obj).el,
			r = attrib,
			rTyp = jLive.checkType(attrib);
		callback = callback || function () { };
		callback.call(this, el);
		if (rTyp == 'string') {
			r = [attrib];
		}
		jLive.foreach(r, function (i, prop) {
			jLive.foreach(el, function () {
				this.removeAttribute(prop);
			});
		});
		return obj;
	};

	jLive.style = function (obj, regle, value, callback) {
		// console.log(obj);
		// var el = obj.el ? toNodeList(obj.el) : toNodeList(obj),
		// var el = typeof obj.el == 'undefined' ? obj.el : toNodeList(obj).el,
		var
			el = obj.el,
			r = regle,
			rTyp = jLive.checkType(regle),
			vTyp = jLive.checkType(value);
		callback = callback || function () { };
		//console.log(obj);
		if ((rTyp == 'array' || rTyp == 'string') && (undefined == value || vTyp == 'function')) { // getter
			var get = {},
				lastNodeName;
			if (rTyp == 'string') {
				r = [regle];
			}

			// console.log(el);

			jLive.foreach(el, function () {
				var hiEl = this,
					nodeName = indentifierElem(hiEl),
					hiElAttrList = {};
				lastNodeName = nodeName;
				jLive.foreach(r, function (i, prop) {
					prop = stylePropRender(prop);
					hiElAttrList[prop] = (typeof hiEl.style[prop] == 'string') ? hiEl.style[prop] : 'none';
					if (jLive.empty(hiElAttrList[prop] + ''))
						hiElAttrList[prop] = (undefined !== hiEl.currentStyle) ? hiEl.currentStyle[prop] || 'none'
							: getComputedStyle(hiEl, null)[prop];
				});
				get[nodeName] = hiElAttrList;
			});
			callback.call(this, get);
			return (jLive.count(get) == 1) ? jLive.objectToArray(get[lastNodeName])[0] : get;

		} else { // setter

			if (rTyp == 'string') {
				var r = {};
				r[regle] = value;
			}
			jLive.foreach(r, function (prop, val) {

				jLive.foreach(el, function () {
					// var hiEl = this.el || this;
					prop = stylePropRender(prop);
					this.style[prop] = val;
				});
			});
		}
		return obj;
	};

	jLive.manipClass = function (obj, names, callback, typ) {

		if (jLive.checkType(names) != 'array')
			names = [names];
		// var el = typeof obj.el == 'undefined' ? obj.el : toNodeList(obj).el,
		var
			el = obj.el,
			namesCopy = names,
			elClass,
			elNewClass = "";
		names = jLive.implode(' ', names);
		callback = callback || function () { };

		//console.log(el);
		//console.log(typ);

		switch (typ) {
			case 'addClass':

				jLive.foreach(el, function (prop, val) {

					elClass = jLive(this).attr('class');
					if (elClass == undefined) {
						this.setAttribute('class', ' ');
						elClass = '';
					}
					callback.call(this, this); // can do something before modified


					if (this.classList) { //Modern HTML5 Techniques for changing classes
						//console.log(namesCopy);
						//this.className = 'ddddd';
						//console.log(namesCopy);
						namesCopy.forEach((v) => {
							$(this).addClass(v);
						});
					} else {
						// to be deprecated
						elNewClass = elClass + ' ' + names;
						this.className = jLive.trim(jLive.implode(' ', jLive.array_unique(elNewClass.split(/\s+/))));
					}
				});

				break;
			case 'removeClass':

				jLive.foreach(el, function (prop, val) {
					callback.call(this, this); // can do something before modified

					if (this.classList) { //Modern HTML5 Techniques for changing classes
						namesCopy.forEach((v) => {
							this.classList.remove(v);
						});

					} else {

						elClass = jLive(this).attr('class');
						if (elClass == undefined)
							elClass = ''
						//console.log(elClass);
						elClass = jLive.explode(' ', elClass);

						// class
						elNewClass = jLive.implode(',', jLive.array_map(function (elClassName) {
							if (!jLive.in_array(elClassName, namesCopy))
								return elClassName;
						}, elClass));
						this.className = elNewClass.length == 0 ? '' : jLive.trim(jLive.str_replace(',', ' ', elNewClass));
					}
				});

				break;
			case 'toggleClass':
				jLive.foreach(el, function (prop, val) {

					if (this.classList) { //Modern HTML5 Techniques for changing classes
						namesCopy.forEach((v) => {
							this.classList.toggle(v);
						});
					} else {
						elClass = jLive.trim(jLive(this).attr('class'));
						if (elClass == 'undefined')
							elClass = '';
						elClass = jLive.explode(' ', elClass);
						callback.call(this, this); // can do something before modified
						// class
						elNewClass = jLive.implode(',', jLive.array_map(function (elClassName) {
							if (!jLive.in_array(elClassName, namesCopy))
								return elClassName;
						}, elClass)) + ',' + jLive.array_map(function (elClassName) {
							if (!jLive.in_array(elClassName, elClass))
								return elClassName;
						}, namesCopy);

						this.className = jLive.trim(jLive.str_replace(',', ' ', elNewClass));
					}

				});
				break;
			case 'hasClass':

				if (el[0].classList) { //Modern HTML5 Techniques for changing classes
					return el[0].classList.contains(names);
				} else return new RegExp('(\\s|^)' + names + '(\\s|$)').test(el[0].className);
				break;
		}

		return obj;
	};

	// event
	jLive.trigger = function (obj, name, callback) {

		var el = 'nodelist' == jLive.checkType(obj.el) ? obj.el : toNodeList(obj.el),

			s = obj.selector.selector || obj.selector;

		if (name == 'ready') {
			jLive.foreach(el, function () {
				if (this && this.addEventListener) {
					_eventHolder(this, name, callback);
					document.addEventListener('DOMContentLoaded', callback, false);
				}
			});

			return;
		}

		if (s == window) {
			el = window;
			if (el.addEventListener) {
				el.addEventListener(name, callback, false);
			} else {
				var _this = this;
				if (name == 'scroll')
					el.onscroll = function () {
						callback.call(_this, window.event)
					};
				else
					el.attachEvent('on' + name, function () {
						callback.call(_this, window.event)
					});
			}
		} else {
			jLive.foreach(el, function () {
				if (this.addEventListener) {
					_eventHolder(this, name, callback);
					this.addEventListener(name, callback, false);
				} else {
					var _this = this;
					_eventHolder(this, name, function () {
						callback.call(_this, window.event)
					}); // not tested on IE.
					this.attachEvent('on' + name, function () {
						callback.call(_this, window.event)
					});
				}

			});
		}
		return this;
	}

	function isJson(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

	jLive.hasEvent_ = function (evt, fct, obj) {
		var el = obj.el[0];
		fct = fct || false;
		evt = evt || false;
		if (!el.eventHolder) {
			return false;
		} else {
			for (var i = 0; i < el.eventHolder.length; i++) {
				if (fct) {
					if (el.eventHolder[i][0] == evt && String(el.eventHolder[i][1]) == String(fct)) {
						return true;
					}
				} else if (evt) {

					if (el.eventHolder[i][0] == evt) {
						return true;
					}
				}
			}
		}
		return false;
	}

	jLive.removeEvent_ = function (evt, fct, obj) {

		var el = obj.el;

		fct = fct || false;
		evt = evt || false;

		if (fct) {
			jLive.foreach(el, function () {
				if (document.detachEvent) {
					this.detachEvent("on" + evt, fct);
				} else {
					this.removeEventListener(evt, fct, false);
				}
			});
		} else if (evt) {
			jLive.foreach(el, function () {

				if (this.eventHolder) {
					for (var i = 0; i < this.eventHolder.length; i++) {
						if (this.eventHolder[i][0] == evt) {
							removeEvent(this, evt, this.eventHolder[i][1]);
							this.eventHolder.splice(i, 1);
							i--;
						}
					}

				}
			});
		} else {

			jLive.foreach(el, function () {

				if (this.eventHolder) {
					for (var i = 0; i < this.eventHolder.length; i++) {
						if (jLive.in_array(this.eventHolder[i][0], ("blur focus contextmenu load resize scroll unload click dblclick " +
							"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
							"change select submit keydown keypress keyup error").split(" "))) {
							removeEvent(this, this.eventHolder[i][0], this.eventHolder[i][1]);
							this.eventHolder.splice(i, 1);
							i--;
						}
					}

				}
			});

		}
		return obj;
	}

	function _eventHolder(el, name, fn) {
		if (!el.eventHolder)
			el.eventHolder = [];
		el.eventHolder[el.eventHolder.length] = new Array(name, fn);
	}

	function removeEvent(obj, type, fn) {
		if (obj.detachEvent) {
			obj.detachEvent('on' + type, obj[type + fn]);
			obj[type + fn] = null;
		} else {
			obj.removeEventListener(type, fn, false);
		}
	}

	function createElement(html, parserHTMLObj) {

		parserHTMLObj = parserHTMLObj || false;
		var htmlTag = parserHTMLObj ? html : new parserHTML(html),
			tagInfo = htmlTag.htmlTagInfo(),
			newEl = document.createElement(tagInfo.tagName),
			newElTxt = document.createTextNode(tagInfo.content),
			attr;

		if (tagInfo.attrList) {
			jLive.foreach(tagInfo.attrList, function () {
				attr = this.split('=');
				// console.log(attr);
				newEl.setAttribute(jLive.trim(attr[0]), jLive.str_replace('"', "", attr[1]));
			});
		}

		if (htmlTag.tagType == 'evenTag') {
			newEl.appendChild(newElTxt);
		}

		//console.log(newEl);

		return newEl;
	}



	jLive.elementInserting = function (html, obj, name) { // en test.......

		jLive.foreach(obj.el, function () {
			if ('append' == name) {
				this.innerHTML += html;
			} else if ('prepend' == name) {
				this.innerHTML = html + this.innerHTML;
			}
		});

		return obj;
	};

	jLive.domManipIns = function (html, obj, name) { // en cours

		var elem = obj.elTmp ? obj.elTmp[0] : obj.el[0], isHTag = true;

		if (jLive.checkType(html) == 'string') {
			var parserHTMLObj2 = new parserHTML(html),
				isHTag = parserHTMLObj2.isHTMLTag();
		}

		if (isHTag) { // tag has been created

			var newNode = jLive.checkType(html) == 'string' ? jLive.getElement(html) : html;
			// console.log(newNode);

			//console.log(obj.el);

			if (newNode.el) newNode = newNode.el[0] || newNode.el;

			if ('appendTo' == name) {

				newNode.appendChild(elem);

			} else if ('prependTo' == name) {
				newNode.insertBefore(elem, newNode.firstChild);
			}

			obj.elTmp = newNode;
			obj.el = toNodeList(elem);

		} else { // its a css selector

			var elClon,
				el;

			jLive.foreach(getQuery(html, null), function (k, v) {

				elClon = elem;
				el = this[0] || this;

				if ('insertBefore' == name) {

					var parent_ = el.parentNode;
					parent_.insertBefore(elClon, el);

				} else if ('appendTo' == name) {

					el.appendChild(elClon);

				} else if ('prependTo' == name)
					el.insertBefore(elClon, el.firstChild);
				else if ('insertAfter' == name) {

					var parent_ = el.parentNode;
					parent_.insertBefore(elClon, el.nextSibling);

				}

			});

		}

		return obj;
	};

	jLive.manipElementUtulitaire = function (obj, name, arg) {
		// var el = typeof obj.el == 'undefined' ? obj.el : toNodeList(obj).el;
		var el = obj.el;

		switch (name) {

			case 'clone':
				arg = arg || true;
				var elcl;
				jLive.foreach(el, function () {
					elcl = this.cloneNode(arg);
				});
				obj.el = toNodeList(elcl);
				return obj;

				break;
			case 'wrap':

				var temp = document.createElement('div'),
					parent = el[0].parentNode,
					insertWhere = el[0].previousSibling,
					target;

				temp.innerHTML = arg;
				target = temp.firstChild;

				// recherche la position du dernier enfant
				while (target.firstChild) {
					target = target.firstChild;
				}

				jLive.foreach(el, function (i, v) {
					target.appendChild(v);
				});

				// inserting the created-nodes either before the previousSibling of
				// the first
				// Node (if there is one), or before the firstChild of the parent:
				parent.insertBefore(temp.firstChild, (insertWhere ? insertWhere.nextSibling : parent.firstChild));

				obj.el = el;
				return obj;

				break;
			case 'hasParent':

				var p = el[0] && el[0].parentNode ? getParent(el[0], arg) : false;
				if (p) {
					obj.el = toNodeList(getParent(el[0], arg));
					return obj;
				} else
					return false;

				break;
			case 'parent':

				// console.log(el);
				if (el[0] && el[0].parentNode) {
					obj.el = toNodeList(el[0].parentNode);
					return obj;
				} else
					return false;

				break;
			case 'next':
				// console.log(el);
				if (el[0] && el[0].nextSibling) {
					obj.el = toNodeList(el[0].nextSibling);
					return obj;
				} else
					return false;

				break;
			case 'child':
				//	console.log(obj);

				if (el.length != 0) {
					var c = el[0].childNodes;
					if ('string' == jLive.checkType(arg) && !isNumberInString(arg)) {
						var listEl = [];
						jLive.foreach(c, function () {
							var fc = arg.substring(0, 1),
								lc = arg.substring(1);
							if (this.className && fc == '.' && new RegExp(lc).test(this.className))
								listEl.push(this);
							else if (this.className && fc == '#' && this.id == lc)
								listEl.push(this);
							else
								if (this.localName && this.localName.toLowerCase() == arg.toLowerCase())
									listEl.push(this);
						});

						obj.el = toNodeList(listEl);

					} else if (isNumberInString(arg)) {
						obj.el = toNodeList(c[parseInt(arg) - 1]);
					} else
						obj.el = toNodeList(c);

					return obj.el.length == 0 ? false : obj;
				} else
					return false;

				break;
			case 'nextElement':

				// console.log(obj);
				// console.log(el[0]);
				// console.log(el[0].nextSibling);

				var ne = el[0] && el[0].nextSibling ? getNextElementSibling(el[0], arg) : false;

				if (ne) {
					obj.el = toNodeList(getNextElementSibling(el[0], arg));
					return obj;
				} else
					return false;

				break;
			case 'previousElement':

				// console.log(obj);
				// console.log(el[0]);
				// console.log(el[0].nextSibling);

				var ne = el[0] && el[0].previousSibling ? getPreviousElementSibling(el[0], arg) : false;

				if (ne) {
					obj.el = toNodeList(getPreviousElementSibling(el[0], arg));
					return obj;
				} else
					return false;

				break;

			case 'find': // non fait
				// var child, df = document.createDocumentFragment();
				// df.appendChild(obj.el);
				// obj = obj.parent(arg);
				// child = obj.el.querySelectorAll(arg);

				// return obj.el.childNodes;

				break;

			case 'remove':
				console.log(obj);
				jLive.foreach(el, function () {
					this.parentNode.removeChild(this);
				});
				return obj;

				break;
			case 'width':
				return obj.style('width');

				break;
			case 'height':

				return obj.style('height');

				break;
		}

	}

	jLive.client = function (obj, name) {
		var el = obj.el,
			s = obj.selector.selector || obj.selector;
		if (s === window || s === 'body' || s === 'html') {
			var e = window,
				a = 'inner';
			name = jLive.substr(name, 6);
			if (!('innerWidth' in window)) {
				a = 'client';
				var B = document.body; // IE en mode 'quirks'
				var D = document.documentElement; // IE avec doctype
				e = (D.clientHeight) ? D : B;
			}
			return e[a + name];
		} else {
			var client = 0;
			jLive.foreach(el, function () {
				client = (name == 'clientHeight') ? this.clientHeight : this.clientWidth;
			});

			return client;
		}
	};

	jLive.offset = function (obj, toParent) {

		// toParent pour determiner en fonction du parent ou la page
		var top = 0,
			left = 0,
			el = obj.el[0] || obj.el;
		// console.log(obj.el);

		if (toParent) {

			do {
				top += el.offsetTop - el.scrollTop;
				left += el.offsetLeft - el.scrollLeft;
			} while (el = el.offsetParent);
		} else {
			top = el.offsetTop;
			left = el.offsetLeft;
		}

		return {
			Top: top,
			Left: left,
			Width: el.offsetWidth,
			Height: el.offsetHeight
		};
	};

	jLive.scrol = function (obj, name, pixel) {
		var el = obj.el,
			s = obj.selector.selector || obj.selector;
		// console.log(el);
		if (name == 'scrollHeight') {
			if (s === window || s === 'body' || s === 'html') {
				var D = document;
				return Math.max(D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight,
					D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight);
			} else {
				var scrol = 0;
				jLive.foreach(el, function () {
					scrol = this.scrollHeight;
				});

				return scrol;
			}

		} else if (name == 'scrollTop' || name == 'scrollLeft') {

			if (s === window || s === 'body' || s === 'html') {
				var B = document.body; // IE en mode 'quirks'
				var D = document.documentElement; // IE avec doctype
				D = (name == 'scrollTop') ? (D.clientHeight) ? D : B : (D && D.scrollLeft) ? D : B;

				if ('undefined' == typeof (pixel)) {
					if (name == 'scrollTop') {

						if ('pageYOffset' in window)
							return window.pageYOffset; // tous browsers sauf IE
						// inferieur #9
						else
							return D.scrollTop;

					} else {

						if ('pageXOffset' in window)
							return window.pageXOffset;
						else {
							var zoomFactor = GetZoomFactor();
							return Math.round(D.scrollLeft / zoomFactor);
						}

					}

				} else {
					if (name == 'scrollTop')
						D.scrollTop = pixel;
					else
						D.scrollLeft = pixel;
				}

			} else {
				if ('undefined' == typeof pixel) {
					var scrol = 0;
					jLive.foreach(el, function () {
						scrol = (name == 'scrollTop') ? this.scrollTop : this.scrollLeft;
					});

					return scrol;

				} else {
					jLive.foreach(el, function () {
						(name == 'scrollTop') ? this.scrollTop = pixel : this.scrollLeft = pixel;
					});
				}
			}

		}

		return obj;
	};

	// animation

	jLive.animation = function (obj, props, opts) {

		var optsTyp = jLive.checkType(opts);
		if ('object' !== optsTyp && optsTyp !== 'number')
			opts = 1000;
		var start = new Date,

			id = setInterval(function () {

				var timePassed = new Date - start,
					delta = (defaultDelta[opts.delta]) ? opts.delta : 'linear',
					easing = opts.easing || 'easeIn',
					done = opts.done || function () { },

					duration = opts.duration || opts,

					progress = timePassed / duration;
				if (progress > 1)
					progress = 1;

				delta = ('easeIn' != easing) ? defaultDelta[easing](progress, delta) : defaultDelta[delta](progress);
				// console.log(easing);

				jLive.foreach(props, function (prop, val) {
					var unit = "px";
					if ($j.in_array(prop, ['opacity']))
						unit = "";

					obj.style(prop, val * delta + unit);
				});
				if (opts.step)
					opts.step(obj, delta);

				if (progress == 1) {
					clearInterval(id);
					done.call(obj, obj);
				}

			}, opts.delay || 10);

		return obj;

	};

	jLive.showHidden = function (obj, name, disMode, effect) {
		// var el = 'nodelist' == jLive.checkType(obj.el) ? obj.el :
		// toNodeList(obj.el);
		var
			el = obj.el,
			disMode = disMode || 'block';

		// console.log(el);

		switch (name) {

			case 'show':

				jLive.foreach(el, function () {
					var dis = jLive.attrib(this, "data-jlive_lib_old_display") || disMode || 'block';
					// console.log(jLive.attrib(this,
					// "data-jlive_lib_old_display"));

					jLive.style(this, {
						"display": dis,
						'opacity': 0
					});
					jLive.removeAttrib(this, "data-jlive_lib_old_display");
					if (!effect) {
						jLive.style(this, {
							'opacity': 1
						});
					}
				});

				break;
			case 'hide':

				jLive.foreach(el, function () {

					if (jLive.attrib(this, "data-jlive_lib_old_display"))
						jLive.attrib(this, "data-jlive_lib_old_display", jLive.style(this, "display"));

					jLive.style(this, {
						'opacity': 1
					});
					if (!effect) {
						jLive.style(this, {
							'display': 'none',
							'opacity': 0
						});
					}
				});

				break;

			case 'toggle':

				var is_hidden;
				jLive.foreach(el, function () {
					// is_hidden = isHidden();
					if (isHidden(this)) {
						name = 'show';
						jLive.showHidden(obj, 'show', disMode, effect);
					} else {
						name = 'hide';
						jLive.showHidden(obj, 'hide', disMode, effect);
					}

				});

				break;

		}
		if (!effect) {
			return obj;
		} else
			return effectFx[effect](obj, name);
	}

	var effectFx = {
		fade: function (obj, mode) {
			jLive.animation(obj, {}, {

				delta: 'swing',
				duration: 1500,
				step: function (elem, delta) {
					elem.style('opacity', mode == 'show' ? 1 * delta : 1 - delta);
				},
				done: function (elem) {
					if (mode == 'hide') {
						elem.style('display', 'none');
					} else {
						// elem.style('display',
						// (elem.style('display').toLowerCase() != 'none') ?
						// elem.style('display').toLowerCase() :
						// 'inline-Block');
						elem.style('display', elem.attr('data-jlive_lib_old_display'));
					}
				}
			});
			return obj;
		}

	};

	/*
	 * ! formulaire
	 */

	jLive.formHandler = function (txt, obj, name) {

		/*if (!obj.el[0])
			obj.el = [obj.el];*/

		if (obj.el.length == 0) return;

		var els = obj.el,
			el = obj.el[0],
			elNodNam = el.nodeName.toLowerCase(),
			output = {};



		switch (name) {

			case 'value':


				if ('input' == elNodNam || 'textarea' == elNodNam) {

					if (txt || txt == '') {
						jLive.foreach(els, function () {
							if (!jLive.in_array(this.type.toLowerCase(), ['file', 'submit', 'reset']))
								this.value = txt;
						})
					} else {

						jLive.foreach(els, function () {
							if (!jLive.in_array(this.type.toLowerCase(), ['submit', 'reset'])) {

								if (this.type.toLowerCase() == 'file') {
									output[(el.id || el.name) || 0] = this.files.length == 1 ? this.files[0] : this.files;
								} else
									output[(this.name || this.id) || 0] = this.value;

							}
						});
					}

				} else if ('select' == elNodNam) {

					if (txt) {
						jLive.foreach(els, function () {
							this.options[this.selectedIndex].value = txt;
						})
					} else {

						let el = els[0] || els;
						//if (el.selectedIndex == undefined || !el.options[el.selectedIndex]) return;
						if (el.type == 'select-multiple') output[(el.id || el.name) || 0] = Array.from(el.querySelectorAll("option:checked"), e => e.value);
						else {
							if (el.selectedIndex < 0) return ' ';
							output[(el.id || el.name) || 0] = el.options[el.selectedIndex].value || el.options[el.selectedIndex].innerText;
						}
					}

				}

				break;
			case 'formValue':

				var elem = el.elements;
				for (const key in elem) {

					if (!isNumberInString(key) || jLive.array_key_exists(elem[key].name || elem[key].id || 0, output)) continue;

					const v = elem[key];
					if (jLive.checkType(elem[v.name]) == 'radionodelist') {
						output[v.name] = '';
						jLive.foreach(elem[v.name], function (ni, nv) {
							if (nv.checked)
								output[nv.name] = nv.value;
						});
					} else {

						if (v.type == 'select-multiple') {
							output[v.id || v.name] = Array.from(v.querySelectorAll("option:checked"), e => e.value);
						} else if (v.type == 'radio' || v.type == 'checkbox') {
							if (v.checked)
								output[(v.id || v.name) || 0] = v.value;
						} else if (v.type == 'file') {
							output[(v.id || v.name)] = v.files[0];
						} else {
							if (v.id.length != 0 || v.name.length != 0) output[v.id || v.name] = v.value;
						}

					}
				}

				break;
			case 'selected': // only for select HTML element

				if ('select' == elNodNam) {
					obj.el = getQuery(el.options[el.selectedIndex], null);
				} else
					jLive.error('Warning: selected function is only for select HTML element, ' + elNodNam.toUpperCase() + ' given');

				break;
			case 'checked':

				if (typeof txt != 'undefined' && txt != 'element') {
					jLive.foreach(els, function () {
						this.checked = txt;
					});
				} else {

					if (els.length == 1) {

						if (txt == 'element') {
							obj.el = toNodeList(els);

							return obj;
						} else
							return (el.checked) ? true : false;

					}

					for (var i = 0; i < els.length; i++) {
						if (els[i].checked) {
							if (txt == 'element') {
								obj.el = toNodeList(els[i]);

								return obj;
							} else
								return true;
						}
					}
					return false;
				}

				break;

			case 'disabled':

				if (typeof txt != 'undefined' && txt != 'element') {
					jLive.foreach(els, function () {
						this.disabled = txt;
					});
				} else {
					// return (el.disabled) ? true : false;
					if (els.length == 1)
						return (el.disabled) ? true : false;
					for (var i = 0; i < els.length; i++) {
						if (els[i].disabled) {
							if (txt == 'element') {
								obj.el = toNodeList(els[i]);
								return obj;
							} else
								return true;
						}
					}
					return false;
				}

				break;
			case 'readonly':

				if (typeof txt != 'undefined') {
					jLive.foreach(els, function () {
						this.readOnly = txt;
					});
				} else {
					return (el.readOnly) ? true : false;
				}
				break;
		}

		return (jLive.empty(output)) ? obj : (jLive.count(output) == 1 && name != 'formValue') ? output[(el.id || el.name) || 0] : output;
	};

	jLive.formCtrl = function (obj_, options_) {

		if (!obj_.el[0])
			return obj_;
		// console.log(obj_.el[0]);

		function formCtrl_(obj, options) {

			this.submitBtn = null;
			this.els = obj.el;
			this.el = obj.el[0];
			this.formElem;
			this.idForm = this.el.id;
			this.check = {};
			this.formElemCpt = 0;
			this.ajxCtrl = {};
			this.ajxCtrlOpt = {};
			var hi_ = this;

			options.preventDefault = ('undefined' == typeof options.preventDefault) ? true : options.preventDefault;
			options.onSuccess = options.onSuccess || function () { };
			options.onSubmit = options.onSubmit || function () { };
			options.onError = options.onError || function () { };
			options.onProccess = options.onProccess || function () { };
			options.beforeProccess = options.beforeProccess || function () { };
			options.beforeSubmit = options.beforeSubmit || function () { };
			options.event = options.event || ['input', 'blur'];
			options.rules = options.rules || {};
			options.style = options.style || {};

			//transforming rules defined on form
			if (jLive.count(options.rules) == 0) {

				options.rules = {};

				jLive.foreach(this.el.elements, function () {

					//setting id for elems when missing
					if (!this.id) {
						hi_.formElemCpt++;
						if (!jLive.in_array(this.type.toLowerCase(), ['submit', 'reset', 'fieldset', 'button']))
							this.id = this.name || (hi_.el.id + hi_.formElemCpt);
					}

					options.rules[this.id] = {};

					if ($j(this).attr('data-required')) options.rules[this.id].required = $j(this).attr('data-required');
					if ($j(this).attr('data-min-length')) options.rules[this.id].minLength = parseInt($j(this).attr('data-min-length'));
					if ($j(this).attr('data-max-length')) options.rules[this.id].maxLength = $j(this).attr('data-max-length');
					if ($j(this).attr('data-role')) options.rules[this.id].role = $j(this).attr('data-role');
					if ($j(this).attr('data-date-format')) options.rules[this.id].dateFormat = $j(this).attr('data-date-format');
					if ($j(this).attr('data-ajax')) options.rules[this.id].ajax = $j(this).attr('data-ajax');
					if ($j(this).attr('data-sync')) options.rules[this.id].sync = $j(this).attr('data-sync');
					if ($j(this).attr('data-type')) options.rules[this.id].type = $j(this).attr('data-type');
					if ($j(this).attr('data-range-set')) options.rules[this.id].rangeSet = $j(this).attr('data-range-set');
					if ($j(this).attr('data-pattern')) options.rules[this.id].pattern = $j(this).attr('data-pattern');
					if ($j(this).attr('data-value-equal')) options.rules[this.id].valueEqual = $j(this).attr('data-value-equal');
					if ($j(this).attr('data-allowed-file-type')) options.rules[this.id].allowedFileType = $j(this).attr('data-allowed-file-type');
					if ($j(this).attr('data-allowed-file-size')) options.rules[this.id].allowedFileSize = $j(this).attr('data-allowed-file-size');

				});
			}

			// handle form rules before
			jLive.foreach(options.rules, function (id, rules) {

				options.rules[id] = jLive.overwrite({
					required: "no",
					minLength: 2,
					maxLength: 255,
					role: null,
					dateFormat: 'dd-mm-yyyy,',
					ajax: false,
					sync: 0,
					type: 'alphanumeric',
					rangeSet: null,
					pattern: '.',
					valueEqual: null,
					allowedFileType: '*',
					allowedFileSize: 1,

				}, rules);
			});

			this.formTest = function () {
				jLive.foreach(this.els, function (i, elem) {

					if ('FORM' == elem.nodeName.toUpperCase()) {
						hi_.formElem = hi_.el.elements;

						jLive.foreach(hi_.formElem, function () {

							var hiElemForm = this;
							//let elemAttrId = elem.id;
							if (options.rules[this.id] != undefined && options.rules[this.id].sync) options.rules[this.id].sync = false;

							//getting the submit button
							if (this.type.toLowerCase() == 'submit') hi_.submitBtn = this;

							options.idForm = hi_.idForm;

							if (!jLive.in_array(this.type.toLowerCase(), ['submit', 'reset', 'fieldset', 'button'])) {

								hi_.check[this.id] = function (obj, options) {

									var ft = new formCtrl__(obj, options);
									return ft.test();

								};

								// setting up event
								if (jLive.in_array(this.type.toLowerCase(), ['password', 'text', 'file', 'textarea', 'number', 'email'])) {

									if (jLive.checkType(options.event) == 'array') {

										var hi = this;
										jLive.foreach(options.event, function () {

											if ((this == 'blur' || this == 'focus') && options.rules[hiElemForm.id].ajax)
												return; // avoid to execute ajax
											// on blur or focus

											hi['on' + this] = function () {
												// console.log();
												// console.log(hi_.idForm);
												var inputID = hi.id;

												// set
												// form
												// element
												// to
												// jLive
												// object
												var thisInpInObj = new jLive.fn.init('#' + hi_.idForm + ' #' + inputID);

												options.beforeProccess.call(obj, thisInpInObj, obj);
												var sCheck = hi_.check[hi.id](thisInpInObj, options);

												if (!sCheck.err) {
													options.onProccess.call(obj, false, thisInpInObj, obj, 'none', options.rules);
												} else
													options.onProccess.call(obj, true, thisInpInObj, obj, sCheck.errType, options.rules);

											}

										});

									} else {
										this['on' + options.event] = function () {
											var inputID = this.id;
											var thisInpInObj = new jLive.fn.init('#' + hi_.idForm + ' #' + inputID); // set
											// form
											// element
											// to
											// jLive
											// object
											// var thisInpInObj = new
											// jLive.fn.init(this); //set form
											// element to jLive object
											options.beforeProccess.call(obj, thisInpInObj, obj);
											var sCheck = hi_.check[hi.id](thisInpInObj, options);
											if (!sCheck) {
												options.onProccess.call(obj, false, thisInpInObj, obj, 'none', options.rules);
											} else
												options.onProccess.call(obj, true, thisInpInObj, obj, sCheck.errType, options.rules);
										}
									}
								}
							}

							if ('SELECT' == this.nodeName.toUpperCase()) {
								this['onchange'] = function () {
									// var thisInpInObj = new
									// jLive.fn.init(this); //set form element
									// to jLive object
									var inputID = this.id;
									var thisInpInObj = new jLive.fn.init('#' + hi_.idForm + ' #' + inputID); // set
									// form
									// element
									// to
									// jLive
									// object
									options.beforeProccess.call(obj, thisInpInObj, obj);
									var sCheck = hi_.check[inputID](thisInpInObj, options);
									if (!sCheck) {
										options.onProccess.call(obj, false, thisInpInObj, obj, 'none', options.rules);
									} else
										options.onProccess.call(obj, true, thisInpInObj, obj, sCheck.errType, options.rules);
								}
							}

						});

						this.onsubmit = function (e) {

							if (hi_.submitBtn) hi_.submitBtn.disabled = true;

							// options.beforeSubmit.call(hi_,this, options.rules);
							options.onSubmit.call(hi_, this);

							var result = true,
								sCheck,
								errorList = {};
							for (var i in hi_.check) {

								var thisInpInObj = new jLive.fn.init('#' + hi_.idForm + ' #' + i);

								if (thisInpInObj.el.length == 0) continue;

								// force
								// input
								// with
								// ajax
								// to
								// sync
								if (options.rules[i].ajax)
									options.rules[i].sync = true;

								options.beforeProccess.call(obj, thisInpInObj, obj);
								sCheck = hi_.check[i](thisInpInObj, options);
								result = !sCheck.err && result;
								if (sCheck.err)
									errorList[thisInpInObj.attr('id')] = sCheck.errType;
								if (typeof thisInpInObj.el[0] != 'undefined' && jLive.in_array(thisInpInObj.el[0].type.toLowerCase(), ['password', 'text', 'file', 'textarea', 'number', 'email']))
									options.onProccess.call(obj, !sCheck, thisInpInObj, obj, sCheck.errType || '', hi_.submitBtn);

								//console.log(errorList);
							}

							if (result) {
								if (hi_.submitBtn) hi_.submitBtn.disabled = false;
								options.onSuccess.call(this, this, hi_.submitBtn);
								if (!options.preventDefault)
									return true;
							} else {

								options.onError.call(this, this, errorList, hi_.submitBtn);
								if (hi_.submitBtn) hi_.submitBtn.disabled = false;
							}
							jLive.preventDefault(e);
						}

					} else {

						hi_.check[this.id] = function (obj, options) {
							var ft = new formCtrl__(obj, options);
							return ft.test();
						};

						// Mise en place des événements
						var hi = this;
						if (jLive.checkType(options.event) != 'array')
							options.event = [options.event];
						jLive.foreach(options.event, function () {

							hi['on' + this] = function () {
								var thisInpInObj = new jLive.fn.init('#' + hi_.idForm + ' #' + hi.id);
								options.beforeProccess.call(hi, thisInpInObj, obj);
								if (hi_.check[hi.id](thisInpInObj, options)) {
									options.onProccess.call(obj, false, thisInpInObj, obj, thisInpInObj.attr('data-error-type'));
									options.onSuccess.call(this, hi);
								} else {
									options.onProccess.call(hi, true, thisInpInObj, obj, thisInpInObj.attr('data-error-type'));
									options.onError.call(this, thisInpInObj);
								}
							}
						});
					}

				});
			};
		}

		var f = new formCtrl_(obj_, options_ || {});
		f.formTest();

	};

	function formCtrl__(obj, options) {

		this.PID = options.idForm + obj.attr('id');
		this.id = obj.attr('id');
		this.v = obj.attr('type') == 'file' ? obj.value() : jLive.trimAll(obj.value());
		this.vLength = this.v.length;
		this.res = null;

		this.allowedFileType = options.rules[this.id].allowedFileType;
		this.allowedFileSize = options.rules[this.id].allowedFileSize;
		this.pattern = options.rules[this.id].pattern;
		this.valueEqual = options.rules[this.id].valueEqual;
		this.dataRole = options.rules[this.id].role;
		this.dateFormat = options.rules[this.id].dateFormat;
		this.minLength = options.rules[this.id].minLength;
		this.maxLength = options.rules[this.id].maxLength;
		this.dataReq = options.rules[this.id].required;
		this.dataTyp = options.rules[this.id].type;
		this.dataAjxCtrl = options.rules[this.id].ajax;
		this.sync = options.rules[this.id].sync == 1 ? true : false;

		this.styleError = options.style.error || '#ff7270';
		this.styleSuccess = options.style.success || '#ccc';
		this.styleErrorIsClass = !/#\w/.test(this.styleError);
		this.styleSuccessIsClass = !/#\w/.test(this.styleSuccess);

		this.ajaCtrl = function () {
			if (this.dataAjxCtrl == 'true') {

				if (typeof this.PID == 'object') {
					if (this.PID.readyState < 4)
						this.PID.abort();
				}

				if (undefined == options.ajaxProccess)
					jLive.error('ajax control require "ajaxProccess" option');
				options.ajaxProccess.success = options.ajaxProccess.success || function () { };
				options.ajaxProccess.beforeSend = options.ajaxProccess.beforeSend || function () { };
				options.ajaxProccess.error = options.ajaxProccess.error || function () { };

				var init = options.ajaxProccess.init.call(options.ajaxProccess, obj),
					controlFormat = init.dataType ? init.dataType : 'text';

				if (this.sync) {
					// console.log('syn');
					this.PID = new XMLHttpRequest();
					this.PID.open('GET', init.url + '&controlFormat=' + controlFormat, false);
					this.PID.send(null);

					this.PID.res = this.PID.responseText;
					this.PID.is_valid = this.PID.res == 0;

					if (controlFormat == 'xml')
						res = this.PID.responseXML;
					else if (controlFormat == 'json') {
						this.PID.res = JSON.parse(this.PID.responseText);
						// console.log(this.PID.res.cptJlive);
						this.PID.is_valid = this.PID.res.cptJlive == 0;
					}

					// console.log(controlFormat);

					if (this.PID.is_valid) {
						this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
						options.ajaxProccess.success.call(options.ajaxProccess, obj, this.PID.res);
						return { err: false };
					} else {
						this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
						options.ajaxProccess.error.call(options.ajaxProccess, obj, this.PID.res);
						return { err: true, errType: "dataExist" };
					}

				} else {
					// console.log('asyn');

					this.PID = jLive.ajax({

						dataType: init.dataType,
						url: init.url + '&controlFormat=' + controlFormat,
						beforeSend: function () {
							options.ajaxProccess.beforeSend.call(options.ajaxProccess, obj);
						},
						onSuccess: function (data) {
							// console.log(data);
							var is_valid = data == 0;
							if (controlFormat == 'xml')
								is_valid = data.responseXML;
							else if (controlFormat == 'json')
								is_valid = data.cptJlive == 0; // for
							// validate
							// data
							// returned
							// in ajax

							if (is_valid) {
								this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
								options.ajaxProccess.success.call(options.ajaxProccess, obj, data);
							} else {
								this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
								options.ajaxProccess.error.call(options.ajaxProccess, obj, data);
							}
						},
						onError: function (err) {
							alert(err.text);
						}

					});

				}
			}
		}

		this.isFileAllowedType = function (v, type) {
			type = Array.from(type.split(','), e => jLive.trimAll(e));
			if (v.length) {
				for (let index = 0; index < v.length; index++) {
					if (jLive.in_array(jLive.strrchr(v[index].name, '.'), type)) return true;
				}
			} else
				if (jLive.in_array(jLive.strrchr(v.name, '.'), type)) return true;

			return false;
		}


		this.isFileAllowedSize = function (v, s) {
			s = 1048576 * parseFloat(s);

			if (v.length) {
				for (let index = 0; index < v.length; index++) {
					if (v[index].size > s) return false
				}
			} else
				if (v.size > s) return false
			return true;
		}

		this.test = function () {

			//console.log(this.v.length);

			if (this.dataTyp == 'file' && this.dataRole !== 'email' && this.dataRole !== 'url' && this.dataRole !== 'date' && this.dataRole !== 'tel') {

				if (this.dataReq == 'yes') {
					if (this.v.length != 0 && jLive.checkType(this.v) == 'object') {
						if (this.allowedFileType) {
							if (!this.isFileAllowedType(this.v, this.allowedFileType)) {
								this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
								return { err: true, errType: "AllowedType" };
							}
						}
						if (this.allowedFileSize) {
							if (!this.isFileAllowedSize(this.v, this.allowedFileSize)) {
								this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
								return { err: true, errType: "AllowedSize" };
							}
						}
					} else {
						this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
						return { err: true, errType: "EmptyFile" };
					}
				}

				this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
				return { err: false, errType: "" };


			} else if (this.dataTyp == 'alphanumeric' && this.dataRole !== 'email' && this.dataRole !== 'url' && this.dataRole !== 'date' && this.dataRole !== 'tel') {

				if (this.dataReq == 'yes') {
					var pattern = new RegExp(this.pattern, 'i');

					if (this.vLength >= this.minLength && this.vLength <= this.maxLength) {
						if (pattern.test(this.v)) {
							this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
							if (this.dataAjxCtrl == 'true' && this.sync)
								return this.ajaCtrl();
							else
								this.ajaCtrl();
							return { err: false };
						} else {
							return { err: true, errType: "dataType" };
						}
					} else {
						this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
						return { err: true, errType: "dataLength" };
					}
				} else {
					this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
					return { err: false, errType: "" };
				}

			} else if (this.dataTyp == 'letternumeric' && (this.dataRole !== 'email' && this.dataRole !== 'url' && this.dataRole !== 'date' && this.dataRole !== 'tel')) {

				if (this.dataReq == 'yes') {
					if (this.vLength >= this.minLength && this.vLength <= this.maxLength) {
						if (/^[a-z0-9]+$/i.test(this.v)) {
							if (this.dataAjxCtrl == 'true' && this.sync)
								return this.ajaCtrl();
							else
								this.ajaCtrl();
							this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
							return { err: false, errType: "" };
						} else {
							this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
							return { err: true, errType: "dataType" };
						}
					} else {
						this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
						return { err: true, errType: "dataLength" };
					}
				} else {
					this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
					return { err: false, errType: "" };
				}

			} else if (this.dataTyp == 'range' && (this.dataRole !== 'email' && this.dataRole !== 'url' && this.dataRole !== 'date' && this.dataRole !== 'tel')) {

				if (!obj.attr('data-range-set'))
					jLive.error('Warning: range-set is required for field id: ' + obj.attr('id'));

				if (this.dataReq == 'yes') {

					var range = jLive.explode('-', obj.attr('data-range-set')),
						range1 = range[0],
						range2 = range[1],
						is_valid = false;
					if (2 != jLive.count(range))
						jLive.error('Warning: range-set "' + obj.attr('data-range-set') + '" is not a good format for field id: ' + obj.attr('id'));

					if (!isNumberInString(range1) || !isNumberInString(range2)) {

						range1 = jLive.ord(range1);
						range2 = jLive.ord(range2);
						if (range1 > range2)
							jLive.error('Warning: range-set "' + obj.attr('data-range') + '" min value is big than max value for field id: ' + obj.attr('id'));

						for (var i = 0; i < this.vLength; i++) {
							var valueNum = jLive.ord(this.v[i]);
							if (valueNum >= range1 && valueNum <= range2)
								is_valid = true;
							else {
								is_valid = false;
								break;
							}

						};

					} else {
						range1 = jLive.strstr(range1, '.') ? parseFloat(range1) : parseInt(range1);
						range2 = jLive.strstr(range2, '.') ? parseFloat(range2) : parseInt(range2);
						if (range1 > range2)
							jLive.error('Warning: data-range "' + obj.attr('data-range-set') + '" min value is big than max value for field id: ' + obj.attr('id'));

						if (this.v >= range1 && this.v <= range2)
							is_valid = true;
						else
							is_valid = false;
					}

					if (is_valid) {
						this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
						if (this.dataAjxCtrl == 'true' && this.sync)
							return this.ajaCtrl();
						else
							this.ajaCtrl();
						return { err: false };
					} else {
						this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
						return { err: true, errType: "dataRange" };
					}
				} else {
					this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
					return { err: false, errType: "" };
				}

			} else if ((this.dataTyp == 'int' || this.dataTyp == 'number') && (this.dataRole !== 'email' && this.dataRole !== 'url' && this.dataRole !== 'date' && this.dataRole !== 'tel')) {

				if (this.dataReq == 'yes') {
					if (this.vLength >= this.minLength && this.vLength <= this.maxLength) {

						if (/^[0-9]+\.?[0-9]?$/.test(this.v)) {
							this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
							if (this.dataAjxCtrl == 'true' && this.sync)
								return this.ajaCtrl();
							else
								this.ajaCtrl();
							return { err: false };
						} else {
							this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
							return { err: true, errType: "dataType" };
						}
					} else {
						this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
						return { err: true, errType: "dataLength" };
					}
				} else {
					this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
					return { err: false };
				}

			} else if (this.dataTyp == 'letters' && this.dataRole !== 'email' && this.dataRole !== 'url' && this.dataRole !== 'date' && this.dataRole !== 'tel') {

				if (this.dataReq == 'yes') {
					if (this.vLength >= this.minLength && this.vLength <= this.maxLength) {
						if (/^[^0-9]+$/.test(this.v)) {
							this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
							if (this.dataAjxCtrl == 'true' && this.sync)
								return this.ajaCtrl();
							else
								this.ajaCtrl();
							return { err: false };
						} else {
							this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
							return { err: true, errType: "dataType" };
						}
					} else {
						this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
						return { err: true, errType: "dataLength" };
					}
				} else {
					this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
					return { err: false, errType: "dataType" };
				}

			} else if (this.dataRole == 'email') {

				if (this.vLength == 0 && this.dataReq != 'yes') {
					this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
					return { err: false };
				} else {
					if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$/i.test(this.v)) {
						this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
						if (this.dataAjxCtrl == 'true' && this.sync)
							return this.ajaCtrl();
						else
							this.ajaCtrl();
						return { err: false };
					} else {
						this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
						return { err: true, errType: "incorrectFormat" };
					}
				}

			} else if (this.dataRole == 'tel') {

				if (this.vLength == 0 && this.dataReq != 'yes') {
					this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
					if (this.dataAjxCtrl == 'true' && this.sync)
						return this.ajaCtrl();
					else
						this.ajaCtrl();
					return { err: false };
				} else {

					if (/^\+?[0-9]+$/.test(this.v) && this.vLength > 5) {
						this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
						if (this.dataAjxCtrl == 'true' && this.sync)
							return this.ajaCtrl();
						else
							this.ajaCtrl();
						return { err: false };
					} else {
						this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
						return { err: true, errType: "incorrectFormat" };
					}
				}

			} else if (this.dataRole == 'url') {

				if (this.vLength == 0 && this.dataReq != 'yes') {
					this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
					if (this.dataAjxCtrl == 'true' && this.sync)
						return this.ajaCtrl();
					else
						this.ajaCtrl();
					return { err: false };
				} else {

					var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
						'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
						'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
						'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
						'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
						'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

					if (pattern.test(this.v)) {
						this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
						if (this.dataAjxCtrl == 'true' && this.sync)
							return this.ajaCtrl();
						else
							this.ajaCtrl();
						return { err: false };
					} else {
						this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
						return { err: true, errType: "incorrectFormat" };
					}
				}
			} else if (this.valueEqual) {

				let eqToObj = $j(this.valueEqual);
				//console.log(eqToObj);
				if (this.v == eqToObj.value()) {
					this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
					return { err: false };
				} else {
					this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
					return { err: true, errType: "valueNotEqual", equalTo: this.valueEqual, equalToObj: equalTo };
				}

			} else if (this.dataRole == 'date') {

				if (this.vLength == 0 && this.dataReq != 'yes') {
					this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
					if (this.dataAjxCtrl == 'true' && this.sync)
						return this.ajaCtrl();
					else
						this.ajaCtrl();
					return { err: false };
				} else {

					var date,
						dd,
						mm,
						yy,
						h,
						i,
						s,
						patternDate,
						sep = jLive.strstr(this.dateFormat, '-') ? '-' : '/';

					switch (this.dateFormat) {

						case 'yyyy-mm-dd':
						case 'yyyy/mm/dd':

							patternDate = new RegExp('^[0-9]{4}' + sep + '[0-9]{1,2}' + sep + '[0-9]{1,2}$');
							date = jLive.explode(sep, this.v);
							dd = date[2];
							mm = date[1];
							yy = date[0];

							break;
						case 'mm-dd-yyyy':
						case 'mm/dd/yyyy':

							patternDate = new RegExp('^[0-9]{1,2}' + sep + '[0-9]{1,2}' + sep + '[0-9]{4}$');
							date = jLive.explode(sep, this.v);
							dd = date[1];
							mm = date[0];
							yy = date[2];

							break;
						case 'h:i:s':

							patternDate = new RegExp('^[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$');
							date = jLive.explode(':', this.v);
							h = date[0];
							i = date[1];
							s = date[2];

							break;
						case 'h:i':

							patternDate = new RegExp('^[0-9]{1,2}:[0-9]{1,2}$');
							date = jLive.explode(':', this.v);
							h = date[0];
							i = date[1];
							s = 0;

							break;
						default: // dd-mm-yyyy OR dd/mm/yyyy

							patternDate = new RegExp('^[0-9]{1,2}' + sep + '[0-9]{1,2}' + sep + '[0-9]{4}$');
							date = jLive.explode(sep, this.v);
							dd = date[0];
							mm = date[1];
							yy = date[2];

							break;
					}

					if (this.dateFormat == 'h:i' || this.dateFormat == 'h:i:s') {
						if (patternDate.test(this.v) && (h >= 0 && h <= 24) && (i >= 0 && i < 60) && (s >= 0 && s < 60)) {
							this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
							if (this.dataAjxCtrl == 'true' && this.sync)
								return this.ajaCtrl();
							else
								this.ajaCtrl();
							return { err: false };

						} else {
							this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
							return { err: true, errType: "incorrectFormat" };
						}
					} else {

						if (patternDate.test(this.v) && jLive.checkdate(mm, dd, yy)) {

							this.styleSuccessIsClass ? obj.removeClass(this.styleError).addClass(this.styleSuccess) : obj.style('border-color', this.styleSuccess);
							if (this.dataAjxCtrl == 'true' && this.sync)
								return this.ajaCtrl();
							else
								this.ajaCtrl();

							return true;
						} else {
							this.styleErrorIsClass ? obj.removeClass(this.styleSuccess).addClass(this.styleError) : obj.style('border-color', this.styleError);
							return { err: true, errType: "incorrectFormat" };
						}

					}
				}
			} else {
				alert('type or role not exist');
			}

		}

	}

	/*
	 * ! ajax
	 */

	jLive.ajax = function (opts_) {

		function ajaInit(opts) {
			opts.method = opts.method || 'GET';
			opts.sync = (opts.sync != undefined) ? opts.sync : true;
			opts.urlEncode = (opts.urlEncode !== undefined) ? opts.urlEncode : true;
			opts.data = (opts.data && opts.method == 'POST') ? opts.data : null;
			opts.withCredentials = opts.withCredentials || false;
			opts.dataType = opts.dataType || 'text';
			opts.mimeType = opts.mimeType || false;
			opts.timeout = opts.timeout || false;
			opts.cache = (opts.cache != undefined) ? opts.cache : true;
			opts.onSuccess = opts.onSuccess || function () { };
			opts.beforeSend = opts.beforeSend || function () { };
			opts.onError = opts.onError || function () { };
			this.xhr = new XMLHttpRequest();
			var data = '',
				hi = this;

			var dataFormat = function () {
				if (opts.dataType.toLowerCase() == 'json') {
					try {
						return JSON.parse(hi.xhr.responseText);
					} catch (e) {
						opts.onError.call(hi.xhr, {
							'code': 'jL' + 1,
							'text': 'JSON.parse: unexpected character of the JSON data at URL: ' + opts.url
						});
					}
				} else if (opts.dataType == 'xml')
					return jLive.trim(hi.xhr.responseXML);
				else
					return jLive.trim(hi.xhr.responseText);
			};

			this.xhr.open(opts.method, opts.url, opts.sync);
			if (opts.method == 'POST' && window.FormData == undefined)
				this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			if (!opts.cache)
				this.xhr.setRequestHeader("Cache-Control", "no-cache");
			if (opts.mimeType)
				this.xhr.overrideMimeType(opts.mimeType);

			if (opts.data) {
				if ('object' == jLive.checkType(opts.data)) {

					if (window.FormData != undefined) {

						var formData = new FormData();
						console.log('FormData is supported');

						for (let i in opts.data) {
							formData.append(i, opts.data[i]);
						}
						opts.data = formData;
						formData = null;

					} else {

						jLive.foreach(opts.data, function (i, v) {
							v = (opts.urlEncode) ? encodeURIComponent(v) : v;
							data += '&' + i + '=' + v;
						});
						opts.data = jLive.substr(data, 1);

					}
				}
			}

			if (opts.headers) {
				if ('object' == jLive.checkType(opts.headers)) {
					jLive.foreach(opts.headers, function (headName, headValue) {
						hi.xhr.setRequestHeader(headName, headValue);
					});
				} else
					jLive.error('$.ajax expects headers value to be object');
			}

			if (opts.sync)
				hi.xhr.withCredentials = opts.withCredentials;

			opts.beforeSend.call(this.xhr, hi.xhr);

			if (!opts.sync) {
				this.xhr.send(opts.data);
				opts.onSuccess.call(this.xhr, dataFormat(), this.xhr);
				if (opts.timeout)
					clearTimeout(hi.myTimer);
				return this.xhr;
			}

			this.xhr.onreadystatechange = function () {
				if (hi.xhr.readyState == 4 && hi.xhr.status == 200) {

					if (opts.timeout)
						clearTimeout(hi.myTimer);
					opts.onSuccess.call(hi.xhr, dataFormat(), hi.xhr);

				} else if (hi.xhr.readyState == 4 && hi.xhr.status != 200) {
					var statusText = hi.xhr.statusText;
					if (hi.xhr.status == 0)
						statusText = 'XHR aborted';
					opts.onError.call(hi.xhr, {
						'code': hi.xhr.status,
						'text': statusText
					});
				}
			}

			// console.log(opts.data);
			this.xhr.send(opts.data);

			if (opts.timeout) {

				this.myTimer = setTimeout(function () {

					hi.xhr.abort();
					opts.onError.call(hi.xhr, {
						'code': 'jL' + 2,
						'text': 'XHR time out'
					});

				}, opts.timeout);

			}

			return this.xhr;
		}

		return new ajaInit(opts_);

	};

	jLive.relatedTarget = function (e) {
		if (e.type == 'mouseout')
			e.relatedTarget || e.toElement;
		return e.relatedTarget || e.fromElement;
	};

	jLive.preventDefault = function (e) {
		e.returnValue = false;
		if (e.preventDefault) {
			e.preventDefault();
		}
	};

	// -------------------------------------------------------------------
	function indentifierElem(elemQuerie) {
		var nodeName;
		if (!jLive.empty(elemQuerie['id']))
			nodeName = '#' + elemQuerie['id'];
		else if (!jLive.empty(elemQuerie['className']))
			nodeName = '.' + elemQuerie['className'];
		else
			nodeName = elemQuerie['localName'];
		return nodeName;
	}

	function isHidden(el) {
		return (el.style.display == 'none' || el.style.visibility == 'hidden') || ((el.style.display == ' ' && el.style.visibility == ' ') && el.style.opacity == 0);
	}

	function getQuery(selector, context) {
		var query,
			selTyp = jLive.checkType(selector);
		context = context || document;
		if (selTyp === 'string') {

			// console.log(jLive.checkType(context));
			if (jLive.checkType(context) == 'string')
				context = document.querySelector(context);

			if (context.querySelectorAll) {
				query = context.querySelectorAll(selector);
				if (query.length == 0)
					query = query;
			} else {
				if ('undefined' === typeof Sizzle) {
					jLive.error('JLIVE require Sizzle for olds browsers');
				} else {
					query = Sizzle(selector, context);
				}
			}
		} else {
			/*
			 * if (selector.nodeType) query = toNodeList(selector); else query =
			 * selector;
			 */
			query = selector;
		}

		// console.log(query);
		return toNodeList(query);
	}

	function mergeNodeLists(a, b) {
		var slice = Array.prototype.slice;
		return slice.call(a).concat(slice.call(b));
	}

	function toNodeList(elm, context) {

		// IE < #9 don't return nodelist with checkType(), we need to verifie
		// nodetype
		if (jLive.checkType(elm) == 'nodelist' || elm.nodeType != 1)
			return elm;

		var list,
			df;
		context = context // context provided
			|| elm.parentNode; // element's parent

		if (!context && elm.ownerDocument) { // is part of a document
			if (elm === elm.ownerDocument.documentElement || (elm.ownerDocument.constructor && elm.ownerDocument.constructor.name === 'DocumentFragment')) { // is
				// <html>
				// or
				// in a
				// fragment
				context = elm.ownerDocument;
			}
		}

		if (!context) { // still no context?
			df = document.createDocumentFragment();
			df.appendChild(elm);
			list = df.childNodes;
			// df.removeChild(elm); // NodeList is live, removeChild empties it
			return list;
		}
		// selector method
		elm.setAttribute('wrapNodeList', '');
		list = getQuery('[wrapNodeList]', context); //
		elm.removeAttribute('wrapNodeList');
		return list;
	}

	jLive.arrayClone = function (array) {
		var res = [];
		return res.concat(array);
	};

	jLive.getVendorPrefix = function () {
		var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
			someScript = document.getElementsByTagName('script')[0];

		for (var prop in someScript.style) {
			if (regex.test(prop))
				return prop.match(regex)[0];
		}

		// Rien trouvé jusqu'ici? Webkit n'énumère pas sur les propriétés CSS de
		// l'objet de style .
		// Cependant (prop dans le style ) renvoie la valeur correcte , nous
		// aurons donc pour tester
		// la provenence d'une propriété spécifique
		if ('WebkitOpacity' in someScript.style)
			return 'Webkit';
		if ('KhtmlOpacity' in someScript.style)
			return 'Khtml';

		return '';
	}

	jLive.onEvent = function (callback, obj, name) {
		var el = obj.el[0];
		var prefix = jLive.getVendorPrefix().toLowerCase();
		name = jLive.substr(name, 3);
		var nameNoEND = jLive.substr(name, 0, (name.length - 3)).toLowerCase();

		var runOnce = function (e) {
			callback.call(obj, obj);
			e.target.removeEventListener(e.type, runOnce);
		};
		el.addEventListener(prefix + name, runOnce);
		el.addEventListener(name.toLowerCase(), runOnce);
		if ((prefix == '' && !(nameNoEND in s)) || getComputedStyle(el)['-' + prefix + '-' + nameNoEND + '-duration'] == '0s')
			callback.call(obj, obj);

		return obj;
	};

	jLive.array_clear = function (array) {
		while (array.length > 0) {
			array.pop();
		}
	};

	jLive.fn.animate = function (props, options) {
		return jLive.animation(this, props, options);
	};

	jLive.fn.echo = jLive.fn.html = jLive.fn.print = function (txt, s) {

		return jLive.echo(this, txt, s);

	};

	jLive.fn.var_dump = function (expression) {
		// alert(expression);
		// console.log(expression);
		return jLive.echo(this, jLive.var_dump(expression), true);

	};

	jLive.fn.text = function () {

		return jLive.textContent(this.el);

	};

	jLive.fn.raw = function () {
		return jLive.raw(this);
	}

	jLive.fn.style = function (regle, value, callback) {
		if (jLive.checkType(value) == 'function') {
			callback = value;
			value = callback;
		}
		return jLive.style(this, regle, value, callback);
	};

	jLive.fn.attr = function (attrib, value, callback) {
		if (jLive.checkType(value) == 'function') {
			callback = value;
			value = callback;
		}
		return jLive.attrib(this, attrib, value, callback);
	};
	jLive.fn.data = function (attrib, value, callback) {
		if (jLive.checkType(value) == 'function') {
			callback = value;
			value = callback;
		}
		return jLive.attrData(this, attrib, value, callback);
	};

	jLive.fn.removeAttr = function (attrib, callback) {
		return jLive.removeAttrib(this, attrib, callback);
	};

	jLive.fn.getOffset = function (toParent) {
		if (undefined == toParent)
			toParent = false;
		return jLive.offset(this, toParent);
	};

	jLive.echo = function (obj, txt, s) {

		var el = obj.el;

		// console.log();

		if (undefined == txt) {

			return (el[0]) ? el[0].innerHTML : '';

		} else {

			if (s) {

				if (el[0]) {
					jLive.foreach(el, function () {
						this.innerHTML += txt;
					});
				} else
					el.innerHTML += txt;
			} else {
				if (el[0]) {
					jLive.foreach(el, function () {

						this.innerHTML = txt;
					});
				} else
					el.innerHTML = txt;
			}

			return obj;
		}
	};

	jLive.textContent = function (el) {
		if (!el[0])
			return '';
		return el[0].textContent || el[0].innerText || '';
	};

	/* ! variable utilisé par var_dump() et print_r() */
	var nbrBocl_var_dump = 0;
	var nbrBocl2_var_dump = 0;
	/* !--------------- */
	jLive.var_dump = function (expression) {

		if (nbrBocl_var_dump == 0 && expression == undefined) // test
			// expression
			// only for
			// first call
			return jLive.error('Warning: var_dump() expects exactly 1 parameters');

		var text = '<pre>';
		text += jLive.str_pad('', nbrBocl_var_dump, '\t');
		var t = jLive.checkType(expression),
			expressionLen = ('object' == t || t == 'array') ? '<i>(size=' + jLive.count(expression) + ')</i>' : '( )';
		text += '<strong>' + t + '</strong> ' + expressionLen + ' {\n';
		if ('object' == t || t == 'array') {
			nbrBocl_var_dump++;
			jLive.foreach(expression, function (i, val) {
				var fi = (isNumberInString(i)) ? jLive.str_pad('', nbrBocl_var_dump, '\t') + i + " <font color=\"#888a85\">=></font> "
					: jLive.str_pad('', nbrBocl_var_dump, '\t') + "'" + i + "' <font color=\"#888a85\">=></font> ";
				text += fi + jLive.var_dump(val) + '\n';
				nbrBocl2_var_dump = nbrBocl_var_dump - 1;
			});
			nbrBocl_var_dump = nbrBocl2_var_dump;
			text += jLive.str_pad('', jLive.abs(nbrBocl2_var_dump), '\t') + '}';
			return text + '</pre>';
		} else {
			var fexpression = (typeof expression !== 'string') ? ' <font color="#4e9a06">' + expression + "</font> "
				: " <font color=\"#cc0000\">'" + expression + "'</font> <i>(length=" + expression.length + ")</i>";
			return '<small>' + t + '</small>' + fexpression;
		}
	};

	/*
	 * ! ne supportera pas ret, pour avoir l'effet de ret a true, il faut utiler
	 * $(el).print_r() au lieu de $.print_r;
	 */
	jLive.print_r = function (expression) {
		if (expression == undefined)
			return jLive.error('Warning: print_r() expects exactly 1 parameters');
		var t = jLive.checkType(expression),
			text = '' + jLive.ucfirst(t) + ' (\n';
		if ('object' == t || t == 'array') {
			nbrBocl_var_dump++;
			jLive.foreach(expression, function (i, val) {
				var fi;
				text += jLive.str_pad('', nbrBocl_var_dump, '\t') + '[' + i + "] => " + jLive.print_r(val) + '\n';
				nbrBocl2_var_dump = nbrBocl_var_dump - 1;
			});
			nbrBocl_var_dump = nbrBocl2_var_dump;
			text += jLive.str_pad('', jLive.abs(nbrBocl2_var_dump), '\t') + ')';
			return text;
		} else {
			return expression;
		}
	};

	jLive.fn.foreach = function (callback, args) {

		return jLive.foreach(this.el, callback, args);
	};

	jLive.checkType = function (obj) {
		if (obj == null) {
			return String(obj);
		}

		return (typeof obj === "object" || typeof obj === "function") ? classType[__core_toString.call(obj)] || "object" : typeof obj;
	};

	jLive.foreach(("scrollTop scrollLeft scrollHeight").split(" "), function (i, name) {

		jLive.fn[name] = function (pixel) {
			return jLive.scrol(this, name, pixel);
		};
	});

	jLive.foreach(("show hide toggle").split(" "), function (i, name) {

		jLive.fn[name] = function (disMode, effect) {
			effect = effect || false;
			return jLive.showHidden(this, name, disMode, effect);
		};
	});

	jLive.foreach(("clientHeight clientWidth").split(" "), function (i, name) {

		jLive.fn[name] = function (pixel) {
			return jLive.client(this, name);
		};
	});

	jLive.foreach(("clone wrap parent child hasParent remove find next nextElement previousElement width height").split(" "), function (i, name) {

		jLive.fn[name] = function (arg) {
			return jLive.manipElementUtulitaire(this, name, arg);
		};
	});

	jLive.foreach(("addClass removeClass toggleClass hasClass").split(" "), function (i, name) {

		jLive.fn[name] = function (classnames, callback) {
			if (jLive.checkType(classnames) != 'string' && jLive.checkType(classnames) != 'array')
				jLive.error('class names must to be only string or array');
			return jLive.manipClass(this, classnames, callback, name);
		};
	});

	jLive.foreach("RadioNodeList Boolean Number String Function Array Date RegExp Object Error NodeList Window".split(" "), function (i, name) {
		classType["[object " + name + "]"] = name.toLowerCase();
	});




	/*
	.append() inserts the content specified by the parameter, to the end of each element in the set of matched elements, as in
	$(Append_To_This).append(The_Content_Given_Here);

	while .appendTo() works the other way around: it insert every element in the set of matched elements to the end of the target given in the parameter, as in
	$(The_Content_Given_Here).appendTo(Append_To_This);
	*/


	jLive.foreach(("append prepend after before").split(" "), function (i, name) {

		jLive.fn[name] = function (html) {
			return jLive.elementInserting(html, this, name);
		};
	});
	jLive.foreach(("appendTo prependTo insertBefore insertAfter").split(" "), function (i, name) {

		jLive.fn[name] = function (html) {
			return jLive.domManipIns(html, this, name);
		};
	});

	//Deprecated: replaced by animationend animationiteration animationstart
	jLive.foreach(("CssAnimationEnd CssTransitionEnd").split(" "), function (i, name) {

		jLive.fn[name] = function (callback) {
			callback = callback || function () { };
			return jLive.onEvent(callback, this, name);
		};
	});

	jLive.fn.formControl = function (options) {
		return jLive.formCtrl(this, options);
	};

	/* form will be depreacated */
	jLive.foreach(("value form formValue checked disabled readonly selected").split(" "), function (i, name) {

		jLive.fn[name] = function (text) {
			return jLive.formHandler(text, this, name);
		};
	});

	jLive.foreach(("animationend animationiteration animationstart blur focus contextmenu ready load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error").split(" "), function (i, name) {

			// Handle event binding
			jLive.fn[name] = function (callback) {
				// alert(callback);
				callback = callback || false;

				if (!callback) {
					if (!this.el[0]) {
						this[name]();
					} else {
						jLive.foreach(this.el, function () {
							this[name]();
						});
					}
					return;
				}
				return jLive.trigger(this, name, callback);
			};
		});

	jLive.fn.removeEvent = function (evt, fct) {

		return jLive.removeEvent_(evt, fct, this);
	};
	jLive.fn.hasEvent = function (evt, fct) {

		return jLive.hasEvent_(evt, fct, this);
	};

	jLive.foreach('objectToArray arrayToObject'.split(' '), function () {
		// alert(this);
		jLive[this] = function (data) {
			var tdata = jLive.checkType(data);
			if (tdata == 'object') {
				var ret = [];
				jLive.foreach(data, function () {
					ret.push(this);
				});
			} else {
				var ret = {};
				jLive.foreach(data, function (i, v) {
					ret[i] = v;
				});
			}

			return ret;
		}
	});

	function stylePropRender(prop) {
		var cProp = prop;
		return prop.replace(/-[a-z]/ig, function (str, index) {
			var ret;
			if (index == 0 && cProp.substr(0, 3) == '-ms')
				ret = cProp[1];
			else
				ret = prop.charAt(index + 1).toUpperCase();

			return ret;
		});
	}

	var defaultDelta = {

		linear: function (progress) {
			return progress;
		},

		back: function (progress, x) {
			x = x || 1.5;
			return Math.pow(progress, 2) * ((x + 1) * progress - x);
		},

		quad: function (progress) {
			return Math.pow(progress, 2);
		},

		quint: function (progress) {
			return Math.pow(progress, 5);
		},

		sine: function (p) {
			return 1 - Math.cos(p * Math.PI / 2);
		},

		elastic: function (progress, x) {
			x = x || 1.5;
			return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
		},

		bounce: function (progress) {
			for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
				if (progress >= (7 - 4 * a) / 11) {
					return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
				}
			}
		},

		swing: function (progress) {
			return 0.5 - Math.cos(progress * Math.PI) / 2;
		},

		circ: function (progress) {
			return 1 - Math.sin(Math.acos(progress));
		},

		easeOut: function (progress, delta) {
			return function (progress) {
				return 1 - defaultDelta[delta](1 - progress);
			}
				(progress);
		},

		easeInOut: function (progress, delta) {
			return function (progress) {
				if (progress < .5)
					return defaultDelta[delta](2 * progress) / 2;
				else
					return (2 - defaultDelta[delta](2 * (1 - progress))) / 2;
			}
				(progress);
		}

	};

	// fusionne la valeur de deux tableaux ayant les meme clef a la difference
	// de array_merge();
	function arrayMergeLike(arr1, arr2) {
		var ret = arr1,
			key = "";
		for (key in arr2) {
			if (typeof arr1[key] === 'object' && typeof arr2[key] === 'object') {
				arrayMergeLike(arr1[key], arr2[key]);
			} else {
				if (jLive.array_key_exists(key, arr1)) {
					var cv = arr1[key];
					arr1[key] = [];
					arr1[key].push(cv);
					arr1[key].push(arr2[key]);
				} else {
					arr1[key] = arr2[key];
				}
			}
		}
		return ret;
	}

	function parserHTML(html) {
		if (jLive.isJliveObject(html)) {
			html = html.el;
		}
		this.html = html;
		this.elem = {};
		var
			evenTag = /<([a-z0-9]+)\s*(.*?)\s*>(.*)<\/\s*[a-z0-9]+\s*>/i,
			oddTag = /<([a-z0-9]+)\s*(.*?)\s*\/?>/i,
			tagAttr = /[\s\S]+?\s*?=\s*?"[\s\S]+?"/g;
		this.tagType = evenTag.exec(this.html) ? 'evenTag' : 'oddTag';
		this.elemArr = evenTag.exec(this.html) || oddTag.exec(this.html);

		this.htmlTagInfo = function () {
			this.elem.tagName = RegExp.$1;
			this.elem.content = RegExp.$3;
			this.elem.attrList = RegExp.$2;
			this.elem.attrList = this.elem.attrList.match(tagAttr);
			return this.elem;
		};

		this.isHTMLTag = function () {
			return this.elemArr !== null;
		}
	}

	function isArraylike(obj) {
		var length = obj.length,
			checkType = jLive.checkType(obj);
		if (jLive.isWindow(obj)) {
			return false;
		}
		if (obj.nodeType === 1 && length) {
			return true;
		}

		return checkType === "array" || checkType === "nodelist" || checkType !== "function" && (length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj);
	}

	function GetZoomFactor() {
		// always return 1, except at non-default zoom levels in IE before
		// version 8
		// http://help.dottoro.com/ljcjgrml.php
		var factor = 1;
		if (document.body.getBoundingClientRect) {
			// rect is only in physical pixel size in IE before version 8
			var rect = document.body.getBoundingClientRect();
			var physicalW = rect.right - rect.left;
			var logicalW = document.body.offsetWidth;

			// the zoom level is always an integer percent value
			factor = Math.round((physicalW / logicalW) * 100) / 100;
		}
		return factor;
	}


	function getParent(el, arg) {
		arg = arg || false;
		var elId = arg ? jLive.substr(arg, 1) : '';
		while (el = el.parentNode) {
			if (arg) {

				if (/\..+/.test(arg) && el.nodeType === 1 && new RegExp('(\\s|^)' + elId + '(\\s|$)').test(el.className))
					return el;
				else if (/#.+/.test(arg) && el.nodeType === 1 && el.id == elId)
					return el;
				else if (el.nodeType === 1 && el[arg])
					return el;

			} else {
				if (el.nodeType === 1) {
					return el;
				}
			}
		}
		return false;
	}

	function getNextElementSibling(el, arg) {
		arg = arg || false;
		var elId = arg ? jLive.substr(arg, 1) : '';
		while (el = el.nextSibling) {
			if (arg) {

				if (/\..+/.test(arg) && el.nodeType === 1 && el.className == elId)
					return el;
				else if (/#.+/.test(arg) && el.nodeType === 1 && el.id == elId)
					return el;
				else if (el.nodeType === 1 && el[arg])
					return el;

			} else {
				if (el.nodeType === 1) {
					return el;
				}
			}
		}
		return false;
	}

	function getPreviousElementSibling(el, arg) {
		arg = arg || false;
		var elId = arg ? jLive.substr(arg, 1) : '';
		while (el = el.previousSibling) {
			if (arg) {

				if (/\..+/.test(arg) && el.nodeType === 1 && el.className == elId)
					return el;
				else if (/#.+/.test(arg) && el.nodeType === 1 && el.id == elId)
					return el;
				else if (el.nodeType === 1 && el[arg])
					return el;

			} else {
				if (el.nodeType === 1) {
					return el;
				}
			}
		}
		return false;
	}

	function dateFormat(f, t) {

		switch (f) {
			/*
			 * ! jour et mois en text
			 */
			case 'txt_month':
				return ['January', 'February', 'March', 'April', 'May', 'June',
					'July', 'August', 'September', 'October', 'November',
					'December']
				break;
			case 'txt_day':
				return ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur']
				break;
			/*
			 * ! Jour --- ---
			 */
			// jour du mois sur 2 chiffre(01 à 31)
			case 'd':
				return jLive.str_pad(t.getDate(), 2, 0, STR_PAD_LEFT);
				break;
			case 'D':
				// Jour de la semaine, en trois lettres (et en anglais): Mon à Sun
				return dateFormat('txt_day', 0)[t.getDay()].substr(0, 3);
				break;
			case 'j':
				// Jour du mois sans les zéros initiaux; 1..31
				return t.getDate();
				break;
			case 'l':
				// Jour de la semaine, textuel, version longue, en anglais:
				// Monday...Sunday
				return dateFormat('txt_day', 0)[t.getDay()] + 'day';
				break;
			case 'N':
				// Représentation numérique ISO-8601 du jour de la semaine:
				// 1[Mon]..7[Sun]
				return jLive.array_flip(dateFormat('txt_day', 0))[dateFormat('D', t)];
				break;
			case 'S':
				// Suffixe ordinal d'un nombre pour le jour du mois, en anglais, sur
				// deux lettres: st, nd, rd ou th.
				var j = dateFormat('j', t),
					i = j % 10;
				if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {
					i = 0;
				}
				return ['st', 'nd', 'rd'][i - 1] || 'th';
				break;
			case 'w':
				// Jour de la semaine au format numérique: 0[Sun]..6[Sat]
				return t.getDay();
				break;
			case 'z':
				// Jour de l'année: 0..365
				var a = new Date(dateFormat('Y', t), dateFormat('n', t) - 1,
					dateFormat('j', t));
				var b = new Date(dateFormat('Y', t), 0, 1);
				return Math.round((a - b) / 864e5);
				break;

			/*
			 * ! Semaine --- ---
			 */
			case 'W': // a tester
				// Numéro de semaine dans l'année ISO-8601, les semaines commencent
				// le lundi: ex. 42 (la 42ème semaine de l'année)
				var a = new Date(dateFormat('Y', t), dateFormat('n', t) - 1,
					dateFormat('j', t) - dateFormat('N', t) + 4);
				var b = new Date(a.getFullYear(), 0, 4);
				return jLive.str_pad(1 + Math.round((a - b) / 864e5 / 7), 2, 0,
					STR_PAD_LEFT);
				break;

			/*
			 * ! Mois --- ---
			 */
			case 'F':
				// Mois, textuel, version longue; en anglais, comme January ou
				// December
				return dateFormat('txt_month', 0)[dateFormat('n', t) - 1];
				break;
			case 'm':
				// Mois au format numérique, avec zéros initiaux: 01...12
				return jLive.str_pad(dateFormat('n', t), 2, 0, STR_PAD_LEFT);
				break;
			case 'M':
				// Mois, en trois lettres, en anglais Jan à Dec
				return dateFormat('F', t).substr(0, 3);
				break;
			case 'n':
				// Mois sans les zéros initiaux: 1...12
				return t.getMonth() + 1;
				break;
			case 't':
				// Nombre de jours dans le mois: 28...31
				return (new Date(dateFormat('Y', t), dateFormat('n', t), 0))
					.getDate();
				break;

			/*
			 * ! Année --- ---
			 */
			case 'L':
				// Est ce que l'année est bissextile?: 1 si bissextile, 0 sinon.
				var j = dateFormat('Y', t);
				return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
				break;
			case 'o':
				/*
				 * L'année ISO-8601. C'est la même valeur que Y, excepté que si le
				 * numéro de la semaine ISO (W) appartient à l'année précédente ou
				 * suivante, cette année sera utilisé à la place.
				 */
				var n = dateFormat('n', t);
				var W = dateFormat('W', t);
				var Y = dateFormat('Y', t);
				return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
				break;
			case 'Y':
				// Année sur 4 chiffres e.g. 1980...2010
				return t.getFullYear();
				break;
			case 'y':
				// Année sur 2 chiffres: 00...99
				return dateFormat('Y', t).toString().substr(-2);
				break;

			/*
			 * ! Heure --- ---
			 */
			case 'a':
				// Ante meridiem et Post meridiem en minuscules: am ou pm
				return t.getHours() > 11 ? 'pm' : 'am';
				break;
			case 'A':
				// Ante meridiem et Post meridiem en minuscules: AM or PM
				return dateFormat('a', t).toUpperCase();
			case 'B':
				// Heure Internet Swatch : 000..999
				return jLive.str_pad(Math
					.floor(((t.getUTCHours() * 36e2) + (t.getUTCMinutes() * 60)
						+ t.getUTCSeconds() + 36e2) / 86.4) % 1e3, 3, 0,
					STR_PAD_LEFT);
				break;
			case 'g':
				// Heure, au format 12h, sans les zéros initiaux: 1..12
				return dateFormat('G', t) % 12 || 12;
				break;
			case 'G':
				// Heure, au format 24h, sans les zéros initiaux 0..23
				return t.getHours();
				break;
			case 'h':
				// Heure, au format 12h, avec les zéros initiaux: 01..12
				return jLive.str_pad(dateFormat('g', t), 2, 0, STR_PAD_LEFT);
				break;
			case 'H':
				// Heure, au format 24h, avec les zéros initiaux : 00..23
				return jLive.str_pad(dateFormat('G', t), 2, 0, STR_PAD_LEFT);
				break;
			case 'i':
				// Minutes avec les zéros initiaux: 00..59
				return jLive.str_pad(t.getMinutes(), 2, 0, STR_PAD_LEFT);
				break;
			case 's':
				// Secondes, avec zéros initiaux: 00..59
				return jLive.str_pad(t.getSeconds(), 2, 0, STR_PAD_LEFT);
				break;
			case 'u':
				// Microsecondes: 000000-999000
				return jLive
					.str_pad(t.getMilliseconds() * 1000, 6, 0, STR_PAD_LEFT);
				break;

			/*
			 * ! Fuseau horaire --- ---
			 */

			case 'e': // en cours(L'identifiant du fuseau horaire est trop vaste)
				// L'identifiant du fuseau horaire : Exemples : UTC, GMT,
				// Atlantic/Azores
				throw 'Not supported';
				break;
			case 'I': // a tester
				// L'heure d'été est activée ou pas : 1 si oui, 0 sinon.
				// Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
				// If they are not equal, then DST is observed.

				var a = new Date(dateFormat('Y', t), 0);
				// Jan 1
				var c = Date.UTC(dateFormat('Y', t), 0);
				// Jan 1 UTC
				var b = new Date(dateFormat('Y', t), 6);
				// Jul 1
				// Jul 1 UTC
				var d = Date.UTC(dateFormat('Y', t), 6);
				return ((a - c) !== (b - d)) ? 1 : 0;
				break;
			case 'O':
				// // Différence d'heures avec l'heure de Greenwich (GMT), exprimée
				// en heures: +0200
				var ecart = t.getTimezoneOffset();
				var a = Math.abs(ecart);
				return (ecart > 0 ? '-' : '+')
					+ jLive.str_pad(Math.floor(a / 60) * 100 + a % 60, 4, 0,
						STR_PAD_LEFT);
				break;
			case 'P':
				// Différence avec l'heure Greenwich (GMT) avec un deux-points entre
				// les heures et les minutes: +02:00
				var O = dateFormat('O', t);
				return (O.substr(0, 3) + ':' + O.substr(3, 2));
				break;
			case 'T': // en cours(L'identifiant du fuseau horaire est trop vaste)
				// Abréviation du fuseau horaire: EST, MDT, ...
				return 'UTC';

			case 'Z':
				// Décalage horaire en secondes. Le décalage des zones à l'ouest de
				// la zone UTC est négative, et à l'est, il est positif:
				// (-43200...50400)
				return -t.getTimezoneOffset() * 60;

			/*
			 * ! Date et Heure complète --- ---
			 */
			case 'c':
				// Date au format ISO 8601: 2004-02-12T15:19:21+00:00
				return dateFormat('Y', t) + '-' + dateFormat('m', t) + '-'
					+ dateFormat('d', t) + 'T' + dateFormat('H', t) + ':'
					+ dateFormat('i', t) + ':' + dateFormat('s', t) + ':'
					+ dateFormat('P', t);
				break;
			case 'r':
				// Format de date » RFC 2822 Thu, 21 Dec 2000 16:01:07 +0200 D, d M
				// Y H:i:s O
				return dateFormat('D', t) + ', ' + dateFormat('d', t) + ' '
					+ dateFormat('M', t) + ' ' + ' ' + dateFormat('Y', t) + ' '
					+ dateFormat('H', t) + ':' + dateFormat('i', t) + ':'
					+ dateFormat('s', t) + ':' + dateFormat('O', t);
				break;
			case 'U':
				// Secondes depuis l'époque Unix (1er Janvier 1970, 0h00 00s GMT)
				return t / 1000 | 0;
				break;
			default:
				return f;
				break;
		}
	}

	function isNumberInString(str) {
		str = jLive.settype(str, 'string');
		var charCode,
			i = 0,
			isnumber;

		for (; i < str.length; i++) {
			charCode = str.charCodeAt(i);
			isnumber = (charCode >= 48 && charCode <= 57) || (str[i] == '.' && /[0-9]+\.[0-9]/.test(str));
			if (!isnumber) {
				return false;
			}
		}

		return true;
	}

	/* ! pour strnatcmp */
	function isWhitespaceChar(a) {
		var charCode;
		charCode = a.charCodeAt(0);

		if (charCode <= 32) {
			return true;
		} else {
			return false;
		}
	}

	function isDigitChar(a) {
		a = jLive.settype(a, 'string');
		var charCode;
		charCode = a.charCodeAt(0);

		if (charCode >= 48 && charCode <= 57) {
			return true;
		} else {
			return false;
		}
	}

	function stringToBoolean(string) {

		string = jLive.settype(string, 'string');
		switch (string.toLowerCase().trim()) {
			case "true":
			case "yes":
			case "1":
				return true;
			case "false":
			case "no":
			case "0":
			case 'null':
				return false;
			default:
				return Boolean(string);
		}
	}

	function compareRight(a, b) {
		var bias = 0;
		var ia = 0;
		var ib = 0;

		var ca;
		var cb;

		// The longest run of digits wins. That aside, the greatest
		// value wins, but we can't know that it will until we've scanned
		// both numbers to know that they have the same magnitude, so we
		// remember it in BIAS.
		for (; ; ia++, ib++) {
			ca = a.charAt(ia);
			cb = b.charAt(ib);

			if (!isDigitChar(ca) && !isDigitChar(cb)) {
				return bias;
			} else if (!isDigitChar(ca)) {
				return -1;
			} else if (!isDigitChar(cb)) {
				return +1;
			} else if (ca < cb) {
				if (bias == 0) {
					bias = -1;
				}
			} else if (ca > cb) {
				if (bias == 0)
					bias = +1;
			} else if (ca == 0 && cb == 0) {
				return bias;
			}
		}
	}
	/* ! fin pour strnatcmp */

	function getPageName() {
		var
			pathName = window.location.toString(),
			pageName = "";

		if (pathName.indexOf("/") != -1) {
			pageName = pathName.split("/").pop();
		} else {
			pageName = pathName;
		}

		return pageName;
	}

	window.$_GET = jLive.parse_str(jLive.substr(jLive.strstr(getPageName(), '?'), 1) || getPageName(), true);

	window.jLive = window.$j = jLive;

})(window);
//SweetAlert
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Sweetalert2=t()}(this,function(){"use strict";const t="SweetAlert2:",y=e=>e.charAt(0).toUpperCase()+e.slice(1),i=e=>Array.prototype.slice.call(e),a=e=>{console.warn("".concat(t," ").concat("object"==typeof e?e.join(" "):e))},v=e=>{console.error("".concat(t," ").concat(e))},n=[],o=(e,t)=>{e='"'.concat(e,'" is deprecated and will be removed in the next major release. Please use "').concat(t,'" instead.'),n.includes(e)||(n.push(e),a(e))},w=e=>"function"==typeof e?e():e,C=e=>e&&"function"==typeof e.toPromise,k=e=>C(e)?e.toPromise():Promise.resolve(e),A=e=>e&&Promise.resolve(e)===e,r={title:"",titleText:"",text:"",html:"",footer:"",icon:void 0,iconColor:void 0,iconHtml:void 0,template:void 0,toast:!1,showClass:{popup:"swal2-show",backdrop:"swal2-backdrop-show",icon:"swal2-icon-show"},hideClass:{popup:"swal2-hide",backdrop:"swal2-backdrop-hide",icon:"swal2-icon-hide"},customClass:{},target:"body",color:void 0,backdrop:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1,preConfirm:void 0,preDeny:void 0,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:void 0,denyButtonText:"No",denyButtonAriaLabel:"",denyButtonColor:void 0,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:void 0,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusDeny:!1,focusCancel:!1,returnFocus:!0,showCloseButton:!1,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",loaderHtml:"",showLoaderOnConfirm:!1,showLoaderOnDeny:!1,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:"",timer:void 0,timerProgressBar:!1,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:"",inputLabel:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:!1,validationMessage:void 0,grow:!1,position:"center",progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,willOpen:void 0,didOpen:void 0,didRender:void 0,willClose:void 0,didClose:void 0,didDestroy:void 0,scrollbarPadding:!0},s=["allowEscapeKey","allowOutsideClick","background","buttonsStyling","cancelButtonAriaLabel","cancelButtonColor","cancelButtonText","closeButtonAriaLabel","closeButtonHtml","color","confirmButtonAriaLabel","confirmButtonColor","confirmButtonText","currentProgressStep","customClass","denyButtonAriaLabel","denyButtonColor","denyButtonText","didClose","didDestroy","footer","hideClass","html","icon","iconColor","iconHtml","imageAlt","imageHeight","imageUrl","imageWidth","preConfirm","preDeny","progressSteps","returnFocus","reverseButtons","showCancelButton","showCloseButton","showConfirmButton","showDenyButton","text","title","titleText","willClose"],c={},P=["allowOutsideClick","allowEnterKey","backdrop","focusConfirm","focusDeny","focusCancel","returnFocus","heightAuto","keydownListenerCapture"],B=e=>Object.prototype.hasOwnProperty.call(r,e),x=e=>-1!==s.indexOf(e),E=e=>c[e],T=e=>{!e.backdrop&&e.allowOutsideClick&&a('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');for(const n in e)t=n,B(t)||a('Unknown parameter "'.concat(t,'"')),e.toast&&(t=n,P.includes(t)&&a('The parameter "'.concat(t,'" is incompatible with toasts'))),t=n,E(t)&&o(t,E(t));var t};var e=e=>{const t={};for(const n in e)t[e[n]]="swal2-"+e[n];return t};const p=e(["container","shown","height-auto","iosfix","popup","modal","no-backdrop","no-transition","toast","toast-shown","show","hide","close","title","html-container","actions","confirm","deny","cancel","default-outline","footer","icon","icon-content","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","input-label","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loader","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl","timer-progress-bar","timer-progress-bar-container","scrollbar-measure","icon-success","icon-warning","icon-info","icon-question","icon-error"]),S=e(["success","warning","info","question","error"]),m=()=>document.body.querySelector(".".concat(p.container)),L=e=>{const t=m();return t?t.querySelector(e):null},O=e=>L(".".concat(e)),g=()=>O(p.popup),j=()=>O(p.icon),M=()=>O(p.title),D=()=>O(p["html-container"]),I=()=>O(p.image),H=()=>O(p["progress-steps"]),q=()=>O(p["validation-message"]),V=()=>L(".".concat(p.actions," .").concat(p.confirm)),N=()=>L(".".concat(p.actions," .").concat(p.deny));const R=()=>L(".".concat(p.loader)),F=()=>L(".".concat(p.actions," .").concat(p.cancel)),U=()=>O(p.actions),W=()=>O(p.footer),z=()=>O(p["timer-progress-bar"]),_=()=>O(p.close),K=()=>{const e=i(g().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort((e,t)=>{e=parseInt(e.getAttribute("tabindex")),t=parseInt(t.getAttribute("tabindex"));return t<e?1:e<t?-1:0});var t=i(g().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter(e=>"-1"!==e.getAttribute("tabindex"));return(t=>{const n=[];for(let e=0;e<t.length;e++)-1===n.indexOf(t[e])&&n.push(t[e]);return n})(e.concat(t)).filter(e=>ce(e))},Y=()=>!$(document.body,p["toast-shown"])&&!$(document.body,p["no-backdrop"]),Z=()=>g()&&$(g(),p.toast);function J(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];const n=z();ce(n)&&(t&&(n.style.transition="none",n.style.width="100%"),setTimeout(()=>{n.style.transition="width ".concat(e/1e3,"s linear"),n.style.width="0%"},10))}const X={previousBodyPadding:null},l=(t,e)=>{if(t.textContent="",e){const n=new DOMParser,o=n.parseFromString(e,"text/html");i(o.querySelector("head").childNodes).forEach(e=>{t.appendChild(e)}),i(o.querySelector("body").childNodes).forEach(e=>{t.appendChild(e)})}},$=(t,e)=>{if(!e)return!1;var n=e.split(/\s+/);for(let e=0;e<n.length;e++)if(!t.classList.contains(n[e]))return!1;return!0},G=(t,n)=>{i(t.classList).forEach(e=>{Object.values(p).includes(e)||Object.values(S).includes(e)||Object.values(n.showClass).includes(e)||t.classList.remove(e)})},Q=(e,t,n)=>{if(G(e,t),t.customClass&&t.customClass[n]){if("string"!=typeof t.customClass[n]&&!t.customClass[n].forEach)return a("Invalid type of customClass.".concat(n,'! Expected string or iterable object, got "').concat(typeof t.customClass[n],'"'));u(e,t.customClass[n])}},ee=(e,t)=>{if(!t)return null;switch(t){case"select":case"textarea":case"file":return e.querySelector(".".concat(p.popup," > .").concat(p[t]));case"checkbox":return e.querySelector(".".concat(p.popup," > .").concat(p.checkbox," input"));case"radio":return e.querySelector(".".concat(p.popup," > .").concat(p.radio," input:checked"))||e.querySelector(".".concat(p.popup," > .").concat(p.radio," input:first-child"));case"range":return e.querySelector(".".concat(p.popup," > .").concat(p.range," input"));default:return e.querySelector(".".concat(p.popup," > .").concat(p.input))}},te=e=>{var t;e.focus(),"file"!==e.type&&(t=e.value,e.value="",e.value=t)},ne=(e,t,n)=>{e&&t&&(t="string"==typeof t?t.split(/\s+/).filter(Boolean):t).forEach(t=>{Array.isArray(e)?e.forEach(e=>{n?e.classList.add(t):e.classList.remove(t)}):n?e.classList.add(t):e.classList.remove(t)})},u=(e,t)=>{ne(e,t,!0)},oe=(e,t)=>{ne(e,t,!1)},ie=(e,t)=>{var n=i(e.childNodes);for(let e=0;e<n.length;e++)if($(n[e],t))return n[e]},ae=(e,t,n)=>{(n=n==="".concat(parseInt(n))?parseInt(n):n)||0===parseInt(n)?e.style[t]="number"==typeof n?"".concat(n,"px"):n:e.style.removeProperty(t)},d=function(e){e.style.display=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"flex"},h=e=>{e.style.display="none"},re=(e,t,n,o)=>{const i=e.querySelector(t);i&&(i.style[n]=o)},se=(e,t,n)=>{t?d(e,n):h(e)},ce=e=>!(!e||!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)),le=()=>!ce(V())&&!ce(N())&&!ce(F()),ue=e=>!!(e.scrollHeight>e.clientHeight),de=e=>{const t=window.getComputedStyle(e);var e=parseFloat(t.getPropertyValue("animation-duration")||"0"),n=parseFloat(t.getPropertyValue("transition-duration")||"0");return 0<e||0<n},pe=()=>"undefined"==typeof window||"undefined"==typeof document,me=100,f={},ge=()=>{f.previousActiveElement&&f.previousActiveElement.focus?(f.previousActiveElement.focus(),f.previousActiveElement=null):document.body&&document.body.focus()},he=o=>new Promise(e=>{if(!o)return e();var t=window.scrollX,n=window.scrollY;f.restoreFocusTimeout=setTimeout(()=>{ge(),e()},me),window.scrollTo(t,n)}),fe='\n <div aria-labelledby="'.concat(p.title,'" aria-describedby="').concat(p["html-container"],'" class="').concat(p.popup,'" tabindex="-1">\n   <button type="button" class="').concat(p.close,'"></button>\n   <ul class="').concat(p["progress-steps"],'"></ul>\n   <div class="').concat(p.icon,'"></div>\n   <img class="').concat(p.image,'" />\n   <h2 class="').concat(p.title,'" id="').concat(p.title,'"></h2>\n   <div class="').concat(p["html-container"],'" id="').concat(p["html-container"],'"></div>\n   <input class="').concat(p.input,'" />\n   <input type="file" class="').concat(p.file,'" />\n   <div class="').concat(p.range,'">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="').concat(p.select,'"></select>\n   <div class="').concat(p.radio,'"></div>\n   <label for="').concat(p.checkbox,'" class="').concat(p.checkbox,'">\n     <input type="checkbox" />\n     <span class="').concat(p.label,'"></span>\n   </label>\n   <textarea class="').concat(p.textarea,'"></textarea>\n   <div class="').concat(p["validation-message"],'" id="').concat(p["validation-message"],'"></div>\n   <div class="').concat(p.actions,'">\n     <div class="').concat(p.loader,'"></div>\n     <button type="button" class="').concat(p.confirm,'"></button>\n     <button type="button" class="').concat(p.deny,'"></button>\n     <button type="button" class="').concat(p.cancel,'"></button>\n   </div>\n   <div class="').concat(p.footer,'"></div>\n   <div class="').concat(p["timer-progress-bar-container"],'">\n     <div class="').concat(p["timer-progress-bar"],'"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g,""),be=()=>{const e=m();return!!e&&(e.remove(),oe([document.documentElement,document.body],[p["no-backdrop"],p["toast-shown"],p["has-column"]]),!0)},ye=()=>{f.currentInstance.resetValidationMessage()},ve=()=>{const e=g(),t=ie(e,p.input),n=ie(e,p.file),o=e.querySelector(".".concat(p.range," input")),i=e.querySelector(".".concat(p.range," output")),a=ie(e,p.select),r=e.querySelector(".".concat(p.checkbox," input")),s=ie(e,p.textarea);t.oninput=ye,n.onchange=ye,a.onchange=ye,r.onchange=ye,s.oninput=ye,o.oninput=()=>{ye(),i.value=o.value},o.onchange=()=>{ye(),o.nextSibling.value=o.value}},we=e=>"string"==typeof e?document.querySelector(e):e,Ce=e=>{const t=g();t.setAttribute("role",e.toast?"alert":"dialog"),t.setAttribute("aria-live",e.toast?"polite":"assertive"),e.toast||t.setAttribute("aria-modal","true")},ke=e=>{"rtl"===window.getComputedStyle(e).direction&&u(m(),p.rtl)},Ae=(e,t)=>{if(e instanceof HTMLElement)t.appendChild(e);else if("object"==typeof e){var n=e,o=t;if(n.jquery)Pe(o,n);else l(o,n.toString())}else e&&l(t,e)},Pe=(t,n)=>{if(t.textContent="",0 in n)for(let e=0;e in n;e++)t.appendChild(n[e].cloneNode(!0));else t.appendChild(n.cloneNode(!0))},Be=(()=>{if(pe())return!1;var e=document.createElement("div"),t={WebkitAnimation:"webkitAnimationEnd",animation:"animationend"};for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&void 0!==e.style[n])return t[n];return!1})(),xe=(e,t)=>{var n,o,i,a,r,s=U(),c=R();(t.showConfirmButton||t.showDenyButton||t.showCancelButton?d:h)(s),Q(s,t,"actions"),s=s,n=c,o=t,i=V(),a=N(),r=F(),Ee(i,"confirm",o),Ee(a,"deny",o),Ee(r,"cancel",o),function(e,t,n,o){if(!o.buttonsStyling)return oe([e,t,n],p.styled);u([e,t,n],p.styled),o.confirmButtonColor&&(e.style.backgroundColor=o.confirmButtonColor,u(e,p["default-outline"]));o.denyButtonColor&&(t.style.backgroundColor=o.denyButtonColor,u(t,p["default-outline"]));o.cancelButtonColor&&(n.style.backgroundColor=o.cancelButtonColor,u(n,p["default-outline"]))}(i,a,r,o),o.reverseButtons&&(o.toast?(s.insertBefore(r,i),s.insertBefore(a,i)):(s.insertBefore(r,n),s.insertBefore(a,n),s.insertBefore(i,n))),l(c,t.loaderHtml),Q(c,t,"loader")};function Ee(e,t,n){se(e,n["show".concat(y(t),"Button")],"inline-block"),l(e,n["".concat(t,"ButtonText")]),e.setAttribute("aria-label",n["".concat(t,"ButtonAriaLabel")]),e.className=p[t],Q(e,n,"".concat(t,"Button")),u(e,n["".concat(t,"ButtonClass")])}const Te=(e,t)=>{var n,o,i=m();i&&(o=i,"string"==typeof(n=t.backdrop)?o.style.background=n:n||u([document.documentElement,document.body],p["no-backdrop"]),o=i,(n=t.position)in p?u(o,p[n]):(a('The "position" parameter is not valid, defaulting to "center"'),u(o,p.center)),n=i,!(o=t.grow)||"string"!=typeof o||(o="grow-".concat(o))in p&&u(n,p[o]),Q(i,t,"container"))};var b={awaitingPromise:new WeakMap,promise:new WeakMap,innerParams:new WeakMap,domCache:new WeakMap};const Se=["input","file","range","select","radio","checkbox","textarea"],Le=(e,r)=>{const s=g();var t,e=b.innerParams.get(e);const c=!e||r.input!==e.input;Se.forEach(e=>{var t=p[e];const n=ie(s,t);{var o=r.inputAttributes;const i=ee(g(),e);if(i){Oe(i);for(const a in o)i.setAttribute(a,o[a])}}n.className=t,c&&h(n)}),r.input&&(c&&(e=>{if(!Ie[e.input])return v('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(e.input,'"'));const t=De(e.input),n=Ie[e.input](t,e);d(n),setTimeout(()=>{te(n)})})(r),e=r,t=De(e.input),e.customClass&&u(t,e.customClass.input))},Oe=t=>{for(let e=0;e<t.attributes.length;e++){var n=t.attributes[e].name;["type","value","style"].includes(n)||t.removeAttribute(n)}},je=(e,t)=>{e.placeholder&&!t.inputPlaceholder||(e.placeholder=t.inputPlaceholder)},Me=(e,t,n)=>{if(n.inputLabel){e.id=p.input;const i=document.createElement("label");var o=p["input-label"];i.setAttribute("for",e.id),i.className=o,u(i,n.customClass.inputLabel),i.innerText=n.inputLabel,t.insertAdjacentElement("beforebegin",i)}},De=e=>{e=p[e]||p.input;return ie(g(),e)},Ie={},He=(Ie.text=Ie.email=Ie.password=Ie.number=Ie.tel=Ie.url=(e,t)=>("string"==typeof t.inputValue||"number"==typeof t.inputValue?e.value=t.inputValue:A(t.inputValue)||a('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(typeof t.inputValue,'"')),Me(e,e,t),je(e,t),e.type=t.input,e),Ie.file=(e,t)=>(Me(e,e,t),je(e,t),e),Ie.range=(e,t)=>{const n=e.querySelector("input"),o=e.querySelector("output");return n.value=t.inputValue,n.type=t.input,o.value=t.inputValue,Me(n,e,t),e},Ie.select=(e,t)=>{if(e.textContent="",t.inputPlaceholder){const n=document.createElement("option");l(n,t.inputPlaceholder),n.value="",n.disabled=!0,n.selected=!0,e.appendChild(n)}return Me(e,e,t),e},Ie.radio=e=>(e.textContent="",e),Ie.checkbox=(e,t)=>{const n=ee(g(),"checkbox");n.value="1",n.id=p.checkbox,n.checked=Boolean(t.inputValue);var o=e.querySelector("span");return l(o,t.inputPlaceholder),e},Ie.textarea=(n,e)=>{n.value=e.inputValue,je(n,e),Me(n,n,e);return setTimeout(()=>{if("MutationObserver"in window){const t=parseInt(window.getComputedStyle(g()).width);new MutationObserver(()=>{var e=n.offsetWidth+(e=n,parseInt(window.getComputedStyle(e).marginLeft)+parseInt(window.getComputedStyle(e).marginRight));e>t?g().style.width="".concat(e,"px"):g().style.width=null}).observe(n,{attributes:!0,attributeFilter:["style"]})}}),n},(e,t)=>{const n=D();Q(n,t,"htmlContainer"),t.html?(Ae(t.html,n),d(n,"block")):t.text?(n.textContent=t.text,d(n,"block")):h(n),Le(e,t)}),qe=(e,t)=>{var n=W();se(n,t.footer),t.footer&&Ae(t.footer,n),Q(n,t,"footer")},Ve=(e,t)=>{const n=_();l(n,t.closeButtonHtml),Q(n,t,"closeButton"),se(n,t.showCloseButton),n.setAttribute("aria-label",t.closeButtonAriaLabel)},Ne=(e,t)=>{var e=b.innerParams.get(e),n=j();return e&&t.icon===e.icon?(ze(n,t),void Re(n,t)):t.icon||t.iconHtml?t.icon&&-1===Object.keys(S).indexOf(t.icon)?(v('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(t.icon,'"')),h(n)):(d(n),ze(n,t),Re(n,t),void u(n,t.showClass.icon)):h(n)},Re=(e,t)=>{for(const n in S)t.icon!==n&&oe(e,S[n]);u(e,S[t.icon]),_e(e,t),Fe(),Q(e,t,"icon")},Fe=()=>{const e=g();var t=window.getComputedStyle(e).getPropertyValue("background-color");const n=e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");for(let e=0;e<n.length;e++)n[e].style.backgroundColor=t},Ue='\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n',We='\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n',ze=(e,t)=>{var n;e.textContent="",t.iconHtml?l(e,Ke(t.iconHtml)):"success"===t.icon?l(e,Ue):"error"===t.icon?l(e,We):(n={question:"?",warning:"!",info:"i"},l(e,Ke(n[t.icon])))},_e=(e,t)=>{if(t.iconColor){e.style.color=t.iconColor,e.style.borderColor=t.iconColor;for(const n of[".swal2-success-line-tip",".swal2-success-line-long",".swal2-x-mark-line-left",".swal2-x-mark-line-right"])re(e,n,"backgroundColor",t.iconColor);re(e,".swal2-success-ring","borderColor",t.iconColor)}},Ke=e=>'<div class="'.concat(p["icon-content"],'">').concat(e,"</div>"),Ye=(e,t)=>{const n=I();if(!t.imageUrl)return h(n);d(n,""),n.setAttribute("src",t.imageUrl),n.setAttribute("alt",t.imageAlt),ae(n,"width",t.imageWidth),ae(n,"height",t.imageHeight),n.className=p.image,Q(n,t,"image")},Ze=(e,o)=>{const i=H();if(!o.progressSteps||0===o.progressSteps.length)return h(i);d(i),i.textContent="",o.currentProgressStep>=o.progressSteps.length&&a("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),o.progressSteps.forEach((e,t)=>{e=e,n=document.createElement("li"),u(n,p["progress-step"]),l(n,e);var n,e=n;i.appendChild(e),t===o.currentProgressStep&&u(e,p["active-progress-step"]),t!==o.progressSteps.length-1&&(n=(e=>{const t=document.createElement("li");return u(t,p["progress-step-line"]),e.progressStepsDistance&&(t.style.width=e.progressStepsDistance),t})(o),i.appendChild(n))})},Je=(e,t)=>{const n=M();se(n,t.title||t.titleText,"block"),t.title&&Ae(t.title,n),t.titleText&&(n.innerText=t.titleText),Q(n,t,"title")},Xe=(e,t)=>{var n=m();const o=g();t.toast?(ae(n,"width",t.width),o.style.width="100%",o.insertBefore(R(),j())):ae(o,"width",t.width),ae(o,"padding",t.padding),t.color&&(o.style.color=t.color),t.background&&(o.style.background=t.background),h(q());n=o;(n.className="".concat(p.popup," ").concat(ce(n)?t.showClass.popup:""),t.toast)?(u([document.documentElement,document.body],p["toast-shown"]),u(n,p.toast)):u(n,p.modal);Q(n,t,"popup"),"string"==typeof t.customClass&&u(n,t.customClass);t.icon&&u(n,p["icon-".concat(t.icon)])},$e=(e,t)=>{Xe(e,t),Te(e,t),Ze(e,t),Ne(e,t),Ye(e,t),Je(e,t),Ve(e,t),He(e,t),xe(e,t),qe(e,t),"function"==typeof t.didRender&&t.didRender(g())},Ge=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"}),Qe=()=>{const e=i(document.body.children);e.forEach(e=>{e===m()||e.contains(m())||(e.hasAttribute("aria-hidden")&&e.setAttribute("data-previous-aria-hidden",e.getAttribute("aria-hidden")),e.setAttribute("aria-hidden","true"))})},et=()=>{const e=i(document.body.children);e.forEach(e=>{e.hasAttribute("data-previous-aria-hidden")?(e.setAttribute("aria-hidden",e.getAttribute("data-previous-aria-hidden")),e.removeAttribute("data-previous-aria-hidden")):e.removeAttribute("aria-hidden")})},tt=["swal-title","swal-html","swal-footer"],nt=e=>{const n={};return i(e.querySelectorAll("swal-param")).forEach(e=>{lt(e,["name","value"]);var t=e.getAttribute("name"),e=e.getAttribute("value");"boolean"==typeof r[t]&&"false"===e&&(n[t]=!1),"object"==typeof r[t]&&(n[t]=JSON.parse(e))}),n},ot=e=>{const n={};return i(e.querySelectorAll("swal-button")).forEach(e=>{lt(e,["type","color","aria-label"]);var t=e.getAttribute("type");n["".concat(t,"ButtonText")]=e.innerHTML,n["show".concat(y(t),"Button")]=!0,e.hasAttribute("color")&&(n["".concat(t,"ButtonColor")]=e.getAttribute("color")),e.hasAttribute("aria-label")&&(n["".concat(t,"ButtonAriaLabel")]=e.getAttribute("aria-label"))}),n},it=e=>{const t={},n=e.querySelector("swal-image");return n&&(lt(n,["src","width","height","alt"]),n.hasAttribute("src")&&(t.imageUrl=n.getAttribute("src")),n.hasAttribute("width")&&(t.imageWidth=n.getAttribute("width")),n.hasAttribute("height")&&(t.imageHeight=n.getAttribute("height")),n.hasAttribute("alt")&&(t.imageAlt=n.getAttribute("alt"))),t},at=e=>{const t={},n=e.querySelector("swal-icon");return n&&(lt(n,["type","color"]),n.hasAttribute("type")&&(t.icon=n.getAttribute("type")),n.hasAttribute("color")&&(t.iconColor=n.getAttribute("color")),t.iconHtml=n.innerHTML),t},rt=e=>{const n={},t=e.querySelector("swal-input");t&&(lt(t,["type","label","placeholder","value"]),n.input=t.getAttribute("type")||"text",t.hasAttribute("label")&&(n.inputLabel=t.getAttribute("label")),t.hasAttribute("placeholder")&&(n.inputPlaceholder=t.getAttribute("placeholder")),t.hasAttribute("value")&&(n.inputValue=t.getAttribute("value")));e=e.querySelectorAll("swal-input-option");return e.length&&(n.inputOptions={},i(e).forEach(e=>{lt(e,["value"]);var t=e.getAttribute("value"),e=e.innerHTML;n.inputOptions[t]=e})),n},st=(e,t)=>{const n={};for(const o in t){const i=t[o],a=e.querySelector(i);a&&(lt(a,[]),n[i.replace(/^swal-/,"")]=a.innerHTML.trim())}return n},ct=e=>{const t=tt.concat(["swal-param","swal-button","swal-image","swal-icon","swal-input","swal-input-option"]);i(e.children).forEach(e=>{e=e.tagName.toLowerCase();-1===t.indexOf(e)&&a("Unrecognized element <".concat(e,">"))})},lt=(t,n)=>{i(t.attributes).forEach(e=>{-1===n.indexOf(e.name)&&a(['Unrecognized attribute "'.concat(e.name,'" on <').concat(t.tagName.toLowerCase(),">."),"".concat(n.length?"Allowed attributes are: ".concat(n.join(", ")):"To set the value, use HTML within the element.")])})};var ut={email:(e,t)=>/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid email address"),url:(e,t)=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid URL")};function dt(e){(t=e).inputValidator||Object.keys(ut).forEach(e=>{t.input===e&&(t.inputValidator=ut[e])}),e.showLoaderOnConfirm&&!e.preConfirm&&a("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"),(n=e).target&&("string"!=typeof n.target||document.querySelector(n.target))&&("string"==typeof n.target||n.target.appendChild)||(a('Target parameter is not valid, defaulting to "body"'),n.target="body"),"string"==typeof e.title&&(e.title=e.title.split("\n").join("<br />"));var t,n=e,e=be();if(pe())v("SweetAlert2 requires document to initialize");else{const o=document.createElement("div"),i=(o.className=p.container,e&&u(o,p["no-transition"]),l(o,fe),we(n.target));i.appendChild(o),Ce(n),ke(i),ve()}}class pt{constructor(e,t){this.callback=e,this.remaining=t,this.running=!1,this.start()}start(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}stop(){return this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=(new Date).getTime()-this.started.getTime()),this.remaining}increase(e){var t=this.running;return t&&this.stop(),this.remaining+=e,t&&this.start(),this.remaining}getTimerLeft(){return this.running&&(this.stop(),this.start()),this.remaining}isRunning(){return this.running}}const mt=()=>{null===X.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(X.previousBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight="".concat(X.previousBodyPadding+(()=>{const e=document.createElement("div");e.className=p["scrollbar-measure"],document.body.appendChild(e);var t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t})(),"px"))},gt=()=>{null!==X.previousBodyPadding&&(document.body.style.paddingRight="".concat(X.previousBodyPadding,"px"),X.previousBodyPadding=null)},ht=()=>{var e=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream||"MacIntel"===navigator.platform&&1<navigator.maxTouchPoints;if(e&&!$(document.body,p.iosfix)){var t,e=document.body.scrollTop;document.body.style.top="".concat(-1*e,"px"),u(document.body,p.iosfix);{const n=m();let t;n.ontouchstart=e=>{t=ft(e)},n.ontouchmove=e=>{t&&(e.preventDefault(),e.stopPropagation())}}{const o=navigator.userAgent,i=!!o.match(/iPad/i)||!!o.match(/iPhone/i),a=!!o.match(/WebKit/i),r=i&&a&&!o.match(/CriOS/i);r&&(t=44,g().scrollHeight>window.innerHeight-44&&(m().style.paddingBottom="".concat(44,"px")))}}},ft=e=>{var t,n=e.target,o=m();return!((t=e).touches&&t.touches.length&&"stylus"===t.touches[0].touchType||(t=e).touches&&1<t.touches.length)&&(n===o||!(ue(o)||"INPUT"===n.tagName||"TEXTAREA"===n.tagName||ue(D())&&D().contains(n)))},bt=()=>{var e;$(document.body,p.iosfix)&&(e=parseInt(document.body.style.top,10),oe(document.body,p.iosfix),document.body.style.top="",document.body.scrollTop=-1*e)},yt=10,vt=e=>{const t=g();if(e.target===t){const n=m();t.removeEventListener(Be,vt),n.style.overflowY="auto"}},wt=(e,t)=>{Be&&de(t)?(e.style.overflowY="hidden",t.addEventListener(Be,vt)):e.style.overflowY="auto"},Ct=(e,t,n)=>{ht(),t&&"hidden"!==n&&mt(),setTimeout(()=>{e.scrollTop=0})},kt=(e,t,n)=>{u(e,n.showClass.backdrop),t.style.setProperty("opacity","0","important"),d(t,"grid"),setTimeout(()=>{u(t,n.showClass.popup),t.style.removeProperty("opacity")},yt),u([document.documentElement,document.body],p.shown),n.heightAuto&&n.backdrop&&!n.toast&&u([document.documentElement,document.body],p["height-auto"])},At=e=>{let t=g();t||new vn,t=g();var n=R();if(Z())h(j());else{var o=t;const i=U(),a=R();!e&&ce(V())&&(e=V());d(i),e&&(h(e),a.setAttribute("data-button-to-replace",e.className));a.parentNode.insertBefore(a,e),u([o,i],p.loading)}d(n),t.setAttribute("data-loading",!0),t.setAttribute("aria-busy",!0),t.focus()},Pt=(t,n)=>{const o=g(),i=e=>xt[n.input](o,Et(e),n);C(n.inputOptions)||A(n.inputOptions)?(At(V()),k(n.inputOptions).then(e=>{t.hideLoading(),i(e)})):"object"==typeof n.inputOptions?i(n.inputOptions):v("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(typeof n.inputOptions))},Bt=(t,n)=>{const o=t.getInput();h(o),k(n.inputValue).then(e=>{o.value="number"===n.input?parseFloat(e)||0:"".concat(e),d(o),o.focus(),t.hideLoading()}).catch(e=>{v("Error in inputValue promise: ".concat(e)),o.value="",d(o),o.focus(),t.hideLoading()})},xt={select:(e,t,i)=>{const a=ie(e,p.select),r=(e,t,n)=>{const o=document.createElement("option");o.value=n,l(o,t),o.selected=Tt(n,i.inputValue),e.appendChild(o)};t.forEach(e=>{var t=e[0];const n=e[1];if(Array.isArray(n)){const o=document.createElement("optgroup");o.label=t,o.disabled=!1,a.appendChild(o),n.forEach(e=>r(o,e[1],e[0]))}else r(a,n,t)}),a.focus()},radio:(e,t,a)=>{const r=ie(e,p.radio),n=(t.forEach(e=>{var t=e[0],e=e[1];const n=document.createElement("input"),o=document.createElement("label"),i=(n.type="radio",n.name=p.radio,n.value=t,Tt(t,a.inputValue)&&(n.checked=!0),document.createElement("span"));l(i,e),i.className=p.label,o.appendChild(n),o.appendChild(i),r.appendChild(o)}),r.querySelectorAll("input"));n.length&&n[0].focus()}},Et=n=>{const o=[];return"undefined"!=typeof Map&&n instanceof Map?n.forEach((e,t)=>{let n=e;"object"==typeof n&&(n=Et(n)),o.push([t,n])}):Object.keys(n).forEach(e=>{let t=n[e];"object"==typeof t&&(t=Et(t)),o.push([e,t])}),o},Tt=(e,t)=>t&&t.toString()===e.toString(),St=(e,t)=>{var n=b.innerParams.get(e);if(!n.input)return v('The "input" parameter is needed to be set when using returnInputValueOn'.concat(y(t)));var o=((e,t)=>{const n=e.getInput();if(!n)return null;switch(t.input){case"checkbox":return n.checked?1:0;case"radio":return(o=n).checked?o.value:null;case"file":return(o=n).files.length?null!==o.getAttribute("multiple")?o.files:o.files[0]:null;default:return t.inputAutoTrim?n.value.trim():n.value}var o})(e,n);if(n.inputValidator){var i=e;var a=o;var r=t;const s=b.innerParams.get(i),c=(i.disableInput(),Promise.resolve().then(()=>k(s.inputValidator(a,s.validationMessage))));c.then(e=>{i.enableButtons(),i.enableInput(),e?i.showValidationMessage(e):("deny"===r?Lt:Mt)(i,a)})}else e.getInput().checkValidity()?("deny"===t?Lt:Mt)(e,o):(e.enableButtons(),e.showValidationMessage(n.validationMessage))},Lt=(t,n)=>{const e=b.innerParams.get(t||void 0);if(e.showLoaderOnDeny&&At(N()),e.preDeny){b.awaitingPromise.set(t||void 0,!0);const o=Promise.resolve().then(()=>k(e.preDeny(n,e.validationMessage)));o.then(e=>{!1===e?t.hideLoading():t.closePopup({isDenied:!0,value:void 0===e?n:e})}).catch(e=>jt(t||void 0,e))}else t.closePopup({isDenied:!0,value:n})},Ot=(e,t)=>{e.closePopup({isConfirmed:!0,value:t})},jt=(e,t)=>{e.rejectPromise(t)},Mt=(t,n)=>{const e=b.innerParams.get(t||void 0);if(e.showLoaderOnConfirm&&At(),e.preConfirm){t.resetValidationMessage(),b.awaitingPromise.set(t||void 0,!0);const o=Promise.resolve().then(()=>k(e.preConfirm(n,e.validationMessage)));o.then(e=>{ce(q())||!1===e?t.hideLoading():Ot(t,void 0===e?n:e)}).catch(e=>jt(t||void 0,e))}else Ot(t,n)},Dt=(n,e,o)=>{e.popup.onclick=()=>{var e,t=b.innerParams.get(n);t&&((e=t).showConfirmButton||e.showDenyButton||e.showCancelButton||e.showCloseButton||t.timer||t.input)||o(Ge.close)}};let It=!1;const Ht=t=>{t.popup.onmousedown=()=>{t.container.onmouseup=function(e){t.container.onmouseup=void 0,e.target===t.container&&(It=!0)}}},qt=t=>{t.container.onmousedown=()=>{t.popup.onmouseup=function(e){t.popup.onmouseup=void 0,e.target!==t.popup&&!t.popup.contains(e.target)||(It=!0)}}},Vt=(n,o,i)=>{o.container.onclick=e=>{var t=b.innerParams.get(n);It?It=!1:e.target===o.container&&w(t.allowOutsideClick)&&i(Ge.backdrop)}};const Nt=()=>V()&&V().click();const Rt=(e,t,n)=>{const o=K();if(o.length)return(t+=n)===o.length?t=0:-1===t&&(t=o.length-1),o[t].focus();g().focus()},Ft=["ArrowRight","ArrowDown"],Ut=["ArrowLeft","ArrowUp"],Wt=(e,n,o)=>{var i=b.innerParams.get(e);if(i)if(i.stopKeydownPropagation&&n.stopPropagation(),"Enter"===n.key)e=e,a=n,t=i,w(t.allowEnterKey)&&!a.isComposing&&a.target&&e.getInput()&&a.target.outerHTML===e.getInput().outerHTML&&(["textarea","file"].includes(t.input)||(Nt(),a.preventDefault()));else if("Tab"!==n.key){if([...Ft,...Ut].includes(n.key)){e=n.key;const s=V(),c=N(),d=F();if([s,c,d].includes(document.activeElement)){var t=Ft.includes(e)?"nextElementSibling":"previousElementSibling";const l=document.activeElement[t];l instanceof HTMLElement&&l.focus()}}else if("Escape"===n.key){var a=n,e=i;if(w(e.allowEscapeKey)){a.preventDefault();o(Ge.esc)}}}else{e=n;o=i;var u=e.target,r=K();let t=-1;for(let e=0;e<r.length;e++)if(u===r[e]){t=e;break}e.shiftKey?Rt(o,t,-1):Rt(o,t,1);e.stopPropagation(),e.preventDefault()}},zt=e=>"object"==typeof e&&e.jquery,_t=e=>e instanceof Element||zt(e);const Kt=()=>{if(f.timeout){{const n=z();var e=parseInt(window.getComputedStyle(n).width),t=(n.style.removeProperty("transition"),n.style.width="100%",parseInt(window.getComputedStyle(n).width)),e=e/t*100;n.style.removeProperty("transition"),n.style.width="".concat(e,"%")}return f.timeout.stop()}},Yt=()=>{var e;if(f.timeout)return e=f.timeout.start(),J(e),e};let Zt=!1;const Jt={};const Xt=t=>{for(let e=t.target;e&&e!==document;e=e.parentNode)for(const o in Jt){var n=e.getAttribute(o);if(n)return void Jt[o].fire({template:n})}};e=Object.freeze({isValidParameter:B,isUpdatableParameter:x,isDeprecatedParameter:E,argsToParams:n=>{const o={};return"object"!=typeof n[0]||_t(n[0])?["title","html","icon"].forEach((e,t)=>{t=n[t];"string"==typeof t||_t(t)?o[e]=t:void 0!==t&&v("Unexpected type of ".concat(e,'! Expected "string" or "Element", got ').concat(typeof t))}):Object.assign(o,n[0]),o},isVisible:()=>ce(g()),clickConfirm:Nt,clickDeny:()=>N()&&N().click(),clickCancel:()=>F()&&F().click(),getContainer:m,getPopup:g,getTitle:M,getHtmlContainer:D,getImage:I,getIcon:j,getInputLabel:()=>O(p["input-label"]),getCloseButton:_,getActions:U,getConfirmButton:V,getDenyButton:N,getCancelButton:F,getLoader:R,getFooter:W,getTimerProgressBar:z,getFocusableElements:K,getValidationMessage:q,isLoading:()=>g().hasAttribute("data-loading"),fire:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return new this(...t)},mixin:function(n){class e extends this{_main(e,t){return super._main(e,Object.assign({},n,t))}}return e},showLoading:At,enableLoading:At,getTimerLeft:()=>f.timeout&&f.timeout.getTimerLeft(),stopTimer:Kt,resumeTimer:Yt,toggleTimer:()=>{var e=f.timeout;return e&&(e.running?Kt:Yt)()},increaseTimer:e=>{if(f.timeout)return e=f.timeout.increase(e),J(e,!0),e},isTimerRunning:()=>f.timeout&&f.timeout.isRunning(),bindClickHandler:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"data-swal-template";Jt[e]=this,Zt||(document.body.addEventListener("click",Xt),Zt=!0)}});function $t(){var e,t=b.innerParams.get(this);if(t){const n=b.domCache.get(this);h(n.loader),Z()?t.icon&&d(j()):(t=n,(e=t.popup.getElementsByClassName(t.loader.getAttribute("data-button-to-replace"))).length?d(e[0],"inline-block"):le()&&h(t.actions)),oe([n.popup,n.actions],p.loading),n.popup.removeAttribute("aria-busy"),n.popup.removeAttribute("data-loading"),n.confirmButton.disabled=!1,n.denyButton.disabled=!1,n.cancelButton.disabled=!1}}var Gt={swalPromiseResolve:new WeakMap,swalPromiseReject:new WeakMap};function Qt(e,t,n,o){Z()?on(e,o):(he(n).then(()=>on(e,o)),f.keydownTarget.removeEventListener("keydown",f.keydownHandler,{capture:f.keydownListenerCapture}),f.keydownHandlerAdded=!1),/^((?!chrome|android).)*safari/i.test(navigator.userAgent)?(t.setAttribute("style","display:none !important"),t.removeAttribute("class"),t.innerHTML=""):t.remove(),Y()&&(gt(),bt(),et()),oe([document.documentElement,document.body],[p.shown,p["height-auto"],p["no-backdrop"],p["toast-shown"]])}function en(e){e=void 0!==(n=e)?Object.assign({isConfirmed:!1,isDenied:!1,isDismissed:!1},n):{isConfirmed:!1,isDenied:!1,isDismissed:!0};const t=Gt.swalPromiseResolve.get(this);var n=(e=>{const t=g();if(!t)return false;const n=b.innerParams.get(e);if(!n||$(t,n.hideClass.popup))return false;oe(t,n.showClass.popup),u(t,n.hideClass.popup);const o=m();return oe(o,n.showClass.backdrop),u(o,n.hideClass.backdrop),nn(e,t,n),true})(this);this.isAwaitingPromise()?e.isDismissed||(tn(this),t(e)):n&&t(e)}const tn=e=>{e.isAwaitingPromise()&&(b.awaitingPromise.delete(e),b.innerParams.get(e)||e._destroy())},nn=(e,t,n)=>{var o,i,a,r=m(),s=Be&&de(t);"function"==typeof n.willClose&&n.willClose(t),s?(s=e,o=t,t=r,i=n.returnFocus,a=n.didClose,f.swalCloseEventFinishedCallback=Qt.bind(null,s,t,i,a),o.addEventListener(Be,function(e){e.target===o&&(f.swalCloseEventFinishedCallback(),delete f.swalCloseEventFinishedCallback)})):Qt(e,r,n.returnFocus,n.didClose)},on=(e,t)=>{setTimeout(()=>{"function"==typeof t&&t.bind(e.params)(),e._destroy()})};function an(e,t,n){const o=b.domCache.get(e);t.forEach(e=>{o[e].disabled=n})}function rn(e,t){if(!e)return!1;if("radio"===e.type){const n=e.parentNode.parentNode,o=n.querySelectorAll("input");for(let e=0;e<o.length;e++)o[e].disabled=t}else e.disabled=t}const sn=e=>{e.isAwaitingPromise()?(cn(b,e),b.awaitingPromise.set(e,!0)):(cn(Gt,e),cn(b,e))},cn=(e,t)=>{for(const n in e)e[n].delete(t)};var ln=Object.freeze({hideLoading:$t,disableLoading:$t,getInput:function(e){var t=b.innerParams.get(e||this);return(e=b.domCache.get(e||this))?ee(e.popup,t.input):null},close:en,isAwaitingPromise:function(){return!!b.awaitingPromise.get(this)},rejectPromise:function(e){const t=Gt.swalPromiseReject.get(this);tn(this),t&&t(e)},closePopup:en,closeModal:en,closeToast:en,enableButtons:function(){an(this,["confirmButton","denyButton","cancelButton"],!1)},disableButtons:function(){an(this,["confirmButton","denyButton","cancelButton"],!0)},enableInput:function(){return rn(this.getInput(),!1)},disableInput:function(){return rn(this.getInput(),!0)},showValidationMessage:function(e){const t=b.domCache.get(this);var n=b.innerParams.get(this);l(t.validationMessage,e),t.validationMessage.className=p["validation-message"],n.customClass&&n.customClass.validationMessage&&u(t.validationMessage,n.customClass.validationMessage),d(t.validationMessage);const o=this.getInput();o&&(o.setAttribute("aria-invalid",!0),o.setAttribute("aria-describedby",p["validation-message"]),te(o),u(o,p.inputerror))},resetValidationMessage:function(){var e=b.domCache.get(this);e.validationMessage&&h(e.validationMessage);const t=this.getInput();t&&(t.removeAttribute("aria-invalid"),t.removeAttribute("aria-describedby"),oe(t,p.inputerror))},getProgressSteps:function(){return b.domCache.get(this).progressSteps},update:function(e){var t=g(),n=b.innerParams.get(this);if(!t||$(t,n.hideClass.popup))return a("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");t=(t=>{const n={};return Object.keys(t).forEach(e=>{if(x(e))n[e]=t[e];else a('Invalid parameter to update: "'.concat(e,'". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js\n\nIf you think this parameter should be updatable, request it here: https://github.com/sweetalert2/sweetalert2/issues/new?template=02_feature_request.md'))}),n})(e),n=Object.assign({},n,t),$e(this,n),b.innerParams.set(this,n),Object.defineProperties(this,{params:{value:Object.assign({},this.params,e),writable:!1,enumerable:!0}})},_destroy:function(){var e=b.domCache.get(this);const t=b.innerParams.get(this);t?(e.popup&&f.swalCloseEventFinishedCallback&&(f.swalCloseEventFinishedCallback(),delete f.swalCloseEventFinishedCallback),f.deferDisposalTimer&&(clearTimeout(f.deferDisposalTimer),delete f.deferDisposalTimer),"function"==typeof t.didDestroy&&t.didDestroy(),e=this,sn(e),delete e.params,delete f.keydownHandler,delete f.keydownTarget,delete f.currentInstance):sn(this)}});let un;class dn{constructor(){if("undefined"!=typeof window){un=this;for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var o=Object.freeze(this.constructor.argsToParams(t)),o=(Object.defineProperties(this,{params:{value:o,writable:!1,enumerable:!0,configurable:!0}}),this._main(this.params));b.promise.set(this,o)}}_main(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=(T(Object.assign({},t,e)),f.currentInstance&&(f.currentInstance._destroy(),Y()&&et()),f.currentInstance=this,mn(e,t)),t=(dt(e),Object.freeze(e),f.timeout&&(f.timeout.stop(),delete f.timeout),clearTimeout(f.restoreFocusTimeout),gn(this));return $e(this,e),b.innerParams.set(this,e),pn(this,t,e)}then(e){const t=b.promise.get(this);return t.then(e)}finally(e){const t=b.promise.get(this);return t.finally(e)}}const pn=(l,u,d)=>new Promise((e,t)=>{const n=e=>{l.closePopup({isDismissed:!0,dismiss:e})};var o,i,a;Gt.swalPromiseResolve.set(l,e),Gt.swalPromiseReject.set(l,t),u.confirmButton.onclick=()=>{var e=l,t=b.innerParams.get(e);e.disableButtons(),t.input?St(e,"confirm"):Mt(e,!0)},u.denyButton.onclick=()=>{var e=l,t=b.innerParams.get(e);e.disableButtons(),t.returnInputValueOnDeny?St(e,"deny"):Lt(e,!1)},u.cancelButton.onclick=()=>{var e=l,t=n;e.disableButtons(),t(Ge.cancel)},u.closeButton.onclick=()=>n(Ge.close),e=l,t=u,a=n,b.innerParams.get(e).toast?Dt(e,t,a):(Ht(t),qt(t),Vt(e,t,a)),o=l,e=f,t=d,i=n,e.keydownTarget&&e.keydownHandlerAdded&&(e.keydownTarget.removeEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!1),t.toast||(e.keydownHandler=e=>Wt(o,e,i),e.keydownTarget=t.keydownListenerCapture?window:g(),e.keydownListenerCapture=t.keydownListenerCapture,e.keydownTarget.addEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!0),a=l,"select"===(t=d).input||"radio"===t.input?Pt(a,t):["text","email","number","tel","textarea"].includes(t.input)&&(C(t.inputValue)||A(t.inputValue))&&(At(V()),Bt(a,t));{var r=d;const s=m(),c=g();"function"==typeof r.willOpen&&r.willOpen(c),e=window.getComputedStyle(document.body).overflowY,kt(s,c,r),setTimeout(()=>{wt(s,c)},yt),Y()&&(Ct(s,r.scrollbarPadding,e),Qe()),Z()||f.previousActiveElement||(f.previousActiveElement=document.activeElement),"function"==typeof r.didOpen&&setTimeout(()=>r.didOpen(c)),oe(s,p["no-transition"])}hn(f,d,n),fn(u,d),setTimeout(()=>{u.container.scrollTop=0})}),mn=(e,t)=>{var n=(e=>{e="string"==typeof e.template?document.querySelector(e.template):e.template;if(!e)return{};e=e.content,ct(e),e=Object.assign(nt(e),ot(e),it(e),at(e),rt(e),st(e,tt));return e})(e);const o=Object.assign({},r,t,n,e);return o.showClass=Object.assign({},r.showClass,o.showClass),o.hideClass=Object.assign({},r.hideClass,o.hideClass),o},gn=e=>{var t={popup:g(),container:m(),actions:U(),confirmButton:V(),denyButton:N(),cancelButton:F(),loader:R(),closeButton:_(),validationMessage:q(),progressSteps:H()};return b.domCache.set(e,t),t},hn=(e,t,n)=>{var o=z();h(o),t.timer&&(e.timeout=new pt(()=>{n("timer"),delete e.timeout},t.timer),t.timerProgressBar&&(d(o),Q(o,t,"timerProgressBar"),setTimeout(()=>{e.timeout&&e.timeout.running&&J(t.timer)})))},fn=(e,t)=>{if(!t.toast)return w(t.allowEnterKey)?void(bn(e,t)||Rt(t,-1,1)):yn()},bn=(e,t)=>t.focusDeny&&ce(e.denyButton)?(e.denyButton.focus(),!0):t.focusCancel&&ce(e.cancelButton)?(e.cancelButton.focus(),!0):!(!t.focusConfirm||!ce(e.confirmButton))&&(e.confirmButton.focus(),!0),yn=()=>{document.activeElement instanceof HTMLElement&&"function"==typeof document.activeElement.blur&&document.activeElement.blur()},vn=(Object.assign(dn.prototype,ln),Object.assign(dn,e),Object.keys(ln).forEach(e=>{dn[e]=function(){if(un)return un[e](...arguments)}}),dn.DismissReason=Ge,dn.version="11.4.0",dn);return vn.default=vn,vn}),void 0!==this&&this.Sweetalert2&&(this.swal=this.sweetAlert=this.Swal=this.SweetAlert=this.Sweetalert2);
"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,".swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4!important;grid-row:1/4!important;grid-template-columns:1fr 99fr 1fr;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto);grid-template-rows:minmax(min-content,auto) minmax(min-content,auto) minmax(min-content,auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-bottom-start,.swal2-container.swal2-center-start,.swal2-container.swal2-top-start{grid-template-columns:minmax(0,1fr) auto auto}.swal2-container.swal2-bottom,.swal2-container.swal2-center,.swal2-container.swal2-top{grid-template-columns:auto minmax(0,1fr) auto}.swal2-container.swal2-bottom-end,.swal2-container.swal2-center-end,.swal2-container.swal2-top-end{grid-template-columns:auto auto minmax(0,1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-left>.swal2-popup,.swal2-container.swal2-center-start>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-left>.swal2-popup,.swal2-container.swal2-bottom-start>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-fullscreen>.swal2-popup,.swal2-container.swal2-grow-row>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none!important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0,100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px transparent;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:0}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto!important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em 2em 3px}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px transparent;color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 3px;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:.25em solid transparent;border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .5s;animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .8s;animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-question-mark .8s;animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@-webkit-keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@-webkit-keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{background-color:transparent!important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:transparent;pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}");

