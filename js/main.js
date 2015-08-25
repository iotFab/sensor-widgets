/* This work is licensed under Creative Commons GNU LGPL License.

 License: http://creativecommons.org/licenses/LGPL/2.1/
 Version: 0.9
 Author:  Stefan Goessner/2006
 See:     http://goessner.net/download/prj/jsonxml/
 */

/**
 * @license RequireJS text 2.0.14 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

require.config({waitSeconds:30,baseUrl:"../js",paths:{text:"../lib/requirejs-text/text",bootstrap:"../lib/bootstrap/bootstrap",daterangepicker:"../lib/bootstrap-daterangepicker/daterangepicker",flot:"../lib/flot/jquery.flot","flot-navigate":"../lib/flot/jquery.flot.navigate","flot-resize":"../lib/flot/jquery.flot.resize","flot-time":"../lib/flot/jquery.flot.time","flot-tooltip":"../lib/flot.tooltip/jquery.flot.tooltip",highcharts:"../lib/highcharts/highcharts","highcharts-more":"../lib/highcharts/highcharts-more",jquery:"../lib/jquery/jquery","jquery-ui":"../lib/jquery-ui/jquery-ui",jqgrid:"../lib/jqgrid/jquery.jqGrid","jqgrid-locale-en":"../lib/jqgrid/grid.locale-en",leaflet:"../lib/leaflet/leaflet","leaflet-label":"../lib/Leaflet.label/leaflet.label",moment:"../lib/moment/moment"},shim:{bootstrap:{deps:["jquery"]},daterangepicker:{deps:["bootstrap","moment","jquery","css!../lib/bootstrap-daterangepicker/daterangepicker-bs3.css"]},flot:{deps:["jquery"]},"flot-navigate":{deps:["flot"]},"flot-resize":{deps:["flot"]},"flot-time":{deps:["flot"]},"flot-tooltip":{deps:["flot"]},highcharts:{exports:"Highcharts",deps:["jquery"]},"highcharts-more":{deps:["highcharts"]},"jquery-ui":{deps:["jquery","css!../css/jquery-ui.css"]},jqgrid:{deps:["jquery-ui","jqgrid-locale-en","css!../lib/jqgrid/ui.jqgrid.css"]},"jqgrid-locale-en":{deps:["jquery"]},leaflet:{deps:["css!../lib/leaflet/leaflet.css"]},"leaflet-label":{deps:["leaflet","css!../lib/Leaflet.label/leaflet.label.css"]}}}),function(e){var t;if(document.currentScript)t=document.currentScript;else{var r=document.getElementsByTagName("script");t=r[r.length-1]}var n=t.src.replace(/[^\/]*$/,"");console.debug("Sensor Widgets Base URL is:"+n),e.config({baseUrl:n})}(requirejs),define("main",function(){}),define("XML",[],function(){"use strict";return{read:function(e,t){var r={at:t?"":"@",toObj:function(e){var n={};if(1==e.nodeType){if(e.attributes.length)for(var i=0;i<e.attributes.length;i++){var o=e.attributes[i].name,a=e.attributes[i].value,s=0===o.lastIndexOf("xmlns:",0);t&&s||(n[r.at+o]=(a||"").toString())}if(e.firstChild){for(var l=0,u=0,c=!1,d=e.firstChild;d;d=d.nextSibling)1==d.nodeType?c=!0:3==d.nodeType&&d.nodeValue.match(/[^ \f\n\r\t\v]/)?l++:4==d.nodeType&&u++;if(c)if(2>l&&2>u)for(r.removeWhite(e),d=e.firstChild;d;d=d.nextSibling)3==d.nodeType?n["#text"]=r.escape(d.nodeValue):4==d.nodeType?n["#cdata"]=r.escape(d.nodeValue):n[d.nodeName]?n[d.nodeName]instanceof Array?n[d.nodeName][n[d.nodeName].length]=r.toObj(d):n[d.nodeName]=[n[d.nodeName],r.toObj(d)]:n[d.nodeName]=r.toObj(d);else e.attributes.length?n["#text"]=r.escape(r.innerXml(e)):n=r.escape(r.innerXml(e));else if(l)e.attributes.length?n["#text"]=r.escape(r.innerXml(e)):n=r.escape(r.innerXml(e));else if(u)if(u>1)n=r.escape(r.innerXml(e));else for(d=e.firstChild;d;d=d.nextSibling)n["#cdata"]=r.escape(d.nodeValue)}e.attributes.length||e.firstChild||(n=null)}else if(9==e.nodeType)n=r.toObj(e.documentElement);else{if(8==e.nodeType)return e.data;console.error("unhandled node type: "+e.nodeType)}return n},innerXml:function(e){var t="";if("innerHTML"in e)t=e.innerHTML;else for(var r=function(e){var t="";if(1==e.nodeType){t+="<"+e.nodeName;for(var n=0;n<e.attributes.length;n++){var i=e.attributes[n].name,o=e.attributes[n].value||"";t+=" "+i+'="'+o.toString()+'"'}if(e.firstChild){t+=">";for(var a=e.firstChild;a;a=a.nextSibling)t+=r(a);t+="</"+e.nodeName+">"}else t+="/>"}else 3==e.nodeType?t+=e.nodeValue:4==e.nodeType&&(t+="<![CDATA["+e.nodeValue+"]]>");return t},n=e.firstChild;n;n=n.nextSibling)t+=r(n);return t},escape:function(e){return e.replace(/[\\]/g,"\\\\").replace(/[\"]/g,'\\"').replace(/[\n]/g,"\\n").replace(/[\r]/g,"\\r")},removeWhite:function(e){e.normalize();for(var t=e.firstChild;t;)if(3==t.nodeType)if(t.nodeValue.match(/[^ \f\n\r\t\v]/))t=t.nextSibling;else{var n=t.nextSibling;e.removeChild(t),t=n}else 1==t.nodeType?(r.removeWhite(t),t=t.nextSibling):t=t.nextSibling;return e}};t&&(e=e.replace(/<(\/?)([^:>\s]*:)?([^>]+)>/g,"<$1$3>")),e=(new DOMParser).parseFromString(e,"text/xml"),9==e.nodeType&&(e=e.documentElement);var n={};return n[e.nodeName]=r.toObj(r.removeWhite(e)),n},write:function(e){var t=function(e,r,n){var i="";if(e instanceof Array)for(var o=0,a=e.length;a>o;o++)i+=n+t(e[o],r,n+"	")+"\n";else if("object"==typeof e){var s=!1;i+=n+"<"+r;for(var l in e)"@"==l.charAt(0)?i+=" "+l.substr(1)+'="'+e[l].toString()+'"':s=!0;if(i+=s?">":"/>",s){for(l in e)"#text"==l?i+=e[l]:"#cdata"==l?i+="<![CDATA["+e[l]+"]]>":"@"!=l.charAt(0)&&(i+=t(e[l],l,n+"	"));i+=("\n"==i.charAt(i.length-1)?n:"")+"</"+r+">"}}else i+=n+"<"+r+">"+e.toString()+"</"+r+">";return i},r="";for(var n in e)r+=t(e[n],n,"");return r}}}),define("errorhandler",[],function(){"use strict";function e(e){var t=document.getElementById("builderError");t?t.innerHTML=e:console.error(e)}function t(){var e=document.getElementById("builderError");e&&(e.innerHTML="")}function r(e,t){t||(t=document.body);var r=document.createElement("div");r.className="text-danger error",t.appendChild(r),r.innerHTML="Error: "+e}return{throwError:function(t){e(t)},hideError:function(){t()},throwWidgetError:function(e,t){r(e,t)}}}),define("SOS",["XML","errorhandler"],function(e,t){"use strict";var r={_url:null,setUrl:function(e){this._url=e},getCapabilities:function(e){var t={request:"GetCapabilities",sections:["Contents"]};this._send(t,function(t){e(t.contents)})},describeSensor:function(t,r){var n={request:"DescribeSensor",procedure:t,procedureDescriptionFormat:"http://www.opengis.net/sensorML/1.0.1"};this._send(n,function(t){var n=t.procedureDescription.description,i=e.read(n,!0);r(i.SensorML.member)})},getFeatureOfInterest:function(e,t){var r={request:"GetFeatureOfInterest",procedure:e};this._send(r,function(e){t(e.featureOfInterest)})},getDataAvailability:function(e,t,r,n){var i={request:"GetDataAvailability"};e&&(i.procedure=e),t&&(i.featureOfInterest=t),r&&(i.observedProperty=r),this._send(i,function(e){n(e.dataAvailability)})},getObservation:function(e,t,r,n,i){var o={request:"GetObservation"};if(e&&(o.offering=e),t&&t.length&&(o.featureOfInterest=t),r&&r.length&&(o.observedProperty=r),n){var a;a=n.length&&2==n.length?"during":"equals";var s={};s[a]={ref:"om:resultTime",value:n},o.temporalFilter=[s]}this._send(o,function(e){i(e.observations)})},_send:function(e,r){e.service="SOS",e.version="2.0.0";var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4==n.readyState)if(200==n.status){var e=JSON.parse(n.responseText);r.call(this,e)}else console.error("Error accessing "+this._url),t.throwError("Server "+this._url+" does not seem to respond")}.bind(this),n.open("POST",this._url,!0),n.setRequestHeader("Content-Type","application/json"),n.setRequestHeader("Accept","application/json"),n.send(JSON.stringify(e))}};return r}),define("sos-data-access",["SOS"],function(e){"use strict";var t={},r={},n={};return function(i,o){function a(){var t=i.offering,r=i.feature?[i.feature]:s(i.features)?i.features:JSON.parse(i.features),n=i.property?[i.property]:s(i.properties)?i.properties:JSON.parse(i.properties),o=i.time_start&&i.time_end?[i.time_start,i.time_end]:"latest";e.getObservation(t,r,n,o,l)}function s(e){return"[object Array]"===Object.prototype.toString.call(e)}function l(e){function t(t,n){r.push({time:new Date(n.resultTime),value:n.result.hasOwnProperty("value")?n.result.value:n.result,feature:n.featureOfInterest.name.value,property:t,uom:n.result.hasOwnProperty("uom")?n.result.uom:"(N/A)"}),r.length==e.length&&o(r)}e.length||o([]);var r=[];for(var n in e){var i=e[n];u(i.procedure,i.observableProperty,t,i)}}function u(i,o,a,s){t[i]?a(t[i][o],s):(n[i]||(n[i]=[]),n[i].push({callback:a,id:o,context:s}),r[i]||(r[i]=!0,e.describeSensor(i,function(e){var r=e.hasOwnProperty("ProcessModel")?e.ProcessModel.outputs.OutputList.output:e.System.outputs.OutputList.output;r=r instanceof Array?r:[r];var o=["Quantity","Count","Boolean","Category","Text","ObservableProperty"],a=[];for(var s in r){var l=r[s];for(var u in o){var c=o[u];l.hasOwnProperty(c)&&(l.id=l[c].definition)}a[l.id]=l.name}for(t[i]=a;n[i].length;){var d=n[i].shift();d.callback.call(void 0,t[i][d.id],d.context)}})))}return e.setUrl(i.service),{read:a}}}),define("widget-common",[],function(){"use strict";function e(e){var t=document.createElement("link");t.setAttribute("rel","stylesheet"),t.setAttribute("type","text/css"),t.setAttribute("href",e),"undefined"!=typeof t&&document.getElementsByTagName("head")[0].appendChild(t)}return{inputs:["service","offering"],optional_inputs:["footnote","custom_css_url"],init:function(t,r){void 0!==t.custom_css_url&&e(t.custom_css_url),void 0!==t.footnote&&r.querySelector(".footnote")&&(r.querySelector(".footnote").innerHTML=t.footnote)}}}),define("locale-date",[],function(){"use strict";var e={utc:!1,locale:navigator.language||navigator.browserLanguage};return{display:function(t){return t?e.utc?t.toLocaleString(e.locale,{timeZone:"UTC"})+" UTC":t.toLocaleString(e.locale):"(no date)"},locale:function(t){return t&&(e.locale=t),e.locale},utc:function(t){return"undefined"!=typeof t&&(e.utc=t),e.utc}}}),define("SensorWidget",["errorhandler"],function(e){"use strict";function t(e,t){return e.replace(/^(?=.)/gm,new Array(t+1).join(" "))}function r(t,r,n,i){var o=[];for(var a in r){var s=r[a];n.hasOwnProperty(s)||o.push(s)}return o.length&&e.throwWidgetError("The '"+t+"' widget is missing some mandatory parameters: "+o.join(", "),i),!o.length}var n={},i=function(e){return function(){return"SensorWidgetTarget-"+ ++e}}(0);return function(o,a,s){s||(s=document.body);var l=s;return o&&a?(s.id||(s.id=i()),a.service||(a.service="/52n-sos/sos/json"),require(["widget/"+o],function(e){s.innerHTML="",n.hasOwnProperty(s.id)&&n[s.id]&&n[s.id].hasOwnProperty("destroy")&&(console.debug("Destroying previous widget on ElementId="+s.id),n[s.id].destroy(),delete n[s.id]),r(o,e.inputs,a,l)&&(console.debug("Creating new "+o+" widget on ElementId="+s.id),n[s.id]=e.init(a,s))},function(){e.throwWidgetError("Widget '"+o+"' cannot be found.",l)})):o||e.throwWidgetError("No widget name specified.",l),{name:o,config:a,renderTo:s,inspect:function(e){require(["widget/"+o],function(t){e.call(this,t.inputs,t.optional_inputs,t.preferredSizes)})},url:function(){function e(e){var t=[];return e.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(e){"/.."===e?t.pop():t.push(e)}),t.join("").replace(/^\//,"/"===e.charAt(0)?"/":"")}var t=e(require.toUrl("../widget/"))+"?";return t+="name="+encodeURIComponent(o)+"&",t+=Object.keys(a).map(function(e){var t=a[e];return"object"==typeof a[e]&&(t=JSON.stringify(a[e])),e+"="+encodeURIComponent(t)}).join("&")},iframe:function(e,t){return e=e?e:"100%",t=t?t:"100%",'<iframe src="'+this.url()+'" width="'+e+'" height="'+t+'" frameBorder="0"></iframe>'},javascript:function(){var e="SensorWidget('"+o+"', "+JSON.stringify(a,null,3)+",\r\ndocument.getElementById('"+o+"-container'));\r\n";return"require(['SensorWidget'], function(SensorWidget) {\r\n"+t(e,3)+"});"}}}}),define("css",{load:function(e,t,r){function n(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("link");n.href=e,n.rel="stylesheet",n.type="text/css",n.onload=function(){r()},t.appendChild(n)}"undefined"==typeof document?r():n(t.toUrl(e))}}),define("text",["module"],function(e){"use strict";var t,r,n,i,o,a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],s=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,l=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,u="undefined"!=typeof location&&location.href,c=u&&location.protocol&&location.protocol.replace(/\:/,""),d=u&&location.hostname,f=u&&(location.port||void 0),p={},g=e.config&&e.config()||{};return t={version:"2.0.14",strip:function(e){if(e){e=e.replace(s,"");var t=e.match(l);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:g.createXhr||function(){var e,t,r;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(t=0;3>t;t+=1){r=a[t];try{e=new ActiveXObject(r)}catch(n){}if(e){a=[r];break}}return e},parseName:function(e){var t,r,n,i=!1,o=e.lastIndexOf("."),a=0===e.indexOf("./")||0===e.indexOf("../");return-1!==o&&(!a||o>1)?(t=e.substring(0,o),r=e.substring(o+1)):t=e,n=r||t,o=n.indexOf("!"),-1!==o&&(i="strip"===n.substring(o+1),n=n.substring(0,o),r?r=n:t=n),{moduleName:t,ext:r,strip:i}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,r,n,i){var o,a,s,l=t.xdRegExp.exec(e);return l?(o=l[2],a=l[3],a=a.split(":"),s=a[1],a=a[0],!(o&&o!==r||a&&a.toLowerCase()!==n.toLowerCase()||(s||a)&&s!==i)):!0},finishLoad:function(e,r,n,i){n=r?t.strip(n):n,g.isBuild&&(p[e]=n),i(n)},load:function(e,r,n,i){if(i&&i.isBuild&&!i.inlineText)return void n();g.isBuild=i&&i.isBuild;var o=t.parseName(e),a=o.moduleName+(o.ext?"."+o.ext:""),s=r.toUrl(a),l=g.useXhr||t.useXhr;return 0===s.indexOf("empty:")?void n():void(!u||l(s,c,d,f)?t.get(s,function(r){t.finishLoad(e,o.strip,r,n)},function(e){n.error&&n.error(e)}):r([a],function(e){t.finishLoad(o.moduleName+"."+o.ext,o.strip,e,n)}))},write:function(e,r,n){if(p.hasOwnProperty(r)){var i=t.jsEscape(p[r]);n.asModule(e+"!"+r,"define(function () { return '"+i+"';});\n")}},writeFile:function(e,r,n,i,o){var a=t.parseName(r),s=a.ext?"."+a.ext:"",l=a.moduleName+s,u=n.toUrl(a.moduleName+s)+".js";t.load(l,n,function(){var r=function(e){return i(u,e)};r.asModule=function(e,t){return i.asModule(e,u,t)},t.write(e,l,r,o)},o)}},"node"===g.env||!g.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]&&!process.versions["atom-shell"]?(r=require.nodeRequire("fs"),t.get=function(e,t,n){try{var i=r.readFileSync(e,"utf8");"﻿"===i[0]&&(i=i.substring(1)),t(i)}catch(o){n&&n(o)}}):"xhr"===g.env||!g.env&&t.createXhr()?t.get=function(e,r,n,i){var o,a=t.createXhr();if(a.open("GET",e,!0),i)for(o in i)i.hasOwnProperty(o)&&a.setRequestHeader(o.toLowerCase(),i[o]);g.onXhr&&g.onXhr(a,e),a.onreadystatechange=function(){var t,i;4===a.readyState&&(t=a.status||0,t>399&&600>t?(i=new Error(e+" HTTP status: "+t),i.xhr=a,n&&n(i)):r(a.responseText),g.onXhrComplete&&g.onXhrComplete(a,e))},a.send(null)}:"rhino"===g.env||!g.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?t.get=function(e,t){var r,n,i="utf-8",o=new java.io.File(e),a=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o),i)),l="";try{for(r=new java.lang.StringBuffer,n=s.readLine(),n&&n.length()&&65279===n.charAt(0)&&(n=n.substring(1)),null!==n&&r.append(n);null!==(n=s.readLine());)r.append(a),r.append(n);l=String(r.toString())}finally{s.close()}t(l)}:("xpconnect"===g.env||!g.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(n=Components.classes,i=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),o="@mozilla.org/windows-registry-key;1"in n,t.get=function(e,t){var r,a,s,l={};o&&(e=e.replace(/\//g,"\\")),s=new FileUtils.File(e);try{r=n["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream),r.init(s,1,0,!1),a=n["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream),a.init(r,"utf-8",r.available(),i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),a.readString(r.available(),l),a.close(),r.close(),t(l.value)}catch(u){throw new Error((s&&s.path||"")+": "+u)}}),t});