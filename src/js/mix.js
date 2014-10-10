define([], function() {
	"use strict";

    var isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    // Extend a given object with all the properties in passed-in object(s).
    return function(obj) {
        if (!isObject(obj)) return obj;
        var source, prop;
        for (var i = 0, length = arguments.length; i < length; i++) {
            source = arguments[i];
            for (prop in source) {
                if (hasOwnProperty.call(source, prop)) {
                    obj[prop] = source[prop];
                }
            }
        }
        return obj;
    };
});