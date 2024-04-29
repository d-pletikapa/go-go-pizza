
export const textTransform = (objVal) => objVal[0].toUpperCase() + objVal.slice(1).toLowerCase();

export const createFieldsetElements = (fieldset, elementsData) => {
   return elementsData.map(({ id, value, labelText, type }, index) => {
      const input = document.createElement('input');
      input.classList.add('modal-pizza__radio');
      input.id = id;
      input.type = type;
      input.name = fieldset.name;
      input.value = value;
      index === 0 ? input.checked = true : '';

      const label = document.createElement('label');
      label.classList.add('modal-pizza__label');
      label.htmlFor = id;
      label.textContent = labelText;

      return { input, label };
   });
};