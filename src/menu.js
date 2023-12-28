import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Box } from "@mui/material";
import { AvatarAppBar } from "./components";
import { useFirstRenderEffect } from "./useFirstRenderEffect";
import {UserDataService} from "./services";
import { saveUser } from "./store/actions/LoginAction"


const Menu = (props) => { 
  useFirstRenderEffect(() => {
    UserDataService.getUser()
      .then((data) => {
        props.saveUser(data)
      })
  });

  return (
    <AvatarAppBar>
      <Box sx={{ padding: 0, margin: 0 }}>
        {props.children}
      </Box>
    </AvatarAppBar>
  );
};

const mapStateToProps = (store) => ({

  user: store.loginReducer.user
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ saveUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);