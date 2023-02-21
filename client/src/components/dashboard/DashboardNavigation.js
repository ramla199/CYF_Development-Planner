import React from "react";
import { Link } from "react-router-dom";

//images
import filesIcon from "../../images/Documents-icon-48.png";
import messagesIcon from "../../images/E-mail-icon.png";
import accountIcon from "../../images/icons8-test-account-48.png";

const navItems = [
  {
    id: 1,
    description: "Files",
    image: filesIcon,
    link: "/draft-files",
  },
  {
    id: 2,
    description: "Messages",
    image: messagesIcon,
    link: "/messages",
  },
  {
    id: 4,
    description: "Account",
    image: accountIcon,
    link: "/account",
  },
];

const nav = navItems.map((item) => {
  return (
    <div key={item.id}>
      <Link to={item.link} className="icon-heading">
        <h2>{item.description}</h2>
        <img src={item.image} alt="files icon" />
      </Link>
    </div>
  );
});

function DashboardNavigation() {
  return (
    <>
      <div className="flex">{nav}</div>
    </>
  );
}

export default DashboardNavigation;
