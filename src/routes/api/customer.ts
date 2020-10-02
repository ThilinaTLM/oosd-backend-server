import { Router } from "express";
import { customer } from "../../controller/";
import { preBuilt } from "../../middlewares";

export const cusRouter = Router()

cusRouter.post('/add', preBuilt.ALL_ROLES, customer.add)
cusRouter.get('/get-customer', customer.get) // query allowed, (customerId, nic, divisionalOffice)
cusRouter.put('/update-customer/:customerId', preBuilt.ALL_ROLES, customer.update)

cusRouter.get('/get-count', customer.count);