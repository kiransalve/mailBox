import React from "react";
import { IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CropSquareIcon from "@mui/icons-material/CropSquare";

const EmailListSetting = ({onRefresh}) => {
  return (
    <div style={{borderBottom:"1px solid whitesmoke"}} 
    className="d-flex align-items-center position-sticky 
    sticky-top justify-content-between">
      <div>
        <IconButton >
          <CropSquareIcon />
        </IconButton>
        <IconButton>
          <KeyboardArrowDownIcon />
        </IconButton>
        <IconButton onClick={() => onRefresh()}>
          <RefreshIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className="d-flex align-items-center">
        
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default EmailListSetting;
