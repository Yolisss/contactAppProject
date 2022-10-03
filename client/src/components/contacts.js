import { useState, useEffect } from "react";
import { useReducer } from "react";

//useReducer good to update multiple items vs useState that updates
//one item at a time
//state is how useReducer reads values and stores new value
//initial state will contain your initial data (ex. id, nickname etc)
//reducer is what's going to be updating your data
//state is current value
//action will be what will be passed to your reducer
const reducer = (state, action) => {
  console.log(action, "this is the action");
  //telling reducer we need an action to do the following:
  switch (action.type) {
    case "editID":
      console.log("Logged if the editID action is being dispatched");
      //payload: info used to modify your state
      return { ...state, id: action.payload };

    case "editName":
      return { ...state, name: action.payload };

    case "editEmail":
      return { ...state, email: action.payload };

    case "editPhone":
      return { ...state, phone: action.payload };

    case "editNotes":
      return { ...state, notes: action.payload };

    case "clearForm":
      return { id: "", name: "", email: "", phone: "", notes: "" };
    //basically an else statement
    default:
      return state;
  }
};

const Contacts = () => {
  //[] allows us to store multiple values
  const [contacts, setContacts] = useState([]);

  //get individuals data table
  const getContacts = async () => {
    const response = await fetch(`http://localhost:8084/contacts`);
    const data = await response.json();
    console.log(data);
    setContacts(data);
  };

  useEffect(() => {
    getContacts();
  }, []);

  //initialistate of the form will be empty
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  };

  //dispatch is initiate the reducer function; reducer is a callback
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const handleAddContact = async (e) => {
    e.preventDefault();

    const newContact = {
      id: state.id,
      name: state.name,
      email: state.email,
      phone: state.phone,
      notes: state.notes,
    };
    console.log(newContact);
    //New Indiv data will be sent to server and new data will be posted
    const response = await fetch("http://localhost:8084/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    });
    const content = await response.json();
    setContacts([...contacts, content]);
    //calling a specific part of your reducer type
    //whenever we press submit, all the values in the boxes will be cleared
    dispatch({ type: "clearForm" });
  };

  //delete individual handler
  const handleDeleteContact = async (deleteId) => {
    //
    const response = await fetch(`http://localhost:8084/contacts/${deleteId}`, {
      method: "DELETE",
    });
    await response.json();
    const deleteContactFunction = contacts.filter(
      (contact) => contact.id !== deleteId
    );
    setContacts(deleteContactFunction);
  };
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <header> Contact List </header>
      <br></br>
      <input
        type="text"
        placeholder="Search..."
        className="search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br></br>
      <table>
        <thead>
          <th>ID: </th>
          <th>Name: </th>
          <th>Email: </th>
          <th>Phone: </th>
          <th>Notes: </th>
        </thead>
        <tbody>
          {contacts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (
                val.email.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (val.phone.toString().includes(searchTerm.toString())) {
                return val;
              } else if (
                val.notes
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toString().toLowerCase())
              ) {
                return val;
              }
            })
            .map((contact, index) => {
              return (
                <tr key={index}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.notes}</td>
                  <td>
                    <button
                      // src={deleteIcon}
                      className="trash"
                      alt="trash"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="addContacts">
        <header>Add a new Contact</header>
        <br></br>
        <form id="add-contacts" action="#" onSubmit={handleAddContact}>
          <fieldset>
            <br></br>
            <label>ID: </label>
            <br></br>
            <input
              type="number"
              id="add-contacts-id"
              placeholder="Contacts ID"
              value={state.id}
              onChange={(e) =>
                dispatch({
                  type: "editID",
                  payload: e.target.value,
                })
              }
            />
            <br></br>
            <label>Name: </label>
            <br></br>
            <input
              type="text"
              id="add-contacts-name"
              placeholder="Name"
              value={state.name}
              onChange={(e) =>
                dispatch({
                  type: "editName",
                  payload: e.target.value,
                })
              }
            />
            <br></br>
            <label>Email: </label>
            <br></br>
            <input
              type="text"
              id="add-contacts-email"
              placeholder="email"
              value={state.email}
              onChange={(e) =>
                dispatch({
                  type: "editEmail",
                  payload: e.target.value,
                })
              }
            />
            <br></br>
            <label>Phone: </label>
            <br></br>
            <input
              type="numbrt"
              id="add-contacts-phone"
              placeholder=""
              value={state.phone}
              onChange={(e) =>
                dispatch({
                  type: "editPhone",
                  payload: e.target.value,
                })
              }
            />
          </fieldset>
          {/* Add more form fields here */}
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default Contacts;
