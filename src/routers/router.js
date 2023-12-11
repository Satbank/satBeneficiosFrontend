import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './privateRoute';
import { Dashboard, Login, CadastroEmpresas,  TableEmpresas, CadastroClientes, TableClientes, CadastroCartoes } from '../pages';


function Private(component) {
  return <PrivateRoute>{component}</PrivateRoute>;
}

export const AppRoutes = () => {

  return (
    <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/dashboard" element={Private(<Dashboard />)} />

         <Route path="/cadastroEmpresas" element={Private(<CadastroEmpresas />)} />
         <Route path="/todasEmpresas" element={Private(<TableEmpresas />)} />

         <Route path="/cadastroClientes" element={Private(<CadastroClientes />)} />
         <Route path="/todosClientes" element={Private(<TableClientes />)} />

         <Route path="/cadastroCartoes" element={Private(<CadastroCartoes />)} />
      {/* <Route path="*" element={<Navigate to="/login" />} /> */}
    </Routes>
  );
}