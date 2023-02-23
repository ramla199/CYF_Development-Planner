import React, { useState } from "react";
import ListFiles from "../ListFiles";
import Drafts from "../Drafts";
import CompletedFiles from "../CompletedFiles";
import AddNewFile from "../AddNewFile";

function FilesControls() {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(!showAll);
    setShowDrafts(false);
    setShowCompleted(false);
    setShowAddNew(false);
  };

  const [showDrafts, setShowDrafts] = useState(false);

  const handleShowDrafts = () => {
    setShowDrafts(!showDrafts);
    setShowAll(false);
    setShowCompleted(false);
    setShowAddNew(false);
  };

  const [showCompleted, setShowCompleted] = useState(false);

  const handleShowCompleted = () => {
    setShowCompleted(!showCompleted);
    setShowAll(false);
    setShowDrafts(false);
    setShowAddNew(false);
  };

  const [showAddNew, setShowAddNew] = useState(false);
  const handleShowAddNew = () => {
    setShowAddNew(!showAddNew);
    setShowCompleted(false);
    setShowAll(false);
    setShowDrafts(false);
  };

  return (
    <>
      <div className="controls">
        <button onClick={handleShowAll}>all</button>

        <button onClick={handleShowDrafts}>drafts</button>
        <button onClick={handleShowCompleted}>completed</button>
        <button onClick={handleShowAddNew}>new</button>
      </div>
      <div> {showAll ? <ListFiles /> : false}</div>
      <div>{showDrafts ? <Drafts /> : <></>}</div>
      <div>{showCompleted ? <CompletedFiles /> : false}</div>
      <div> {showAddNew ? <AddNewFile /> : false}</div>
    </>
  );
}

export default FilesControls;
