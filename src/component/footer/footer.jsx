import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import backgroundImage from "../../images/background.png";
import { Typography } from "@mui/material";

export function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "30px",
        className: "app-bar-image",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: 35,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        imageRendering: "auto",
        backgroundColor: "black",
        color: "white",
        posiiton: "fixed",
        bottom: 0,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      ></BottomNavigation>
      <Typography sx={{ marginRight: "20px", padding: "15px" }}>FK</Typography>
    </Box>
  );
}
