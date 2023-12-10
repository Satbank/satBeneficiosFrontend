/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, styled, Collapse,  Divider, } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { connect } from "react-redux";
import Logo from "../../../image/logomarca.png";
import PerfilsMenu from "./PerfilsMenu";
import CircularIndeterminate from "../../CircularProgress/ProgressBar"; 

const drawerWidth = 240;

const NewHOC = (PassedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <div>
          <PassedComponent {...this.props} />
        </div>
      );
    }
  };
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Sidebar = (props) => {
  const { open, user } = props;
  const perfil = user.perfil_id - 1;
  const [isExpand, setIsExpand] = React.useState(999);

  const handleClickMenu = (index) => {
    setIsExpand((state) => (index === state ? 999 : index));
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1C2335 "
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
          <img src={Logo} alt="Logo" style={{ width: '100%' }} />
        </Box>
      </DrawerHeader>
      <Divider />
      <Box sx={{ overflow: "auto" }}>
        {user.id ? (
          <List>
            {PerfilsMenu[perfil].map((p, index) => {
              const IconComponent = NewHOC(p.icon);

              return (
                <ListItem key={p.name} disablePadding>
                  <ListItemButton
                    component={RouterLink} 
                    to={p.route} 
                    onClick={() => handleClickMenu(index)}
                  >
                    <ListItemIcon>
                      <IconComponent />
                    </ListItemIcon>
                    <ListItemText primary={p.name} />
                    {p.isSubmenu ? (
                      isExpand === index ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : (
                      <></>
                    )}
                  </ListItemButton>
                  {p.isSubmenu &&
                    p.submenu.map((menu) => {
                      return (
                        <Collapse
                          in={isExpand === index}
                          timeut="auto"
                          unmountOnExit
                          key={menu.name}
                        >
                          <List component="div" disablePadding>
                            <ListItemButton 
                                component={RouterLink} 
                                to={menu.submenuRoute} 
                            >
                              <ListItemText primary={menu.name} />
                            </ListItemButton>
                          </List>
                        </Collapse>
                      );
                    })}
                </ListItem>
              );
            })}
          </List>
        ) : (
          <CircularIndeterminate size={40} customColor='#1C2335' />
        )}
      </Box>
    </Drawer>
  );
};

const mapStateToProps = (store) => ({
  user: store.loginReducer.user,
});

export default connect(mapStateToProps)(Sidebar);