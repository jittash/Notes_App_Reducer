import { createContext, useEffect, useReducer, useState } from "react";
import "./styles.css";
import NoteList from "./components/NoteList";
import Navbar from "./components/Navbar";
import { reducer } from "./reducers/NoteReducer";

//Create Context
export const noteContext = createContext();
//get data from local storage
const localNotes = () => {
  if (localStorage.getItem("notes")) {
    return JSON.parse(localStorage.getItem("notes"));
  } else {
    return [];
  }
};

const App = () => {
  //useReducer hook
  const [state, dispatch] = useReducer(reducer, [], localNotes);

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  const [searchvalue, setsearchvalue] = useState("");
  const [searchResults, setsearchResults] = useState([]);

  const [dark, setdark] = useState(false);

  const themes = {
    dark: {
      backgroundColor: "black",
      color: "green"
    },
    light: {
      backgroundColor: "white",
      color: "black"
    }
  };

  const addNote = (e) => {
    e.preventDefault();
    //add note
    if (title && description) {
      dispatch({ type: "ADD_NOTE", payload: { id: 0, title, description } });
      settitle("");
      setdescription("");
    } else {
      alert("Fields cannot be empty");
    }
  };

  //Adding note to local storage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(state));
  }, [state]);

  //Search Functionality
  const Search = (params) => {
    setsearchvalue(params);
    if (searchvalue !== 0) {
      const searchList = state.filter((note) => {
        return Object.values(note)
          .join(" ")
          .toLowerCase()
          .includes(params.toLowerCase());
      });
      setsearchResults(searchList);
    } else {
      setsearchResults(state);
    }
  };

  //Toggle Theme
  const themeToggler = () => {
    const isDark = !dark;
    localStorage.setItem("theme", JSON.stringify(isDark));
    setdark(isDark);
  };
  const theme = dark ? themes.dark : themes.light;
  return (
    <div className="App container my-3 ">
      <div
        style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
      >
        <Navbar Search={Search} />

        <h1 className="text-center">Welcome to React Notes App</h1>
        <div className="addNote card">
          <div className="card-body">
            <div className="mb-3">
              <h5 className="card-title">Add Title</h5>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(event) => settitle(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <h5 className="card-title">Add description</h5>
              <textarea
                type="text"
                id="description"
                className="form-control"
                value={description}
                onChange={(event) => setdescription(event.target.value)}
              ></textarea>
            </div>

            <button className="btn btn-primary" onClick={addNote}>
              Add Note
            </button>

            <button
              onClick={() => dispatch({ type: "DELETE_ALL" })}
              className="btn btn-danger"
            >
              Clear All
            </button>
            <button
              onClick={themeToggler}
              className="btn"
              style={{
                background: theme.backgroundColor,
                color: theme.color
              }}
            >
              Toggle to {!dark ? "dark" : "light"} theme
            </button>
          </div>
        </div>
        <hr />

        <noteContext.Provider
          value={
            searchvalue.length < 1
              ? {
                  state,
                  dispatch
                }
              : { state: searchResults, dispatch }
          }
        >
          <NoteList />
        </noteContext.Provider>
      </div>
    </div>
  );
};

export default App;
