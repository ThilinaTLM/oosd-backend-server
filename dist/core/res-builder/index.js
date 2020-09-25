"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBuilder = void 0;
var StatusCode = /** @class */ (function () {
    function StatusCode(p, code) {
        this.parent = p;
        this._code = code;
    }
    Object.defineProperty(StatusCode.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: false,
        configurable: true
    });
    StatusCode.prototype.OK = function () {
        return this.setCode(200);
    };
    StatusCode.prototype.CREATED = function () {
        return this.setCode(201);
    };
    StatusCode.prototype.NO_CONTENT = function () {
        return this.setCode(204);
    };
    StatusCode.prototype.MV_PERM = function () {
        return this.setCode(301);
    };
    StatusCode.prototype.NOT_MOD = function () {
        return this.setCode(304);
    };
    StatusCode.prototype.BAD_REQ = function () {
        return this.setCode(400);
    };
    StatusCode.prototype.UN_AUTH = function () {
        return this.setCode(401);
    };
    StatusCode.prototype.FORBIDDEN = function () {
        return this.setCode(403);
    };
    StatusCode.prototype.NOT_FOUND = function () {
        return this.setCode(404);
    };
    StatusCode.prototype.ERROR = function () {
        return this.setCode(500);
    };
    StatusCode.prototype.setCode = function (code) {
        this._code = code;
        return this.parent;
    };
    return StatusCode;
}());
var ResponseBuilder = /** @class */ (function () {
    function ResponseBuilder(res) {
        this.status = new StatusCode(this, 500);
        this._data = { message: "Internal Server Error" };
        this._res = res;
    }
    ResponseBuilder.prototype.send = function () {
        this._res.status(this.status.code);
        this._res.json(this._data);
    };
    ;
    ResponseBuilder.prototype.send_ISE = function () {
        this.status.ERROR();
        this.message('Internal Server Error');
        this.send();
    };
    ResponseBuilder.prototype.token = function (token) {
        this._data.token = token;
        return this;
    };
    ResponseBuilder.prototype.message = function (msg) {
        this._data.message = msg;
        return this;
    };
    ResponseBuilder.prototype.data = function (data) {
        this._data.data = data;
        return this;
    };
    return ResponseBuilder;
}());
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9yZXMtYnVpbGRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFZQTtJQUdJLG9CQUFZLENBQWtCLEVBQUUsSUFBWTtRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBSUQsc0JBQUksNEJBQUk7YUFBUjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHVCQUFFLEdBQUY7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDRCQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELCtCQUFVLEdBQVY7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDRCQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDRCQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDRCQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDRCQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDhCQUFTLEdBQVQ7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDhCQUFTLEdBQVQ7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDBCQUFLLEdBQUw7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVPLDRCQUFPLEdBQWYsVUFBZ0IsSUFBWTtRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQyxBQTFERCxJQTBEQztBQUVEO0lBS0kseUJBQVksR0FBYztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVELDhCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQUEsQ0FBQztJQUVGLGtDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRUQsK0JBQUssR0FBTCxVQUFNLEtBQWE7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELGlDQUFPLEdBQVAsVUFBUSxHQUFXO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCw4QkFBSSxHQUFKLFVBQUssSUFBUztRQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBcENELElBb0NDO0FBcENZLDBDQUFlIn0=