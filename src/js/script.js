import { renderToppings } from "./modules/renderToppings.js";
import { toppingsToogle } from "./modules/toppingsToogle.js";
import { renderPizzas } from "./modules/renderPizzas.js";
import { modalController } from "./modules/modalController.js";
import { modalCartController } from "./modules/modalCartController.js";


const init = () => {
  renderToppings();
  toppingsToogle();
  renderPizzas();
  modalController(
    {
      modal: '.modal-cart',
      btnOpen: '.header__cart',
      btnClose: '.modal__close',
      cbOpen() {
        modalCartController();
      }
    }
  );
  modalController(
    {
      modal: '.modal-cart',
      btnOpen: '.hero__order',
      btnClose: '.modal__close',
      cbOpen() {
        modalCartController();
      }
    }
  );
};
init();
