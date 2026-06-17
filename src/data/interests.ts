import {
  FiLayers,
  FiBox,
  FiCpu,
  FiServer,
  FiPackage,
  FiSmile,
  FiGrid,
  FiCheckSquare,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { TbSparkles, TbRobot, TbBrain } from "react-icons/tb";

export const interests = [
  { key: "designSystems", icon: FiLayers, color: "#10b981" },
  { key: "webComponents", icon: FiBox, color: "#059669" },
  { key: "softwareArchitecture", icon: FiServer, color: "#10b981" },
  { key: "ddd", icon: FiPackage, color: "#059669" },
  { key: "platformEngineering", icon: FiCpu, color: "#34d399" },
  { key: "dx", icon: FiSmile, color: "#047857" },
  { key: "scalableUI", icon: FiGrid, color: "#10b981" },
  { key: "testing", icon: FiCheckSquare, color: "#059669" },
  { key: "performance", icon: FiZap, color: "#10b981" },
  { key: "openSource", icon: FiUsers, color: "#34d399" },
  // AI items carry the amber secondary accent.
  { key: "aiWorkflows", icon: TbSparkles, color: "#f59e0b" },
  { key: "agentReadyCodebases", icon: TbRobot, color: "#d97706" },
  { key: "contextEngineering", icon: TbBrain, color: "#fbbf24" },
] as const;
