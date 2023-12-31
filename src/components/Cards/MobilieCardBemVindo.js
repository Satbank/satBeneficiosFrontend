import React from 'react';
import { connect } from "react-redux";
import {  CardContent, CardMedia, Typography } from "@mui/material";
import SatBank from '../../image/SatBank.png'

const MobilieCardBemVindo = ({ user }) => (
  <>
    <CardContent sx={{ height: '420px', width:'320px' , position: 'relative', background: 'radial-gradient(circle, #003366, #66ccff,#fff)', }}>
      <Typography
        color=""
        sx={{
          position: 'absolute',
          top: '35px',
          left: '25px',
          fontSize: '30px!important'
        }}
      >
        Olá,
      </Typography>
      <Typography
        color="#1C1063"
        sx={{
          position: 'absolute',
          top: '35px',
          left: '105px',
          fontWeight: 'bold',
          fontSize: '35px!important'
        }}
      >
        {user?.nome || user?.nome_fantasia || 'Usuário'}
      </Typography>
 

      <Typography
        color=""
        sx={{
          position: 'absolute',
          top: '250px',
          left: '25px',
          fontSize: '30px!important'
        }}
      >
        Seja bem vindo ao,
      </Typography>
      <CardMedia
        component="img"
        height="30"
        image={SatBank}
        alt="SatBank"
        sx={{
          position: 'absolute',
          top: '345px',
          left: '25px', 
          width: '150px', 
        }}
      />
      <Typography
        color=""
        sx={{
          position: 'absolute',
          top: '340px',
          left: '190px',
          fontSize: '30px!important'
        }}
      >        
        Beneficios !
      </Typography>
    </CardContent>
  </>
);

const mapStateToProps = (store) => ({
  user: store.loginReducer.user,
});

export default connect(mapStateToProps)(MobilieCardBemVindo);
