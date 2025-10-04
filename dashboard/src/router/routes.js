import { PiAddressBook, PiUserList } from "react-icons/pi";
import { LiaFileSignatureSolid } from "react-icons/lia";
import {
  MdOutlineBrandingWatermark,
  MdError,
  MdOutlineSettings,
  MdOutlineInventory2,
  MdOutlineDiscount,
  MdOutlinePeopleAlt,
} from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import {
  BiAccessibility,
  BiCart,
  BiCategory,
  BiUser,
  BiCoinStack,
  BiShield,
} from "react-icons/bi";
import { FaFileCircleCheck, FaFileInvoice, FaTeamspeak } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoDocumentAttach, IoLogIn, IoPricetagOutline } from "react-icons/io5";
import { MdOutlinePerson } from "react-icons/md";
import { RiDashboardLine, RiListOrdered, RiFileListLine } from "react-icons/ri";
import { TiBusinessCard } from "react-icons/ti";
import { PiMicrosoftTeamsLogoLight } from "react-icons/pi";

import Dashboard from "../pages/Dashboard";
import Catalogues from "../pages/Catalogues";
import Contact from "../pages/Contact";
import Blogs from "../pages/Blogs";
import ManageUsers from "../pages/ManageUsers";
import Error404 from "../pages/Error404";
import Error500 from "../pages/Error500";
import Leads from "../pages/Leads";
import Login from "../components/Auth/Login";
import AddBlog from "../components/Blogs/AddBlog";
import Roles from "../pages/Roles";
import Stores from "../pages/Stores";
import Categories from "../pages/Categories";

const masterRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <RiDashboardLine />,
    isSidebarActive: true,
    element: <Dashboard />,
    submenu: [],
  },
  {
    path: "#",
    name: "Leads",
    icon: <PiAddressBook />,
    isSidebarActive: true,

    submenu: [
      {
        path: "/leads/list",
        name: "Lead List",
        icon: <RiListOrdered />,
        element: <Leads />,
        isSidebarActive: true,
      },
    ],
  },
  {
    path: "/catalogues/list",
    name: "Catalogues",
    icon: <MdOutlineInventory2 />,
    isSidebarActive: true,
    element: <Catalogues />,
    submenu: [],
  },
  {
    path: "/category-management",
    name: "Categories & Parent Categories",
    icon: <FaTeamspeak />,
    element: <Categories />,
    submenu: [],
    isSidebarActive: true,
  },
  {
    path: "/queries",
    name: "Queries",
    icon: <FaTeamspeak />,
    isSidebarActive: true,
    element: <Contact />,
    submenu: [],
  },
  {
    path: "#",
    name: "Blogs & Categories",
    icon: <BiCategory />,
    isSidebarActive: true,

    submenu: [
      {
        path: "/blogs",
        name: "Blogs",
        icon: <BiCategory />,
        isSidebarActive: true,
        element: <Blogs />,
      },
      {
        path: "/blogs/add",
        name: "Add Blog",
        icon: <AiOutlineProduct />,
        element: <AddBlog />,
        isSidebarActive: true,
      },
      {
        path: "/blogs/categories",
        name: "Categories",
        icon: <BiAccessibility />,
        isSidebarActive: true,
      },
    ],
  },
  {
    path: "/stores-dealers",
    name: "Stores & Dealers",
    icon: <TiBusinessCard />,
    isSidebarActive: true,
    element: <Stores />,
    submenu: [],
  },
  {
    path: "#",
    name: "Users",
    icon: <MdOutlinePeopleAlt />,
    isSidebarActive: true,

    submenu: [
      {
        path: "/users",
        name: "Users",
        icon: <MdOutlinePeopleAlt />,
        isSidebarActive: true,
        element: <ManageUsers />,
      },
      {
        path: "/users/profile",
        name: "Profile",
        icon: <CgProfile />,
        isSidebarActive: true,
      },
      {
        path: "/roles-permissions",
        name: "Roles",
        icon: <BiShield />,
        element: <Roles />,
        isSidebarActive: true,
      },
      {
        path: "/users/settings",
        name: "Settings",
        icon: <MdOutlineSettings />,
        isSidebarActive: true,
      },
    ],
  },
  {
    path: "/others",
    name: "Others",
    icon: <MdError />,
    isSidebarActive: true,
    submenu: [
      {
        path: "/login",
        name: "Login",
        icon: <IoLogIn />,
        element: <Login />,
        isSidebarActive: true,
      },
      {
        path: "/404",
        name: "404 Error",
        icon: <FaFileCircleCheck />,
        isSidebarActive: true,
        element: <Error404 />,
      },
      {
        path: "/500",
        name: "500 Error",
        icon: <FaFileInvoice />,
        isSidebarActive: true,
        element: <Error500 />,
      },
    ],
  },
];

export default masterRoutes;
