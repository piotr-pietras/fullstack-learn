import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      grey15: string;
      grey25: string;
      grey50: string;
      grey75: string;
      grey100: string;
      grey200: string;
      grey300: string;
      grey400: string;
      grey500: string;
      grey600: string;
      grey700: string;
      grey800: string;
      grey1000: string;
    };
    fontSize: {
      XL: string;
      L: string;
      M: string;
      S: string;
      XS: string;
    };
  }

  interface ThemeOptions {
    colors?: {
      grey15: string;
      grey25: string;
      grey50: string;
      grey75: string;
      grey100: string;
      grey200: string;
      grey300: string;
      grey400: string;
      grey500: string;
      grey600: string;
      grey700: string;
      grey800: string;
      grey1000: string;
    };
    fontSize?: {
      XL: string;
      L: string;
      M: string;
      S: string;
      XS: string;
    };
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".App": {
          height: "100%",
          padding: "0.5rem",
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
  colors: {
    grey15: "#f9f9f9",
    grey25: "#f3f3f3",
    grey50: "#eaeef3",
    grey75: "#dfe2e7",
    grey100: "#d2d3d4",
    grey200: "#adbbc5",
    grey300: "#eaebed",
    grey400: "#768b9b",
    grey500: "#f4f5f7",
    grey600: "#f3f3f3",
    grey700: "#425563",
    grey800: "#34434e",
    grey1000: "#000000",
  },
  fontSize: {
    XL: "1.25rem",
    L: "1rem",
    M: "0.875rem",
    S: "0.75rem",
    XS: "0.625rem",
  },
});
