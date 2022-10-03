//server connected to db
import db from "../db/dbConnection.js";
import express from "express";
//telling express for which handlers to use
const router = express.Router();
/* GET users listing. */

//9-20 considered request handler
//within it we are using a try/catch block
router.get("/", async function (req, res) {
  try {
    const contacts = await db.any("SELECT * FROM Contacts ORDER BY id", [true]);
    //send the data back to the server based on the species that came from the db
    res.send(contacts);
    //catch unexpected errors
    //console log err
    //and send response with a 400 error to client
  } catch (e) {
    console.log(e);
    return res.status(500).json({ e });
  }
});

//"/" main part where you're storing the information
//post request
router.post("/", async (req, res) => {
  const contacts = {
    //server targetting these values
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    notes: req.body.notes,
  };
  console.log(contacts);
  //try is inserting it into our db
  try {
    const createdContacts = await db.one(
      `INSERT INTO contacts(id, name, email, phone, notes) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [
        contacts.id,
        contacts.name,
        contacts.email,
        contacts.phone,
        contacts.notes,
      ]
    );
    console.log(createdContacts);
    //it'll be added to database
    res.send(createdContacts);
    //if you can't, return an error
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//delete request
//router is your "/", in this case "/:id"; where you'll be
//directing the data to
//for ex, this is directing it specifically to the id
router.delete("/:id", async (req, res) => {
  //if you find id within the function, delete it
  const contactsId = req.params.id;
  try {
    await db.none("DELETE FROM Contacts WHERE id=$1", [contactsId]);
    res.send({ status: "sucess" });
  } catch (e) {
    //if you don't have it, bring back an error
    return res.status(500).json({ e });
  }
});

//this allows for this router to be used in other files
export default router;
