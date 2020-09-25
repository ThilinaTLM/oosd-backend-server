"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindRBuilder = void 0;
var core_1 = require("../../core");
exports.bindRBuilder = function (req, res, next) {
    res.r = new core_1.RBuilder(res);
    next();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWlkZGxld2FyZXMvcmVzcG9uc2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQStDO0FBRWxDLFFBQUEsWUFBWSxHQUFZLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO0lBQ2hELEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxlQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsSUFBSSxFQUFFLENBQUM7QUFDWCxDQUFDLENBQUMifQ==