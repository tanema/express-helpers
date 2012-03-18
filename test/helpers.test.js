var assert = require('assert'),helpers = require('../lib/express-helpers.js')();
 
assert.equal("<input onclick=\"window.location.href='http://www.google.com'\" value='google' id='' type='button' name='' />",helpers.button_to("google","http://www.google.com").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('button_to test complete');
 
assert.equal("<![CDATA[this is cdata]]>",helpers.cdata("this is cdata").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('cdata test complete');
 
assert.equal("<input value='user' id='user_check_box' type='checkbox' name='user_check_box' />",helpers.checkbox_tag("user_check_box",{"value":"user"}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('checkbox_tag test complete');
 
assert.equal("<input value='5' id='color' type='color' name='color' />",helpers.color_field_tag("color",{"value":5}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('color_field_tag test complete');
 
assert.equal("<link rel='stylesheet' href='/stylesheet/style.css' type='text/css' charset='utf-8' />",helpers.css_tag("/stylesheet/style.css").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('css_tag test complete');
 
assert.equal("<select value='2007' id='Installation[date][year]' name='Installation[date][year]' ><option value='1960' >1960</option><option value='1961' >1961</option><option value='1962' >1962</option><option value='1963' >1963</option><option value='1964' >1964</option><option value='1965' >1965</option><option value='1966' >1966</option><option value='1967' >1967</option><option value='1968' >1968</option><option value='1969' >1969</option><option value='1970' >1970</option><option value='1971' >1971</option><option value='1972' >1972</option><option value='1973' >1973</option><option value='1974' >1974</option><option value='1975' >1975</option><option value='1976' >1976</option><option value='1977' >1977</option><option value='1978' >1978</option><option value='1979' >1979</option><option value='1980' >1980</option><option value='1981' >1981</option><option value='1982' >1982</option><option value='1983' >1983</option><option value='1984' >1984</option><option value='1985' >1985</option><option value='1986' >1986</option><option value='1987' >1987</option><option value='1988' >1988</option><option value='1989' >1989</option><option value='1990' >1990</option><option value='1991' >1991</option><option value='1992' >1992</option><option value='1993' >1993</option><option value='1994' >1994</option><option value='1995' >1995</option><option value='1996' >1996</option><option value='1997' >1997</option><option value='1998' >1998</option><option value='1999' >1999</option><option value='2000' >2000</option><option value='2001' >2001</option><option value='2002' >2002</option><option value='2003' >2003</option><option value='2004' >2004</option><option value='2005' >2005</option><option value='2006' >2006</option><option value='2007' selected='selected' >2007</option><option value='2008' >2008</option><option value='2009' >2009</option><option value='2010' >2010</option><option value='2011' >2011</option><option value='2012' >2012</option><option value='2013' >2013</option><option value='2014' >2014</option><option value='2015' >2015</option><option value='2016' >2016</option><option value='2017' >2017</option><option value='2018' >2018</option><option value='2019' >2019</option><option value='2020' >2020</option><option value='2021' >2021</option></select><select value='10' id='Installation[date][month]' name='Installation[date][month]' ><option value='0' >January</option><option value='1' >February</option><option value='2' >March</option><option value='3' >April</option><option value='4' >May</option><option value='5' >June</option><option value='6' >July</option><option value='7' >August</option><option value='8' >September</option><option value='9' >October</option><option value='10' selected='selected' >November</option><option value='11' >December</option></select><select value='20' id='Installation[date][day]' name='Installation[date][day]' ><option value='1' >1</option><option value='2' >2</option><option value='3' >3</option><option value='4' >4</option><option value='5' >5</option><option value='6' >6</option><option value='7' >7</option><option value='8' >8</option><option value='9' >9</option><option value='10' >10</option><option value='11' >11</option><option value='12' >12</option><option value='13' >13</option><option value='14' >14</option><option value='15' >15</option><option value='16' >16</option><option value='17' >17</option><option value='18' >18</option><option value='19' >19</option><option value='20' selected='selected' >20</option><option value='21' >21</option><option value='22' >22</option><option value='23' >23</option><option value='24' >24</option><option value='25' >25</option><option value='26' >26</option><option value='27' >27</option><option value='28' >28</option><option value='29' >29</option><option value='30' >30</option><option value='31' >31</option></select>",helpers.date_tag("Installation[date]",{"value":new Date(2007,10,20,1,1,1,1)}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('date_tag test complete');
 
assert.equal("<select value='2007' id='Installation[datetime][year]' name='Installation[datetime][year]' ><option value='1960' >1960</option><option value='1961' >1961</option><option value='1962' >1962</option><option value='1963' >1963</option><option value='1964' >1964</option><option value='1965' >1965</option><option value='1966' >1966</option><option value='1967' >1967</option><option value='1968' >1968</option><option value='1969' >1969</option><option value='1970' >1970</option><option value='1971' >1971</option><option value='1972' >1972</option><option value='1973' >1973</option><option value='1974' >1974</option><option value='1975' >1975</option><option value='1976' >1976</option><option value='1977' >1977</option><option value='1978' >1978</option><option value='1979' >1979</option><option value='1980' >1980</option><option value='1981' >1981</option><option value='1982' >1982</option><option value='1983' >1983</option><option value='1984' >1984</option><option value='1985' >1985</option><option value='1986' >1986</option><option value='1987' >1987</option><option value='1988' >1988</option><option value='1989' >1989</option><option value='1990' >1990</option><option value='1991' >1991</option><option value='1992' >1992</option><option value='1993' >1993</option><option value='1994' >1994</option><option value='1995' >1995</option><option value='1996' >1996</option><option value='1997' >1997</option><option value='1998' >1998</option><option value='1999' >1999</option><option value='2000' >2000</option><option value='2001' >2001</option><option value='2002' >2002</option><option value='2003' >2003</option><option value='2004' >2004</option><option value='2005' >2005</option><option value='2006' >2006</option><option value='2007' selected='selected' >2007</option><option value='2008' >2008</option><option value='2009' >2009</option><option value='2010' >2010</option><option value='2011' >2011</option><option value='2012' >2012</option><option value='2013' >2013</option><option value='2014' >2014</option><option value='2015' >2015</option><option value='2016' >2016</option><option value='2017' >2017</option><option value='2018' >2018</option><option value='2019' >2019</option><option value='2020' >2020</option><option value='2021' >2021</option></select><select value='10' id='Installation[datetime][month]' name='Installation[datetime][month]' ><option value='0' >January</option><option value='1' >February</option><option value='2' >March</option><option value='3' >April</option><option value='4' >May</option><option value='5' >June</option><option value='6' >July</option><option value='7' >August</option><option value='8' >September</option><option value='9' >October</option><option value='10' selected='selected' >November</option><option value='11' >December</option></select><select value='20' id='Installation[datetime][day]' name='Installation[datetime][day]' ><option value='1' >1</option><option value='2' >2</option><option value='3' >3</option><option value='4' >4</option><option value='5' >5</option><option value='6' >6</option><option value='7' >7</option><option value='8' >8</option><option value='9' >9</option><option value='10' >10</option><option value='11' >11</option><option value='12' >12</option><option value='13' >13</option><option value='14' >14</option><option value='15' >15</option><option value='16' >16</option><option value='17' >17</option><option value='18' >18</option><option value='19' >19</option><option value='20' selected='selected' >20</option><option value='21' >21</option><option value='22' >22</option><option value='23' >23</option><option value='24' >24</option><option value='25' >25</option><option value='26' >26</option><option value='27' >27</option><option value='28' >28</option><option value='29' >29</option><option value='30' >30</option><option value='31' >31</option></select><select value='1' id='Installation[datetime][hour]' name='Installation[datetime][hour]' ><option value='0' >0</option><option value='1' selected='selected' >1</option><option value='2' >2</option><option value='3' >3</option><option value='4' >4</option><option value='5' >5</option><option value='6' >6</option><option value='7' >7</option><option value='8' >8</option><option value='9' >9</option><option value='10' >10</option><option value='11' >11</option><option value='12' >12</option><option value='13' >13</option><option value='14' >14</option><option value='15' >15</option><option value='16' >16</option><option value='17' >17</option><option value='18' >18</option><option value='19' >19</option><option value='20' >20</option><option value='21' >21</option><option value='22' >22</option><option value='23' >23</option><option value='24' >24</option></select><select value='1' id='Installation[datetime][minute]' name='Installation[datetime][minute]' ><option value='0' >0</option><option value='1' selected='selected' >1</option><option value='2' >2</option><option value='3' >3</option><option value='4' >4</option><option value='5' >5</option><option value='6' >6</option><option value='7' >7</option><option value='8' >8</option><option value='9' >9</option><option value='10' >10</option><option value='11' >11</option><option value='12' >12</option><option value='13' >13</option><option value='14' >14</option><option value='15' >15</option><option value='16' >16</option><option value='17' >17</option><option value='18' >18</option><option value='19' >19</option><option value='20' >20</option><option value='21' >21</option><option value='22' >22</option><option value='23' >23</option><option value='24' >24</option><option value='25' >25</option><option value='26' >26</option><option value='27' >27</option><option value='28' >28</option><option value='29' >29</option><option value='30' >30</option><option value='31' >31</option><option value='32' >32</option><option value='33' >33</option><option value='34' >34</option><option value='35' >35</option><option value='36' >36</option><option value='37' >37</option><option value='38' >38</option><option value='39' >39</option><option value='40' >40</option><option value='41' >41</option><option value='42' >42</option><option value='43' >43</option><option value='44' >44</option><option value='45' >45</option><option value='46' >46</option><option value='47' >47</option><option value='48' >48</option><option value='49' >49</option><option value='50' >50</option><option value='51' >51</option><option value='52' >52</option><option value='53' >53</option><option value='54' >54</option><option value='55' >55</option><option value='56' >56</option><option value='57' >57</option><option value='58' >58</option><option value='59' >59</option></select>",helpers.date_time_tag("Installation[datetime]",{"value":new Date(2007,10,20,1,1,1,1)}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('date_time_tag test complete');
 
assert.equal("<!DOCTYPE HTML>",helpers.doctype_tag().replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('doctype_tag test complete');
 
assert.equal("<input value='test@email.com' pattern='^[A-Za-z0-9](([_.-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.-]?[a-zA-Z0-9]+)*).([A-Za-z]{2,})$' id='email' type='email' name='email' />",helpers.email_field_tag("email",{"value":"test@email.com"}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('email_field_tag test complete');
 
assert.equal("var i = 5;",helpers.escape_js("var i = 5;").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('escape_js test complete');
 
assert.equal("<input value='5' id='file' type='file' name='file' />",helpers.file_field_tag("file",{"value":5}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('file_field_tag test complete');
 
assert.equal("<form action='/myaction' method='post' enctype='application/x-www-form-urlencoded' >",helpers.form_tag("/myaction").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('form_tag test complete');
 
assert.equal("</form>",helpers.form_end_tag().replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('form_end_tag test complete');
 
assert.equal("<input value='5' id='something[interesting]' type='hidden' name='something[interesting]' />",helpers.hidden_field_tag("something[interesting]",{"value":5}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('hidden_field_tag test complete');
 
assert.equal("<img src='/some.png' />",helpers.img_tag("/some.png").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('img_tag test complete');
 
assert.equal("<input alt='submit' src='/some.png' type='image' />",helpers.image_submit_tag("/some.png",{"alt":"submit"}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('image_submit_tag test complete');
 
assert.equal("<script type='text/javascript' src='/javascript/script.js' charset='utf-8' ></script>",helpers.js_tag("/javascript/script.js").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('js_tag test complete');
 
assert.equal("<input onclick='http://www.google.com' value='google' id='' type='button' name='' />",helpers.js_button("google","http://www.google.com").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('js_button test complete');
 
assert.equal("<label for='user_id' >User</label>",helpers.label_for("user_id").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('label_for test complete');
 
assert.equal("<a href='/something/here' >hello world</a>",helpers.link_to("hello world","/something/here").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('link_to test complete');
 
assert.equal("Reply",helpers.link_to_if(false,"Reply","/reply").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('link_to_if test complete');
 
assert.equal("Reply",helpers.link_to_unless(true,"Reply","/reply").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('link_to_unless test complete');
 
assert.equal("<a href='&#109;&#97;&#105;&#108;&#116;&#111;&#58;%6D%65%40%64%6F%6D%61%69%6E%2E%63%6F%6D?body=did%20you%20get%20that%20thing%20I%20sent%20you&subject=that%20thing%20I%20sent%20you' >Send Me Email</a>",helpers.mail_to("me@domain.com","Send Me Email",{"encode":"hex","subject":"that thing I sent you","body":"did you get that thing I sent you"}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('mail_to test complete');
 
assert.equal("<input value='5' id='number' type='number' name='number' />",helpers.number_field_tag("number",{"value":5}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('number_field_tag test complete');
 
assert.equal("<input value='5' id='something[interesting]' type='password' name='something[interesting]' />",helpers.password_field_tag("something[interesting]",{"value":5}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('password_field_tag test complete');
 
assert.equal("<input value='12345123' pattern='^[0-9]+[- ]*[0-9]+$' id='phony' type='tel' name='phony' />",helpers.phone_field_tag("phony",{"value":12345123}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('phone_field_tag test complete');
 
assert.equal("<input value='user' id='user_radio' type='radio' name='user_radio' />",helpers.radio_tag("user_radio",{"value":"user"}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('radio_tag test complete');
 
assert.equal("<input type='reset' value='Reset' />",helpers.reset_form_tag().replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('reset_form_tag test complete');
 
assert.equal("",helpers.sanitize_css("takes urls out of here").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('sanitize_css test complete');
 
assert.equal("<input id='search' value='' type='search' name='search' />",helpers.search_field_tag("search").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('search_field_tag test complete');
 
assert.equal("<select value='2' id='mySelectElement' name='mySelectElement' ><option value='1' >First Choice</option><option value='2' selected='selected' >Second Choice</option><option value='3' >Third Choice</option></select>",helpers.select_tag("mySelectElement",[{"value":1,"text":"First Choice"},{"value":2,"text":"Second Choice"},{"value":"3","text":"Third Choice"}],{"value":2}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('select_tag test complete');
 
assert.equal("strip links from here",helpers.strip_links("strip <a href=\"google\">links</a> from here").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('strip_links test complete');
 
assert.equal("strip  tags  from here",helpers.strip_tags("strip <b> tags </b> from here").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('strip_tags test complete');
 
assert.equal("<input onclick='window.location=\"/new/location\";return false;' type='submit' value='holla' />",helpers.submit_tag("holla","/new/location").replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('submit_tag test complete');
 
assert.equal("<textarea id='task[description]' name='task[description]' cols='50' rows='4' >Here is some text.\nA new line.</textarea>",helpers.text_area_tag("task[description]",{"value":"Here is some text.\nA new line."}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('text_area_tag test complete');
 
assert.equal("<input value='5' id='something[interesting]' type='text' name='something[interesting]' />",helpers.text_field_tag("something[interesting]",{"value":5}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('text_field_tag test complete');
 
assert.equal("<select value='1' id='Installation[time][hour]' name='Installation[time][hour]' ><option value='0' >0</option><option value='1' selected='selected' >1</option><option value='2' >2</option><option value='3' >3</option><option value='4' >4</option><option value='5' >5</option><option value='6' >6</option><option value='7' >7</option><option value='8' >8</option><option value='9' >9</option><option value='10' >10</option><option value='11' >11</option><option value='12' >12</option><option value='13' >13</option><option value='14' >14</option><option value='15' >15</option><option value='16' >16</option><option value='17' >17</option><option value='18' >18</option><option value='19' >19</option><option value='20' >20</option><option value='21' >21</option><option value='22' >22</option><option value='23' >23</option><option value='24' >24</option></select><select value='1' id='Installation[time][minute]' name='Installation[time][minute]' ><option value='0' >0</option><option value='1' selected='selected' >1</option><option value='2' >2</option><option value='3' >3</option><option value='4' >4</option><option value='5' >5</option><option value='6' >6</option><option value='7' >7</option><option value='8' >8</option><option value='9' >9</option><option value='10' >10</option><option value='11' >11</option><option value='12' >12</option><option value='13' >13</option><option value='14' >14</option><option value='15' >15</option><option value='16' >16</option><option value='17' >17</option><option value='18' >18</option><option value='19' >19</option><option value='20' >20</option><option value='21' >21</option><option value='22' >22</option><option value='23' >23</option><option value='24' >24</option><option value='25' >25</option><option value='26' >26</option><option value='27' >27</option><option value='28' >28</option><option value='29' >29</option><option value='30' >30</option><option value='31' >31</option><option value='32' >32</option><option value='33' >33</option><option value='34' >34</option><option value='35' >35</option><option value='36' >36</option><option value='37' >37</option><option value='38' >38</option><option value='39' >39</option><option value='40' >40</option><option value='41' >41</option><option value='42' >42</option><option value='43' >43</option><option value='44' >44</option><option value='45' >45</option><option value='46' >46</option><option value='47' >47</option><option value='48' >48</option><option value='49' >49</option><option value='50' >50</option><option value='51' >51</option><option value='52' >52</option><option value='53' >53</option><option value='54' >54</option><option value='55' >55</option><option value='56' >56</option><option value='57' >57</option><option value='58' >58</option><option value='59' >59</option></select>",helpers.time_tag("Installation[time]",{"value":new Date(2007,10,20,1,1,1,1)}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('time_tag test complete');
 
assert.equal("<input value='website.com' id='url' type='url' name='url' />",helpers.url_field_tag("url",{"value":"website.com"}).replace(/"/g, "\"").replace(/\n/g, "\n") )
console.log('url_field_tag test complete');
 
