import { getData } from "./getData.js";

const createCard = (data) => {
  const card = document.createElement('article');
  card.classList.add('card', 'pizza__card');

  card.innerHTML = `
  <picture>
  <source srcset="${data.images[1]}" type="image/webp">
  <img class="card__img" src="${data.images[0]}" alt="${data.name.ru[0].toUpperCase() + data.name.ru.slice(1).toLowerCase()}">
  </picture>
  
  <div class="card__content">
    <h3 class="card__title">${data.name['ru'][0].toUpperCase() + data.name.ru.slice(1).toLowerCase()}</h3>
    <p class="card__info">
      <span class="card__price">
      ${data.price['25cm']} ₽
      </span>
      <span>
        /
      </span>
      <span class="card__width">
        25 см
      </span>
    </p>
    <button class="card__add-to-cart" data-id="${data.id}">Выбрать</button>
  </div>
  `;
  return card;
}
export const renderPizzas = async (toppings) => {
  const pizzas = await getData(`${toppings ? 
    `products?toppings=${toppings}` : 'products'}`);
  const pizzaList = document.querySelector('.pizza__list');
  pizzaList.textContent = '';

  const pizzaItems = pizzas.map((data) => {
    const item = document.createElement('li');
    item.classList.add('pizza__item');
    const card = createCard(data);
    item.append(card);
    return item;
  });
  pizzaList.append(...pizzaItems);
};