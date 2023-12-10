import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './privateRoute';
import { Dashboard, Login, CadastroEmpresas,  TableEmpresas, CadastroClientes, TableClientes } from '../pages';


function Private(component) {
  return <PrivateRoute>{component}</PrivateRoute>;
}

export const AppRoutes = () => {

  return (
    <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/dashboard" element={Private(<Dashboard />)} />

         <Route path="/empresas" element={Private(<CadastroEmpresas />)} />
         <Route path="/cadastroEmpresas" element={Private(<CadastroEmpresas />)} />
         <Route path="/todasEmpresas" element={Private(<TableEmpresas />)} />

         <Route path="/clientes" element={Private(<CadastroClientes />)} />
         <Route path="/cadastroClientes" element={Private(<CadastroClientes />)} />
         <Route path="/todosClientes" element={Private(<TableClientes />)} />
      {/* <Route path="*" element={<Navigate to="/login" />} /> */}
    </Routes>
  );
}