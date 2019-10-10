import { genres } from './genres.js';

(() => {

	const topMovies = document.getElementById('top-rated-movies');
	const popularMovies = document.getElementById('popular-movies');
	const apiKey = 'ce2eb2231a371296cf6ff11a39206d6e';

	fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1')
		.then(data => data.json())
		.then(res => {
			let topRMovies = res.results.splice(0, 6);
			let output = '';
			let genresOutput = '';
			topRMovies.map(movie => {
				genresOutput = genres.filter(genre => {
					if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]){
						return true;
					}
				})
				output +=
					`
					<div class="mr-3 card" style="width: 14rem;">
				        <img class="card-img-top" src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="Card image cap">
				        <div class="card-body">
				          <h5 class="card-title card-movie-title">${movie.title}</h5>
				          <p class="card-text">${movie.release_date.split("-")[0]} | ${genresOutput[0].name}, ${genresOutput[1].name}</p>
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
			let topPopularMovies = res.results.splice(0, 8);
			let output = '';
			let genresOutput = '';
			topPopularMovies.map(movie => {
				genresOutput = genres.filter(genre => {
					if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]){
						return true;
					}
				})
				console.log(genresOutput);
				if(movie.genre_ids.length >= 2){
				output +=
					`
					<div class="mr-3 card" style="width: 14rem;">
				        <img class="card-img-top" src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="Card image cap">
				        <div class="card-body">
				          <h5 class="card-title card-movie-title">${movie.title}</h5>
				          <p class="card-text">${movie.release_date.split("-")[0]} | ${genresOutput[0].name}, ${genresOutput[1].name} </p>
				        </div>
      				</div>
					`
				} 
			})
			popularMovies.innerHTML = output;
			popularMovies.children[0].classList.add("ml-5");
		})

})();	