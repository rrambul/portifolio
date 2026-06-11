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
import { TbSparkles, TbRobot, TbBrain } from "react-icons/tb";

export const interests = [
  { key: "designSystems", icon: FiLayers, color: "#0d9488" },
  { key: "webComponents", icon: FiBox, color: "#0f766e" },
  { key: "platformEngineering", icon: FiCpu, color: "#14b8a6" },
  { key: "dx", icon: FiSmile, color: "#115e59" },
  { key: "scalableUI", icon: FiGrid, color: "#2dd4bf" },
  { key: "testing", icon: FiCheckSquare, color: "#0d9488" },
  { key: "performance", icon: FiZap, color: "#14b8a6" },
  { key: "openSource", icon: FiUsers, color: "#0f766e" },
  // AI items carry the violet secondary accent instead of teal.
  { key: "aiWorkflows", icon: TbSparkles, color: "#8b5cf6" },
  { key: "agentReadyCodebases", icon: TbRobot, color: "#7c3aed" },
  { key: "contextEngineering", icon: TbBrain, color: "#a78bfa" },
] as const;
