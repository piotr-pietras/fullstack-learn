import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      grey: string;
      blue: string;
    };
    palette: {
      primary: {
        main: string;
      };
    };
    fontSize: {
      XL: string;
      L: string;
      M: string;
      S: string;
      XS: string;
    };
    fontWeight: {
      thin: number;
      bold: number;
    };
  }

  interface ThemeOptions {
    colors?: {
      grey: string;
      blue: string;
    };
    fontSize?: {
      XL: string;
      L: string;
      M: string;
      S: string;
      XS: string;
    };
    fontWeight?: {
      thin: number;
      bold: number;
    };
  }
}

const colors = {
  grey: "#BDBDBD",
  blue: "#1976d2",
};

export const theme = createTheme({
  typography: {
    fontFamily: "sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".App": {
          height: "100%",
        },
        "#root": {
          height: "100%",
        },
        body: {
          height: "100%",
        },
        html: {
          height: "100%",
        },
      },
    },
  },
  colors,
  fontSize: {
    XL: "1.25rem",
    L: "1rem",
    M: "0.875rem",
    S: "0.75rem",
    XS: "0.625rem",
  },
  fontWeight: {
    thin: 100,
    bold: 900,
  },
});
