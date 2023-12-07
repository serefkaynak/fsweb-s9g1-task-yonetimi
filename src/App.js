import { useState } from "react";
import React from "react";
import "./app.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";


function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks])
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi])
  }

  function handleComplete(id) {
    //console.log("tamamlama fonksiyonunu buraya yazın")
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: "yapıldı" } : task)));
  }

  return (
    <div className="app">
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Görev Ekle</h2>
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((task) => task.status === "yapıldı")
              .map((task) => (
                <Task key={task.id} taskObj={task} />
              ))}
              
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
