import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import bookIcon from "../../images/bookIcon.png";
import backgroundImage from "../../images/background.png";
import "./header.css";

const pages = [
  { name: "Home", path: "/" },
  { name: "Read List", path: "/readList" },
  { name: "Search", path: "/search" },
  { name: "Reviews", path: "/review" },
];

export function Header() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page) {
      navigate(page.path);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        className: "app-bar-image",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: 130,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        imageRendering: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              className: "title",
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "revert",
              fontSize: "45px !important",
              //fontSize: "45px",
              fontWeight: "bold",
              letterSpacing: ".3rem",
              color: "white",
              textShadow:
                "0 0 6px black, 0 0 6px black, 0 0 6px black, 0 0 6px black",
              textDecoration: "none",
            }}
          >
            MY BOOK SEARCH
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleCloseNavMenu(page)}
                sx={{
                  mx: 2,
                  color: "white !important",
                  textTransform: "uppercase !important",
                  fontSize: "20px !important",
                  textShadow:
                    "0 0 3px black, 0 0 3px black, 0 0 3px black, 0 0 3px black !important",
                  fontWeight: "bold !important",
                  ":hover": {
                    color: "black !important",
                    textShadow:
                      "0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white !important",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <Box sx={{ flexGrow: 1 }} />
              <img
                src={bookIcon}
                alt="book icon"
                style={{
                  width: "80px",
                  height: "80px",
                  textShadow:
                    "0 0 6px black, 0 0 6px black, 0 0 6px black, 0 0 6px black",
                  filter: "brightness(150%)",
                }}
              />
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
                <MenuItem
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page)}
                >
                  <Typography
                    textAlign="center !important"
                    sx={{
                      mx: 2,
                      color: "white !important",
                      textTransform: "uppercase !important",
                      fontSize: "15px !important",
                      textShadow:
                        "0 0 3px black, 0 0 3px black, 0 0 3px black, 0 0 3px black !important",
                      fontWeight: "bold !important",
                      ":hover": {
                        color: "black !important",
                        textShadow:
                          "0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white !important",
                      },
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "revert",
              fontWeight: "bold",
              fontSize: "30px !important",
              letterSpacing: ".3rem",
              color: "white",
              textShadow:
                "0 0 6px black, 0 0 6px black, 0 0 6px black, 0 0 6px black",
              textDecoration: "none",
            }}
          >
            MY BOOK SEARCH
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
