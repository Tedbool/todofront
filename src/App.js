import { useEffect, useRef, useState } from "react";
import "./App.css";
import TasksListPage from "./Pages/TaskListPage/TasksListPage";

function App() {
  // const [toDoList, setToDoList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [indicator, setIndicator] = useState(0);
  const [tempTask, setTempTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    await fetch("/api/task-list/")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };

  return (
    <div className="main-wrapper">
      <h1>To Do App</h1>

      <TasksListPage fetchIndicator={indicator} tasks={tasks} />
    </div>
  );
}

export default App;
