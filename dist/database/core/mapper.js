"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mp = exports.BuildMapper = exports.Mapper = void 0;
/**
 * Change an object key strings according to configuration
 * @param data : input object
 * @param conf : configuration for mapper
 * @param backward : if true mapping is done backward
 */
function map(data, conf, backward) {
    var _a;
    if (backward === void 0) { backward = false; }
    var clone = __assign({}, data);
    var from = "from";
    var to = "to";
    if (backward)
        _a = [to, from], from = _a[0], to = _a[1];
    for (var i = 0; i < conf.length; i++) {
        var entry = conf[i];
        if (clone[entry[from]] && !clone[entry[to]]) {
            clone[entry[to]] = clone[entry[from]];
            delete clone[entry[from]];
        }
    }
    return clone;
}
/**
 * Mapper Object which use solid configuration
 */
var Mapper = /** @class */ (function () {
    function Mapper(conf) {
        var _this = this;
        this.forward = function (data) {
            return map(data, _this.conf, false);
        };
        this.backward = function (data) {
            return map(data, _this.conf, true);
        };
        this.conf = conf;
    }
    return Mapper;
}());
exports.Mapper = Mapper;
/**
 * Return a Mapper object with a solid configuration
 * @param conf : configuration for mapper
 */
exports.BuildMapper = function (conf) {
    return new Mapper(conf);
};
/**
 * An Entry for Mapper Config
 * @param from : key of before
 * @param to : key of after
 */
exports.mp = function (from, to) {
    return { from: from, to: to };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RhdGFiYXNlL2NvcmUvbWFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBTUE7Ozs7O0dBS0c7QUFDSCxTQUFTLEdBQUcsQ0FBQyxJQUFTLEVBQUUsSUFBa0IsRUFBRSxRQUFnQjs7SUFBaEIseUJBQUEsRUFBQSxnQkFBZ0I7SUFDeEQsSUFBSSxLQUFLLGdCQUFRLElBQUksQ0FBRSxDQUFBO0lBQ3ZCLElBQUksSUFBSSxHQUFrQixNQUFNLENBQUM7SUFDakMsSUFBSSxFQUFFLEdBQWtCLElBQUksQ0FBQztJQUM3QixJQUFJLFFBQVE7UUFBRSxLQUFhLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUF0QixJQUFJLFFBQUEsRUFBRSxFQUFFLFFBQUEsQ0FBZTtJQUV0QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDekMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM3QjtLQUNKO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVEOztHQUVHO0FBQ0g7SUFHSSxnQkFBWSxJQUFrQjtRQUE5QixpQkFFQztRQUVELFlBQU8sR0FBRyxVQUFJLElBQVM7WUFDbkIsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFBO1FBRUQsYUFBUSxHQUFHLFVBQUksSUFBUztZQUNwQixPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUE7UUFURyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBVUwsYUFBQztBQUFELENBQUMsQUFmRCxJQWVDO0FBZlksd0JBQU07QUFpQm5COzs7R0FHRztBQUNVLFFBQUEsV0FBVyxHQUFHLFVBQVUsSUFBa0I7SUFDbkQsT0FBTyxJQUFJLE1BQU0sQ0FBSSxJQUFJLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFFRjs7OztHQUlHO0FBQ1UsUUFBQSxFQUFFLEdBQUcsVUFBQyxJQUFZLEVBQUUsRUFBVTtJQUN2QyxPQUFPLEVBQUMsSUFBSSxNQUFBLEVBQUUsRUFBRSxJQUFBLEVBQUMsQ0FBQTtBQUNyQixDQUFDLENBQUEifQ==