var express = require('express');
module.exports = function(app) {
	var helpers = {};
	helpers.date_tag = function(name, value , html_options) {
	  if (! (value instanceof Date))
		value = new Date();

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

	helpers.form_tag_end = function() { return tag_end('form'); };

	helpers.hidden_field_tag   = function(name, value, html_options) {
	  return input_field_tag(name, value, 'hidden', html_options);
	};

	var input_field_tag = helpers.input_field_tag = function(name, value , inputType, html_options) {

	  html_options = html_options || {};
	  html_options.id  = html_options.id  || name;
	  html_options.value = value || '';
	  html_options.type = inputType || 'text';
	  html_options.name = name;

	  return single_tag_for('input', html_options);
	};

	// helpers.is_current_page = function(url) {
	//   return (window.location.href == url || window.location.pathname == url ? true : false);
	// };
	helpers.js_tag = function(path, html_options) {
		html_options = html_options || {}
		html_options.type = 'text/javascript'
		html_options.src = path
		html_options.charset = 'utf-8'
		
		return start_tag_for('script', html_options) + tag_end('script');
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
		return start_tag_for('label', html_options)+text+tag_end('label');
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
	  return start_tag_for('a', html_options)+name+ tag_end('a');
	};

	helpers.submit_link_to = function(name, url, html_options){
	  if (!name) var name = 'null';
	  if (!html_options) var html_options = {};
	  html_options.onclick = html_options.onclick  || '' ;

	  if (html_options.confirm) {
		html_options.onclick =
		  " var ret_confirm = confirm(\""+html_options.confirm+"\"); if(!ret_confirm){ return false;} ";
		html_options.confirm = null;
	  }

	  html_options.value = name;
	  html_options.type = 'submit';
	  html_options.onclick=html_options.onclick+
		(url ? url_for(url) : '')+'return false;';
	  //html_options.href='#'+(options ? Routes.url_for(options) : '')
	  return start_tag_for('input', html_options);
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

	// helpers.link_to_unless_current = function(name, url, html_options, block) {
	//   html_options = html_options || {};
	//   return this.link_to_unless(this.is_current_page(url), name, url, html_options, block);
	// };

	helpers.password_field_tag = function(name, value, html_options) { return input_field_tag(name, value, 'password', html_options); };

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
		txt += start_tag_for('option', optionOptions )+choice.text+tag_end('option');
	  }
	  txt += tag_end('select');
	  return txt;
	};

	var single_tag_for = helpers.single_tag_for = function(_tag, html_options) { return tag(_tag, html_options, '/>');};

	var start_tag_for = helpers.start_tag_for = function(_tag, html_options)  { return tag(_tag, html_options); };

	helpers.submit_tag = function(name, html_options) {
	  html_options = html_options || {};
	  //html_options.name  = html_options.id  || 'commit';
	  html_options.type = html_options.type  || 'submit';
	  html_options.value = name || 'Submit';
	  return single_tag_for('input', html_options);
	};

	var tag = helpers.tag = function(_tag, html_options, end) {
	  if (!end) var end = '>';
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
	  return '<'+_tag+txt+end;
	};

	var tag_end = helpers.tag_end = function(_tag) { return '</'+_tag+'>'; };

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

	  return  start_tag_for('textarea', html_options)+value+tag_end('textarea');
	};

	helpers.text_field_tag = function(name, value, html_options) { return input_field_tag(name, value, 'text', html_options); };

	var url_for = helpers.url_for = function(url) {
	  return 'window.location="'+url+'";';
	};

	helpers.img_tag = function(image_location, alt, options){
	  options = options || {};
	  options.src = image_location;
	  options.alt = alt;
	  return single_tag_for('img', options);
	};
	
	if(app){
		var obj = {};
		if ((express.Server && app instanceof express.Server) || app instanceof express.HTTPServer || app instanceof express.HTTPSServer) {
			for (name in helpers) {
				if (typeof helpers[name] === 'function') {
					obj[name] = helpers[name];
					
				}
			}
		}
		app.helpers(obj);
	}
	
	return helpers;
}
