import { request } from './requests.js';
import { genres } from './showsGenres.js';
import "@babel/polyfill";

(() => {

	const form = document.getElementById('discoverForm');
	const moviesContainer = document.getElementById('discover-shows');
	const previous = document.getElementById('previous');
	const next = document.getElementById('next');
	const pagination = document.getElementById('pagination-container');

	request.fetchDiscoverShowsDefault().then(data => {
		let output = '';
		let genresArray = '';
		data.results.map(movie => {
			genresArray = genres.filter(genre => {
				if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]){
					return genre.id;
				}
			})

			let genreOutput = genresArray.map(genre => genre.name).join(", ");
			output +=
			`
			<div class="mb-5 mr-3 ml-3 card" id=${movie.id} style="width: 13rem;">
				<img class="card-img-top card-img" style="height: 19.5rem;" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
				    <div class="card-body">
				       	<h5 class="card-title card-small-title">${movie.name}</h5>
				        <p class="card-text card-small-details">${movie.first_air_date.split("-")[0]} | ${genreOutput}</p>
				   	</div>
      		</div>
			`
		})
		moviesContainer.innerHTML = output;
		pagination.style.visibility = 'visible';
		previous.disabled = true;
		next.disabled = true;
		next.classList.add('button-disabled');
		previous.classList.add('button-disabled');
	})

	form.addEventListener('submit', (e) => {

		const year = document.getElementById('year').value;

		const sortBy = document.getElementById('sortBy');	
		const sortByValue = sortBy.options[sortBy.selectedIndex].value;

		const vote = document.getElementById('vote').value;

		const genre = document.getElementById('genres');
		const genreValue = genre.options[genre.selectedIndex].value;

		e.preventDefault();
		renderMovies(sortByValue, year, vote, genreValue, 1);
	})

	const previousDisabled = page => {
		if(page == 1){
			previous.disabled = true;
			previous.classList.add('button-disabled');
		} else {
			previous.disabled = false;
			previous.classList.remove('button-disabled');
		}
	}

	const nextDisabled = (page, totalPages) => {
		if(page === totalPages){
			next.disabled = true;
			next.classList.add('button-disabled');
		} else {
			next.disabled = false;
			next.classList.remove('button-disabled');
		}
	}

	function renderMovies(sortByValue, year, vote, genreValue, page) {
		previousDisabled(page);

		request.fetchDiscoverShows(sortByValue, year, vote, genreValue, page).then(data => {
			nextDisabled(page, data.total_pages);
			let output = '';
			let genresArray = '';
			data.results.map(movie => {
				genresArray = genres.filter(genre => {
					if(genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]){
						return genre.id;
					}
				})

				let genreOutput = genresArray.map(genre => genre.name).join(", ");
				output +=
				`
				<div class="mb-5 mr-3 ml-3 card" id=${movie.id} style="width: 13rem;">
					<img class="card-img-top card-img" style="height: 19.5rem;" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image cap">
				    <div class="card-body">
				       	<h5 class="card-title card-small-title">${movie.name}</h5>
				        <p class="card-text card-small-details">${movie.first_air_date.split("-")[0]} | ${genreOutput}</p>
				   	</div>
      			</div>
				`
			})
			if(data.results.length !== 0){
				moviesContainer.innerHTML = output;
			} else {
				moviesContainer.innerHTML = `<h2 class="no-results">No results founded</h2>`;
				next.disabled = true;
				next.classList.add('button-disabled');
			}
			pagination.style.visibility = 'visible';
			next.addEventListener('click', () => {
				window.scrollTo(0, 240);
				renderMovies(sortByValue, year, vote, genreValue, ++page);
			});
			previous.addEventListener('click', () => {
				window.scrollTo(0, 240);
				renderMovies(sortByValue, year, vote, genreValue, --page);
			});
		})
	}

})()