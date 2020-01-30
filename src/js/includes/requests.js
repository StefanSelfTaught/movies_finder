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

	fetchAirShows: async function fetchAirShows() {
		const request = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&page=1`)
		const res = await request.json();
		return res;	
	},

	fetchPopularShows: async function fetchPopularShows() {
		const request = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=1`)
		const res = await request.json();
		return res;	
	},
	
	fetchTopShows: async function fetchTopShows() {
		const request = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&page=1`)
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
	},

	fetchSearchMoviesDefault: async function fetchSearchMoviesDefault(){
		const request = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
		const res = await request.json();
		return res;
	},

	fetchSearchMovies: async function fetchSearchMovies(movie, page){
		const request = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}&page=${page}`);
		const res = await request.json();
		return res;
	},

	fetchSearchShowsDefault: async function fetchSearchShowsDefault(){
		const request = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`);
		const res = await request.json();
		return res;
	},

	fetchSearchShows: async function fetchSearchShows(movie, page){
		const request = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${movie}&page=${page}`);
		const res = await request.json();
		return res;
	},

	fetchAllPopularMovies: async function fetchAllPopularMovies(type){
		const urls = [
			`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=1`,
			`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=2`,
			`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=3`,
			`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=4`,
			`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=5`,
			`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=6`
		]
		const [ result1, result2, result3, result4, result5, result6 ] = await Promise.all(urls.map( async (url) => {
			const request = await fetch(url)
			const res = await request.json();
			return res
		}))
		return (
			Promise.resolve([...result1.results, ...result2.results, ...result3.results, ...result4.results, ...result5.results, ...result6.results])
		)
	},

	fetchAllPopularShows: async function fetchAllPopularShows(type){
		const urls = [
			`https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}&language=en-US&page=1`,
			`https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}&language=en-US&page=2`,
			`https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}&language=en-US&page=3`,
			`https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}&language=en-US&page=4`,
			`https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}&language=en-US&page=5`,
			`https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}&language=en-US&page=6`
		]
		const [ result1, result2, result3, result4, result5, result6 ] = await Promise.all(urls.map( async (url) => {
			const request = await fetch(url)
			const res = await request.json();
			return res
		}))
		return (
			Promise.resolve([...result1.results, ...result2.results, ...result3.results, ...result4.results, ...result5.results, ...result6.results])
		)
	}
}