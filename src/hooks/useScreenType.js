import { useMediaQuery } from "./useMediaQuery";

export const screens = {
  "": "",
  sm: "640px",
  md: "768px",
  lg: "1024px",
};

export function isStyleScreen(key) {
  return typeof screens !== "undefined";
}

export function useIsMobile() {
  return useMediaQuery(`(max-width: ${screens.sm})`);
}
export function useIsTablet() {
  return useMediaQuery(`(max-width: ${screens.lg})`);
}
export function useIsDesktop() {
  return useMediaQuery(`(max-width: ${screens.xl})`);
}

export function useScreenType() {
  const sm = useMediaQuery(`(max-width: ${screens.sm})`);
  const md = useMediaQuery(`(max-width: ${screens.md})`);
  const lg = useMediaQuery(`(max-width: ${screens.lg})`);
  const xl = useMediaQuery(`(max-width: ${screens.xl})`);
  const rest = useMediaQuery(`(min-width: ${screens.xl})`);
 
  if (sm) {
    return "sm";
  }
  if (md) {
    return "md";
  }
  if (lg) {
    return "lg";
  }
  if (xl || rest) {
    return "xl";
  }

  return "xl";
}
