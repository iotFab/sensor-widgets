/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['sos-data-access', 'text!widget/bearing.svg', 'locale-date', 'plugins', 'mix'], function(data_access, drawing, ld, plugins, mix) {
    "use strict";

    var inputs = ["service", "offering", "feature", "property", "refresh_interval"];

    var template = [
        '<div class="bearing widget">',
            '<h1 class="feature"></h1>',
            drawing,
            '<div class="error" style="display:none;text-align:center;">(no data)</div>',
            '<h2><span class="property"></span>:<br/><span class="value"></span> deg</h2>',
            '<h3>Request time:<br/><span class="request_time"></span></h3>',
            '<h3>Result time:<br/><span class="result_time"></span></h3>',
        '</div>'].join('');

    var widget = {

        init: function(config, el) {

            return mix({
                inputs: inputs,

                config: null,

                el: null,

                init: function(config, el) {

                    this.config = config;
                    this.el = el;
                    this.el.innerHTML = template;

                    // Setup SOS data access
                    var data = data_access.call(this, config, this.redraw);
                    data.read();

                    for (var p in plugins) {
                        plugins[p].init.call(this, config, el, data);
                    }
                },

                redraw: function(data) {
                    var measure = data[0];
                    this.el.querySelector(".error").style.display = 'none';
                    this.el.querySelector(".request_time").innerHTML = ld.display(new Date());
                    this.el.querySelector(".result_time").innerHTML = ld.display(measure.time);
                    this.el.querySelector(".value").innerHTML = measure.value;
                    this.el.querySelector(".feature").innerHTML = measure.feature;
                    this.el.querySelector(".property").innerHTML = measure.property;
                    this.el.querySelector(".arrow").setAttribute("transform", "rotate(" + measure.value + ", 256, 256)");
                    this.el.querySelector(".shadow").setAttribute("transform", "translate(5, 5) rotate(" + measure.value + ", 256, 256)");
                    this.el.querySelector(".arrow").style.visibility = this.el.querySelector(".shadow").style.visibility = 'visible';
                }

            }, plugins).init(config, el);
        },

    };

    return widget;

});
