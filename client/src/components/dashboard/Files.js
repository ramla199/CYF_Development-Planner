import React from "react";
import BackButton from "../BackButton";
import { files } from "../../data/files";
function Files() {
  return (
    <>
      <BackButton />
      <h1>Files</h1>
      <section className="inbox-messages">
        {files.map((file, index) => {
          return (
            <ul key={index}>
              <li>{file.sender_ref}</li>
              <li>{file.file}</li>
            </ul>
          );
        })}
      </section>
    </>
  );
}

export default Files;
