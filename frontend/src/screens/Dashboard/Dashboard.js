import React, { useState, useEffect } from "react";
import "./dashboard.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [note, setNote] = useState("");
  const [userNotes, setUserNotes] = useState([]);
  const navigate = useNavigate();

  const getAllUserNotes = async () => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        authorization: `Bearer ${userData.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/getUserNotes",
        config
      );
      console.log(data);
      setUserNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewNote = async () => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        authorization: `Bearer ${userData.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/createNote",
        { note: note },
        config
      );
      if (data.status) {
        setNote("");
        getAllUserNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserNote = async (id) => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        authorization: `Bearer ${userData.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/deleteNote/${id}`,
        config
      );
      if (data.status) {
        getAllUserNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserNotes();
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  window.addEventListener("storage", () => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    if (!userData) {
      console.log(userData);
      navigate("/login");
    }
  });
  return (
    <>
      <div className="todo_wrapper">
        <button className="logout_btn" onClick={logoutUser}>
          Logout
        </button>
        <div className="todo_container">
          <div className="todo_input">
            <input
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter your Note"
            />
            <AddIcon className="add_icon" onClick={addNewNote} />
          </div>
          <div className="todo_listitem">
            {userNotes.map((note) => {
              return (
                <div className="todo_item" key={note._id}>
                  <h2>{note.note}</h2>
                  <DeleteIcon
                    className="delete_icon"
                    onClick={deleteUserNote.bind(this, note._id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
