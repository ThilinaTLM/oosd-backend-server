import { Router } from "express";
import { customer } from "../../controller/";
import { preBuilt } from "../../middlewares";

export const cusRouter = Router()

cusRouter.post('/add-customer', customer.add)
cusRouter.get('/get-customer', customer.get) // query allowed, (customerId, nic, divisionalOffice)
cusRouter.get('/get-count', customer.count);
cusRouter.put('/update-customer/:customerId', preBuilt.ONLY_OFFICER, customer.update)
