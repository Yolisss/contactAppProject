import express from "express";
import cors from "cors";
import db from "./db/dbConnection.js";

import contactsRouter from "./routes/contacts.js";

const app = express();
const PORT = 8080;

app.use(cors());

app.use("/contacts", contactsRouter);

app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`));
