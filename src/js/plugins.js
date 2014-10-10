define([], function() {
    "use strict";

    var template = [
        '<div class="refresh plugin" style="position:absolute;border:1px solid red;bottom:0;right:0;">',
            '<h1></h1>',
        '</div>'].join('');

    return {
        refresh: {

            init: function(config, el, data) {

                return {
                    time_left: 0,

                    counter: null,

                    init: function(config, el, data) {
                        if (config.refresh_interval) {
                            el.innerHTML += template;
                            this.counter = el.querySelector(".refresh.plugin h1");
                            this.time_left = config.refresh_interval;

                            var that = this;
                            setInterval(function() {
                                that.tick.call(that, data, config);
                            }, 1000);
                        }
                    },

                    tick: function(data, config) {
                        if (!--this.time_left) {
                            // TODO trigger something here
                            this.time_left = config.refresh_interval;
                            data.read();
                        }
                        this.counter.innerHTML = this.time_left;                
                    }

                }.init(config, el, data);
            }
        }
    };
});
