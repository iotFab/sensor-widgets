define("home",["SensorWidget","bootstrap"],function(e){"use strict";function r(e){return e.charAt(0).toUpperCase()+e.slice(1)}function t(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var i=15,n=120,o=new Date,a=new Date(o.getTime()-108e5),s=new Date(o.getTime()-864e5),f={service:function(){return"http://sensors.portdebarcelona.cat/sos/json"},offering:function(e){return"http://sensors.portdebarcelona.cat/def/weather/offerings#"+e},feature:function(e){return"http://sensors.portdebarcelona.cat/def/weather/features#"+e},property:function(e){return"http://sensors.portdebarcelona.cat/def/weather/properties#"+e}};o=o.toISOString().substring(0,19)+"Z",a=a.toISOString().substring(0,19)+"Z",s=s.toISOString().substring(0,19)+"Z";var p={bearing:{service:f.service(),offering:f.offering("1m"),feature:f.feature("02"),property:f.property("31"),refresh_interval:i},gauge:{service:f.service(),offering:f.offering("10m"),feature:f.feature("02"),property:f.property("33"),refresh_interval:n},jqgrid:{service:f.service(),offering:f.offering("30m"),title:"jqGrid Example",features:[f.feature("02"),f.feature("01")],properties:[f.property("32")],time_start:a,time_end:o},map:{service:f.service(),offering:f.offering("30m"),features:[f.feature("01"),f.feature("02"),f.feature("03"),f.feature("P4"),f.feature("10"),f.feature("P5"),f.feature("P6")]},panel:{title:"Last observations",service:f.service(),offering:f.offering("1m"),feature:f.feature("02"),properties:[f.property("30"),f.property("31"),f.property("32"),f.property("33"),f.property("34"),f.property("35"),f.property("36")],refresh_interval:i},progressbar:{service:f.service(),offering:f.offering("10m"),feature:f.feature("01"),property:f.property("34"),min_value:"900",max_value:"1100",refresh_interval:n},table:{title:"Data Table - last 3 hours",service:f.service(),offering:f.offering("30m"),feature:f.feature("02"),properties:[f.property("30"),f.property("31"),f.property("32"),f.property("33"),f.property("34"),f.property("36")],time_start:a,time_end:o},thermometer:{service:f.service(),offering:f.offering("10m"),feature:f.feature("01"),property:f.property("32"),refresh_interval:n},timechart:{service:f.service(),offering:f.offering("30m"),title:"Temperatures",features:[f.feature("02"),f.feature("01")],properties:[f.property("32")],time_start:s,time_end:o},windrose:{title:"Sirena Windrose",subtitle:"Last 3 hours of wind observations",service:f.service(),offering:f.offering("1m"),feature:f.feature("02"),properties:[f.property("30"),f.property("31")],time_start:a,time_end:o,refresh_interval:n}},u="",c="";for(var g in p)u+='<li><a href="#'+g+'">'+r(g)+"</a></li>",c+='             <div class="anchor" id="'+g+'"></div>             <h1><i class="flaticon-'+g+'"></i>&nbsp;&nbsp;'+r(g)+'</h1>             <div class="row">                 <div class="col-md-6">                     <div class="thumbnail widget-container" id="'+g+'-container"></div>                 </div>                 <div class="col-md-6">                     <div id="'+g+'-inputs"></div>                     <pre id="'+g+'-url"></pre>                     <pre id="'+g+'-iframe"></pre>                     <pre id="'+g+'-code"></pre>                 </div>             </div>';document.getElementById("widget-menu").innerHTML=u,document.getElementById("widget-list").innerHTML=c;var l=function(e,t,i){var n="<strong>"+r(this.name)+" Widget Interface:</strong><ul>";n+="<li><strong>Mandatory Inputs:</strong> "+e.join(", "),n+="<li><strong>Optional Inputs:</strong> "+t.join(", "),n+="<li><strong>Preferred Sizes:</strong> "+i.map(function(e){return e.w+" x "+e.h+" px"}).join(", ")+"</ul>",document.getElementById(this.name+"-inputs").innerHTML=n};for(g in p){p[g].footnote="A sample footnote for "+g+" widget";var d=new e(g,p[g],document.getElementById(g+"-container"));d.inspect(l.bind({name:g})),document.getElementById(g+"-url").innerHTML='<a href="'+d.url()+'" target="_blank">'+d.url()+"</a>",document.getElementById(g+"-iframe").innerHTML=t(d.iframe()),document.getElementById(g+"-code").innerHTML=d.javascript()}}),requirejs.config({baseUrl:"js/"}),requirejs(["home"]);