const toppingsToogle = () => {
  const toppingsButton = document.querySelector('.toppings__button');
  const toppingsList = document.querySelector('.toppings__list');

  toppingsButton.addEventListener('click', () => {
    if (!toppingsList.classList.contains('toppings__list--show')) {
      toppingsList.classList.add('toppings__list--show');
      toppingsButton.classList.add('toppings__button--active');
      toppingsList.style.maxHeight = toppingsList.scrollHeight + 'px';
    } else {
      toppingsList.classList.remove('toppings__list--show');
      toppingsList.style.maxHeight = null;
      setTimeout(() => {
        toppingsButton.classList.remove('toppings__button--active');
      }, 300)
    };
  })
};



const renderToppings = async () => {
  const toppings = await getPizzas();
};


const getPizzas = async () => {
  try {
    const response = await fetch('https://adorable-gem-domain.glitch.me/api/products');
    if (!response.ok) {
      throw new Error(`Failed to fetch pizza's products`);
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error(`Error fetching pizza's products ${error}`)
  }
};

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
const renderPizzas = async () => {
  const pizzas = await getPizzas();
  const pizzaList = document.querySelector('.pizza__list');
  pizzaList.textContent = '';

  const items = pizzas.map((data) => {
    const item = document.createElement('li');
    item.classList.add('pizza__item');
    const card = createCard(data);
    item.append(card);
    return item;
  });
  pizzaList.append(...items);
};
const init = () => {
  renderToppings();
  toppingsToogle();
  renderPizzas();
};
init();
