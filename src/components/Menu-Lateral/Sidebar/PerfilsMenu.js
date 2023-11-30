import { Home, Business } from "@mui/icons-material";

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
      route: "#",
      isSubmenu: true,
      submenu: [
        {
          name: "Cadastrar Nova",
          submenuRoute: "#",
        },
        {
          name: "Todas Empresas",
          submenuRoute: "#",
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
