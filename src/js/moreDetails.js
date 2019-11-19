import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../css/index.css";
import lax from "lax.js";

// window.onload = function() {
// 	lax.setup(); // init

// 	const updateLax = () => {
// 		lax.update(window.scrollY);
// 		window.requestAnimationFrame(updateLax);
// 	};

// 	window.requestAnimationFrame(updateLax);
// }

let id = sessionStorage.getItem("id");
let api = "ce2eb2231a371296cf6ff11a39206d6e";
fetch(
	`https://api.themoviedb.org/3/movie/${id}?api_key=${api}&language=en-US&append_to_response=reviews,videos,images`
)
	.then(res => res.json())
	.then(data => {
		console.log(data);
		let output = "";
		output = `
			<div id="spinner-blur" style="margin: 0 auto" class="mb-5 spinner-border text-light" style="width: 5rem !important; height: 5rem !important;" role="status">
     			<span class="sr-only">Loading...</span>
    		</div>
			<div class="blur lax" data-lax-opacity="0 1, 500 0" data-lax-translate-y="0 0, 400 -400" id="movie">
				<div>
					<a onclick="window.history.back()"><span class="carousel-control-prev-icon back-arrow" aria-hidden="true"></span></a>
				</div>
				<div class="lax movie-infos">
					<h1 class="main-movie-title">${data.title}</h1>
					<p class="main-movie-details">
						${data.release_date.split("-")[0]} &nbsp | &nbsp
						${data.genres.slice(0, 2).map(genre => ' ' + genre.name )} &nbsp | &nbsp
						${data.original_language.toUpperCase()} &nbsp | &nbsp 
						${data.runtime ? data.runtime + ' mins ' : ''}			
					</p>
					<p class="main-movie-rating">Rating: &nbsp ${
						data.vote_average
					} <span class="rating"> / 10 (${
			data.vote_count
		})</span>  </p> 
				</div>
			</div>
			<div data-lax-opacity="0 0, 400 1" data-lax-translate-y="0 0, 0 -200" class="lax content">
					<h1>The Movie Title</h1>
					<p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</p>
					<h1>The Movie Title</h1>
					<h1>The Movie Title</h1>
					<h1>The Movie Title</h1>
					<h1>The Movie Title</h1>
					<h1>The Movie Title</h1>
					<h1>The Movie Title</h1>
					<h1>The Movie Title</h1>
					<h1>The Movie Title</h1>
					<h1>The Movie Title</h1>
			</div>
		`;

		document.body.innerHTML = output;

		let background = `background: linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.45) 92%) no-repeat center/cover, url(https://image.tmdb.org/t/p/original${data.backdrop_path}) no-repeat center top/cover rgb(255, 255, 255)`;

		setTimeout(function() {

			document.getElementById("movie").classList.remove('blur');
			document.getElementById("movie").classList.add('noblur');
			document.getElementById("spinner-blur").style.display = "none";

		}, 300)

		document.getElementById("movie").setAttribute("style", background);
	}); 


