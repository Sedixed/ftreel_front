import Sidebar from "@component/Sidebar/Sidebar";
import { Link, Outlet } from "react-router-dom";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

/**
 * Layout adding a sidebar at the left of its childrens.
 */
export default function SidebarLayout() {
  const sidebarWidth = 300;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar width={sidebarWidth}>
        <List>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <ListItem key="home" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>Accueil</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Sidebar>

      <Box sx={{ width: { sm: `calc(100% - ${sidebarWidth})` }, ml: { sm: `${sidebarWidth}px` } }}>
        <Outlet />
      </Box>
    </Box>
  )
}
