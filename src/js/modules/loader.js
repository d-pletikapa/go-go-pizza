const loader = document.createElement('div');
loader.classList.add('loader');

const loaderSpinner = document.createElement('div');
loaderSpinner.classList.add('loader__spinner');

loader.append(loaderSpinner);

export const showLoader = () => {
document.body.append(loader);
}

export const hideLoader = () => {
loader.remove();
}