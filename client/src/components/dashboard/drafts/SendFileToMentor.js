import React from "react";

function SendFileToMentor() {
  const [click, setClick] = useState(false);

  function handleSetClick() {
    setClick(true);
  }
  return (
    <>
      <section onClick={handleSetClick}>
        {click ? <h3>file sent</h3> : <button>send to mentor</button>}
      </section>
    </>
  );
}

export default SendFileToMentor;
