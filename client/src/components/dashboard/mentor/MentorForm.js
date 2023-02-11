import React, { useState } from "react";

function MentorForm(props) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  // handle 'add' button
  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
  }

  return (
    <>
      {/* form */}
      <section>
        <form onSubmit={handleSubmit}>
          {/* subheading for text area */}
          <h2>
            <label htmlFor="new-input">start new file</label>
          </h2>

          {/* textarea to add a task */}
          <textarea
            type="text"
            id="new-input"
            name="text"
            autoComplete="off"
            value={name}
            onChange={handleChange}
          />
          {/* add text from the textarea button */}
          <button type="submit">Add</button>
        </form>
      </section>
    </>
  );
}

export default MentorForm;
