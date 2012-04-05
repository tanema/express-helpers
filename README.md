# Express Helpers

Express Helpers is a port of EJS's ViewHelpers and additional helpers are very similar to those found in the Ruby on Rails framework.

## Installation
   
    npm install express-helpers
    
## How to use

Require express and create a server.

    var express = require('express');
	var app = express.createServer();

To automatically inclue all helpers initialize like this. 

	var helpers = require('express-helpers')(app);

Or more simply if you don't need any reference to the helpers object

    require('express-helpers')(app);
	
If you want to only use some helpers require without the app and register necessary view helpers...

    var helpers = require('express-helpers')();

    app.helpers({
       date_tag: helpers.date_tag
    });

Then use it in a ejs view like a rails view

    <% form_for("user", function(f){ %>
        <%- f.label_for("username") %>
        <%- f.text_field("username") %><br />

        <%- f.submit() %><br />
    <% }) %>


For more help and usage instructions see the [WIKI](https://github.com/tanema/express-helpers/wiki)
			
## License

(The MIT License)

EJS - Embedded JavaScript

Copyright (c) 2007 Edward Benson 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


Ported by Masahiro Hayashi <hayashi.masahiro@gmail.com>

