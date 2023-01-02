import React, { useState } from "react";
import ListItem from "./ListItem";

function NewFeedback() {
  const [newFeedback, setNewFeedback] = useState("");

  const [newFeedbackList, setNewFeedbackList] = useState([]);

  const handleChange = (event) => {
    setNewFeedback(event.target.value);
    console.log(newFeedback);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let tempList = newFeedbackList;
    tempList.push(newFeedback);
    setNewFeedbackList(tempList);
    console.log(newFeedbackList);
    setNewFeedback(newFeedbackList);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <button>save</button>
        <label htmlFor="newFeedback">New feedback</label>
        <textarea
          id="newFeedback"
          value={newFeedback}
          onChange={handleChange}
          cols="70"
          rows="30"
        ></textarea>
      </form>
      {newFeedbackList.map((item) => (
        <ListItem key={item} item={item} />
      ))}
    </>
  );
}

export default NewFeedback;
