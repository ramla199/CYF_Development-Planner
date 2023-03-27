import React, { useState, useEffect } from "react";

function AddNewFile({ senderUsername }) {
  const [draftTitle, setDraftTitle] = useState("");
  const [draftText, setDraftText] = useState("");

  const [list, setList] = useState([]);

  const getMentors = async () => {
    try {
      const res = await fetch("/dashboard/mentors", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);

      setList(parseData);

      console.log(parseData.user_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMentors();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { draftTitle, draftText };
      const response = await fetch("/dashboard/drafts", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      // setDraftsChange(true);

      setDraftText("");
      setDraftTitle("");
    } catch (err) {
      console.error(err.message);
    }
  };

  const [formData, setFormData] = useState({
    messageTitle: "",
    messageText: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        // [e.target.name]: e.target.value,
        [name]: value,
      };
    });

    console.log(e.target.value);
    // console.log(e.target.name);
    // console.log(e.target.placeholder);
    // console.log(e.target.type);
    // console.log(e.target);
  };

  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");

  const onSubmitMessageForm = async (e) => {
    e.preventDefault();
    // console.log(formData);

    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { messageTitle, messageText, senderUsername };
      const response = await fetch("/dashboard/messages", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      // console.log(parseResponse.sender_username);

      setMessageText("");
      setMessageTitle("");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div className="flex">
          <button>save</button>
        </div>
        <input
          type="text"
          placeholder="add title"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
        />

        <textarea
          type="text"
          placeholder="add text"
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
        />
      </form>
      <form onSubmit={onSubmitMessageForm}>
        <button type="button">send</button>
        {/* <h3>Message from {senderUsername}</h3> */}
        <label htmlFor="mentors">select a mentor</label>
        <select
          id="mentors"
          value={formData.mentors}
          name="mentors"
          onChange={handleChange}
          // onChange={(e) => setReceipientId(e.target.value)}
        >
          <option>--select mentor--</option>
          {list.map((mentor) => (
            <option value={mentor.user_id} key={mentor.user_id}>
              {mentor.username}
            </option>
          ))}
        </select>

        <button>send to</button>
        <input
          type="text"
          placeholder="add title"
          // name="addTitle"
          value={messageTitle}
          onChange={(e) => setMessageTitle(e.target.value)}
        />
        <textarea
          placeholder="add text"
          // name="addText"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
      </form>
    </>
  );
}

export default AddNewFile;
