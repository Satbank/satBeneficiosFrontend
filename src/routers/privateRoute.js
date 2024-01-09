import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Menu from '../menu';
import { isAuthenticated } from '../utils/AuthHelp';
import { UserDataService } from '../services';
import { CircularIndeterminate } from '../components';
import { changeNotify } from '../store/actions/notify.actions';
import { useDispatch } from 'react-redux';

const PrivateRoute = ({ children, allowedProfiles }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await UserDataService.getUser();
        setUser(data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <CircularIndeterminate size={40} customColor='#1C2335'/>
  }

  if (!user || !isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (allowedProfiles && !allowedProfiles.includes(user.perfils_id)) {
    return <Navigate to="/AcessoNegado" />;
  }
  dispatch(changeNotify({
    open: true,
    class: "success",
    msg: "Seja Bem Vindo!"
  }));
  return <Menu>{children}</Menu>;
};

export default PrivateRoute;
