"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManager = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var SECRET_KEY = process.env.SECRET_KEY || "";
var TokenManager = /** @class */ (function () {
    function TokenManager(jwtExpTime, cleanInterval) {
        var _this = this;
        /**
         * Remove Expired Tokens from Trash
         */
        this.cleanTrash = function () {
            _this.trash.filter(function (token) {
                return _this.verifyToken(token) !== null;
            });
        };
        /**
         * Initiate a new JWT
         * @param data : payload to be included to JWT
         * @return : jwt string
         */
        this.signToken = function (data) {
            return jsonwebtoken_1.default.sign(data, SECRET_KEY, {
                expiresIn: _this.expTime
            });
        };
        /**
         * Verify a jwt
         * @param token : jwt string
         * @return payload - if success
         *         null - if failed validating jwt
         */
        this.verifyToken = function (token) {
            try {
                var payload = jsonwebtoken_1.default.verify(token, SECRET_KEY);
                //@ts-ignore
                delete payload["iat"]; // delete token specified database
                //@ts-ignore
                delete payload["exp"]; // delete token specified database
                return payload;
            }
            catch (e) {
                return null;
            }
        };
        /**
         * Add a given jwt to the blacklist
         * @param token : jwt string
         */
        this.unSignToken = function (token) {
            var payload = _this.verifyToken(token);
            if (payload !== null) {
                // if token is not expired
                _this.trash.push(token);
            }
        };
        this.trash = [];
        this.expTime = jwtExpTime; // expire time of jwt
        this.cleanTrashInterval = cleanInterval; // trash cleaning interval
    }
    /**
     * Start Trash Cleaning Task
     */
    TokenManager.prototype.startCleaningJob = function () {
        this.cleanJob = setInterval(this.cleanTrash, this.cleanTrashInterval * 60 * 1000);
    };
    /**
     * Start Trash Cleaning Task
     */
    TokenManager.prototype.stopCleaningJob = function () {
        if (this.cleanJob !== undefined) {
            clearInterval(this.cleanJob);
        }
    };
    return TokenManager;
}());
exports.TokenManager = TokenManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4tbWFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvdG9rZW4tbWFuL3Rva2VuLW1hbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4REFBK0I7QUFHL0IsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO0FBRWhEO0lBTUksc0JBQVksVUFBMkIsRUFBRSxhQUFxQjtRQUE5RCxpQkFJQztRQXFCRDs7V0FFRztRQUNILGVBQVUsR0FBRztZQUNULEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBSztnQkFDcEIsT0FBTyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQztRQUVGOzs7O1dBSUc7UUFDSCxjQUFTLEdBQUcsVUFBQyxJQUFTO1lBQ2xCLE9BQU8sc0JBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFDOUIsU0FBUyxFQUFFLEtBQUksQ0FBQyxPQUFPO2FBQzFCLENBQUMsQ0FBQztRQUVQLENBQUMsQ0FBQztRQUVGOzs7OztXQUtHO1FBQ0gsZ0JBQVcsR0FBRyxVQUFDLEtBQWE7WUFDeEIsSUFBSTtnQkFDQSxJQUFNLE9BQU8sR0FBRyxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzlDLFlBQVk7Z0JBQ1osT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxrQ0FBa0M7Z0JBQ3pELFlBQVk7Z0JBQ1osT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxrQ0FBa0M7Z0JBQ3pELE9BQU8sT0FBTyxDQUFDO2FBQ2xCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsT0FBTyxJQUFJLENBQUM7YUFDZjtRQUNMLENBQUMsQ0FBQztRQUVGOzs7V0FHRztRQUNILGdCQUFXLEdBQUcsVUFBQyxLQUFhO1lBQ3hCLElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO2dCQUNsQiwwQkFBMEI7Z0JBQzFCLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCO1FBQ0wsQ0FBQyxDQUFDO1FBMUVFLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLENBQUMscUJBQXFCO1FBQ2hELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxhQUFhLENBQUMsQ0FBQywwQkFBMEI7SUFDdkUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsdUNBQWdCLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsR0FBRyxJQUFJLENBQ3RDLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSCxzQ0FBZSxHQUFmO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUM3QixhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQXFETCxtQkFBQztBQUFELENBQUMsQUFsRkQsSUFrRkM7QUFsRlksb0NBQVkifQ==