import React, { useEffect, useState } from "react";
import EmailListSetting from "./EmailListSetting";
import EmailType from "./EmailType";
import EmailBody from "./EmailBody";
import fetchData from "../helper/fetchData";
import { useDispatch, useSelector } from "react-redux";
import {
  setInboxMail,
  setOutboxMail,
  setUnreadMail,
} from "../store/mailSlice";

const EmailList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.email);
  const type = useSelector((state) => state.mail.selectedType);
  console.log(type)
  const mails = useSelector((state) => {
    switch (type) {
      case "inbox":
        return state.mail.inbox;
      case "outbox":
        return state.mail.outbox;
      case "unread":
        return state.mail.unread;
      case "stared":
        return state.mail.stared;
      default:
        return []
    }
  })

  const getData = async () => {
    const emailArray = await fetchData();

    const inbox = [];
    const outbox = [];
    const unread = [];
    const stared = [];

    emailArray.forEach((email) => {
      if (email.recipient === user) {
        inbox.push({ ...email });
        if (email.isNew) {
          unread.push({ ...email })
        }
      } else if (email.senderEmail === user) {
        outbox.push({ ...email });
      }
    });

    dispatch(setInboxMail(inbox));
    dispatch(setOutboxMail(outbox));
    dispatch(setUnreadMail(unread))
  };

  const sortedMails = mails.slice().sort((a, b) => new Date(b.time) - new Date(a.time));

  useEffect(() => {
    getData();
    const intervalId = setInterval(() => {
      getData();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleRefresh = () => {
    getData();
    console.log("Refreshed");
  };

  return (
    <div className="d-flex flex-column">
      <EmailListSetting onRefresh={handleRefresh} />
      <EmailType />
      {sortedMails.map((mail) => {
        return (
          <EmailBody
            key={mail.id}
            id={mail.id}
            type={type}
            senderName={mail.senderEmail}
            recipient={mail.recipient}
            subject={mail.subject}
            message={mail.message}
            time={mail.time}
            isnew={mail.isNew}
          />
        );
      })}
    </div>
  );
};

export default EmailList;
