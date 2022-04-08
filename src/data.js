import {
  GiStack,
  GiCat,
  GiAirplaneDeparture,
  GiGamepad,
  GiCoffeeCup,
  GiHouse,
  GiHearts,
} from "react-icons/gi";
import { FaLinux, FaBitcoin } from "react-icons/fa";
import { BsCodeSlash } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { AiOutlineFileAdd } from "react-icons/ai";
import { ImFilesEmpty } from "react-icons/im";

export const iconData = [
  {
    id: 1,
    name: "home",
    icon: <GiHouse />,
  },
  {
    id: 2,
    name: "all",
    icon: <GiStack />,
  },
  {
    id: 3,
    name: "linux",
    icon: <FaLinux />,
  },
  {
    id: 4,
    name: "crypto",
    icon: <FaBitcoin />,
  },
  {
    id: 5,
    name: "code",
    icon: <BsCodeSlash />,
  },
  {
    id: 6,
    name: "travel",
    icon: <GiAirplaneDeparture />,
  },
];
export const tagData = [
  {
    id: 1,
    name: "none",
    description: "none",
  },
  {
    id: 2,
    name: "linux",
    icon: <FaLinux />,
    description: "Linux y Open Source.",
  },
  {
    id: 3,
    name: "crypto",
    icon: <FaBitcoin />,
    description: "Criptomonedas y Blockchain!",
  },
  {
    id: 4,
    name: "code",
    icon: <BsCodeSlash />,
    description: "Programacion y nuevas tecnologias. ",
  },
  {
    id: 5,
    name: "travel",
    icon: <GiAirplaneDeparture />,
    description: "Lugares a los que viaje o me gustaria viajar. Emigrando...",
  },
  {
    id: 6,
    name: "all",
    icon: <GiStack />,
    description: "Todos los posts que hice, hasta ahora...",
  },
];

export const buttonList = [
  { name: "New Post", icon: <AiOutlineFileAdd />, path: "/admin/new-post" },
  { name: "Drafts", icon: <ImFilesEmpty />, path: "/admin/drafts" },
  { name: "Posts", icon: <GiStack />, path: "/admin/posts" },
  { name: "Stats", icon: <GoGraph />, path: "/admin/stats" },
];
