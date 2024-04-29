import { textTransform, createFieldsetElements } from './helpers';
import { cartControl } from './cartControl';

export const renderModalPizza = async ({ id, images, name, price, toppings }) => {
  const modalPizzaMain = document.querySelector('.modal-pizza__main');
  modalPizzaMain.textContent = '';
  let size = Object.keys(price)[0];

  const picture = document.createElement('picture');
  const source = document.createElement('source');
  source.srcset = images[1];
  source.type = 'image/webp';
  const img = document.createElement('img');
  img.classList.add('modal-pizza__img');
  img.src = images[0];
  img.alt = textTransform(name.ru);
  picture.append(source, img);
  const title = document.createElement('h2');
  title.classList.add('modal-pizza__title');
  title.textContent = textTransform(name.ru);
  const toppingsElem = document.createElement('p');
  toppingsElem.classList.add('modal-pizza__toppings');
  toppingsElem.textContent = textTransform(toppings.ru);

  const priceSizeInfo = document.createElement('p');
  priceSizeInfo.classList.add('modal-pizza__info');

  const priceSpan = document.createElement('span');
  priceSpan.classList.add('modal-pizza__price');
  // priceSpan.textContent = `${price[size]} ₽`;

  const slashSpan = document.createElement('span');
  slashSpan.textContent = '/';

  const sizeSpan = document.createElement('span');
  sizeSpan.classList.add('modal-pizza__current-size');
  // sizeSpan.textContent = size.replace('cm', ' см');
  priceSizeInfo.append(priceSpan, slashSpan, sizeSpan);

  const updatePrice = () => {
    const selectedSizeInput = form.querySelector('input[name="size"]:checked');
    size = selectedSizeInput.value;

    priceSpan.textContent = `${price[size]} ₽`;
    sizeSpan.textContent = `${parseInt(size)} см`;
  }

  const form = document.createElement('form');
  form.classList.add('modal-pizza__form');
  form.id = id;
  const groupFieldset = document.createElement('div');
  groupFieldset.classList.add('modal-pizza__group-fieldset');

  const crustFieldset = document.createElement('fieldset');
  crustFieldset.classList.add('modal-pizza__fieldset');
  crustFieldset.name = 'crust'; // Установка имени для группировки радио-кнопок
  const crustElementsData = [
    { id: 'thin', value: 'thin', labelText: 'Тонкое тесто', type: 'radio' },
    { id: 'thick', value: 'thick', labelText: 'Пышное тесто', type: 'radio' },
  ];

  const crustFieldsetElements = createFieldsetElements(crustFieldset, crustElementsData);
  crustFieldsetElements.forEach(({ input, label }) => {
    crustFieldset.append(input, label);
  });

  const sizeFieldset = document.createElement('fieldset');
  sizeFieldset.classList.add('modal-pizza__fieldset');
  sizeFieldset.name = 'size'; // Установка имени для группировки радио-кнопок

  const sizeElementsData = Object.keys(price).map(key => {
    const sizeWithoutCM = key.replace('cm', ''); // Удаляем "cm" из ключа
    return {
      id: sizeWithoutCM,
      value: key,
      labelText: `${sizeWithoutCM} см`,
      type: 'radio',
    };
  });


  const sizeFieldsetElements = createFieldsetElements(sizeFieldset, sizeElementsData);
  sizeFieldsetElements.forEach(({ input, label }) => {
    input.addEventListener('change', updatePrice);
    sizeFieldset.append(input, label);
  });

  groupFieldset.append(crustFieldset, sizeFieldset);

  const addToCartButton = document.createElement('button');
  addToCartButton.classList.add('modal-pizza__add-to-cart');
  addToCartButton.textContent = 'В корзину';

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('modal__close');
  closeBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14.8333" y="4" width="0.851136" height="15.3204" transform="rotate(45 14.8333 4)" fill="#C1AB91" />
      <rect x="4" y="4.60184" width="0.851136" height="15.3204" transform="rotate(-45 4 4.60184)" fill="#C1AB91" />
    </svg>
  `;

  form.append(groupFieldset, addToCartButton);

  modalPizzaMain.append(picture, title, toppingsElem, priceSizeInfo, form, closeBtn);

  updatePrice();
  let timerId = null;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const cartProduct = {
      cartProductId: crypto.randomUUID(),
      id,
      crust: formData.get('crust'),
      size: formData.get('size'),
    };
    cartControl.addCart(cartProduct);

    addToCartButton.disabled = true;
    addToCartButton.textContent = 'Добавлено';
    timerId = setTimeout(() => {
      addToCartButton.disabled = false;
      addToCartButton.textContent = 'В корзину';
    }, 3000);
    form.addEventListener('change', () => {
      clearTimeout(timerId);
      addToCartButton.disabled = false;
      addToCartButton.textContent = 'В корзину';
    });
  });

};