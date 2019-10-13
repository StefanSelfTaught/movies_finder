import { genres } from './genres.js';

(() => {

	const topMovies = document.getElementById('top-rated-movies');
	const popularMovies = document.getElementById('popular-movies');
	const nowPlaying = document.getElementById('now-playing');
	const apiKey = 'ce2eb2231a371296cf6ff11a39206d6e';

	fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1')
		.then(data => data.json())
		.then(res => {
			let topRMovies = res.results.splice(0, 6);
			let output = '';
			let genresArray = '';
			topRMovies.map(movie => {
				genresArray = genres.filter(genre => {
					if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]){
						return genre.id;
					}
				})
				let genreOutput = genresArray.map(genre => genre.name).join(", ");
				output +=
					`
					<div class="mr-3 card" style="width: 15rem;">
				        <img class="card-img-top card-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
				        <div class="card-body">
				          <h5 class="card-title card-movie-title">${movie.title}</h5>
				          <p class="card-text card-details">${movie.release_date.split("-")[0]} | ${genreOutput}</p>
				        </div>
      				</div>
					`
			})
			topMovies.innerHTML = output;
			topMovies.children[0].classList.add("ml-5");
		})


	fetch('https://api.themoviedb.org/3/movie/popular?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1')
		.then(data => data.json())
		.then(res => {
			let topPopularMovies = res.results.splice(0, 6);
			let output = '';
			let genresArray = '';
			topPopularMovies.map(movie => {
				genresArray = genres.filter(genre => {
					if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]){
						return genre.id;
					}
				})
				let genreOutput = genresArray.map(genre => genre.name).join(", ");
				output +=
					`
					<div class="mr-3 card" style="width: 15rem;">
				        <img class="card-img-top card-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
				        <div class="card-body">
				          <h5 class="card-title card-movie-title">${movie.title}</h5>
				          <p class="card-text card-details">${movie.release_date.split("-")[0]} | ${genreOutput} </p>
				        </div>
      				</div>
				`		
			})
			popularMovies.innerHTML = output;
			popularMovies.children[0].classList.add("ml-5");
		})


		fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1')
		.then(data => data.json())
		.then(res => {
			let topPopularMovies = res.results.splice(0, 7);
			let output = '';
			let genresArray = '';
			topPopularMovies.map(movie => {
				genresArray = genres.filter(genre => {
					if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]){
						return genre.id;
					}
				})
				let genreOutput = genresArray.map(genre => genre.name).join(", ");
				output +=
					`
					<div class="mr-3 card" style="width: 15rem;">
				        <img class="card-img-top card-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
				        <div class="card-body">
				          <h5 class="card-title card-movie-title">${movie.title}</h5>
				          <p class="card-text card-details">${movie.release_date.split("-")[0]} | ${genreOutput} </p>
				        </div>
      				</div>
				`
			})
			nowPlaying.innerHTML = output;
			nowPlaying.children[0].classList.add("ml-5");
		})

})();	