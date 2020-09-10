import { hashSync, compareSync } from "bcrypt";
import { v4 } from "uuid";

interface CleanUser {
    userId: string;
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    telephoneNumber: string;
    office: string;
}

interface DataUser extends CleanUser {
    username: string;
    hash: string;
    verified: boolean;
}

interface AuthUser extends DataUser {
    matchPassword(password: string): boolean;
    isVerified(): boolean;
}


interface NewUser extends CleanUser {
    username: string;
    password: string;
}

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10

/**
 * Convert around User Types
 */
export const build = {
    AuthUser(du: DataUser | any): AuthUser {
        return {
            ...du,
            matchPassword(password: string): boolean {
                try {
                    return compareSync(password, this.hash);
                } catch (e) {
                    return false
                }
            },
            isVerified(): boolean {
                return this.verified
            }
        }
    },

    CleanUser(u: DataUser | AuthUser | any): CleanUser {
        const clone = {...u};
        delete clone.username;
        delete clone.hash;
        delete clone.verified;
        if ("matchPassword" in clone) {
            delete clone.matchPassword;
        }

        return clone;
    },

    DataUser(nu: NewUser, verified = false): DataUser {
        const clone = {
            ...nu,
            userId: v4(), // new user id
            hash: hashSync(nu.password, SALT_ROUNDS),
            verified: verified,

        };
        delete clone.password;
        return clone;
    }
}