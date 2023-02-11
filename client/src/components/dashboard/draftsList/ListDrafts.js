import React, { useState, useEffect } from "react";
import EditDraft from "./EditDraft";

const ListDrafts = ({ allTodos, setTodosChange }) => {
  console.log(allTodos);
  const [todos, setTodos] = useState([]); //empty array

  //delete todo function

  async function deleteTodo(id) {
    try {
      await fetch(`/dashboard/drafts/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token },
      });

      setTodos(todos.filter((todo) => todo.draft_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  // async function getTodos() {
  //   const res = await fetch("http://localhost:5000/todos");

  //   const todoArray = await res.json();

  //   setTodos(todoArray);
  // }

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  console.log(todos);

  return (
    <>
      {" "}
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.length !== 0 &&
            todos[0].draft_id !== null &&
            todos.map((todo) => (
              <tr key={todo.draft_id}>
                <td>{todo.draft_text}</td>
                <td>
                  <EditDraft todo={todo} setTodosChange={setTodosChange} />
                </td>
                <td>
                  <button onClick={() => deleteTodo(todo.draft_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ListDrafts;
