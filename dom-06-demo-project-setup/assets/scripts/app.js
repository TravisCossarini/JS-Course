const startAddMovieBtn = document.getElementById('add_movie_button');
const cancelAddMovieModalBtn = document.getElementById('modal-cancel');
const confirmAddMovieModalBtn = document.getElementById('modal-add-movie');
const deleteMovieBtn = document
    .getElementById('delete-modal-button-div')
    .querySelectorAll('button')[1];
const cancelDeleteMovieBtn = document
    .getElementById('delete-modal-button-div')
    .querySelectorAll('button')[0];

const backdrop = document.getElementById('backdrop');
const addMovieModal = document.getElementById('add-modal');
const userInputs = addMovieModal.querySelectorAll('input');
const listRoot = document.getElementById('movie-list');

const movies = [];
const entryTextSection = document.getElementById('entry-text');

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
    clearMovieModal();
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const backdropClickHandler = () => {
    toggleMovieModal();
};

const cancelMovieHandler = () => {
    toggleMovieModal();
};

const clearMovieModal = () => {
    for (el of userInputs) {
        el.value = '';
    }
};

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const renderNewMovie = (movieObj) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${movieObj.image}" alt="${movieObj.title}">
    </div>
    <div class="movie-element__info">
        <h2>${movieObj.title}</h2>
        <p>${movieObj.ratingValue}/5 Stars</p>
    </div>
    `;

    newMovieElement.addEventListener(
        'click',
        removeMovieHandler.bind(null, movieObj.id)
    );

    listRoot.append(newMovieElement);
};

const removeMovieHandler = (movieId) => {
    toggleDeleteConfirmModal();

    let deleteMovieBtn = document
        .getElementById('delete-modal-button-div')
        .querySelectorAll('button')[1];
    const cancelDeleteMovieBtn = document
        .getElementById('delete-modal-button-div')
        .querySelectorAll('button')[0];

    deleteMovieBtn.replaceWith(deleteMovieBtn.cloneNode(true));
    cancelDeleteMovieBtn.removeEventListener('click', toggleDeleteConfirmModal);

    deleteMovieBtn = document
        .getElementById('delete-modal-button-div')
        .querySelectorAll('button')[1];
    deleteMovieBtn.addEventListener('click', deleteMovie.bind(null, movieId));
    cancelDeleteMovieBtn.addEventListener('click', toggleDeleteConfirmModal);
};

const toggleDeleteConfirmModal = () => {
    const modal = document.getElementById('delete-modal');
    toggleBackdrop();
    modal.classList.toggle('visible');
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        ratingValue.trim() < 1 ||
        ratingValue.trim() > 5
    ) {
        alert('Please enter valid values');
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        ratingValue: ratingValue,
    };

    movies.push(newMovie);
    updateUI();
    renderNewMovie(newMovie);
    toggleMovieModal();
};

const deleteMovie = (movieId) => {
    let idx = 0;
    for (el of movies) {
        if (el.id === movieId) {
            break;
        }
        idx++;
    }

    movies.splice(idx, 1);
    listRoot.children[idx].remove();
    toggleDeleteConfirmModal();
    updateUI();
};

startAddMovieBtn.addEventListener('click', toggleMovieModal);
cancelAddMovieModalBtn.addEventListener('click', cancelMovieHandler);
backdrop.addEventListener('click', backdropClickHandler);
confirmAddMovieModalBtn.addEventListener('click', addMovieHandler);
