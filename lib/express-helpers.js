module.exports = function(app) {
	var helpers = {};
	if (app) {
		var express = require('express');
	}
	
	helpers.HTML5 = "html5";
	helpers.HTML4s = "html4s";
	helpers.HTML4t = "html4t"; 
	helpers.HTML4f  = "html4f";
	helpers.XHTML1s = "xhtml1s";
	helpers.XHTML1t  = "xhtml1t";
	helpers.XHTML1f  = "xhtml1f";
	helpers.XHTML1_1 = "xhtml1_1";
	
	var clone = function(original){
		var copy, target = {};
		for ( var name in original ) {
			if ( original[ name ] !== undefined ) 
				target[ name ] = original[ name ];
		}
		return target;
	}


	helpers.doctype_tag = function(type){
		if(!type) type = 'html5';
		var doctypes = {
			html5: 		"<!DOCTYPE HTML>",
			html4s:		"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">",
			html4t: 	"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">",
			html4f: 	"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\">",
			xhtml1s: 	"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">",
			xhtml1t: 	"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">",
			xhtml1f: 	"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Frameset//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd\">",
			xhtml1_1: 	"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">"
		}
		var tag = doctypes[type];
		return (!tag) ? doctypes.html5 : tag
	}

	//can be strongly typed or not depending if it gives a value_type
	var getHtmlOptions = function(){
		var value_type, in_args;
		if(type.of(arguments[0]) == 'string'){
			value_type = arguments[0];
			in_args = arguments[1];
		}else
			in_args = arguments[0];

		var args = Array.prototype.slice.call(in_args),
			i = 0,
			value, html_options = {};
		
		if(args.length > 1){
			args.shift();//get rid of first arg
			if((value_type && type.of(args[0]) == value_type) ||
				(!value_type && type.of(args[0]) != 'object'  
							&& type.of(args[0]) != 'function'
							&& type.of(args[0]) != 'array')){
				value = args[0];
				i++;
			}
			while(args[i]){
				if(type.of(args[i]) == 'object') html_options = args[i];
				i++;
			}
		}
		if(value) html_options.value = html_options.value || value;
		return html_options;
	}
	
	var date_tag = helpers.date_tag = function(name) {
		var html_options = clone(getHtmlOptions("date", arguments));
		var value = html_options.value || new Date();
	  	var month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	  	var years = [], months = [], days =[];
	  	var year = value.getFullYear();
	  	var month = value.getMonth();
	  	var day = value.getDate();
	  	var startYear = html_options.start_year || 1960;
	  	var endYear = html_options.end_year || year+15;

	  	//have to do time deltes because it shares options
	  	delete html_options.start_year;
	  	delete html_options.end_year;
	  	delete html_options.twelvehour
		delete html_options.minute_interval
		delete html_options.show_seconds

	  	var yearHtml_options = clone(html_options);
	  		yearHtml_options.id = name+'[year]';
	  		yearHtml_options.value = year;
	  	var monthHtml_options = clone(html_options);
	  		monthHtml_options.id = name+'[month]';
	  		monthHtml_options.value = month;
	  	var dayHtml_options = clone(html_options);
	  		dayHtml_options.id = name+'[day]';
	  		dayHtml_options.value = day;

	  	for (var y = startYear; y < endYear ; y++) years.push({value: y, text: y});
	  	for (var m = 0; m < 12; m++) months.push({value: (m), text: month_names[m]});
	  	for (var d = 0; d < 31; d++) days.push({value: (d+1), text: (d+1)});

	  	var year_select = select_tag(name+'[year]', years, yearHtml_options );
	  	var month_select = select_tag(name+'[month]', months, monthHtml_options);
	  	var day_select = select_tag(name+'[day]', days, dayHtml_options);

	  	return year_select+month_select+day_select;
	};
	
	var time_tag = helpers.time_tag = function(name) {
		var html_options = clone(getHtmlOptions("date", arguments));
		var value = html_options.value || new Date();
		var hours = [], minutes = [], seconds =[], am_pm_select;
		var hour = value.getHours();
		var minute = value.getMinutes();
		var second = value.getSeconds();

		if(html_options.twelvehour){
			for (var h= 1; h <= 12 ; h++) hours.push({value: h, text: h});
			hour  %= 12;
			am_pm_select = select_tag(name+'[am]', [{value: true, text: "am"},{value: false, text: "pm"}], {id: name+'[am]', value: true} );
		}else
			for (var h= 0; h <= 24 ; h++) hours.push({value: h, text: h});
		
		var minute_interval = html_options.minute_interval || 1;
		var show_seconds = html_options.show_seconds;

		//have to do date deletes because it shares options
		delete html_options.start_year;
	  	delete html_options.end_year;
	  	delete html_options.twelvehour
		delete html_options.minute_interval
		delete html_options.show_seconds

		var hourHtml_options = clone(html_options);
	  		hourHtml_options.id = name+'[hour]';
	  		hourHtml_options.value = hour;
	  	var minuteHtml_options = clone(html_options);
	  		minuteHtml_options.id = name+'[minute]';
	  		minuteHtml_options.value = minute;
	  	var secondHtml_options = clone(html_options);
	  		secondHtml_options.id = name+'[second]';
	  		secondHtml_options.value = second;

		for (var m = 0; m < 60; m+=minute_interval) minutes.push({value: m, text: m});
		for (var s = 0; s < 60; s++) seconds.push({value: s, text: s});

		var hour_select = select_tag(name+'[hour]', hours, hourHtml_options);
		var minute_select = select_tag(name+'[minute]', minutes, minuteHtml_options);
		var second_select = select_tag(name+'[second]', seconds, secondHtml_options);
		
		return hour_select+minute_select+(show_seconds == true ? second_select:"")+(am_pm_select ? am_pm_select : '');
	};
	
	helpers.date_time_tag = function(){return date_tag.apply(this, Array.prototype.slice.call(arguments))+time_tag.apply(this, Array.prototype.slice.call(arguments))}

	helpers.css_tag = function(path, html_options) {
		html_options = html_options || {}
		html_options.rel = 'stylesheet'
		html_options.href = path
		html_options.type = 'text/css'
		html_options.charset = 'utf-8'
		return single_tag_for('link', html_options);
	}

	helpers.form_tag = function(action, html_options) {
	  html_options = html_options || {};
	  html_options.action = html_options.action || action;
	  if(html_options.controller)
	  	html_options.action = html_options.controller + html_options.action;
	  delete html_options.controller
	  
	  if (html_options.multipart == true) {
		html_options.method = html_options.method || 'post';
		html_options.enctype = 'multipart/form-data';
		delete html_options.multipart
	  }else if (html_options.urlencoded == true){
	  	html_options.method = html_options.method || 'post';
		html_options.enctype = 'application/x-www-form-urlencoded';
		delete html_options.urlencoded
	  }else if (html_options.plain_text == true){
	  	html_options.method = html_options.method || 'post';
		html_options.enctype = 'text/plain';
		delete html_options.plain_text
	  }

	  html_options.method = html_options.method || 'post';
	  html_options.enctype = html_options.enctype || 'application/x-www-form-urlencoded';
	  return start_tag_for('form', html_options);
	};

	helpers.form_end_tag = function() { return end_tag('form'); };

	var input_field_tag = helpers.input_field_tag = function(name, inputType, html_options) {
	  html_options = html_options || {};
	  html_options.id  = html_options.id  || name;
	  html_options.value = html_options.value || '';
	  html_options.type = inputType || 'text';
	  html_options.name = name;
	  return single_tag_for('input', html_options);
	};
	
	helpers.js_tag = function(path, html_options) {
		html_options = html_options || {}
		html_options.type = 'text/javascript'
		html_options.src = path
		html_options.charset = 'utf-8'
		return start_tag_for('script', html_options) + end_tag('script');
	}
	
	helpers.label_for = function(idfor) {
		if (!idfor) var idfor = 'null';
		var html_options = getHtmlOptions(arguments);
		var text = html_options.value;
		delete html_options.value;
		if(!text) text = labelize(idfor)
		html_options.for = idfor
		return start_tag_for('label', html_options)+text+end_tag('label');
	};

	function labelize(name){
		if(name.indexOf('[') != -1 && name.indexOf(']') != -1)
			name = name.substring(name.indexOf('[')+1, name.indexOf(']'))
		name = name.replace( /_id/g ,"").replace( /_/g ," ")
		return name.charAt(0).toUpperCase() + name.slice(1);
	}

	var link_to = helpers.link_to = function(name, url, html_options) {
	  if (!name) var name = 'null';
	  if (!html_options) var html_options = {};

	  if (html_options.confirm) {
		html_options.onclick =
		  " var ret_confirm = confirm(\""+html_options.confirm+"\"); if(!ret_confirm){ return false;} ";
		html_options.confirm = null;
	  }
	  html_options.href=url;
	  return start_tag_for('a', html_options)+name+ end_tag('a');
	};

	helpers.link_to_if = function(condition, name, url, html_options) {
	  return link_to_unless((condition == false), name, url, html_options);
	};

	var link_to_unless = helpers.link_to_unless = function(condition, name, url, html_options) {
	  html_options = html_options || {};
	  if (condition) {
		if (html_options.callback && type.of(html_options.callback) == 'function') {
		  return html_options.callback(name, url, html_options);
		} else {
		  return name;
		}
	  } else
		return link_to(name, url, html_options);
	};

	helpers.password_field_tag = function(name, html_options) { return input_field_tag(name, 'password', getHtmlOptions(arguments)); };
	helpers.text_field_tag = function(name, html_options) { return input_field_tag(name, 'text', getHtmlOptions(arguments)); };
	helpers.number_field_tag = function(name, html_options) { return input_field_tag(name, 'number', getHtmlOptions(arguments)); };
	helpers.checkbox_tag = function(name, html_options) { return input_field_tag(name, 'checkbox', getHtmlOptions(arguments)); };
	helpers.radio_tag = function(name, html_options) { return input_field_tag(name, 'radio', getHtmlOptions(arguments)); };
	helpers.hidden_field_tag = function(name, html_options) {return input_field_tag(name, 'hidden', getHtmlOptions(arguments));};
	helpers.file_field_tag = function(name, html_options) {return input_field_tag(name, 'file', getHtmlOptions(arguments));};
	helpers.search_field_tag = function(name, html_options) {return input_field_tag(name, 'search', getHtmlOptions(arguments));};
	helpers.url_field_tag = function(name, html_options) {return input_field_tag(name, 'url', getHtmlOptions(arguments));};
	helpers.color_field_tag = function(name, html_options) {return input_field_tag(name, 'color', getHtmlOptions(arguments));};

	helpers.reset_form_tag = function(idfor) {
		var text, html_options = {};
		if (idfor && type.of(idfor) == "string") text = idfor;
		if (type.of(idfor) == "object") html_options = idfor
		else if(arguments[1]  && type.of(arguments[1]) == "object")html_options = arguments[1]
		html_options.type = html_options.type  || 'reset';
		html_options.value = text || 'Reset';
		return single_tag_for('input', html_options);
	};

	helpers.email_field_tag = function(name, html_options) { 
		var html_options = getHtmlOptions(arguments);
		html_options.pattern = html_options.pattern ||  "^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$"
		return input_field_tag(name, 'email', html_options); 
	};

	helpers.phone_field_tag = helpers.telephone_field_tag = function(name) {
		var html_options = getHtmlOptions(arguments);
		html_options.pattern = html_options.pattern || "^[0-9]+[\- ]*[0-9]+$"
		return input_field_tag(name, 'tel', html_options);
	};
	
	var js_button = helpers.js_button = function(value, onclick, html_options){
		html_options = html_options || {}
		html_options.onclick = onclick;
		html_options.value = html_options.value || value
		return input_field_tag(html_options.name || html_options.id, 'button', html_options);
	}
	
	helpers.button_link_to = helpers.button_to = function(value, url, html_options){
		return js_button(value, "window.location.href='"+url+"'", html_options)
	}

	var select_tag = helpers.select_tag = function(name, choices, html_options) {
	  html_options = html_options || {};
	  html_options.id  = html_options.id  || name;
	  var value = html_options.value;
	  html_options.name = name;

	  var txt = '';
	  txt += start_tag_for('select', html_options);

	  for (var i = 0; i < choices.length; i++) {
		var choice = choices[i];
		var optionOptions = {value: choice.value};
		if (choice.value == value)
		  optionOptions.selected ='selected';
		txt += start_tag_for('option', optionOptions )+choice.text+end_tag('option');
	  }
	  txt += end_tag('select');
	  return txt;
	};

	var single_tag_for = helpers.single_tag_for = function(_tag, html_options) { return tag(_tag, html_options, true);};
	var start_tag_for = helpers.start_tag_for = function(_tag, html_options)  { return tag(_tag, html_options); };

	helpers.submit_tag = function(idfor) {
		var text, url, html_options = {};
		if (idfor && typeof idfor == "string") text = idfor;
		
		if(typeof idfor == "object"){
			html_options = idfor
		}else if(arguments[1]  && typeof arguments[1] == "string"){
			url = arguments[1]
			if(arguments[2]  && typeof arguments[2] == "object")
				html_options = arguments[2]
			
			html_options.onclick = html_options.onclick  || '' ;
			if (html_options.confirm) {
				html_options.onclick = " var ret_confirm = confirm(\""+html_options.confirm+"\"); if(!ret_confirm){ return false;} ";
				html_options.confirm = null;
			 }
			html_options.onclick=html_options.onclick+(url ? url_for(url) : '')+'return false;';
		}
		else if(arguments[1]  && typeof arguments[1] == "object"){
			html_options = arguments[1]
		}
		html_options.type = html_options.type  || 'submit';
		html_options.value = text || 'Submit';
		return single_tag_for('input', html_options);
	};

	var tag = helpers.tag = function(_tag, html_options, closed) {
		closed = closed || false
		var txt = ' ';
		for (var attr in html_options) {
			if (html_options[attr] != null)
				var value = html_options[attr].toString();
			else
				var value='';
			if (attr == "Class") // special case because "class" is a reserved word in IE
				attr = "class";
			if (value.indexOf("'") != -1)
				txt += attr+'=\"'+value+'\" ';
			else
			txt += attr+"='"+value+"' ";
		}
		return '<'+_tag+txt+(closed ?  '/>' : '>');
	};

	var end_tag = helpers.end_tag = function(_tag) { return '</'+_tag+'>'; };

	helpers.text_tag = helpers.text_area_tag = function(name) {
	  var html_options = getHtmlOptions(arguments);
	  html_options.id  = html_options.id  || name;
	  html_options.name  = html_options.name  || name;
	  var value = html_options.value || '';
	  delete html_options.value;
	  if (html_options.size) {
		html_options.cols = html_options.size.split('x')[0];
		html_options.rows = html_options.size.split('x')[1];
		delete html_options.size;
	  }
	  html_options.cols = html_options.cols || 50;
	  html_options.rows = html_options.rows || 4;
	  return  start_tag_for('textarea', html_options)+value+end_tag('textarea');
	};

	var url_for = function(url) {return 'window.location="'+url+'";';};

	helpers.img_tag = function(image_location, html_options){
	  html_options = html_options || {};
	  html_options.src = image_location;
	  return single_tag_for('img', html_options);
	};
	
	helpers.image_submit_tag = function(image_location, html_options) { 
		html_options = html_options || {};
		html_options.src = image_location;
		html_options.type = 'image';
		return single_tag_for('input', html_options);
	};
	
	helpers.sanitize = helpers.html_safe = escape
	helpers.strip_tags = function(s){return s.replace(/<.*?>/g, '');}
	helpers.strip_links = function(s){return s.replace(/<a[^><]*>|<.a[^><]*>/gi, '');}
	
	// Specifies the default Set of acceptable css keywords that 
    var allowed_css_properties = ["azimuth", "background-color", "border-bottom-color", "border-collapse",
	"border-color", "border-left-color", "border-right-color", "border-top-color", "clear", "color", "cursor", "direction", "display",
     "elevation", "float", "font", "font-family", "font-size", "font-style", "font-variant", "font-weight", "height", "letter-spacing", "line-height",
     "overflow", "pause", "pause-after", "pause-before", "pitch", "pitch-range", "richness", "speak", "speak-header", "speak-numeral", "speak-punctuation",
     "speech-rate", "stress", "text-align", "text-decoration", "text-indent", "unicode-bidi", "vertical-align", "voice-family", "volume white-space",
      "width"]

    // Specifies the default Set of acceptable css keywords that
    var allowed_css_keywords   = ["auto", "aqua", "black", "block", "blue", "bold", "both", "bottom", "brown", "center", "thin", "thick", "double",
      "collapse", "dashed", "dotted", "fuchsia", "gray", "green", "!important", "italic", "left", "lime", "maroon", "medium", "none", "navy", "normal",
      "nowrap", "olive", "pointer", "purple", "red", "right", "solid", "silver", "teal", "top", "transparent", "underline", "white", "yellow", "groove", "inset", 
	  "outset", "ridge"]
	
	//Specifies the default Set of allowed shorthand css properties for the #sanitize and #sanitize_css helpers.
    var shorthand_css_properties = ["background", "border", "margin", "padding"]
	
	helpers.sanitize_css = function(style){
		//disallow urls
		style = style.replace(/url\s*\(\s*[^\s)]+?\s*\)\s*/, ' ')
		// gauntlet
		var test1 =  /^([:,;#%.\sa-zA-Z0-9!]|\w-\w|\'[\s\w]+\'|\"[\s\w]+\"|\([\d,\s]+\))*$/ ,
			  test2 = /^(\s*[-\w]+\s*:\s*[^:;]*(;|$)\s*)*$/;
		if(!test1.test(style) || !test2.test(style)) 
			return ''
		var clean = [],
			  css_regex = /([-\w]+)\s*:\s*([^:;]*)/g
		while (arrMatch = css_regex.exec( style )){
			var prop = arrMatch[1],
				  val = arrMatch[2];
			if (allowed_css_properties.indexOf(prop.toLowerCase()) != -1){
				clean.push(prop + ': ' + val + ';')
			}else if (shorthand_css_properties.indexOf(prop.split('-')[0].toLowerCase())  != -1){
				var keywords = val.split(' '),
					  keyword_regex = /^(#[0-9a-f]+|rgb\(\d+%?,\d*%?,?\d*%?\)?|\d{0,2}\.?\d{0,2}(cm|em|ex|in|mm|pc|pt|px|%|,|\))?)$/,
					  valid = true;
				if( keywords.length ){
					for(var i = 0; i < keywords.length; i++){
						if(allowed_css_keywords.indexOf(keywords[i])  == -1 && !keyword_regex.test(keywords[i])){
							valid = false
							break;
						}
					}
					if(valid)
						clean.push(prop + ': ' + val + ';')
				}
			}
		}
		return clean.join(' ')
	}
	
	var escape_js = helpers.escape_js = function(javascript){
		var js_escape = {  '\\\\' : /\\\\/g, '\n' : /\r|\n|[\n\r]/g,  '\\"':/"/g, "\\'" : /'/g, '<\/':/<\//g }
		for (ch in js_escape) {
			javascript = javascript.replace(js_escape[ch], ch)
		}
		return javascript;
	}
	
	helpers.cdata = function(content){return "<![CDATA["+content+"]]>"}
	
	var convertToUnicode = helpers.toUnicode = function(source) { 
		result = ''; 
		for (i=0; i<source.length; i++) 
			result += '&#' + source.charCodeAt(i) + ';'; 
		return result; 
	} 
	
	var convertToHexadecimal = helpers.toHex = function(num) { 
		var hex = ''; 
		for (i=0;i<num.length;i++) 
			hex += "%" + num.charCodeAt(i).toString(16).toUpperCase(); 
		return hex; 
	} 
	
	helpers.mail_to = function(email_address, name, html_options){
		email_address = escape(email_address)
		html_options = html_options || {}
		encode = html_options.encode
		delete html_options.encode
		var cc  = html_options.cc,
			bcc = html_options.bcc, 
			subject = html_options.subject, 
			body = html_options.body;
		
		delete html_options.cc
		delete html_options.bcc
		delete html_options.subject
		delete html_options.body
		
		var extras = []
		if(cc) extras.push("cc="+escape(cc).replace("+", "%20")) ;
		if(bcc) extras.push("bcc="+escape(bcc).replace("+", "%20")) ;
		if(body) extras.push("body="+escape(body).replace("+", "%20")) ;
		if(subject) extras.push("subject="+escape(subject).replace("+", "%20")) ;
		extras = extras.length  ?  '?' + extras.join('&') : ''
		
		email_address_obfuscated = email_address
		if (html_options.replace_at) email_address_obfuscated = email_address_obfuscated.replace(/@/, html_options.replace_at) 
		if (html_options.replace_dot)  email_address_obfuscated = email_address_obfuscated.replace(/\./, html_options.replace_dot) 

		var string = ''
		if (encode == "javascript"){
			html_options.href="mailto:"+email_address+extras;
			//the replace operation is a hack because the quotes cannot be ' but I am not changing my whole system just for mail_to
			var encoded = convertToHexadecimal("document.write('"+start_tag_for('a', html_options).replace(/'/g, "\\'")+name+ end_tag('a')+"');");
			return "<script type=\"text/javascript\">eval(decodeURIComponent('"+encoded+"'))</script>"
		}else if (encode == "hex"){
			email_address_encoded = convertToUnicode(email_address_obfuscated)
			string = convertToUnicode('mailto:')
			string += convertToHexadecimal(email_address)
			html_options.href = string+extras;
			return start_tag_for('a', html_options)+name+ end_tag('a');
		}else{
			html_options.href="mailto:"+email_address+extras;
			return start_tag_for('a', html_options)+name+ end_tag('a');
		}
	}

	var filter_array = function(array, filter){
		var len = array.length;
		if (type.of(filter) != "function")
			throw new TypeError();

		var res = new Array(), thisp = arguments[1];
		for (var i = 0; i < len; i++){
			if (i in array){
				var val = array[i]; // in case fun mutates this
				if (filter.call(thisp, val, i, array))
					res.push(val);
			}
		}
		return res;
	};

	var trim = function(str){
		return str.replace(/^\s+|\s+$/g,"")
	}

	helpers.form_for = function(form_obj_string){
		var form_obj = this[form_obj_string],
        	first_call = true,
        	tags_used = 0;

        var formcall, html_options = {};
		if(arguments[1]  && type.of(arguments[1]) == "object"){
			html_options = arguments[1]
			formcall = arguments[2]
		}else
			formcall = arguments[1]
			
		var format_args = function(in_args){
			var args = Array.prototype.slice.call(in_args),
				name = args.shift(),
				form_name = form_obj_string+"["+name+"]";
			args.unshift(form_name);

			if(form_obj && form_obj[name]){
				var found_options = false
				for(var i = 0; i < args.length; i++){
					if(args[i]  && type.of(args[i]) == "object"){
						args[i].value = args[i].value || form_obj[name];
						found_options = true;
					}
				}
				if(!found_options) args.push({value: form_obj[name]})
			}

			return args;
		};

		var form_helpers = {
			date: function(){return doSETags(helpers.date_tag.apply(this,format_args(arguments)))},
			date_time: function(){return doSETags(helpers.date_time_tag.apply(this,format_args(arguments)))},
			time: function(){return doSETags(helpers.time_tag.apply(this,format_args(arguments)))},
			text_field: function(){return doSETags(helpers.text_field_tag.apply(this,format_args(arguments)))},
			text_area: function(){return doSETags(helpers.text_area_tag.apply(this,format_args(arguments)))},
			password_field: function(){return doSETags(helpers.password_field_tag.apply(this,format_args(arguments)))},
			number_field: function(){return doSETags(helpers.number_field_tag.apply(this,format_args(arguments)))},
			checkbox: function(){return doSETags(helpers.checkbox_tag.apply(this,format_args(arguments)))},
			radio: function(){return doSETags(helpers.radio_tag.apply(this,format_args(arguments)))},
			hidden_field: function(){return doSETags(helpers.hidden_field_tag.apply(this,format_args(arguments)))},
			file_field: function(){return doSETags(helpers.file_field_tag.apply(this,format_args(arguments)))},
			search_field: function(){return doSETags(helpers.search_field_tag.apply(this,format_args(arguments)))},
			url_field: function(){return doSETags(helpers.url_field_tag.apply(this,format_args(arguments)))},
			color_field: function(){return doSETags(helpers.color_field_tag.apply(this,format_args(arguments)))},
			email_field: function(){return doSETags(helpers.email_field_tag.apply(this,format_args(arguments)))},
			phone_field: function(){return doSETags(helpers.phone_field_tag.apply(this,format_args(arguments)))},
			select: function(){return doSETags(helpers.select_tag.apply(this,format_args(arguments)))},
			label_for: function(){return doSETags(helpers.label_for.apply(this, Array.prototype.slice.call(arguments)))},
			reset: function(){return doSETags(helpers.reset_form_tag.apply(this, Array.prototype.slice.call(arguments)))},
			submit: function(){return doSETags(helpers.submit_tag.apply(this, Array.prototype.slice.call(arguments)))},
			image_submit: function(){return doSETags(helpers.image_submit_tag.apply(this, Array.prototype.slice.call(arguments)))},
			shim: function(){return doSETags("")}
		}

		var form = formcall.toString(),
			form_arg = trim(form.substring(form.indexOf("(") + 1, form.indexOf(")")).split(',')[0]),
        	form_src = filter_array(form.substring(form.indexOf("{") + 1, form.lastIndexOf("}") - 1).split(/\),|, /g), function(element){
        		return (element.indexOf(form_arg+".") != -1 && form_helpers[trim(element.replace(form_arg+".", '').substring(0,element.replace(form_arg+".", '').indexOf('(')))] != null)
        	});

		function doSETags(gen_tags){
        	var html = ""
        	if(first_call) html += helpers.form_tag('/'+form_obj_string+'s',html_options)
        	first_call = false;
        	html += gen_tags
        	tags_used++;
        	if(tags_used == form_src.length)	html += helpers.form_end_tag();
        	return html
        }

		return formcall(form_helpers);
	}

	var is=
	{
		Null:function(a){return a===null;},
		Undefined:function(a){return a===undefined;},
		nt:function(a){return(a===null||a===undefined);},
		Function:function(a){return(typeof(a)==='function')?a.constructor.toString().match(/Function/)!==null:false;},
		String:function(a){return(typeof(a)==='string')?true:(typeof(a)==='object')?a.constructor.toString().match(/string/i)!==null:false;		},
		Array:function(a){return(typeof(a)==='object')?a.constructor.toString().match(/array/i)!==null||a.length!==undefined:false;},
		Boolean:function(a){return(typeof(a)==='boolean')?true:(typeof(a)==='object')?a.constructor.toString().match(/boolean/i)!==null:false;},
		Date:function(a){return(typeof(a)==='date')?true:(typeof(a)==='object')?a.constructor.toString().match(/date/i)!==null:false;},
		HTML:function(a){return(typeof(a)==='object')?a.constructor.toString().match(/html/i)!==null:false;},
		Number:function(a){return(typeof(a)==='number')?true:(typeof(a)==='object')?a.constructor.toString().match(/Number/)!==null:false;},
		Object:function(a){return(typeof(a)==='object')?a.constructor.toString().match(/object/i)!==null:false;},
		RegExp:function(a){return(typeof(a)==='function')?a.constructor.toString().match(/regexp/i)!==null:false;}
	};
	 
	var type={
		of:function(a){
			for(var i in is){
				if(is[i](a))
					return i.toLowerCase();
			}
		}
	};

	if(app){
		//3.x support
		if(type.of(app) == 'function'){
			for (var name in helpers) {
				app.locals[name] = helpers[name];
			}
			
			//add dynamic helpers
			app.use(function(req, res, next){
				res.locals.is_current_page = function(url){	
					var current_page = req.url,
						  httpregex = /http:\/\/|https:\/\/|www\./g;
					return url === current_page ||  url.replace(httpregex,'')  === req.headers.host.replace(httpregex,'') + current_page
				}

				res.locals.link_to_unless_current = function(name, url, html_options){
					var current_page = req.url,
						  httpregex = /http:\/\/|https:\/\/|www\./g;
					if(url != current_page && url.replace(httpregex,'')  != req.headers.host.replace(httpregex,'') + current_page)
						return link_to(name, url, html_options)
				}

				next();
			})
		}
		//2.x support 
		else if ((express.Server && app instanceof express.Server) || app instanceof express.HTTPServer || app instanceof express.HTTPSServer) {
			var obj = {};
			if ((express.Server && app instanceof express.Server) || app instanceof express.HTTPServer || app instanceof express.HTTPSServer) {
				for (name in helpers) {
					obj[name] = helpers[name];
				}
			}
			app.helpers(obj);

			//add dynamic helpers
			app.dynamicHelpers({
				is_current_page: function(req, res, next){
					var func = function(url){	
						var current_page = req.url,
							  httpregex = /http:\/\/|https:\/\/|www\./g;
						return url === current_page ||  url.replace(httpregex,'')  === req.headers.host.replace(httpregex,'') + current_page
					}
					return func
				},
				link_to_unless_current: function(req, res, next){
					var func = function(name, url, html_options){
						var current_page = req.url,
							  httpregex = /http:\/\/|https:\/\/|www\./g;
						if(url != current_page && url.replace(httpregex,'')  != req.headers.host.replace(httpregex,'') + current_page)
							return link_to(name, url, html_options)
					}
					return func;
				}
			})
		}
	}
	
	return helpers;
}
