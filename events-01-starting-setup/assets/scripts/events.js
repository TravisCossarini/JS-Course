const button = document.querySelector('button');

const onClickHandler = event => {
    console.log(event);
};

button.addEventListener('click', onClickHandler);

// button.removeEventListener('click', onClickHandler);
