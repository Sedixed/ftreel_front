import React, {  } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "@page/home/Home";
import Login from "@page/user/Authentication";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { HomeButtonLayout } from "layout/ApplicationLayout/HomeButtonLayout";
import Files from "@page/files/Files";
import SidebarLayout from "layout/SidebarLayout/SidebarLayout";
import Followed from "@page/followed/Followed";
import { ApplicationRoute } from "@constant/ApplicationRoute/ApplicationRoute";
import './i18n'
import { LanguageSwitcher } from "@component/LanguageSwitcher/LanguageSwitcher";
import Logout from "@page/user/Logout";
import { AccessRouteLayout } from "layout/ApplicationLayout/AccessRouteLayout";
import Users from "@page/user/Users";
import Validation from "@page/validation/Validation";

function App() {
  // Defining all the application routes
  const router = createBrowserRouter([
    {
      element: <AccessRouteLayout />,
      children: [
        {
          path: ApplicationRoute.HOME,
          element: <Home />
        },
        {
          element: <HomeButtonLayout />,
          children: [
            {
              path: ApplicationRoute.AUTHENTICATION,
              element: <Login />
            },
            {
              path: ApplicationRoute.LOGOUT,
              element: <Logout />
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
            },
            {
              path: ApplicationRoute.USERS,
              element: <Users />
            },
            {
              path: ApplicationRoute.VALIDATION,
              element: <Validation />
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
