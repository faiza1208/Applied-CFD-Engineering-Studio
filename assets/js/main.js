import {
  hydrateCallouts,
  hydrateCards,
  hydrateProgressBars,
  hydrateSectionHeaders,
  renderFooter,
  renderHero,
  renderNavigation
} from "./components.js";

const page = document.body.dataset.page || "home";

renderNavigation(document.querySelector("#site-nav"), page);
renderHero(document.querySelector("#page-hero"), page);
renderFooter(document.querySelector("#site-footer"));

hydrateSectionHeaders();
hydrateCards();
hydrateProgressBars();
hydrateCallouts();
