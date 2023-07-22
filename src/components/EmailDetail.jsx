import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { Avatar, IconButton } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import LaunchIcon from "@mui/icons-material/Launch";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyIcon from "@mui/icons-material/Reply";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";

const EmailDetail = () => {
  const selectedMsg = useSelector((state) => state.mail.selectedMsg);  
  const keys = selectedMsg.message._immutable.selection.anchorKey
  const message =  selectedMsg.message._immutable.currentContent.blockMap[`${keys}`].text
  console.log(message, keys);
  // console.log(selectedMsg.message._immutable.currentContent.blockMap['4rrgn'].text);
  const date = new Date(selectedMsg.time).toDateString()
  const time = new Date(selectedMsg.time).toLocaleTimeString('en-US',{hour:"numeric",minute:"numeric",hour12:true})

  const navigate = useNavigate();

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-between">
          <IconButton onClick={() => navigate("/")}>
            <ArrowBackIcon  />
          </IconButton>
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
          <IconButton>
            <RefreshIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div >
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>

      <div className="d-flex flex-column border-top">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <h4 className="px-2">{selectedMsg.subject}</h4>
            <IconButton>
              <LabelImportantIcon />
            </IconButton>
          </div>
          <div>
            <IconButton>
              <PrintIcon />
            </IconButton>
            <IconButton>
              <LaunchIcon />
            </IconButton>
          </div>
        </div>


        <Col className="d-flex align-items-center justify-content-between border-bottom ">
          <div className="d-flex align-items-center">
            <IconButton>
              <Avatar></Avatar>
            </IconButton>

            <h4>{selectedMsg.subject}</h4>
            <div className="p-1">{selectedMsg.senderName}</div>
          </div>

          <div className="d-flex align-items-center">
            <div>{date} {time} </div>
            <IconButton>
              <StarIcon />
            </IconButton>

            <IconButton>
              <ReplyIcon />
            </IconButton>

            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </Col>

        <Col className="m-2">
          <div>{message}</div>
        </Col>
      </div>
    </div>
  );
};

export default EmailDetail;
