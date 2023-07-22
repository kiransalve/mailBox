import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InboxIcon from "@mui/icons-material/Inbox";
import StarRateIcon from "@mui/icons-material/StarRate";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import LabaleOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import { useDispatch, useSelector } from "react-redux";
import { open, selectType, setInboxMail, setUnreadMail } from "../store/mailSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectedType = useSelector((state) => state.mail.selectedType);
  const inboxMail = useSelector((state) => state.mail.inbox);
  const outboxMail = useSelector((state) => state.mail.outbox);
  const unreadMail = useSelector((state) => state.mail.unread)

  const handleSelectedType = (type) =>{
    dispatch(selectType(type))
    if(type === "inbox"){
      dispatch(setInboxMail(inboxMail))
    }else if(type === "unread"){
      const unreadMail = inboxMail.filter((mail) => mail.isNew)
      dispatch(setUnreadMail(unreadMail))
    }
  }

  return (
    
    <div className="d-flex flex-column m-3">
      <Button
        startIcon={<AddIcon />}
        className="rounded p-1 w-75 mx-3 mb-4"
        style={{ boxShadow: " 1px 2px 3px #ccc" }}
        onClick={() => dispatch(open())}
      >
        Compose
      </Button>

      <div
        className={`d-flex align-items-center p-2 ${
          selectedType === "inbox" ? "text-danger" : ""
        }`}
        style={{ cursor: "pointer" }}
      >
        <InboxIcon className="w-25" style={{ color: "rgb(94,94,94" }} />
        <div
          className="w-50"
          style={{ fontSize: "14px" }}
          onClick={() => handleSelectedType("inbox")}
        >
          Inbox
        </div>
        <div className="w-25" style={{ fontSize: "14px" }}>
          {inboxMail.length}
        </div>
      </div>

      <div
        className={`d-flex align-items-center p-2 ${
          selectedType === "outbox" ? "text-danger" : ""
        }`}
        style={{ cursor: "pointer" }}
      >
        <WatchLaterIcon className="w-25" style={{ color: "rgb(94,94,94" }} />
        <div
          className="w-50"
          style={{ fontSize: "14px" }}
          onClick={() => dispatch(selectType("outbox"))}
        >
          Sent
        </div>
        <div className="w-25" style={{ fontSize: "14px" }}>
          {outboxMail.length}
        </div>
      </div>

      <div
      className={`d-flex align-items-center p-2 ${
        selectedType === "unread" ? "text-danger" : ""
      }`}
        style={{ cursor: "pointer" }}
      >
        <DownloadDoneIcon className="w-25" style={{ color: "rgb(94,94,94" }} />
        <div className="w-50" style={{ fontSize: "14px" }} 
        onClick={() => handleSelectedType("unread")}
        >
          Unread
        </div>
        <div className="w-25" style={{ fontSize: "14px" }}>
          {unreadMail.length}
        </div>
      </div>

      <div
        className="d-flex align-items-center p-2"
        style={{ cursor: "pointer" }}
      >
        <StarRateIcon className="w-25" style={{ color: "rgb(94,94,94" }} />
        <div className="w-50" style={{ fontSize: "14px" }}
          onClick={() => dispatch(selectType("stared"))}
        >
          Starred
        </div>
        <div className="w-25" style={{ fontSize: "14px" }}>
          123
        </div>
      </div>

      <div
        className="d-flex align-items-center p-2"
        style={{ cursor: "pointer" }}
      >
        <LabaleOutlinedIcon
          className="w-25"
          style={{ color: "rgb(94,94,94" }}
        />
        <div className="w-50" style={{ fontSize: "14px" }}>
          Important
        </div>
        <div className="w-25" style={{ fontSize: "14px" }}>
          123
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
