import dotenv from "dotenv";
import { ConnectionProfile } from "./model/index";

dotenv.config();

export const PORT: number = Number(process.env.SERVE_PORT);

export const MYSQL_PROFILE: ConnectionProfile = {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_DBASE || "test"
};

export const SECRET: string = process.env.SECRET || "defaultsecret";
export const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS) || 10;
