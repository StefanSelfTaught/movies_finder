const apiKey = 'ce2eb2231a371296cf6ff11a39206d6e';

export const request = {
	fetchTopMovies: async function fetchTopMovies() {
		const request = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`)
		const res = await request.json();
		return res;	
	},

	fetchPopularMovies: async function fetchPopularMovies() {
		const request = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`)
		const res = await request.json();
		return res;	
	},
	
	fetchPlayingMovies: async function fetchPlayingMovies() {
		const request = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=1`)
		const res = await request.json();
		return res;	
	},

	fetchDiscoverMovies: async function fetchDiscoverMovies(sortBy, year, vote, genres, page){
		const request = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${sortBy}&year=${year}&vote_average.gte=${vote}&with_genres=${genres}&page=${page}`);
		const res = await request.json();
		return res;
	},

	fetchDiscoverMoviesDefault: async function fetchDiscoverMoviesDefault(){
		const request = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&year=&vote_average.gte=&with_genres=&page=1}`);
		const res = await request.json();
		return res;
	},

	fetchDiscoverShows: async function fetchDiscoverShows(sortBy, year, vote, genres, page){
		const request = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=${sortBy}&first_air_date_year=${year}&vote_average.gte=${vote}&with_genres=${genres}&page=${page}`);
		const res = await request.json();
		return res;
	},

	fetchDiscoverShowsDefault: async function fetchDiscoverShowsDefault(){
		const request = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&first_air_date_year=&vote_average.gte=&with_genres=&page=1`);
		const res = await request.json();
		return res;
	}
}