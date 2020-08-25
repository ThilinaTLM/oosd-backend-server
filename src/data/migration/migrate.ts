import { join } from 'path'
import { mysqlSyncer } from "../index";

const DIR_migration = join(process.cwd(), './src/data/migration');
const SQL_Database = "create.sql";
const SQL_AuthProfiles = "auths.sql"
const SQL_Users = "users.sql"
const SQL_Divisions = "divisions.sql"

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// drop and recreate database
(async () => {
    console.log("Creating Database")
    await mysqlSyncer.sqlFile( join(DIR_migration, SQL_Database) )

    console.log("Adding Auth Profiles")
    await mysqlSyncer.sqlFile( join(DIR_migration, SQL_AuthProfiles) )

    console.log("Adding Users")
    await mysqlSyncer.sqlFile( join(DIR_migration, SQL_Users) )

})().then(() => console.log("FINISHED !"))
.catch(console.error);
