define("wizard",["i18n","SensorWidget","SOS","jquery","moment","daterangepicker","jquery-ui","bootstrap"],function(e,t,a,r,n){"use strict";function i(){var e=["bearing","gauge","jqgrid","map","panel","progressbar","table","thermometer","timechart","windrose"],t=["default","primary","success","info","warning","danger"],a="";for(var n in e){var i=e[n],o=t[n%t.length];a+='<a role="button" class="menu-btn btn btn-'+o+' btn-lg" id="'+i+'"><div class="flaticon-'+i+'"></div>'+v(i)+"&nbsp;&nbsp;»</a>"}document.getElementById("main-menu").innerHTML=a,r(".menu-btn").click(function(){s(this.id)})}function o(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function s(a){r("#widget-form-title").html(e.t("{name} Widget Configuration",{name:v(a)})),new t(a).inspect(function(t,n,i){var o,s,f,b,h="<fieldset><legend>"+e.t("Mandatory inputs")+"</legend>";for(var y in t){switch(o=t[y],s="",f=v(o),b="",o){case"service":case"offering":case"feature":case"property":s='<select class="form-control" id="'+o+'"></select>';break;case"features":case"properties":s='<select class="form-control" multiple id="'+o+'"></select>',f+=" "+e.t("(multiselect)");break;case"refresh_interval":var w=[5,10,30,60,120];for(var k in w){var z=w[k];b+='<option id="'+z+'">'+z+"</option>"}s='<select class="form-control" id="'+o+'">'+b+"</select>";break;case"time_start":r.inArray("time_end",t)&&(f=e.t("Time Range")+" (UTC)",s='<input class="form-control" type="text" id="time_range" disabled />');break;case"time_end":break;default:s='<input class="form-control" type="text" value="" id="'+o+'"/>'}s&&(h+='<div class="form-group"><label class="col-lg-4 control-label" for="'+o+'">'+f+'</label><div class="col-lg-8">'+s+"</div></div>")}h+="</fieldset>",h+="<fieldset><legend>"+e.t("Optional inputs")+"</legend>";for(y in n){switch(o=n[y],s="",f=v(o),b="",o){case"footnote":s='<textarea class="form-control" value="" id="'+o+'"></textarea>';break;case"base_map":for(var L in t.base_maps)b+='<option id="'+L+'">'+L+"</option>";s='<select class="form-control" id="'+o+'">'+b+"</select>";break;default:s='<textarea class="form-control" value="" id="'+o+'"></textarea>'}h+='<div class="form-group"><label class="col-lg-4 control-label" for="'+o+'">'+f+'</label><div class="col-lg-8">'+s+"</div></div>"}h+="</fieldset>",h+="<fieldset><legend>"+e.t("Widget dimensions")+"</legend>",o="sizes",f=e.t("Initial Size");for(y in i){var T=i[y];b+='<option id="size" value="'+y+'">'+T.w+" x "+T.h+" px</option>"}var D='<select class="form-control" id="sizes">'+b+"</select>";h+='<div class="form-group"><label class="col-lg-4 control-label" for="'+o+'">'+f+'</label><div class="col-lg-8">'+D+"</div></div>",h+="</fieldset>",h+='<input type="button" name="build" class="btn btn-primary pull-right" value="'+e.t("Create Widget")+'&nbsp;&nbsp;»"/>',r("#widget-form").html(h),r('[name="build"]').data({name:a,inputs:t,optionalInputs:n,preferredSizes:i}).click(g),l(["http://demo.geomati.co/sos/json","http://sensors.portdebarcelona.cat/sos/json","/52n-sos/sos/json"]),r("#service").change(function(){m();var e=r("#service").find("option:selected").attr("id");c(e)}),r("#offering").change(function(){var e=r("#offering").find("option:selected").data("procedure");p(e),d(e)}),r("#feature").change(function(){u()}),r("#features").change(function(){u()}),r("#property").change(function(){u()}),r("#properties").change(function(){u()})})}function l(t){var a=r("#service");if(t&&a){a.append(r("<option>").append(e.t("Select a Service...")));for(var n in t){var i=t[n];a.append(r("<option>").attr("id",i).append(i))}}}function c(t){f("#offering","#property","#properties","#feature","#features"),t&&(r("#offering").append(r("<option>").append(e.t("Select an Offering..."))),a.setUrl(t),a.getCapabilities(function(e){for(var t in e){var a=e[t];r("#offering").append(r("<option>").attr("id",a.identifier).data("procedure",a.procedure[0]).append(a.name))}},m))}function d(e){f("#property","#properties"),e&&a.describeSensor(e,function(e){var t=e.hasOwnProperty("ProcessModel")?e.ProcessModel.outputs.OutputList.output:e.System.outputs.OutputList.output;t=t instanceof Array?t:[t];for(var a in t){var n=t[a],i=["Quantity","Count","Boolean","Category","Text","ObservableProperty"];for(var o in i){var s=i[o];n.hasOwnProperty(s)&&(n.type=s,n.id=n[s].definition,n.description=n.name+" ("+s,"Quantity"==s&&n[s].hasOwnProperty("uom")&&(n.description+=" ["+n[s].uom.code+"]"),n.description+=")")}r("#property, #properties").append(r("<option>").attr("id",n.id).append(n.description))}},m)}function p(e){f("#feature","#features"),e&&a.getFeatureOfInterest(e,function(e){for(var t in e){var a=e[t],n=a.identifier.value,i=a.name.value;r("#feature, #features").append(r("<option>").attr("id",n).append(i))}},m)}function u(){var t=r("#time_range");if(t.length){var i=r("#offering").find("option:selected").data("procedure"),o=r("#feature").find("option:selected").attr("id"),s=r("#property").find("option:selected").attr("id"),l=o?o:r("#features").find("option:selected").map(function(){return this.id}).get(),c=s?s:r("#properties").find("option:selected").map(function(){return this.id}).get();a.getDataAvailability(i,l,c,function(a){for(var r,i,o=a[0].phenomenonTime[0],s=a[0].phenomenonTime[1],l=1;l<a.length;l++)r=a[l].phenomenonTime[0],i=a[l].phenomenonTime[1],o>r&&(o=r),i>s&&(s=i);n.locale(e.getLang());var c=[];c[e.t("Today")]=[n().startOf("day"),n()],c[e.t("Last hour")]=[n().subtract(1,"hour"),n()];for(var d in[3,6,12,24])c[e.t("Last {n} hours",{n:d})]=[n().subtract(d,"hours"),n()];var p,u={timePicker:!0,format:e.t("MMM D, YYYY H:mm"),timePickerIncrement:5,timePicker12Hour:!1,timePickerSeconds:!1,timeZone:"+00:00",minDate:n.utc(o),maxDate:n.utc(s),dateLimit:{days:7},ranges:c,locale:{applyLabel:e.t("Apply"),cancelLabel:e.t("Cancel"),fromLabel:e.t("From"),toLabel:e.t("To"),weekLabel:e.t("W"),customRangeLabel:e.t("Custom Range")}};if(t.prop("disabled"))t.daterangepicker(u),p=t.data("daterangepicker"),t.prop("disabled",!1),p.setStartDate(n.max(n.utc(o),n.utc(s).subtract(1,"day"))),p.setEndDate(n.utc(s));else{p=t.data("daterangepicker"),p.setOptions(u);var f=(new Date).getTimezoneOffset();r=p.startDate.subtract(f,"minutes"),i=p.endDate.subtract(f,"minutes"),p.setStartDate(n.max(n.utc(o),r)),p.setEndDate(n.min(n.utc(s),i))}},m)}}function f(){for(var e=0;e<arguments.length;e++)r(arguments[e])&&r(arguments[e]).find("option").remove();r("#time_start").val(""),r("#time_end").val("")}function g(){var e,a,n,i=r('[name="build"]').data(),s={},l=function(){return this.id};for(var c in i.inputs){switch(e=i.inputs[c],a=r("#"+e),e){case"service":case"offering":case"feature":case"property":n=a.find("option:selected").attr("id");break;case"features":case"properties":n=a.find("option:selected").map(l).get();break;case"time_start":n=r("#time_range").data("daterangepicker").startDate.utc().format("YYYY-MM-DD[T]HH:mm:ss[Z]");break;case"time_end":n=r("#time_range").data("daterangepicker").endDate.utc().format("YYYY-MM-DD[T]HH:mm:ss[Z]");break;default:n=a.val()}n&&(s[e]=n)}for(c in i.optionalInputs)e=i.optionalInputs[c],a=r("#"+e),n=a.val(),n&&(s[e]=n);var d=i.preferredSizes[r("#sizes").val()],p=r("#widget-container");p.draggable(),p.resizable("destroy"),r("#widget-container").width(d.w).height(d.h+39);var u=new t(i.name,s,w);p.resizable({helper:"ui-resizable-helper",resize:function(e,t){document.getElementById("embed").innerHTML=o(u.iframe(t.size.width,t.size.height-39))}}),document.getElementById("code").innerHTML=u.javascript(),document.getElementById("embed").innerHTML=o(u.iframe(d.w,d.h)),document.getElementById("link").innerHTML='<a href="'+u.url()+'" target="_blank">'+u.url()+"</a>"}function m(e,t,a){var r="";t&&(r="["+t+"] "),a&&a.request&&(r+=a.request+": "),e&&(r+=e),w.innerHTML='<div class="text-danger">'+r+"</div>"}function v(t){return e.t(t.toLowerCase().replace(/_/g," ").replace(/(?:^|\s)\S/g,function(e){return e.toUpperCase()}))}var b={"Sensor Widget Wizard":{es:"Wizard Sensor Widgets",ca:"Wizard Sensor Widgets"},"Widget Configuration Form":{es:"Formulario de configuración",ca:"Formulari de configuració"},"Widget View":{es:"Vista del Widget",ca:"Vista del Widget"},"Take Away":{es:"Para llevar",ca:"Emporteu-vos-el"}};e.addTranslations(b),e.translateDocTree();var h='<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'+e.langs()[e.getLang()]+' <span class="caret"></span></a>';h+='<ul class="dropdown-menu">';for(var y in e.langs())y!=e.getLang()&&(h+='<li><a href="?lang='+y+'">'+e.langs()[y]+"</a></li>");h+="</ul>",document.getElementById("lang-selector").innerHTML=h,i(),r(".panel").draggable({handle:".panel-heading"}),r(".width-resizable-panel").resizable({handles:"e, w"}),r("#widget-container").resizable();var w=document.getElementById("widget-view")}),require(["wizard"]);