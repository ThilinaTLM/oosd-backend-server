import { Router } from "express";
import { customer } from "../../controller/";

export const cusRouter = Router()

cusRouter.post('/add', customer.add)
cusRouter.get('/get-customer', customer.get) // query allowed, (customerId, nic, divisionalOffice)
cusRouter.put('/update-customer/:customerId', customer.update)