import React from "react";

import uuid from "react-uuid";

function Form({ todo, setTodo, todoList, setTodoList }) {
  const handleChange = (event) => {
    setTodo(event.target.value);
    console.log(todo);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTodoList([...todoList, { name: todo, id: uuid() }]);
    console.log(todoList);
    setTodo("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={todo} onChange={handleChange} placeholder="add .." />
        <button>add</button>
      </form>
    </>
  );
}

export default Form;
