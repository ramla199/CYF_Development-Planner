import React, { useState } from "react";
import ListFiles from "../drafts/ListFiles";
import Drafts from "../drafts/Drafts";
import CompletedFiles from "../drafts/CompletedFiles";
import AddNewFile from "../drafts/AddNewFile";

function FilesControls({ name }) {
  const [showAll, setShowAll] = useState(false);
  const [allButtonText, setAllButtonText] = useState("all");
  const [draftsButtonText, setDraftsButtonText] = useState("drafts");
  const [sentButtonText, setSentButtonText] = useState("sent");
  const [newButtonText, setNewButtonText] = useState("new");

  const handleShowAll = () => {
    setShowAll(!showAll);
    setShowDrafts(false);
    setShowCompleted(false);
    setShowAddNew(false);
    setAllButtonText((state) => (state === "all" ? "close" : "all"));
  };

  const [showDrafts, setShowDrafts] = useState(false);

  const handleShowDrafts = () => {
    setShowDrafts(!showDrafts);
    setShowAll(false);
    setShowCompleted(false);
    setShowAddNew(false);
    setDraftsButtonText((state) => (state === "drafts" ? "close" : "drafts"));
  };

  const [showCompleted, setShowCompleted] = useState(false);

  const handleShowCompleted = () => {
    setShowCompleted(!showCompleted);
    setShowAll(false);
    setShowDrafts(false);
    setShowAddNew(false);
    setSentButtonText((state) => (state === "sent" ? "close" : "sent"));
  };

  const [showAddNew, setShowAddNew] = useState(false);
  const handleShowAddNew = () => {
    setShowAddNew(!showAddNew);
    setShowCompleted(false);
    setShowAll(false);
    setShowDrafts(false);
    setNewButtonText((state) => (state === "new" ? "close" : "new"));
  };

  return (
    <>
      <div className="controls">
        <h2 className="icon-heading">Files</h2>
        <button onClick={handleShowAll}>{allButtonText}</button>

        <button onClick={handleShowDrafts}>{draftsButtonText}</button>
        <button onClick={handleShowCompleted}>{sentButtonText}</button>
        <button onClick={handleShowAddNew}>{newButtonText}</button>
      </div>
      <div> {showAll ? <ListFiles name={name} /> : false}</div>
      <div>{showDrafts ? <Drafts /> : <></>}</div>
      <div>{showCompleted ? <CompletedFiles /> : false}</div>
      <div> {showAddNew ? <AddNewFile /> : false}</div>
    </>
  );
}

export default FilesControls;
