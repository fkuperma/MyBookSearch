import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import backgroundImage from "../../images/background.png";

export function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "30px",
        // backgroundImage: `url(${backgroundImage})`,
        className: "app-bar-image",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        imageRendering: "auto",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      ></BottomNavigation>
    </Box>
  );
}
