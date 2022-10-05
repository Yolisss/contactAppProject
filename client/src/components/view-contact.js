import { useState, useEffect } from "react";
import Contacts from "./contacts";
// import contacts from "./component/contacts";

const ViewContact = ({ user, setUserToDisplay }) => {
  return (
    <>
      <button onClick={() => setUserToDisplay(undefined)}>Back</button>{" "}
      <ul className="contact-table">
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
        <li>Phone number: {user.phone}</li>
        <li>Notes: {user.notes}</li>
      </ul>
    </>
  );
};

export default ViewContact;
