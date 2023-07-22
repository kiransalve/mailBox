import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Col, Row } from "react-bootstrap";
import generateRandomColor from "../helper/randomColor";
import { logout } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.email);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const isAvatarMenuOpen = Boolean(anchorEl);
  return (
    <Row className="d-flex align-items-center p-3">
      <Col sm={2}>
        <IconButton>
          <ReorderIcon />
        </IconButton>
        <img
          src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
          alt="img"
        />
      </Col>

      <Col>
        <div
          style={{ backgroundColor: "whitesmoke" }}
          className="rounded d-flex align-items-center justify-content-between"
        >
          <Col>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <input
              type="text"
              placeholder="Search..."
              className="border-0 bg-transparent"
              style={{ outline: 0 }}
            />
          </Col>
        </div>
      </Col>

      <Col sm={2} className="d-flex align-items-center">
        <IconButton>
          <HelpOutlineIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>

        <Tooltip title="logout">
          <IconButton
            onClick={() => {
              dispatch(logout());
              navigate("/");
              console.log("logout");
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title={user}>
          <Avatar
            sx={{ width: 40, height: 40 }}
            style={{ backgroundColor: generateRandomColor() }}
          >
            {user.slice(0, 2).toUpperCase()}
          </Avatar>
        </Tooltip>
      </Col>
    </Row>
  );
};

export default Header;
