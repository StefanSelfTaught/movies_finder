const apiKey = 'ce2eb2231a371296cf6ff11a39206d6e';

// Toate request-urile facut catre TMDB API

// Daca in timpul request-ului exista o eroare se v-a executa blocul catch

// Se intelege ce request se executa si pe ce pagina dupa numele functiei

export const request = {
	fetchTopMovies: async function fetchTopMovies() {
		try {
			const request = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`)
			const res = await request.json();
			return res;	
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},

	fetchPopularMovies: async function fetchPopularMovies() {
		try {
			const request = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`)
			const res = await request.json();
			return res;	
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},
	
	fetchPlayingMovies: async function fetchPlayingMovies() {
		try {
			const request = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=1`)
			const res = await request.json();
			return res;	
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},

	fetchAirShows: async function fetchAirShows() {
		try {
			const request = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&page=1`)
			const res = await request.json();
			return res;	
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},

	fetchPopularShows: async function fetchPopularShows() {
		try {
			const request = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=1`)
			const res = await request.json();
			return res;	
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},
	
	fetchTopShows: async function fetchTopShows() {
		try {
			const request = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&page=1`)
			const res = await request.json();
			return res;	
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},

	fetchDiscoverMovies: async function fetchDiscoverMovies(sortBy, year, vote, genres, page){
		try {
			const request = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${sortBy}&year=${year}&vote_average.gte=${vote}&with_genres=${genres}&page=${page}`);
			const res = await request.json();
			return res;
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},

	// Default = ce filme se afiseaza pe pagina daca nu cauti nimic
	fetchDiscoverMoviesDefault: async function fetchDiscoverMoviesDefault(){
		try {
			const request = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&year=&vote_average.gte=&with_genres=&page=1}`);
			const res = await request.json();
			return res;
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},

	fetchDiscoverShows: async function fetchDiscoverShows(sortBy, year, vote, genres, page){
		try {
			const request = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=${sortBy}&first_air_date_year=${year}&vote_average.gte=${vote}&with_genres=${genres}&page=${page}`);
			const res = await request.json();
			return res;
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},

	// Default = ce seriale se afiseaza pe pagina daca nu cauti nimic
	fetchDiscoverShowsDefault: async function fetchDiscoverShowsDefault(){
		try {
			const request = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&first_air_date_year=&vote_average.gte=&with_genres=&page=1`);
			const res = await request.json();
			return res;
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},

	// Default = ce filme se afiseaza pe pagina daca nu cauti nimic
	fetchSearchMoviesDefault: async function fetchSearchMoviesDefault(){
		try {
			const request = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
			const res = await request.json();
			return res;
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},

	fetchSearchMovies: async function fetchSearchMovies(movie, page){
		try {
			const request = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}&page=${page}`);
			const res = await request.json();
			return res;
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},

	// Default = ce seriale se afiseaza pe pagina daca nu cauti nimic
	fetchSearchShowsDefault: async function fetchSearchShowsDefault(){
		try {
			const request = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`);
			const res = await request.json();
			return res;
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},

	fetchSearchShows: async function fetchSearchShows(movie, page){
		try {
			const request = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${movie}&page=${page}`);
			const res = await request.json();
			return res;
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},

	fetchMovieDetails: async function fetchMovieDetails(movieId){
		try {
			const request = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=reviews,videos,credits`);
			const res = await request.json();
			return res;
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},

	fetchShowDetails: async function fetchShowDetails(showId){
		try {
			const request = await fetch(`https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&language=en-US&append_to_response=reviews,videos,credits`);
			const res = await request.json();
			return res;
		}
		catch(error) {
			alert('Data could not be fetched!' + ' ' + error);
		}
	},

	// type = popular || top rated || now playing etc

	fetchAllTypeMovies: async function fetchAllTypeMovies(type){
		const urls = [
			`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=1`,
			`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=2`,
			`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=3`,
			`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=4`,
			`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=5`,
			`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=6`
		]
		const [ result1, result2, result3, result4, result5, result6 ] = await Promise.all(urls.map( async (url) => {
			try {
				const request = await fetch(url)
				const res = await request.json();
				return res
			}
			catch(error) {
				alert('Data could not be fetched!' + ' ' + error);
			}
		}))
		return (
			Promise.resolve([...result1.results, ...result2.results, ...result3.results, ...result4.results, ...result5.results, ...result6.results])
		)
	},

	// type = popular || top rated || now playing etc

	fetchAllTypeShows: async function fetchAllTypeShows(type){
		const urls = [
			`https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}&language=en-US&page=1`,
			`https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}&language=en-US&page=2`,
			`https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}&language=en-US&page=3`,
			`https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}&language=en-US&page=4`,
			`https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}&language=en-US&page=5`,
			`https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}&language=en-US&page=6`
		]
		const [ result1, result2, result3, result4, result5, result6 ] = await Promise.all(urls.map( async (url) => {
			try {
				const request = await fetch(url)
				const res = await request.json();
				return res
			}
			catch(error) {
				alert('Data could not be fetched!' + ' ' + error);
			}
		}))
		return (
			Promise.resolve([...result1.results, ...result2.results, ...result3.results, ...result4.results, ...result5.results, ...result6.results])
		)
	}
}