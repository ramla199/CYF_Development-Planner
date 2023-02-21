import React, { useState } from "react";

//images import
import filesIcon from "../../images/Documents-icon-48.png";
import messagesIcon from "../../images/E-mail-icon.png";
import accountIcon from "../../images/icons8-test-account-48.png";
import Controls from "./Controls";

const navItems = [
  {
    id: 1,
    description: "Files",
    image: filesIcon,
  },
  {
    id: 2,
    description: "Messages",
    image: messagesIcon,
  },
  {
    id: 4,
    description: "Account",
    image: accountIcon,
  },
];

const nav = navItems.map((item) => {
  return (
    <div key={item.id}>
      <h2 className="icon-heading">{item.description}</h2>
      <img src={item.image} alt="files icon" />
    </div>
  );
});

function DashboardNavigation() {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div className="flex" onClick={handleToggle}>
        {nav}
      </div>
      {toggle ? <Controls /> : <></>}
    </>
  );
}

export default DashboardNavigation;
