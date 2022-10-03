// server/db/db-connection.js;
import pgPromise from "pg-promise";

// Create Database Connection
//server connecting to db
const pgp = pgPromise({});

const db = pgp("postgres://localhost:5432/contacts");

export default db;
