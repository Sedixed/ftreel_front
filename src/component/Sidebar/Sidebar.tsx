import { Drawer, IconButton, styled } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { ReactNode, useState } from "react";

export type SidebarProps = {
  /**
   * The widebar width.
   */
  width: number,

  /**
   * The sidebar content.
   */
  children: ReactNode,
}

/**
 * A component that allows a user to create a responsive sidebar with the given content.
 */
export default function Sidebar({ width, children }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  return (
    <>
      <DrawerButton sx={{ display: { sm: "none" }, color: "black" }} onClick={handleDrawerToggle}>
        <MenuIcon />
      </DrawerButton>
      <Drawer
        container={document.body}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width },
        }}
      >
        {children}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width },
        }}
        open
      >
        {children}
      </Drawer>
    </>
  )
}

const DrawerButton = styled(IconButton)(() => ({
  position: "absolute",
  bottom: 10,
  right: 10,
  zIndex: 999,
}));
