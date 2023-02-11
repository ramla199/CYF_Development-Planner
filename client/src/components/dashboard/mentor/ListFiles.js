import React, { useState } from "react";
import { nanoid } from "nanoid";
//components
import Name from "../Name";
import Logout from "../Logout";
import MentorFilterButton from "./MentorFilterButton";
import MentorForm from "./MentorForm";
import BackButton from "../../BackButton";

import File from "./File";

import Drafts from "./Drafts";

let data = [];

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function ListFiles({ setAuth }) {
  const [tasks, setTasks] = useState(data);

  const [filter, setFilter] = useState("All");

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };

    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  //render tasks list
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <File
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <MentorFilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // counting tasks
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div>
      {/* heading */}
      <div className="buttons">
        {" "}
        <Logout setAuth={setAuth} />
        <BackButton />
      </div>

      <Name />

      <h1>Files</h1>
      <div className="buttons">{filterList}</div>

      {/* tasks heading showing number of tasks (all/ active /completed)  */}
      <h2>{headingText}</h2>

      {/* list of tasks */}
      <ul>{taskList}</ul>

      <Drafts />
      <MentorForm addTask={addTask} />
    </div>
  );
}

export default ListFiles;
