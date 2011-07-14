var express = require('express');
module.exports = function(app) {
	var helpers = {};
	
	helpers.HTML5 = "html5";
	helpers.HTML4s = "html4s";
	helpers.HTML4t = "html4t"; 
	helpers.HTML4f  = "html4f";
	helpers.XHTML1s = "xhtml1s";
	helpers.XHTML1t  = "xhtml1t";
	helpers.XHTML1f  = "xhtml1f";
	helpers.XHTML1_1 = "xhtml1_1";
	
	helpers.doctype_tag = function(type){
		if(!type) type = 'html5';
		var doctypes = {
			html5: 			"<!DOCTYPE HTML>",
			html4s:		"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">",
			html4t: 		"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">",
			html4f: 		"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\">",
			xhtml1s: 		"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">",
			xhtml1t: 		"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">",
			xhtml1f: 		"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Frameset//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd\">",
			xhtml1_1: 	"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">"
		}
		var tag = doctypes[type];
		return (!tag) ? doctypes.html5 : tag
	}
	
	var date_tag = helpers.date_tag = function(name) {
		var value, html_options = {};
		if(arguments[1]  && arguments[1] instanceof Date){
			value = arguments[1]
			if(arguments[2]  && typeof arguments[2] == "object")
				html_options = arguments[2]
		}
	  if (!value)	value = new Date();

	  var month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	  var years = [], months = [], days =[];
	  var year = value.getFullYear();
	  var month = value.getMonth();
	  var day = value.getDate();
	  for (var y = year - 15; y < year+15 ; y++) {
		years.push({value: y, text: y});
	  }
	  for (var m = 0; m < 12; m++) {
		months.push({value: (m), text: month_names[m]});
	  }
	  for (var d = 0; d < 31; d++) {
		days.push({value: (d+1), text: (d+1)});
	  }
	  var year_select = select_tag(name+'[year]', year, years, {id: name+'[year]'} );
	  var month_select = select_tag(name+'[month]', month, months, {id: name+'[month]'});
	  var day_select = select_tag(name+'[day]', day, days, {id: name+'[day]'});

	  return year_select+month_select+day_select;
	};
	
	var time_tag = helpers.time_tag = function(name) {
		var value, html_options = {};
		if(arguments[1]  && arguments[1] instanceof Date){
			value = arguments[1]
			if(arguments[2]  && typeof arguments[2] == "object")
				html_options = arguments[2]
		}
		else if(arguments[1]  && typeof arguments[1] == "object"){
			html_options = arguments[1]
		}
		if (! (value instanceof Date)) value = new Date();

		var hours = [], minutes = [], seconds =[], am_pm_select;
		var hour = value.getHours();
		var minute = value.getMinutes();
		var second = value.getSeconds();

		if(html_options.twelvehour){
			for (var h= 1; h <= 12 ; h++) {
				hours.push({value: h, text: h});
			}
			hour  %= 12;
			am_pm_select = select_tag(name+'[am]', true, [{value: true, text: "am"},{value: false, text: "pm"}], {id: name+'[am]'} );
		}else{
			for (var h= 0; h <= 24 ; h++) {
				hours.push({value: h, text: h});
			}
		}
		for (var m = 1; m < 60; m++) {
			minutes.push({value: m, text: m});
		}
		for (var s = 1; s < 60; s++) {
			seconds.push({value: s, text: s});
		}
		var hour_select = select_tag(name+'[hour]', hour, hours, {id: name+'[hour]'});
		var minute_select = select_tag(name+'[minute]', minute, minutes, {id: name+'[minute]'});
		var second_select = select_tag(name+'[second]', second, seconds, {id: name+'[second]'} );
		
		return hour_select+minute_select+second_select+(am_pm_select ? am_pm_select : '');
	};
	
	helpers.date_time_tag = function(name){
		var value, html_options = {};
		if(arguments[1]  && arguments[1] instanceof Date){
			value = arguments[1]
			if(arguments[2]  && typeof arguments[2] == "object")
				html_options = arguments[2]
		}else if(arguments[1]  && typeof arguments[1] == "object"){
			html_options = arguments[1]
		}
		if(value)
			return date_tag(name, value, html_options)+time_tag(name, value, html_options) ;
		return date_tag(name, html_options)+time_tag(name, html_options)
	}

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
	  html_options.action = action;
	  if (html_options.multipart == true) {
		html_options.method = 'post';
		html_options.enctype = 'multipart/form-data';
	  }

	  return start_tag_for('form', html_options);
	};

	helpers.form_end_tag = function() { return end_tag('form'); };

	var input_field_tag = helpers.input_field_tag = function(name, value , inputType, html_options) {
	  html_options = html_options || {};
	  html_options.id  = html_options.id  || name;
	  html_options.value = value || '';
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
		
		var text, html_options = {};
		if(arguments[1]  && typeof arguments[1] == "string"){
			text = arguments[1]
			if(arguments[2]  && typeof arguments[2] == "object")
				html_options = arguments[2]
		}
		else if(arguments[1]  && typeof arguments[1] == "object"){
			html_options = arguments[1]
		}
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

	helpers.link_to_if = function(condition, name, url, html_options, post, block) {
	  return link_to_unless((condition == false), name, url, html_options, post, block);
	};

	var link_to_unless = helpers.link_to_unless = function(condition, name, url, html_options, block) {
	  html_options = html_options || {};
	  if (condition) {
		if (block && typeof block == 'function') {
		  return block(name, url, html_options, block);
		} else {
		  return name;
		}
	  } else
		return link_to(name, url, html_options);
	};

	helpers.password_field_tag = function(name, value, html_options) { return input_field_tag(name, value, 'password', html_options); };
	helpers.text_field_tag = function(name, value, html_options) { return input_field_tag(name, value, 'text', html_options); };
	helpers.number_field_tag = function(name, value, html_options) { return input_field_tag(name, value, 'number', html_options); };
	helpers.checkbox_tag = function(name, value, html_options) { return input_field_tag(name, value, 'checkbox', html_options); };
	helpers.radio_tag = function(name, value, html_options) { return input_field_tag(name, value, 'radio', html_options); };
	helpers.hidden_field_tag = function(name, value, html_options) {return input_field_tag(name, value, 'hidden', html_options);};
	helpers.file_field_tag = function(name, value, html_options) {return input_field_tag(name, value, 'file', html_options);};
	helpers.reset_field_tag = function(name, value, html_options) {return input_field_tag(name, value||'Reset', 'reset', html_options);};
	helpers.search_field_tag = function(name, value, html_options) {return input_field_tag(name, value, 'search', html_options);};
	helpers.url_field_tag = function(name, value, html_options) {return input_field_tag(name, value, 'url', html_options);};
	helpers.color_field_tag = function(name, value, html_options) {return input_field_tag(name, value, 'color', html_options);};
	
	helpers.email_field_tag = function(name, value, html_options) { 
		html_options = html_options || {}
		html_options.pattern = html_options.pattern ||  "^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$"
		return input_field_tag(name, value, 'email', html_options); 
	};
	helpers.phone_field_tag = helpers.telephone_field_tag = function(name, value, html_options) {
		html_options = html_options || {}
		html_options.pattern = html_options.pattern || "^[0-9]+[\- ]*[0-9]+$"
		return input_field_tag(name, value, 'tel', html_options);
	};
	
	var js_button = helpers.js_button = function(name, value, onclick, html_options){
		html_options = html_options || {}
		html_options.onclick = onclick;
		return input_field_tag(name, value, 'button', html_options);
	}
	
	helpers.button_link_to = helpers.button_to = function(name, value, url, html_options){
		return js_button(name, value, "window.location.href='"+url+"'", html_options)
	}

	var select_tag = helpers.select_tag = function(name, value, choices, html_options) {
	  html_options = html_options || {};
	  html_options.id  = html_options.id  || name;
	  html_options.value = value;
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

	helpers.text_tag = helpers.text_area_tag = function(name, value, html_options) {
	  html_options = html_options || {};
	  html_options.id  = html_options.id  || name;
	  html_options.name  = html_options.name  || name;
	  value = value || '';
	  if (html_options.size) {
		html_options.cols = html_options.size.split('x')[0];
		html_options.rows = html_options.size.split('x')[1];
		delete html_options.size;
	  }

	  html_options.cols = html_options.cols || 50;
	  html_options.rows = html_options.rows || 4;

	  return  start_tag_for('textarea', html_options)+value+end_tag('textarea');
	};

	var url_for = function(url) {
	  return 'window.location="'+url+'";';
	};

	helpers.img_tag = function(image_location, alt, html_options){
	  html_options = html_options || {};
	  html_options.src = image_location;
	  html_options.alt = alt;
	  return single_tag_for('img', html_options);
	};
	
	helpers.image_submit_tag = function(image_location, alt, html_options) { 
		html_options = html_options || {};
		html_options.src = image_location;
		html_options.alt = alt;
		return single_tag_for('input', html_options);
	};
	
	helpers.sanitize = helpers.html_safe = escape
	
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
		var js_escape = {  '\\\\' : /\\/g, '\n' : /\r\n|[\n \r]/g,  '\\"':/"/g, "\\'" : /'/g, '<\/':/<\//g }
		if(javascript){
			for (ch in js_escape) {
				javascript = javascript.replace(js_escape[ch], ch)
			}
			return javascript;
		}
		return ''
	}
	
	
	
	helpers.cdata = function(){
		return "<![CDATA["+content+"]]>"
	}
	
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
		var   cc  = html_options.cc,
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

	if(app){
		var obj = {};
		if ((express.Server && app instanceof express.Server) || app instanceof express.HTTPServer || app instanceof express.HTTPSServer) {
			for (name in helpers) {
				obj[name] = helpers[name];
			}
		}
		app.helpers(obj);
		
		//add dynamic helpers
		app.dynamicHelpers({
			current_page: function(req, res, next){
				return req.route.path
			}
		})
	}
	
	return helpers;
}
