export const toppingsToogle = () => {
  const toppingsButton = document.querySelector('.toppings__button');
  const toppingsList = document.querySelector('.toppings__list');

  toppingsButton.addEventListener('click', () => {
    if (!toppingsList.classList.contains('toppings__list--show')) {
      toppingsList.classList.add('toppings__list--show');
      toppingsButton.classList.add('toppings__button--active');
      toppingsList.style.maxHeight = toppingsList.scrollHeight + 'px';
    } else {
      toppingsList.classList.remove('toppings__list--show');
      toppingsList.style.maxHeight = `0px`;
      setTimeout(() => {
        toppingsButton.classList.remove('toppings__button--active');
      }, 100);
    };
  })
};