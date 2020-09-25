"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyPDF = void 0;
/**
 * Mime filter
 */
function onlyPDF(req, file, cb) {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
        return;
    }
    cb(null, false);
}
exports.onlyPDF = onlyPDF;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWRkbGV3YXJlcy91cGxvYWRlci9taW1lZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBOztHQUVHO0FBQ0gsU0FBZ0IsT0FBTyxDQUFDLEdBQW9CLEVBQUUsSUFBeUIsRUFBRSxFQUFzQjtJQUMzRixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssaUJBQWlCLEVBQUU7UUFDckMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNmLE9BQU87S0FDVjtJQUNELEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQU5ELDBCQU1DIn0=