import { RouteEntry } from ".";
import { userLogin } from "../api";

export const api_config: RouteEntry[] = [
    {
        method: "POST",
        path: "/api/user/login",
        handler: userLogin
    }
];
