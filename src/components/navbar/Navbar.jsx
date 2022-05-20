import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { signOutStart } from "../../redux/user/user.actions";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const pages = [
  { name: "Customers", link: "/", key: 0 },
  { name: "Schedule", link: "/schedule", key: 1 },
  { name: "Inventory", link: "/parts_catalog", key: 2 },
  { name: "Accounting", link: "/accounting", key: 3 },
  { name: "Settings", link: "/settings", key: 4 },
];
const settings = ["Logout"];

const NavBar = ({ currentUser, signOutStart }) => {
  let navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ background: "blue" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Service Tools
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.key} onClick={() => navigate(page.link)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            ST
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {currentUser
              ? pages.map((page) => (
                  <Button
                    key={page.key}
                    onClick={() => navigate(page.link)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                ))
              : pages.map((page) => (
                  <Button
                    disabled
                    key={page.key}
                    onClick={() => navigate(page.link)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {currentUser ? (
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: "white" }}
                >
                  {currentUser.displayName
                    ? currentUser.displayName
                    : currentUser.email}
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Open settings">
                {/* change this to open a login button */}
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="No User" />
                </IconButton>
              </Tooltip>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => signOutStart()}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* {currentUser ? (
          <Toolbar>
            <Typography variant="h5">Service Tools</Typography>
            <Typography>
              <Link
                href="/"
                onClick={() => navigate("/")}
                color="inherit"
                underline="none"
              >
                Customers
              </Link>
              <Link
                href="/schedule"
                onClick={() => navigate("/schedule")}
                color="inherit"
                underline="none"
              >
                Schedule
              </Link>
              <Link
                href="/PartsCatalog"
                onClick={() => navigate("/PartsCatalog")}
                color="inherit"
                underline="none"
              >
                Inventory
              </Link>
              <Link
                href="/accounting"
                onClick={() => navigate("/accounting")}
                color="inherit"
                underline="none"
              >
                Accounting
              </Link>
              <Link
                href="/settings"
                onClick={() => navigate("/settings")}
                color="inherit"
                underline="none"
              >
                Settings
              </Link>
            </Typography>
            <div />
            <Typography>{currentUser.email}</Typography>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseBlankFormMenu}
            >
              <MenuItem onClick={handleCloseBlankFormMenu}>
                Blank Proposal
              </MenuItem>
              <MenuItem onClick={handleCloseBlankFormMenu}>
                Blank Material Req
              </MenuItem>
            </Menu>
            <Link href="/signin" onClick={signOutStart} underline="none">
              Log Out
            </Link>
          </Toolbar>
        ) : (
          <Toolbar>
            <Typography variant="h5">Service Tools</Typography>
            <Button color="inherit" onClick={() => navigate("/signin")}>
              Log In
            </Button>
          </Toolbar>
        )} */}
    </AppBar>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);