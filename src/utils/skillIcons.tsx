// src/utils/skillIcons.ts
import { JSX } from "react";
import Image from "next/image";
import awsIconUrl from "@/images/awsIcon.svg";
import azureIconUrl from "@/images/azureIcon.svg";
import csharpIconUrl from "@/images/csharpIcon.svg";
import javaIconUrl from "@/images/javaIcon.svg";
import vueIconUrl from "@/images/vueIcon.svg";

import {
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiGo,
  SiRuby,
  SiPhp,
  SiSwift,
  SiKotlin,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiMongodb,
  SiReact,
  SiAngular,
  SiNodedotjs,
  SiDjango,
  SiFlask,
  SiSpringboot,
  SiDotnet,
  SiDocker,
  SiKubernetes,
  SiGooglecloud,
  SiGit,
  SiJenkins,
  SiGraphql,
  SiApachekafka,
} from "react-icons/si";

export const AwsIcon = () => (
  <Image src={awsIconUrl} alt="AWS" width={16} height={16} />
);
export const AzureIcon = () => (
  <Image src={azureIconUrl} alt="Azure" width={16} height={16} />
);
export const CsharpIcon = () => (
  <Image src={csharpIconUrl} alt="C#" width={16} height={16} />
);
export const JavaIcon = () => (
  <Image src={javaIconUrl} alt="Java" width={16} height={16} />
);
export const VueIcon = () => (
  <Image src={vueIconUrl} alt="Vue.js" width={16} height={16} />
);

export const skillIcons: Record<number, JSX.Element> = {
  1: <SiPython style={{ color: "#4584B6" }} />,       // Python Steel Blue
  2: <JavaIcon />,                                     // Java (SVG, color inside SVG)
  3: <SiJavascript style={{ color: "#F0DB4F" }} />,    // JavaScript Yellow
  4: <SiCplusplus style={{ color: "#00599C" }} />,     // C++ Blue
  5: <CsharpIcon />,                                   // C# (SVG)
  6: <SiGo style={{ color: "#00ADD8" }} />,           // Go Blue
  7: <SiRuby style={{ color: "#CC342D" }} />,         // Ruby Red
  8: <SiPhp style={{ color: "#777BB4" }} />,          // PHP Purple
  9: <SiSwift style={{ color: "#FA7343" }} />,        // Swift Orange
  10: <SiKotlin style={{ color: "#0095D5" }} />,       // Kotlin Blue
  11: <SiTypescript style={{ color: "#3178C6" }} />,   // TypeScript Blue
  12: <SiHtml5 style={{ color: "#E34F26" }} />,        // HTML5 Orange
  13: <SiCss3 style={{ color: "#1572B6" }} />,         // CSS3 Blue
  14: <SiMysql style={{ color: "#4479A1" }} />,        // MySQL Blue
  15: <SiMongodb style={{ color: "#47A248" }} />,      // MongoDB Green
  16: <SiReact style={{ color: "#61DAFB" }} />,        // React Cyan
  17: <SiAngular style={{ color: "#DD0031" }} />,      // Angular Red
  18: <VueIcon />,                                     // Vue.js (SVG)
  19: <SiNodedotjs style={{ color: "#339933" }} />,    // Node.js Green
  20: <SiDjango style={{ color: "#092E20" }} />,       // Django Dark Green
  21: <SiFlask style={{ color: "#000000" }} />,        // Flask Black
  22: <SiSpringboot style={{ color: "#6DB33F" }} />,   // Spring Green
  23: <SiDotnet style={{ color: "#512BD4" }} />,       // .NET Purple
  24: <SiDocker style={{ color: "#2496ED" }} />,       // Docker Blue
  25: <SiKubernetes style={{ color: "#326CE5" }} />,   // Kubernetes Blue
  26: <AwsIcon />,                                     // AWS (SVG)
  27: <AzureIcon />,                                   // Azure (SVG)
  28: <SiGooglecloud style={{ color: "#4285F4" }} />,  // GCP Blue
  29: <SiGit style={{ color: "#F05032" }} />,          // Git Orange
  30: <SiJenkins style={{ color: "#D24939" }} />,      // Jenkins Red
  31: <SiGraphql style={{ color: "#E535AB" }} />,      // GraphQL Pink
  42: <SiApachekafka style={{ color: "#231F20" }} />,  // Kafka Dark
};
