import React, { useContext } from "react";
import { noteContext } from "../App";

const NoteList = () => {
  const { state, dispatch } = useContext(noteContext);
  return (
    <div className="showNotes row container-fluid">
      {state.length ? (
        state.map((note) => {
          return (
            <div
              key={note.id}
              className="singleNote noteCard my-2 mx-2 card"
              style={{ width: "21rem" }}
            >
              <div className="card-body">
                <h5 className="card-title text-decoration-underline">
                  {note.title}
                </h5>
                <p className="card-text">{note.description}</p>
              </div>

              <button
                onClick={() => dispatch({ type: "DELETE_NOTE", id: note.id })}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          );
        })
      ) : (
        <h3 className="text-center text-secondary">Nothing to display</h3>
      )}
    </div>
  );
};

export default NoteList;
