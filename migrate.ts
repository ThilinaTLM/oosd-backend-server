import { sync } from "./src/model";
import bcrypt from "bcrypt";
import { User } from "./src/model/tables/users";
import { Password } from "./src/model/tables/passwords";
import { Role } from "./src/model/tables/roles";

sync({ force: false })
    .then(() => {
        createAdminUser();
    })
    .catch(console.log);

async function createAdminUser() {
    await Role.create({
        roleName: "ADMIN"
    });

    await User.create({
        userName: "admin",
        firstName: "Admin",
        fullName: "Admin",
        nicNumber: "000000000V",
        roleId: 1
    });

    const saltRounds = 10;
    const password = "admin";

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            Password.create({
                userId: 1,
                hash: hash,
                renew: false,
                active: true
            });
        });
    });
}
