import express from "express";
import cors from "cors";
import db from "./db/dbConnection.js";
//it processed data sent in an http req body aka req.body
//"this is how its processing the data"
import bodyParser from "body-Parser";

import contactsRouter from "./routes/contacts.js";

const app = express();
const PORT = 4042;

app.use(cors());

app.use(bodyParser.json());

app.use("/contacts", contactsRouter);

app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`));
