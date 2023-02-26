import React, { useState } from "react";

function Draft({
  toggleTaskCompleted,
  id,
  deleteTask,
  completed,
  editTask,
  name,
}) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={id}>New name for {name}</label>
        <input id={id} type="text" value={newName} onChange={handleChange} />
      </div>
      <div>
        <button type="button" onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>

        <button type="submit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div>
      <div>
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label htmlFor={id}>{name}</label>
      </div>
      <div>
        <button type="button" onClick={() => setEditing(true)}>
          Edit
        </button>
      </div>
    </div>
  );
  return <li>{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Draft;
