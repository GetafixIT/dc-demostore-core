export const breakpoints = {
  mobile: 480,
  tablet: 768,
  tabletPlus: 960,
  bigScreen: 1200,
  superScreen: 1400
};

export const bp = Object.fromEntries(
  Object.entries(breakpoints).map(([key, val]) => [
    key,
    `@media (min-width: ${val}px)`
  ])
);
