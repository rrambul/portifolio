import {
  FiLayers,
  FiBox,
  FiCpu,
  FiSmile,
  FiGrid,
  FiCheckSquare,
  FiUsers,
  FiZap,
} from "react-icons/fi";

export const interests = [
  { key: "designSystems", icon: FiLayers, color: "#0d9488" },
  { key: "webComponents", icon: FiBox, color: "#0f766e" },
  { key: "platformEngineering", icon: FiCpu, color: "#14b8a6" },
  { key: "dx", icon: FiSmile, color: "#115e59" },
  { key: "scalableUI", icon: FiGrid, color: "#2dd4bf" },
  { key: "testing", icon: FiCheckSquare, color: "#0d9488" },
  { key: "performance", icon: FiZap, color: "#14b8a6" },
  { key: "openSource", icon: FiUsers, color: "#0f766e" },
] as const;
