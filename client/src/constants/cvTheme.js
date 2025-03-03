import CVModel1 from "../components/CVModel/CVModel1";
import CVModel2 from "../components/CVModel/CVModel2";
import { cvTheme } from "./enum";

export const cvThemes = [
  {
    id: cvTheme["MODERN-THEME"],
    template: CVModel1,
  },
  {
    id: cvTheme["POLITE-THEME"],
    template: CVModel2,
  },
];
