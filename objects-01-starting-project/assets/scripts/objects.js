const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const newMovies = [];

function renderMovies(filter = '') {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    if (newMovies.length === 0) {
        movieList.classList.remove('visible');
    } else {
        movieList.classList.add('visible');
    }

    const filteredMovies = !filter
        ? newMovies
        : newMovies.filter((movie) => movie.info.title.includes(filter));

    filteredMovies.forEach((movie) => {
        const movieEl = document.createElement('li');
        if(!(info in movie)){
            return;
        }
        const { info, ...otherProps } = movie;
        // movieEl.textContent = movie.info.title;
        let text = movie.getFormattedTitle() + ' - ';
        for (const key in info) {
            if (key !== 'title') {
                text += `${key}: ${info[key]}`;
            }
        }
        movieEl.textContent = text;
        movieList.append(movieEl);
    });
}

function addMovieHandler() {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (
        title.trim() === '' ||
        extraName.trim() === '' ||
        extraValue.trim() === ''
    ) {
        return;
    }

    const newMovie = {
        info: {
            title,
            [extraName]: extraName,
        },
        id: Math.random(),
        getFormattedTitle: function() {
            return this.info.title.toUpperCase();
        }
    };
    newMovies.push(newMovie);
    renderMovies();
}

function searchHandler() {
    const searchTerm = document.getElementById('filter-title').value;
    renderMovies(searchTerm);
}

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchHandler);
