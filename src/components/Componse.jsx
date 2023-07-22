import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import HeightIcon from "@mui/icons-material/Height";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../store/mailSlice";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Col } from "react-bootstrap";

const Componse = () => {
  const dispatch = useDispatch();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  
  const [editorValue, setEditorValue] = useState("");

  const currentTime = Date.now();
  const userEmail = useSelector((state) => state.user.email);

  const formSubmit = async (e) => {
    e.preventDefault();
    const request = await fetch(
      "https://mailbox-43da3-default-rtdb.firebaseio.com/mails.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: to,
          subject: subject,
          message: editorValue,
          time: currentTime,
          senderEmail: userEmail,
          isNew: true,
        }),
      }
    );
    const response = await request.data;
    setTo("");
    setSubject("");
    setEditorValue("");
    dispatch(close());
    
  };
  return (
    <div
      className="position-absolute bottom-0 overflow-hidden bg-white border"
      style={{ right: "60px", maxWidth: "40vw", minHeight: "80vh" }}
    >
      <div className="d-flex align-items-center  justify-content-between bg-dark text-white p-2 rounded">
        <div className="d-flex align-items-center ">
          <span className="text-small ">New Message</span>
        </div>
        <div className="d-flex align-items-center">
          <RemoveIcon
            style={{ cursor: "pointer", fontSize: "17px", marginRight: "8px" }}
          />
          <HeightIcon
            style={{
              cursor: "pointer",
              transform: "rotate(45deg)",
              transformOrigin: "center",
              marginRight: "8px",
              fontSize: "17px",
            }}
          />
          <CloseIcon
            onClick={() => dispatch(close())}
            style={{ cursor: "pointer", fontSize: "17px" }}
          />
        </div>
      </div>

      <form onSubmit={formSubmit}>
        <div className="d-flex flex-column">
          <div className="d-flex flex-column">
            <input
              style={{ outline: "none" }}
              type="email"
              className="m-1 p-1 w-100 outline-0 border-0"
              placeholder="Recepient"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <input
              type="text"
              className="m-1 p-1 border-0"
              style={{ outline: "none" }}
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Col style={{ width: "480px" }}>
              <Editor
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                }}
                editorState={editorValue}
                onEditorStateChange={setEditorValue}
              />
            </Col>
          </div>
        </div>

          <div className="mt-auto p-2 position-absolute bottom-0">
            <button
              className="px-2 p-1 rounded bg-primary text-white"
              style={{ outline: "none", border: "none", cursor: "pointer" }}
              type="submit"
            >
              Send
            </button>
          </div>

      </form>
    </div>
  );
};

export default Componse;
