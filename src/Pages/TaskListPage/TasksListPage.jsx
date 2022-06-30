import React, { useEffect, useRef, useState } from "react";
import "./TasksListPage.css";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { RiAddLine } from "react-icons/ri";
import { MdOutlineDoneOutline } from "react-icons/md";


export default function TasksListPage(props) {
  const [tasks, setTasks] = useState([]);
  const [allowEdit, setAllowEdit] = useState(false);

  let CSRF = document.cookie.slice(10);
  useEffect(() => {
    fetch("/api/task-list/")
      .then((response) => response.json())
      .then((json) => setTasks(json));
  }, []);

  const deleteTask = async (id) => {
    fetch(`api/task-delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": CSRF,
      },
    });
  };

  const createTask = async () => {
    fetch(`api/task-create/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(tasks),
    });
  };

  const doneTask = async (id) => {
    fetch(`/task-update/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"completed": tasks.completed, "title": tasks.title }),
    });
  };

  return (
    <div>
      <div className="list-tasks">
        {props.tasks.map((task, index) => {
          return (
            <div className="task-container">
              <div
                className="task-title"
                style={{
                  opacity: !task.completed ? "1" : "0.4",
                }}
              >
                <input 
                value={task.title} 
                style={{
                    textDecoration: !task.completed ? "none" : "line-through",
                  }}
                disabled={!allowEdit} />
              </div>
              <div className="buttons">
                <button onClick={()=> {
                    setAllowEdit(true)
                }}>
                  <AiFillEdit className={"icons"} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    doneTask(task.id);
                    // window.location.reload(true);
                  }}
                >
                  <MdOutlineDoneOutline className={"icons"} /> <br />
                  Done
                </button>
                <button
                  onClick={() => {
                    deleteTask(task.id);
                    window.location.reload(true);
                  }}
                >
                  <AiFillDelete className={"icons"} />
                  <br />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <div className="add-div">
          <input
            className="input-add"
            onChange={(e) => {
              setTasks({ ...tasks, title: e.target.value });
            }}
            placeholder={"Add a task"}
          />
          <button
            onClick={() => {
              createTask();
              window.location.reload(true);
            }}
          >
            <RiAddLine className="icons" />
          </button>
        </div>
      </div>
    </div>
  );
}
