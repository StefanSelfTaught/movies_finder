import { genres } from './genres.js';

(() => {

	const onTheAir = document.getElementById('on-the-air');
	const popularShows = document.getElementById('popular-shows');
	const topRatedShows = document.getElementById('top-rated-shows');
	const apiKey = 'ce2eb2231a371296cf6ff11a39206d6e';

	fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1')
		.then(data => data.json())
		.then(res => {
			let topRMovies = res.results.splice(9, 6);
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
					<div class="mr-3 card" style="width: 20rem;">
				        <img class="card-img-top card-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
				        <div class="card-body">
				          <h5 class="card-title card-movie-title">${movie.name}</h5>
				          <p class="card-text card-details">${movie.first_air_date.split("-")[0]} | ${genreOutput}</p>
				        </div>
      				</div>
					`
			})
			onTheAir.innerHTML = output;
			onTheAir.children[0].classList.add("ml-5");
		})


	fetch('https://api.themoviedb.org/3/tv/popular?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1')
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
					<div class="mr-3 card" style="width: 20rem;">
				        <img class="card-img-top card-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
				        <div class="card-body">
				          <h5 class="card-title card-movie-title">${movie.name}</h5>
				          <p class="card-text card-details">${movie.first_air_date.split("-")[0]} | ${genreOutput}</p>
				        </div>
      				</div>
				`		
			})
			popularShows.innerHTML = output;
			popularShows.children[0].classList.add("ml-5");
		})


		fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1')
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
					<div class="mr-3 card" style="width: 20rem;">
				        <img class="card-img-top card-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
				        <div class="card-body">
				          <h5 class="card-title card-movie-title">${movie.name}</h5>
				          <p class="card-text card-details">${movie.first_air_date.split("-")[0]} | ${genreOutput}</p>
				        </div>
      				</div>
				`
			})
			topRatedShows.innerHTML = output;
			topRatedShows.children[0].classList.add("ml-5");
		})

})();	