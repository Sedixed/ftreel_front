import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "@page/home/Home";
import Login from "@page/login/Login";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { HomeButtonLayout } from "layout/HomeButtonLayout/HomeButtonLayout";

function App() {
  // Defining all the application routes
  const router = createBrowserRouter([
    {
      element: <HomeButtonLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/login",
          element: <Login />
        }
      ]
    }
    
  ]);

  // Create the application theme
  const primaryColor = "#223A54"
  const secondaryColor = "#FFF6FF"
  const theme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
        light: primaryColor,
      },
      secondary: {
        main: secondaryColor,
        light: secondaryColor
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: secondaryColor,
          }
        }
      }
    }
  })

  return (
    <React.StrictMode>
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
