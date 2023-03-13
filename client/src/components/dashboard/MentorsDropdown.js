import React, { useState, useEffect } from "react";

function MentorsDropdown() {
  const [list, setList] = useState([]);
  const [mentor, setMentor] = useState("");

  const getMentors = async () => {
    try {
      const res = await fetch("/dashboard/mentors", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);

      setList(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // const getMentor = async () => {
  //   try {
  //     const res = await fetch(`/dashboard/mentors/${id}`, {
  //       method: "GET",
  //       headers: { jwt_token: localStorage.token },
  //     });

  //     const parseData = await res.json();
  //     console.log(parseData);
  //     setMentor(parseData.mentorId);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  useEffect(() => {
    getMentors();
    // getMentor();
  }, []);

  return (
    <>
      <h2>select mentor</h2>
      <select>
        {list.map((mentor) => (
          <option key={mentor.mentor_id}>{mentor.username}</option>
        ))}
      </select>
    </>
  );
}

export default MentorsDropdown;

// import React, { useState } from "react";

// function Form() {
//   const [draftTitle, setDraftTitle] = useState("");
//   const [draftText, setDraftText] = useState("");

//   const onSubmitForm = async (e) => {
//     e.preventDefault();
//     try {
//       const myHeaders = new Headers();

//       myHeaders.append("Content-Type", "application/json");
//       myHeaders.append("jwt_token", localStorage.token);

//       const body = { draftTitle, draftText };
//       const response = await fetch("/dashboard/drafts", {
//         method: "POST",
//         headers: myHeaders,
//         body: JSON.stringify(body),
//       });

//       const parseResponse = await response.json();

//       console.log(parseResponse);

//       // setDraftsChange(true);

//       setDraftText("");
//       setDraftTitle("");
//     } catch (err) {
//       console.error(err.message);
//     }
//   };
//   return (
//     <form onSubmit={onSubmitForm}>
//       <button>save</button>
//       <input
//         type="text"
//         placeholder="add title"
//         value={draftTitle}
//         onChange={(e) => setDraftTitle(e.target.value)}
//       />

//       <textarea
//         type="text"
//         placeholder="add text"
//         value={draftText}
//         onChange={(e) => setDraftText(e.target.value)}
//       />
//     </form>
//   );
// }

// export default Form;
