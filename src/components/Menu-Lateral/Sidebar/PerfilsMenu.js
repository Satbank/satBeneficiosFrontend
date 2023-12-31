import { Home, Business, GroupAdd, AddCard, Paid,  SupportAgent } from "@mui/icons-material";

const PerfilsMenu = [
  // admin
  [
    {
      name: "Dashboard",
      icon: Home,
      route: "/dashboard/admin",
      isSubmenu: false,
    },
    {
      name: "Comercio",
      icon: Business,
      route: "#", // Rota principal
      isSubmenu: true,
      submenu: [
        {
          name: "Cadastrar Novo",
          submenuRoute: "/cadastroEmpresas", // Rota do submenu
        },
        {
          name: "Todas comercios",
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
          submenuRoute: "/todosCartoes ",
        },
      ],
    },
    {
      name: "Alocar Valores ",
      icon: Paid ,
      route: "#",
      isSubmenu: true,
      submenu: [
        {
          name: "Alocar Prefeituras",
          submenuRoute: "/alocarPrefeitura",
        },
        {
          name: "Alocar Clientes",
          submenuRoute: "/alocarClientes ",
        },
      ],
    },
  ],
  // prefeitura 
  [
    {
      name: "",
      icon: Home,
      route: "#",
      isSubmenu: true,
      submenu: [
        {
          name: "",
          submenuRoute: "",
        },
        {
          name: "",
          submenuRoute: "",
        },
      ],
    },
  ],
  // comercio
  [
    {
      name: "Dashboard",
      icon: Home,
      route: "/dashboard/comercio",
      isSubmenu: false,
    },
    {
      name: "Vendas",
      icon: Home,
      route: "#",
      isSubmenu: true,
      submenu: [
        {
          name: "Nova Venda",
          submenuRoute: "/novavenda",
        },
        {
          name: "Relatorio de Vendas",
          submenuRoute: "/relatorio/vendas",
        },     
       
      ],
    },
    {
      name: "Suporte",
      icon: SupportAgent,
      route: "",
      isSubmenu: false,
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
