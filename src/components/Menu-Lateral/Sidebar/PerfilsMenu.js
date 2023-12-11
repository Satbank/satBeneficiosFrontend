import { Home, Business, GroupAdd, AddCard } from "@mui/icons-material";

const PerfilsMenu = [
  // admin
  [
    {
      name: "Dashboard",
      icon: Home,
      route: "/dashboard",
      isSubmenu: false,
    },
    {
      name: "Empresas",
      icon: Business,
      route: "#", // Rota principal
      isSubmenu: true,
      submenu: [
        {
          name: "Cadastrar Nova",
          submenuRoute: "/cadastroEmpresas", // Rota do submenu
        },
        {
          name: "Todas Empresas",
          submenuRoute: "/todasEmpresas", // Rota do submenu
        },
      ],
    },
    {
      name: "Clientes",
      icon: GroupAdd,
      route: "#",
      isSubmenu: true,
      submenu: [
        {
          name: " Novo Cliente",
          submenuRoute: "/cadastroClientes",
        },
        {
          name: "Todos Clientes",
          submenuRoute: "/todosClientes ",
        },
      ],
    },
    {
      name: "Cartões",
      icon: AddCard ,
      route: "#",
      isSubmenu: true,
      submenu: [
        {
          name: " Novo cartão",
          submenuRoute: "/cadastroCartoes",
        },
        {
          name: "Todos Cartões",
          submenuRoute: "/todosCartao ",
        },
      ],
    },
  ],
  // contratante
  [
    {
      name: "Programação",
      icon: Home,
      route: "#",
      isSubmenu: true,
      submenu: [
        {
          name: "Atividades",
          submenuRoute: "",
        },
        {
          name: "Convidados",
          submenuRoute: "",
        },
      ],
    },
  ],
  // contratante
  [
    {
      name: "Inscrições",
      icon: Home,
      route: "#",
      isSubmenu: true,
      submenu: [
        {
          name: "Entradas e Valores ",
          submenuRoute: "",
        },
        {
          name: "Formulários de inscrição",
          submenuRoute: "",
        },
        {
          name: "Cupom de desconto",
          submenuRoute: "",
        },
      ],
    },
  ],
  // beneficiario
  [
    {
      name: "Transmissão Online",
      icon: Home,
      route: "#",
      isSubmenu: true,
      submenu: [
        {
          name: "Evento",
          submenuRoute: "/streaming/evento",
        },
        {
          name: "Atividades",
          submenuRoute: "/streaming/atividades",
        },
        {
          name: "Área de transmissão",
          submenuRoute: "/streaming/trasmissao",
        },
      ],
    },
  ],
  // comercio
  [
    {
      name: "Perfil",
      icon: Home,
      route: "/perfil",
      isSubmenu: false,
    },
  ],
];

export default PerfilsMenu;
