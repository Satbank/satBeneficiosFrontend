import React from 'react';
import { connect } from "react-redux";
import { CardContent, CardMedia, Typography, useMediaQuery, useTheme } from "@mui/material";
import Mao from '../../image/mao-3d.png';
import SatBank from '../../image/SatBank.png';

const CardBemVindo = ({ user }) => {
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      <CardContent sx={{ height: '220px', width: '90%', position: 'relative', background: 'radial-gradient(circle, #003366, #66ccff,#fff)' }}>
        <Typography
          color=""
          sx={{
            position: 'absolute',
            top: '10px',
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
            top: '10px',
            left: '105px',
            fontWeight: 'bold',
            fontSize: '35px!important'
          }}
        >
          {user?.nome || user?.nome_fantasia || 'Usuário'}
        </Typography>
        {isLgScreen && (
          <CardMedia
            component="img"
            height="290"
            image={Mao}
            alt="foto"
            sx={{
              position: 'absolute',
              top: '1px',
              left: '565px',
              width: '290px',
            }}
          />
        )}

        <Typography
          color=""
          sx={{
            position: 'absolute',
            top: '150px',
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
            top: '220px',
            left: '25px',
            width: '150px',
          }}
        />
        <Typography
          color=""
          sx={{
            position: 'absolute',
            top: '220px',
            left: '190px',
            fontSize: '30px!important'
          }}
        >
          Beneficios !
        </Typography>
      </CardContent>
    </>
  );
};

const mapStateToProps = (store) => ({
  user: store.loginReducer.user,
});

export default connect(mapStateToProps)(CardBemVindo);
