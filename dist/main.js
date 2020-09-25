"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var api_1 = require("./routes/api");
var file_1 = require("./routes/file");
var PORT = Number(process.env.PORT) || 8080;
var allowOrigin = process.env.ALLOWED_HOST;
var app = express_1.default();
// middle-wares
app.use(cors_1.default({
    origin: [allowOrigin, 'http://localhost:8000']
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// routes
app.use("/api", api_1.apiRouter);
app.use("/file", file_1.fileRouter);
// start
app.listen(PORT, function () { return console.log("Listening at " + PORT); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzNCLDREQUFxQztBQUNyQyxvREFBOEI7QUFDOUIsOENBQXdCO0FBQ3hCLG9DQUF5QztBQUN6QyxzQ0FBMkM7QUFFM0MsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO0FBQzlDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO0FBQzdDLElBQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUV0QixlQUFlO0FBQ2YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFJLENBQUM7SUFDVCxNQUFNLEVBQUUsQ0FBQyxXQUFxQixFQUFFLHVCQUF1QixDQUFDO0NBQzNELENBQUMsQ0FBQyxDQUFDO0FBQ0osR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDcEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFFM0IsU0FBUztBQUNULEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGVBQVMsQ0FBQyxDQUFDO0FBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGlCQUFVLENBQUMsQ0FBQztBQUU3QixRQUFRO0FBQ1IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWdCLElBQU0sQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQUMifQ==