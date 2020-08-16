import {mysqlSyncer} from "../index";
import {AuthModel} from '../models/auth-model'

const u = new AuthModel();
u.username = "thilina3";

u.sync(mysqlSyncer).deleteByUsername().then( () => {
    console.log(u);
});