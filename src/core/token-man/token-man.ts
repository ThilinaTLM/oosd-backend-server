import jwt from "jsonwebtoken";
import Timeout = NodeJS.Timeout;

const SECRET_KEY = process.env.SECRET_KEY || "";

export class TokenManager {
    private trash: Array<string>;
    private cleanJob?: Timeout;
    private readonly expTime: string | number;
    private readonly cleanTrashInterval: number;

    constructor(jwtExpTime: string | number, cleanInterval: number) {
        this.trash = [];
        this.expTime = jwtExpTime; // expire time of jwt
        this.cleanTrashInterval = cleanInterval; // trash cleaning interval
    }

    /**
     * Start Trash Cleaning Task
     */
    startCleaningJob() {
        this.cleanJob = setInterval(
            this.cleanTrash,
            this.cleanTrashInterval * 60 * 1000
        );
    }

    /**
     * Start Trash Cleaning Task
     */
    stopCleaningJob() {
        if (this.cleanJob !== undefined) {
            clearInterval(this.cleanJob);
        }
    }

    /**
     * Remove Expired Tokens from Trash
     */
    cleanTrash = () => {
        this.trash.filter((token) => {
            return this.verifyToken(token) !== null;
        });
    };

    /**
     * Initiate a new JWT
     * @param data : payload to be included to JWT
     * @return : jwt string
     */
    signToken = (data: any): string => {
        return jwt.sign(data, SECRET_KEY, {
            expiresIn: this.expTime
        });

    };

    /**
     * Verify a jwt
     * @param token : jwt string
     * @return payload - if success
     *         null - if failed validating jwt
     */
    verifyToken = (token: string): any | null => {
        try {
            const payload = jwt.verify(token, SECRET_KEY);
            //@ts-ignore
            delete payload["iat"]; // delete token specified database
            //@ts-ignore
            delete payload["exp"]; // delete token specified database
            return payload;
        } catch (e) {
            return null;
        }
    };

    /**
     * Add a given jwt to the blacklist
     * @param token : jwt string
     */
    unSignToken = (token: string) => {
        const payload = this.verifyToken(token);
        if (payload !== null) {
            // if token is not expired
            this.trash.push(token);
        }
    };
}