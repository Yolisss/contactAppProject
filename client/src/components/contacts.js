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
      console.log("Logged if the editName action is being dispatched");
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
      return { id: "", nick_name: "", species_id: "", seen_on: "" };
    //basically an else statement
    default:
      return state;
  }
};

const Individuals = () => {
  //[] allows us to store multiple values
  const [individuals, setIndividuals] = useState([]);

  //get individuals data table
  const getIndividuals = async () => {
    const response = await fetch(`http://localhost:8080/individuals`);
    const data = await response.json();
    console.log(data);
    setIndividuals(data);
  };

  useEffect(() => {
    getIndividuals();
  }, []);

  //initialistate of the form will be empty
  const initialState = {
    id: "",
    nick_name: "",
    individuals_id: "",
    seen_on: "",
  };

  //dispatch is initiate the reducer function; reducer is a callback
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const handleAddIndividual = async (e) => {
    e.preventDefault();

    const newIndividual = {
      id: state.id,
      nick_name: state.nick_name,
      species_id: state.species_id,
      seen_on: state.seen_on,
    };
    console.log(newIndividual);
    //New Indiv data will be sent to server and new data will be posted
    const response = await fetch("http://localhost:8080/individuals", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIndividual),
    });
    const content = await response.json();
    setIndividuals([...individuals, content]);
    //calling a specific part of your reducer type
    //whenever we press submit, all the values in the boxes will be cleared
    dispatch({ type: "clearForm" });
  };

  //delete individual handler
  const handleDeleteIndividual = async (deleteId) => {
    //
    const response = await fetch(
      `http://localhost:8080/individuals/${deleteId}`,
      {
        method: "DELETE",
      }
    );
    await response.json();
    const deleteIndividualFunction = individuals.filter(
      (individual) => individual.id !== deleteId
    );
    setIndividuals(deleteIndividualFunction);
  };
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <header> Individuals Data Table </header>
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
          <th>Nickname: </th>
          <th>Seen On: </th>
          <th>Species ID: </th>
        </thead>
        <tbody>
          {individuals
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.nick_name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (
                val.seen_on
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toString().toLowerCase())
              ) {
                return val;
              } else if (
                val.species_id
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toString().toLowerCase())
              ) {
                return val;
              } else if (
                val.id
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toString().toLowerCase())
              ) {
                return val;
              }
            })
            .map((individual, index) => {
              return (
                <tr key={index}>
                  <td>{individual.id}</td>
                  <td>{individual.nick_name}</td>
                  <td>{individual.seen_on}</td>
                  <td>{individual.species_id}</td>
                  <td>
                    <button
                      // src={deleteIcon}
                      className="trash"
                      alt="trash"
                      onClick={() => handleDeleteIndividual(individual.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="addIndividuals">
        <header>Add a new Individual</header>
        <br></br>
        <form id="add-individuals" action="#" onSubmit={handleAddIndividual}>
          <fieldset>
            <br></br>
            <label>ID: </label>
            <br></br>
            <input
              type="number"
              id="add-individuals-id"
              placeholder="Individuals ID"
              value={state.id}
              onChange={(e) =>
                dispatch({
                  type: "editID",
                  payload: e.target.value,
                })
              }
            />
            <br></br>
            <label>Nick Name: </label>
            <br></br>
            <input
              type="text"
              id="add-individuals-nick_name"
              placeholder="Nick Name"
              value={state.nick_name}
              onChange={(e) =>
                dispatch({
                  type: "editNickName",
                  payload: e.target.value,
                })
              }
            />
            <br></br>
            <label>Species Id: </label>
            <br></br>
            <input
              type="number"
              id="add-individuals-speciesId"
              placeholder="species ID"
              value={state.species_id}
              onChange={(e) =>
                dispatch({
                  type: "editSpeciesId",
                  payload: e.target.value,
                })
              }
            />
            <br></br>
            <label>Seen on: </label>
            <br></br>
            <input
              type="datetime-local"
              id="add-individuals-seenOn"
              placeholder=""
              value={state.seen_on}
              onChange={(e) =>
                dispatch({
                  type: "editSeenOn",
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

export default Individuals;
