import { Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './privateRoute';
import { Dashboard, Login, CadastroEmpresas, TodasEmpresas } from '../pages';


function Private(component) {
  return <PrivateRoute>{component}</PrivateRoute>;
}

export const AppRoutes = () => {

  return (
    <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={Private(<Dashboard />)} />
         <Route path="/casdastroEmpresas" element={Private(<CadastroEmpresas />)} />
         <Route path="/todasEmpresas" element={Private(<TodasEmpresas />)} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}