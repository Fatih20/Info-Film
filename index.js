const main_page = document.querySelector(".main-page");

window.addEventListener('load',
    function (){
        show_movies();
    }
, false);

function show_movies (){
    const API_KEY = "d87229b426af9640b5a4df6cd94336d3";
    const IMAGE_URL = "https://image.tmdb.org/t/p/w300";

    let movie_data;
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
        .then((res) => res.json())
        .then((data) => {
            movie_data = data.results;
            for (const movie of movie_data){
                const movie_part = document.createElement('div');
                movie_part.className = "movie-part";

                const movie_poster = document.createElement('img');
                movie_poster.className = "movie-poster";
                movie_poster.setAttribute("src", `${IMAGE_URL}${movie.poster_path}`);
                
                const movie_title = document.createElement('p');
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
                    show_description(movie);
                });

                console.log(movie);
            }

        })
};

function show_description(){
    main_page.innerHTML = "";
    const movie_explanation = document.createElement('div');
    movie_explanation.className = "movie-explanation";

    const movie_poster_explanation = document.createElement('img');
    movie_poster_explanation.className = "movie-poster-explanation";
    movie_poster_explanation.setAttribute("src", `${IMAGE_URL}${movie.poster_path}`);

    const movie_description_container = document.createElement('div');
    movie_description_container.className = "movie-description_container";

    const movie_title = document.createElement('p')
    movie_title.innerHTML = ""





}

