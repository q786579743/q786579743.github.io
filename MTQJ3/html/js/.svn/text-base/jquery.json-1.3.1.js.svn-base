(function($) {
    function toIntegersAtLease(n) {
        return n < 10 ? '0' + n : n;
    }

    Date.prototype.toJSON = function(date) {
        return this.getUTCFullYear() + '-' +
                 toIntegersAtLease(this.getUTCMonth() + 1) + '-' +
                 toIntegersAtLease(this.getUTCDate()) + 'T' +
                 toIntegersAtLease(this.getUTCHours()) + ':' +
                 toIntegersAtLease(this.getUTCMinutes()) + ':' +
                 toIntegersAtLease(this.getUTCSeconds()) + 'Z';
    };

    String.prototype.toJSON =
    Number.prototype.toJSON =
    Boolean.prototype.toJSON = function(key) {
        return this.valueOf();
    };

    var escapeable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    };

    $.quoteString = function(string) {
        if (escapeable.test(string)) {
            return '"' + string.replace(escapeable, function(a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };

    $.toJSON = function(o, compact) {
        var type = typeof (o);

        if (type == "undefined")
            return "undefined";
        else if (type == "number" || type == "boolean")
            return o + "";
        else if (o === null)
            return "null";

        if (type == "string") {
            return $.quoteString(o);
        }

        if (type == "object" && typeof o.toJSON == "function")
            return o.toJSON(compact);

        if (type != "function" && typeof (o.length) == "number") {
            var ret = [];
            for (var i = 0; i < o.length; i++) {
                ret.push($.toJSON(o[i], compact));
            }
            if (compact)
                return "[" + ret.join(",") + "]";
            else
                return "[" + ret.join(", ") + "]";
        }

        if (type == "function") {
            throw new TypeError("Unable to convert object of type 'function' to json.");
        }

        var ret = [];
        for (var k in o) {
            var name;
            type = typeof (k);

            if (type == "number")
                name = '"' + k + '"';
            else if (type == "string")
                name = $.quoteString(k);
            else
                continue;

            var val = $.toJSON(o[k], compact);
            if (typeof (val) != "string") {
                continue;
            }

            if (compact)
                ret.push(name + ":" + val);
            else
                ret.push(name + ": " + val);
        }
        return "{" + ret.join(", ") + "}";
    };

    $.compactJSON = function(o) {
        return $.toJSON(o, true);
    };

    $.evalJSON = function(src) {
        if (src == null || src == "")
            return null;
        return eval("(" + src + ")");
    };

    $.secureEvalJSON = function(src) {
        var filtered = src;
        filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
        filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

        if (/^[\],:{}\s]*$/.test(filtered))
            return eval("(" + src + ")");
        else
            throw new SyntaxError("Error parsing JSON, source is not valid.");
    };
})(jQuery);
