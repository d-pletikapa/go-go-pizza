import { getData } from "./getData.js";
import { renderPizzas } from "./renderPizzas.js";

export const renderToppings = async () => {
  const {en: enToppings, ru: ruToppings} = await getData('toppings');
  const toppingsList = document.querySelector('.toppings__list');
  toppingsList.textContent = '';

  const toppingsItems = enToppings.map((enName, index) => {
    const toppingsItem = document.createElement('li');
    toppingsItem.className = 'toppings__item';
    toppingsItem.innerHTML = `
    <input type="checkbox" id="${enName}" class="toppings__checkbox" name="topping" value="${enName}">
    <label for="${enName}" class="toppings__label">${ruToppings[index][0].toUpperCase()}${ruToppings[index].slice(1).toLowerCase()}</label>
    `;
    return toppingsItem;
  });
  toppingsList.append(...toppingsItems);

  const itemReset = document.createElement('li');
  itemReset.className = 'toppings__item';
  const btnReset = document.createElement('button');
  btnReset.className = 'toppings__reset';
  btnReset.textContent = 'Сбросить';
  btnReset.type = 'reset';
  itemReset.append(btnReset);

  const toppingsForm = document.querySelector('.toppings__form');
  toppingsForm.addEventListener('change', (e) => {
    const formData = new FormData(toppingsForm);
    const checkedToppings = [];
    for (const [, value] of formData.entries()) {
      checkedToppings.push(value);
    }

    renderPizzas(checkedToppings);
    if (checkedToppings.length) {
      toppingsList.append(itemReset);
    } else {
      itemReset.remove();
    }

    btnReset.addEventListener('click', () => {
      toppingsForm.reset();
      itemReset.remove();
      renderPizzas();
    })
  })
};
