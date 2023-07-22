import React from "react";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleIcon from "@mui/icons-material/People";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const EmailType = () => {
  return (
    <div className="d-flex align-items-center" style={{borderBottom: "1px solid whitesmoke", cursor:"pointer"}}>
      <div style={{backgroundColor: "whitesmoke"}} className="d-flex align-items-center justify-content- w-25 px-4 mt-2">
        <InboxIcon />
        <p className="mt-3 mx-3">Primary</p>
      </div>

      <div className="d-flex align-items-center justify-content-center w-25 px-4 mt-2">
        <PeopleIcon />
        <p className="mt-3 mx-3">Social</p>
      </div>

      <div className="d-flex align-items-center justify-content-center w-25 px-4 mt-2">
        <LocalOfferIcon />
        <p className="mt-3 mx-3">Promotion</p>
      </div>
    </div>
  );
};

export default EmailType;
