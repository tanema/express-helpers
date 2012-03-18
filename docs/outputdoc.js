var helpers = require('../lib/express-helpers.js')();
var generate_docs = false,
	generate_tests = false;
var date = new Date(2007,10,20,1,1,1,1);
var date_string = JSON.stringify(date);
var choices = [ {value: 1,text:'First Choice' },{value: 2,text: 'Second Choice'},{value: '3',text: 'Third Choice'}];
var exec = require("child_process").exec;
var fs = require('fs');

var methods = [
	{helper: "button_to", args: ["google", "http://www.google.com"]},
	{helper: "cdata", args: ['this is cdata']},
	{helper: "checkbox_tag", args: ['user_check_box', {value:'user'}]},
	{helper: "color_field_tag", args: ['color', {value: 5}]},
	{helper: "css_tag", args: ['/stylesheet/style.css']},
	{helper: "date_tag", args: ['Installation[date]', {value: date}]},
	{helper: "date_time_tag", args: ['Installation[datetime]', {value: date}]},
	{helper: "doctype_tag", args: []},
	{helper: "email_field_tag", args: ['email', {value: 'test@email.com'}]},
	{helper: "escape_js", args: ["var i = 5;"]},
	{helper: "file_field_tag", args: ['file', {value: 5}]},
	{helper: "form_tag", args: ['/myaction']},
	{helper: "form_end_tag", args: []},
	{helper: "hidden_field_tag", args: ['something[interesting]', {value:5}]},
	{helper: "img_tag", args: ['/some.png']},
	{helper: "image_submit_tag", args: ['/some.png', {alt: 'submit'}]},
	{helper: "js_tag", args: ['/javascript/script.js']},
	{helper: "js_button", args: ["google", "http://www.google.com"]},
	{helper: "label_for", args: ['user_id']},
	{helper: "link_to", args: ['hello world', '/something/here']},
	{helper: "link_to_if", args: [false, 'Reply', '/reply']},
	{helper: "link_to_unless", args: [true, 'Reply', '/reply']},
	{helper: "mail_to", args: ["me@domain.com", "Send Me Email", {encode : "hex", subject: "that thing I sent you", body: "did you get that thing I sent you"}]},
	{helper: "number_field_tag", args: ["number", {value: 5}]},
	{helper: "password_field_tag", args: ['something[interesting]', {value:5}]},
	{helper: "phone_field_tag", args: ["phony", {value: 12345123}]},
	{helper: "radio_tag", args: ['user_radio', {value:'user'}]},
	{helper: "reset_form_tag", args: []},
	{helper: "sanitize_css", args: ['takes urls out of here']},
	{helper: "search_field_tag", args: ['search']},
	{helper: "select_tag", args: ['mySelectElement', choices, {value:2}]},
	{helper: "strip_links", args: ['strip <a href="google">links</a> from here']},
	{helper: "strip_tags", args: ['strip <b> tags </b> from here']},
	{helper: "submit_tag", args: ['holla', '/new/location']},
	{helper: "text_area_tag", args: ['task[description]', {value:'Here is some text.\nA new line.'}]},
	{helper: "text_field_tag", args: ['something[interesting]', {value:5}]},
	{helper: "time_tag", args: ['Installation[time]', {value: date}]},
	{helper: "url_field_tag", args: ['url', {value: "website.com"}]}
];

if(generate_tests){
	console.log("var assert = require('assert'),helpers = require('../lib/express-helpers.js')();");
	console.log(" ");
}
if(generate_docs){
	exec("mkdir wiki");
}

for(var i = 0; i < methods.length; i++){
	
	var json = JSON.stringify(methods[i].args)
	if(generate_docs){
		var text = "\n";
		text += methods[i].helper+"("+ json.substring(1, json.length - 1)+")\n \n";
		text += " => \n \n";
		text += helpers[methods[i].helper].apply(this, methods[i].args) + "\n";

		(function(helper, text){
			fs.open("./wiki/" + helper + ".txt", 'a', undefined, function(err, fd) { 
	            if(err) throw err; 
	            fs.write(fd, text, undefined, undefined, function(err, written) { 
	                 if(err) throw err; 
	                 fs.close(fd); 
	             }); 
	        }); 
		})(methods[i].helper, text);
	}
	
	if(generate_tests){
		console.log("assert.equal(\""+helpers[methods[i].helper].apply(this, methods[i].args).replace(/"/g, "\\\"").replace(/\n/g, "\\n")+"\","
				+"helpers."+methods[i].helper+"("+ json.substring(1, json.length - 1).replace(date_string, 'new Date(2007,10,20,1,1,1,1)')+").replace(/\"/g, \"\\\"\").replace(/\\n/g, \"\\n\") )");
		console.log("console.log('"+methods[i].helper+" test complete');");
		console.log(" ");
	}	
}