import Sidebar from "@component/Sidebar/Sidebar";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  hexToRgb,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LogoutIcon from "@mui/icons-material/Logout";
import { ReactNode, useMemo } from "react";
import { ApplicationRoute } from "@constant/ApplicationRoute/ApplicationRoute";

/**
 * Describe an element to place inside the sidebar.
 */
type SidebarElement = {
  /**
   * The key of the element.
   */
  key: string;

  /**
   * The href of the link of the element.
   */
  href: string;

  /**
   * Icon of the element.
   */
  icon: ReactNode;

  /**
   * Label of the element.
   */
  label: string;

  /**
   * Indicates if the element is stacked at the top or the bottom of the sidebar.
   */
  anchor?: "top" | "bottom";
};

/**
 * Layout adding a sidebar at the left of its childrens.
 */
export default function SidebarLayout() {
  const location = useLocation();
  const theme = useTheme();

  // Sidebar variables
  const sidebarWidth = 300;
  const elements: SidebarElement[] = useMemo(
    () => [
      {
        key: "home",
        href: ApplicationRoute.HOME,
        icon: <HomeIcon />,
        label: "Accueil",
      },
      {
        key: "files",
        href: ApplicationRoute.FILES,
        icon: <FolderIcon />,
        label: "Fichiers",
      },
      {
        key: "followed",
        href: ApplicationRoute.FOLLOWED,
        icon: <BookmarkIcon />,
        label: "Suivis",
      },
      {
        key: "logout",
        href: ApplicationRoute.LOGOUT,
        icon: <LogoutIcon />,
        label: "Déconnexion",
        anchor: "bottom",
      },
    ],
    []
  );

  const buildSidebarElement = (element: SidebarElement) => {
    return (
      <Link
        to={element.href}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem key={element.key} disablePadding>
          <ListItemButton selected={location.pathname == element.href}>
            <ListItemIcon sx={{ color: "inherit" }}>
              {element.icon}
            </ListItemIcon>
            <ListItemText>{element.label}</ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar width={sidebarWidth}>
        <h2 style={{ textAlign: "center" }}>FTreel</h2>
        <List
          sx={{
            height: "100%",
            "&& .Mui-selected": {
              bgcolor: hexToRgb(theme.palette.secondary.main + "70"),
            },
            "&& .Mui-selected:hover": {
              bgcolor: hexToRgb(theme.palette.secondary.main + "90"),
            },
            "& .MuiListItemButton-root:hover": {
              bgcolor: hexToRgb(theme.palette.secondary.main + "70"),
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box>
              {elements.map((element) => {
                if (element.anchor !== "bottom") {
                  return buildSidebarElement(element);
                }
              })}
            </Box>
            <Box>
              <Divider />
              {elements.map((element) => {
                if (element.anchor === "bottom") {
                  return buildSidebarElement(element);
                }
              })}
            </Box>
          </Box>
        </List>
      </Sidebar>

      <Box
        sx={{
          width: { sm: `calc(100% - ${sidebarWidth}px)` },
          ml: { sm: `${sidebarWidth}px` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
