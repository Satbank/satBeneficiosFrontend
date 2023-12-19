import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './privateRoute';
import { Dashboard, Login,   CadastroClientes, TableClientes, CadastroCartoes, NotFound, TableCartoes, AlocarPrefeitura, AlocarClientes, CadastroComercio, TableComercio } from '../pages';


function Private(component) {
  return <PrivateRoute>{component}</PrivateRoute>;
}

export const AppRoutes = () => {

  return (
    <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={Private(<Dashboard />)} />

         <Route path="/cadastroEmpresas" element={Private(<CadastroComercio />)} />
         <Route path="/todasEmpresas" element={Private(<TableComercio />)} />

         <Route path="/cadastroClientes" element={Private(<CadastroClientes />)} />
         <Route path="/todosClientes" element={Private(<TableClientes />)} />

         <Route path="/cadastroCartoes" element={Private(<CadastroCartoes />)} />
         <Route path="/todosCartoes" element={Private(<TableCartoes />)} />

         <Route path="/alocarPrefeitura" element={Private(<AlocarPrefeitura />)} />
         <Route path="/alocarClientes" element={Private(<AlocarClientes />)} />
       


         <Route path="*" element={<NotFound />} /> 
     
    </Routes>
  );
}