import { createTheme } from "@mui/material/styles";
import { UserType } from "@prisma/client";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#c83737",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const profesionalTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#9f74aa",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

function getTheme (userType: UserType) {
  return userType === UserType.Profesional ? profesionalTheme : lightTheme
}

export {
  lightTheme,
  profesionalTheme,
  getTheme
};
