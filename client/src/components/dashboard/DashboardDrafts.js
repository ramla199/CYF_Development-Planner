import React, { useEffect, useState } from "react";

//components

import InputDraft from "./draftsList/InputDraft";
import ListDrafts from "./draftsList/ListDrafts";

const DashboardDrafts = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("/dashboard/drafts", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);
      setAllTodos(parseData);

      setName(parseData[0].username);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  return (
    <div>
      <div>
        <h2>{name} 's Dashboard List</h2>
        <button onClick={(e) => logout(e)}>Logout</button>
      </div>

      <InputDraft setTodosChange={setTodosChange} />
      <ListDrafts allTodos={allTodos} setTodosChange={setTodosChange} />
    </div>
  );
};

export default DashboardDrafts;
