import { useState, useEffect } from "react";
import Contacts from "./contacts";
// import contacts from "./component/contacts";

const ViewContact = ({ user, setUserToDisplay }) => {
  return (
    <>
      <button onClick={() => setUserToDisplay(undefined)}>Back</button>{" "}
      {user.name}, {user.email}, {user.phone}, {user.notes}
    </>
  );
};

export default ViewContact;
