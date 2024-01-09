import React, {  } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "@page/home/Home";
import Login from "@page/login/Login";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { HomeButtonLayout } from "layout/ApplicationLayout/HomeButtonLayout";
import Files from "@page/files/Files";
import SidebarLayout from "layout/SidebarLayout/SidebarLayout";
import Followed from "@page/followed/Followed";
import { ApplicationRoute } from "@constant/ApplicationRoute/ApplicationRoute";
import { GlobalLayout } from "layout/GlobalLayout/GlobalLayout.tsx";
import './i18n'
import { LanguageSwitcher } from "@component/LanguageSwitcher/LanguageSwitcher";

function App() {
  // Defining all the application routes
  const router = createBrowserRouter([
    {
      element: <GlobalLayout/>,
      children: [
        {
          path: ApplicationRoute.HOME,
          element: <Home />
        },
        {
          element: <HomeButtonLayout />,
          children: [
            {
              path: ApplicationRoute.LOGIN,
              element: <Login />
            }
          ]
        },
        {
          element: <SidebarLayout />,
          children: [
            {
              path: ApplicationRoute.FILES,
              element: <Files />
            },
            {
              path: ApplicationRoute.FOLLOWED,
              element: <Followed />
            }
          ]
        }
      ]
    }
  ]);

  // Create the application theme
  const primaryColor = "#223A54"
  const secondaryColor = "#F94F5A"
  const backgroundColor = "#FFF6FF";
  const theme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
        light: primaryColor,
      },
      secondary: {
        main: secondaryColor,
        light: secondaryColor
      },
      background: {
        default: "#FFF6FF"
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: backgroundColor,
          }
        }
      }
    }
  })

  return (
    <React.StrictMode>
      <LanguageSwitcher />
      {/* Provide the application theme */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Providing the router inside the application */}
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </React.StrictMode>  
  )
}

export default App
