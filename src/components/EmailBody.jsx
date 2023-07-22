import React from "react";
import { Col, Row } from "react-bootstrap";
import { IconButton, Tooltip } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LabaleOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSelectedMsg } from "../store/mailSlice";
import deleteSelectedMail from "../helper/deleteMail";
import Brightness1Icon from '@mui/icons-material/Brightness1';

const EmailBody = ({ id, senderName, subject, type, recipient,message, time, isnew}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const date = new Date(time).toDateString()
  const times = new Date(time).toLocaleTimeString('en-US',{hour:"numeric",minute:"numeric",hour12:true})
  const selectedType = useSelector((state) => state.mail.selectedType);

  const openSelectedMessage = () => {
    dispatch(openSelectedMsg({id, senderName, subject, type, recipient,message, time, isnew }));
    console.log("from",senderName,"to", recipient)
    navigate("/mail");

    // only update unread to read if user mail in inbox or in unread
    if(selectedType === "inbox" || "unread"){
      fetch(`https://mailbox-43da3-default-rtdb.firebaseio.com/mails/${id}.json`,{
        method:"PATCH",
        headers:{
          "Content-Type" :"application/json"
        },
        body:JSON.stringify({
          isNew:false
        })
      })
    }
  }

  const deleteMail = async (event) => {
    event.stopPropagation();
    await deleteSelectedMail(id);
    console.log("deleted", id)
  };
  return (
    <Row >
      <Col
        sm={4}
        className="d-flex align-items-center border-bottom"
        style={{ cursor: "pointer" }}
        onClick={openSelectedMessage}
      >
        <Col sm={3} className="m-1" >
        {selectedType === "inbox" && 
          <IconButton style={{color: isnew ? "blue" : "grey" }}>
            <Brightness1Icon style={{fontSize:"15"}}/>
          </IconButton>
          }

          <StarBorderIcon />
          <LabaleOutlinedIcon />
        </Col>

        <Col>
        {type === "outbox" ? recipient : senderName}
        </Col>
      </Col>

      <Col
        sm={5}
        className="d-flex align-items-center border-bottom"
        onClick={openSelectedMessage}
        style={{ cursor: "pointer" }}
      >
        
          <div className="">
            <b>{subject}</b> 
            {typeof message === "string" ? message.slice(0, 50) + "..." : ""}
          </div>
        
      </Col>

      <Col
      sm={3}
        className="d-flex align-items-center justify-content-end border-bottom"
        style={{ cursor: "pointer" }}
      >
        <Col className="bg">{date} {times}</Col>
        <Tooltip title="delete">
        <IconButton onClick={deleteMail}>
          <DeleteIcon />
        </IconButton>
        </Tooltip>
      </Col>
    </Row>
  );
};

export default EmailBody;
