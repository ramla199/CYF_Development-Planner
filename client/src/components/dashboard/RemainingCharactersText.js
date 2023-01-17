import React from "react";

const RemainingCharactersText = ({ maxLength, remainNum, text }) => {
  let diff = maxLength - remainNum;
  return (
    <div className={diff < 21 ? "td-remaining-less21" : "td-remaining-default"}>
      {text}
    </div>
  );
};

export default RemainingCharactersText;