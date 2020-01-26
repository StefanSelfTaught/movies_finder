import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../css/index.css";
import lax from "lax.js";

window.onload = function() {
	lax.setup(); // init

	const updateLax = () => {
		lax.update(window.scrollY);
		window.requestAnimationFrame(updateLax);
	};

	window.requestAnimationFrame(updateLax);
}

let id = sessionStorage.getItem("id");
let api = "ce2eb2231a371296cf6ff11a39206d6e";

fetch(
	`https://api.themoviedb.org/3/tv/${id}?api_key=${api}&language=en-US&append_to_response=reviews,videos,credits`
)
	.then(res => res.json())
	.then(data => {

		console.log(data);

		let createdBy;
		let reviews = "";
		let output = "";
		let castOutput = "";
		let networks = ""
		let productionCompanies = "";
		let casts = data.credits.cast.slice(0, 15).filter(cast => cast.profile_path !== null); 
		let companies = data.production_companies.slice(0, 3);

		if(data.created_by.length) {
			createdBy = data.created_by[0].name
		} else {
			createdBy = ""
		}

		if(!data.reviews.results.length) {
			reviews = '<p style="color: white; margin: 10px" >No reviews</p>'
		}

		data.reviews.results.map(review => {
			let reviewContent;  
			if (review.content.length > 400) {
				reviewContent = review.content.split(" ").splice(0, 80).join(" ") + '...';	
			} else {
				reviewContent = review.content;
			}

			return reviews += `
				<div class="review-container">
					<p class="review-author">A review by ${review.author}</p>
					<p class="review-content">${reviewContent}</p>
					<a target="_blank" href="https://www.themoviedb.org/review/${review.id}">View full review</a>
				</div>
			`	

		})

		companies.map((company, i) => {

			if(i <= 1){
				return productionCompanies += (`
					<span class="details-content">${company.name + ", "}</span>
				`)	
			} else {
				return productionCompanies += (`
					<span class="details-content">${company.name}</span>
				`)	
			}

		})

		data.networks
			.slice(0, 2)
			.map((network, i) => {

				if(i < 0){
					return networks += `<span class="details-content"> ${network.name + ", "} </span>`	
				} else {
					return networks += `<span class="details-content"> ${network.name} </span>`
				}

		})

		casts.map(cast => {
			let src = 'https://image.tmdb.org/t/p/w300'.concat(cast.profile_path)
			return (
				castOutput += `
				<div>
					<img class="cast-image" src= ${src} />
					<p class="cast-name">${cast.name}</p>
				</div>
				`
			)
		})

		output = `
			<div class="lax" data-lax-opacity="0 1, 150 0" data-lax-translate-y="0 0, 50 -150" id="movie">
				<div>
					<a onclick="window.history.back()"><span class="carousel-control-prev-icon back-arrow" aria-hidden="true"></span></a>
				</div>
				<div class="lax movie-infos">
					<h1 class="main-movie-title">${data.name}</h1>
					<p class="main-movie-details">
						${data.first_air_date.split("-")[0]} &nbsp | &nbsp
						${data.genres.slice(0, 2).map(genre => ' ' + genre.name )} &nbsp | &nbsp
						${data.original_language.toUpperCase()} &nbsp | &nbsp 
						${data.episode_run_time.length ? data.episode_run_time[0] + ' mins per episode' : ''} &nbsp | &nbsp 
						${data.number_of_seasons + ' season(s) '}			
					</p>
					<p class="main-movie-rating">Rating: &nbsp ${
						data.vote_average
					} <span class="rating"> / 10 (${
			data.vote_count
		})</span>  </p> 
				</div>
			</div>
		<div class="lax" data-lax-translate-y="0 0, 500 -130">
			<div class="container">
				<h2 class="first-sub-header">DESCRIPTION</h2>
				<p class="sub-header-content"> ${data.overview} </p>
				<div class="slider-cast">
					<h2 class="sub-header">CAST</h2>
					<span class="carousel-control-prev-icon prevCast" aria-hidden="true"></span>
				    <span class="carousel-control-next-icon nextCast" aria-hidden="true"></span>
				    <div class="slick-carousel-cast">
					${castOutput}
				    </div>
				</div>
				<div>
					<h2 class="sub-header">TRAILER</h2>
					<div class="embed-responsive embed-responsive-21by9">
	  					<iframe width="200" height="100" style="border: 1px solid white; border-radius: 10px" class="embed-responsive-item" 
	  						src=https://www.youtube.com/embed/${data.videos.results[0].key}?rel=0 allowfullscreen></iframe>
					</div>
				</div>
				<div>
					<h2 class="sub-header">OTHER DETAILS</h2>
					<ul>
						<li class="details-li">Created By: <span class="details-content">${createdBy} </span></li>
						<li class="details-li">Last air date: <span class="details-content">${data.last_air_date} </span></li>
						<li class="details-li">Networks: ${networks} </li>
						<li class="details-li">Status: <span class="details-content"> ${data.status} </span></li>
						<li class="details-li">Production Companies: ${productionCompanies}</li>
					</ul>
				</div>
				<div>
					<h2 class="sub-header">REVIEWS</h2>
					${reviews}
				</div>
			</div>
		</div>
		`;

		document.body.innerHTML = output;

		$('.slick-carousel-cast').slick({
	      slidesToShow: 5,
	      lazyLoad: 'ondemand',
	      slidesToScroll: 1,
	      infinite: true,
	      nextArrow: $('.nextCast'),
	      focusOnSelect: false,
	      prevArrow: $('.prevCast'),
	    });

		let background = `
			background: linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.45) 92%) 
			no-repeat center/cover, 
			url(https://image.tmdb.org/t/p/original${data.backdrop_path}) 
			no-repeat center top/cover rgb(255, 255, 255)`;

		document.getElementById("movie").setAttribute("style", background);

		// setTimeout(function() {

		// 	document.getElementById("movie").classList.remove('blur');
		// 	document.getElementById("movie").classList.add('noblur');
		// 	document.getElementById("spinner-blur").style.display = "none";

		// }, 500)

	}); 





