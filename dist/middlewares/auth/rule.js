"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var Rule = /** @class */ (function () {
    function Rule(targetKey, originKey, options) {
        if (options === void 0) { options = {}; }
        this.targetKey = targetKey;
        this.originKey = originKey;
        if (options.origin) {
            this.origin = options.origin;
        }
        else {
            this.origin = "HARD";
        }
        if (options.algo) {
            this.algo = options.algo;
        }
        else {
            this.algo = "EQ";
        }
        ;
    }
    Rule.prototype.check = function (target, origins) {
        var tar = target[this.targetKey], org;
        switch (this.origin) {
            case "HARD":
                return this.solve(tar, this.originKey);
            case "BODY":
                org = origins.body[this.originKey];
                return this.solve(tar, org);
            case "PARAMS":
                org = origins.params[this.originKey];
                return this.solve(tar, org);
            case "QUERY":
                org = origins.query[this.originKey];
                return this.solve(tar, org);
        }
    };
    Rule.prototype.solve = function (t, o) {
        switch (this.algo) {
            case "EQ":
                return t === o;
            case "NEQ":
                return t !== o;
        }
    };
    return Rule;
}());
exports.Rule = Rule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWRkbGV3YXJlcy9hdXRoL3J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBU0E7SUFNSSxjQUFZLFNBQWlCLEVBQUUsU0FBaUIsRUFBRSxPQUFzRDtRQUF0RCx3QkFBQSxFQUFBLFlBQXNEO1FBQ3BHLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBRTNCLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDaEM7YUFBTTtZQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQzVCO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNwQjtRQUNELENBQUM7SUFDTCxDQUFDO0lBRUQsb0JBQUssR0FBTCxVQUFNLE1BQVcsRUFBRSxPQUFnQjtRQUMvQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztRQUN0QyxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDakIsS0FBSyxNQUFNO2dCQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNDLEtBQUssTUFBTTtnQkFDUCxHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEMsS0FBSyxRQUFRO2dCQUNULEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNoQyxLQUFLLE9BQU87Z0JBQ1IsR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQUVELG9CQUFLLEdBQUwsVUFBTSxDQUFTLEVBQUUsQ0FBUztRQUN0QixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZixLQUFLLElBQUk7Z0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUssS0FBSztnQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFqREQsSUFpREM7QUFqRFksb0JBQUkifQ==