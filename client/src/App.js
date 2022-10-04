//app.js to decide whether to show once contact or all contacts

import logo from "./logo.svg";
import "./App.css";
import Contacts from "./components/contacts";
import { useState } from "react";
import ViewContact from "./components/view-contact";

function App() {
  const [userToDisplay, setUserToDisplay] = useState();
  return (
    //display the user if there is a user to display otherwise display all the
    //contacts
    <div className="App">
      {userToDisplay ? (
        <ViewContact user={userToDisplay} setUserToDisplay={setUserToDisplay} />
      ) : (
        <Contacts setUserToDisplay={setUserToDisplay} />
      )}
    </div>
  );
}

export default App;
