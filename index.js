const main_page = document.querySelector(".main-page");
const API_KEY = "d87229b426af9640b5a4df6cd94336d3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w300";

window.addEventListener('load',
    function (){
        show_movies(0, 0);
    }
, false);

function show_movies (position_x, position_y){
    let movie_data;
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
        .then((res) => res.json())
        .then((data) => {
            main_page.innerHTML = "";
            main_page.classList.add("main-page-list");
            main_page.classList.remove("main-page-description");

            window.scrollTo(position_x, position_y);

            movie_data = data.results;
            for (const movie of movie_data){
                const movie_part = document.createElement('div');
                movie_part.className = "movie-part";

                const movie_poster = document.createElement('img');
                movie_poster.className = "movie-poster";
                movie_poster.setAttribute("src", `${IMAGE_URL}${movie.poster_path}`);
                
                const movie_title = document.createElement('h2');
                movie_title.innerHTML = `${movie.title}`
                movie_title.className = "movie-title";

                const movie_year = document.createElement('p');
                movie_year.innerHTML = `(${movie.release_date.slice(0,4)})`;
                movie_year.className = "movie-year";

                movie_part.appendChild(movie_poster);
                movie_part.appendChild(movie_title);
                movie_part.appendChild(movie_year);

                main_page.appendChild(movie_part);

                movie_part.addEventListener('click', function() {
                    position_x, position_y = get_position();
                    show_description(movie, position_x, position_y);
                });
            }

        })
};

function get_position (){
    return window.scrollX, window.scrollY;
}

function show_description(movie, position_x, position_y){
    main_page.innerHTML = "";
    main_page.classList.add("main-page-description");
    main_page.classList.remove("main-page-list");

    window.scrollTo(0, 0);

    const movie_explanation_container = document.createElement('div');
    movie_explanation_container.className = "movie-explanation-container";

    const movie_explanation = document.createElement('div');
    movie_explanation.className = "movie-explanation";

    const back_button = document.createElement('button');
    back_button.appendChild(
        document.createElement('p')
            .appendChild(
                document.createTextNode("Return to the movie list")
        ));

    back_button.className = "back-button";
    back_button.addEventListener('click', function (){
        show_movies(position_x, position_y);
    });

    const movie_poster_explanation = document.createElement('img');
    movie_poster_explanation.className = "movie-poster-explanation";
    movie_poster_explanation.setAttribute("src", `${IMAGE_URL}${movie.poster_path}`);

    const movie_description_container = document.createElement('div');
    movie_description_container.className = "movie-description-container";

    const movie_title = document.createElement('h2')
    movie_title.innerHTML = `${movie.title}`;

    const movie_date = document.createElement('p');
    movie_date.className = "movie-description-date"
    movie_date.innerHTML = `(${movie.release_date.slice(0, 4)})`;

    const movie_overview = document.createElement('p');
    movie_overview.className = "movie-description-overview"
    movie_overview.innerHTML = `${movie.overview}`;

    const spacer_description = document.createElement('div');
    spacer_description.className = "spacer-description";

    movie_description_container.appendChild(movie_title);
    movie_description_container.appendChild(movie_date);
    movie_description_container.appendChild(movie_overview);

    movie_explanation.appendChild(movie_poster_explanation);
    movie_explanation.appendChild(movie_description_container);

    movie_explanation_container.appendChild(movie_explanation);
    movie_explanation_container.appendChild(back_button);
    movie_explanation_container.appendChild(spacer_description);

    main_page.appendChild(movie_explanation_container);
}

