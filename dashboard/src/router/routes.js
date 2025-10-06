import { PiAddressBook, PiMicrosoftTeamsLogoLight } from "react-icons/pi";
import { LiaFileSignatureSolid } from "react-icons/lia";
import {
  MdOutlineBrandingWatermark,
  MdError,
  MdOutlineSettings,
  MdOutlineInventory2,
  MdOutlineDiscount,
  MdOutlinePeopleAlt,
  MdOutlinePerson,
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
import { FaFileCircleCheck, FaFileInvoice } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoLogIn } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import { TiBusinessCard } from "react-icons/ti";

// Pages & components
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
import BlogCategories from "../components/Blogs/BlogCategories";
import { FileMarkdownFilled } from "@ant-design/icons";
import Content from "../pages/Content";

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
    path: "/leads/list",
    name: "Leads",
    icon: <PiAddressBook />,
    isSidebarActive: true,
    element: <Leads />,
    submenu: [],
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
    path: "/file-manager",
    name: "File Manager",
    icon: <FileMarkdownFilled />,
    element: <Content />,
    submenu: [],
    isSidebarActive: true,
  },
  {
    path: "/category-management",
    name: "Categories & Parent Categories",
    icon: <BiCategory />,
    element: <Categories />,
    submenu: [],
    isSidebarActive: true,
  },
  {
    path: "/queries",
    name: "Queries",
    icon: <LiaFileSignatureSolid />,
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
        isSidebarActive: false,
      },
      {
        path: "/blogs/categories",
        name: "Categories",
        element: <BlogCategories />,
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
    name: "User Management",
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
        path: "/roles-permissions",
        name: "Roles",
        icon: <BiShield />,
        element: <Roles />,
        isSidebarActive: true,
      },
    ],
  },
  {
    path: "/others",
    name: "Others",
    icon: <MdError />,
    isSidebarActive: false,
    submenu: [
      {
        path: "/u/:userId",
        name: "Profile",
        icon: <CgProfile />,
        isSidebarActive: true,
      },
      {
        path: "/users/settings",
        name: "Settings",
        icon: <MdOutlineSettings />,
        isSidebarActive: true,
      },
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
