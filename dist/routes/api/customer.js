"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cusRouter = void 0;
var express_1 = require("express");
var controller_1 = require("../../controller/");
exports.cusRouter = express_1.Router();
exports.cusRouter.post('/add', controller_1.customer.add);
exports.cusRouter.get('/get-customer', controller_1.customer.get); // query allowed, (customerId, nic, divisionalOffice)
exports.cusRouter.put('/update-customer/:customerId', controller_1.customer.update);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2FwaS9jdXN0b21lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBaUM7QUFDakMsZ0RBQTZDO0FBRWhDLFFBQUEsU0FBUyxHQUFHLGdCQUFNLEVBQUUsQ0FBQTtBQUVqQyxpQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUscUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNwQyxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUscUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLHFEQUFxRDtBQUNsRyxpQkFBUyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxxQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBIn0=