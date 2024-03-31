import { renderToppings } from "./modules/renderToppings.js";
import { toppingsToogle } from "./modules/toppingsToogle.js";
import { renderPizzas } from "./modules/renderPizzas.js";


const init = () => {
  renderToppings();
  toppingsToogle();
  renderPizzas();
};
init();
