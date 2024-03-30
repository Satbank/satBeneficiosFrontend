import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './privateRoute';
import { Dashboard, Login,  CadastroClientes, TableClientes, CadastroCartoes, NotFound, TableCartoes, AlocarPrefeitura, AlocarClientes, CadastroComercio, TableComercio, Vendas, RelatorioVendas, DashboardComercio, DashboardCliente, AcessoNegado, CadastrarPrefeitura, TrocarSenha,  } from '../pages';




export const AppRoutes = () => {

  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />

    {/* Rotas para admin (perfils_id = 1) */}
    <Route path="/dashboard/admin" element={<PrivateRoute allowedProfiles={[1]}><Dashboard /></PrivateRoute>} />
    <Route path="/cadastroEmpresas" element={<PrivateRoute allowedProfiles={[1]}><CadastroComercio /></PrivateRoute>} />
    <Route path="/todasEmpresas" element={<PrivateRoute allowedProfiles={[1]}><TableComercio /></PrivateRoute>} />
    <Route path="/cadastroClientes" element={<PrivateRoute allowedProfiles={[1]}><CadastroClientes /></PrivateRoute>} />
    <Route path="/todosClientes" element={<PrivateRoute allowedProfiles={[1]}><TableClientes /></PrivateRoute>} />
    <Route path="/cadastroCartoes" element={<PrivateRoute allowedProfiles={[1]}><CadastroCartoes /></PrivateRoute>} />
    <Route path="/todosCartoes" element={<PrivateRoute allowedProfiles={[1]}><TableCartoes /></PrivateRoute>} />
    <Route path="/alocarPrefeitura" element={<PrivateRoute allowedProfiles={[1]}><AlocarPrefeitura /></PrivateRoute>} />
    <Route path="/alocarClientes" element={<PrivateRoute allowedProfiles={[1]}><AlocarClientes /></PrivateRoute>} />
    <Route path="/cadastrarPrefeitura" element={<PrivateRoute allowedProfiles={[1]}><CadastrarPrefeitura /></PrivateRoute>} />

    {/* Rotas para comercio (perfils_id = 3) */}
    <Route path="/novavenda" element={<PrivateRoute allowedProfiles={[3]}><Vendas /></PrivateRoute>} />
    <Route path="/relatorio/vendas" element={<PrivateRoute allowedProfiles={[3]}><RelatorioVendas /></PrivateRoute>} />
    <Route path="/dashboard/comercio" element={<PrivateRoute allowedProfiles={[3]}><DashboardComercio /></PrivateRoute>} />

    {/* Rotas para cliente (perfils_id = 2) */}
    <Route path="/dashboard/cliente" element={<PrivateRoute allowedProfiles={[4]}><DashboardCliente /></PrivateRoute>} />
    <Route path="/trocarsenhacartao" element={<PrivateRoute allowedProfiles={[4]}><TrocarSenha /></PrivateRoute>} />

    <Route path="*" element={<NotFound />} />
    <Route path="AcessoNegado" element={<AcessoNegado />} />
  </Routes>
);
}