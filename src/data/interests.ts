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
  { key: "designSystems", icon: FiLayers },
  { key: "webComponents", icon: FiBox },
  { key: "softwareArchitecture", icon: FiServer },
  { key: "ddd", icon: FiPackage },
  { key: "platformEngineering", icon: FiCpu },
  { key: "dx", icon: FiSmile },
  { key: "scalableUI", icon: FiGrid },
  { key: "testing", icon: FiCheckSquare },
  { key: "performance", icon: FiZap },
  { key: "openSource", icon: FiUsers },
  { key: "aiWorkflows", icon: TbSparkles },
  { key: "agentReadyCodebases", icon: TbRobot },
  { key: "contextEngineering", icon: TbBrain },
] as const;
