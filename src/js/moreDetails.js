import "bootstrap/dist/js/bootstrap.min.js";
import lax from "lax.js";
import { request } from "./includes/requests.js";
import "@babel/polyfill";

let id = sessionStorage.getItem("id");

request
	.fetchMovieDetails(id)
	.then((data) => {
		let spokenLanguages = "";
		let trailer;
		let reviews = "";
		let output = "";
		let castOutput = "";
		let productionCountries = "";
		let productionCompanies = "";
		let casts = data.credits.cast
			.slice(0, 15)
			.filter((cast) => cast.profile_path !== null);
		let companies = data.production_companies.slice(0, 3);

		if (data.videos.results.length) {
			trailer = `
			<div class="embed-responsive embed-responsive-21by9">
				<iframe width="200" height="100" style="border: 1px solid white; border-radius: 10px" class="embed-responsive-item" 
		  				src=https://www.youtube.com/embed/${data.videos.results[0].key}?rel=0 allowfullscreen>
		  		</iframe>
	  		</div>
	  		`;
		} else {
			trailer = "<p>No trailer available</p>";
		}

		data.spoken_languages.slice(0, 2).map((lang, i) => {
			if (i <= 0) {
				return (spokenLanguages += `<span class="details-content"> ${lang.name +
					", "} </span>`);
			} else {
				return (spokenLanguages += `<span class="details-content"> ${lang.name} </span>`);
			}
		});

		if (!data.reviews.results.length) {
			reviews = '<p style="color: white; margin: 10px" >No reviews</p>';
		}

		data.reviews.results.map((review) => {
			let content;
			if (review.content.length > 400) {
				content =
					review.content
						.split(" ")
						.splice(0, 80)
						.join(" ") + "...";
			} else {
				content = review.content;
			}

			return (reviews += `
				<div class="review-container">
					<p class="review-author">A review by ${review.author}</p>
					<p class="review-content">${content}</p>
					<a class="blank-link" target="_blank" href="https://www.themoviedb.org/review/${review.id}">View full review</a>
				</div>
			`);
		});

		companies.map((company, i) => {
			if (i <= 1) {
				return (productionCompanies += `
					<span class="details-content">${company.name + ", "}</span>
				`);
			} else {
				return (productionCompanies += `
					<span class="details-content">${company.name}</span>
				`);
			}
		});

		data.production_countries.slice(0, 3).map((country, i) => {
			if (i <= 1) {
				return (productionCountries += `<span class="details-content"> ${country.name +
					", "} </span>`);
			} else {
				return (productionCountries += `<span class="details-content"> ${country.name} </span>`);
			}
		});

		if (!casts.length) {
			castOutput = "<p style='color: white'>No cast available</p>";
		}

		casts.map((cast) => {
			let src = "https://image.tmdb.org/t/p/w300".concat(cast.profile_path);
			return (castOutput += `
				<div>
					<img class="img-fluid cast-image" src= ${src} />
					<p class="cast-name">${cast.name}</p>
				</div>
				`);
		});

		output = `
			<div id="spinner-blur" style="margin: 0 auto" class="mb-5 spinner-border text-light" style="width: 5rem !important; height: 5rem !important;" role="status">
     			<span class="sr-only">Loading...</span>
    		</div>
			<div class="blur lax" data-lax-opacity="0 1, 150 0" data-lax-translate-y="0 0, 50 -150" id="movie">
				<div>
					<a onclick="window.history.back()"><span class="carousel-control-prev-icon back-arrow" aria-hidden="true"></span></a>
				</div>
				<div class="lax movie-infos">
					<h1 class="main-movie-title">${data.title}</h1>
					<p class="main-movie-details">
						${data.release_date.split("-")[0]} &nbsp | &nbsp
						${data.genres.slice(0, 2).map((genre) => " " + genre.name)} &nbsp | &nbsp
						${data.original_language.toUpperCase()} &nbsp | &nbsp 
						${data.runtime ? data.runtime + " mins " : ""}			
					</p>
					<p class="main-movie-rating">Rating: &nbsp ${
						data.vote_average
					} <span class="rating"> / 10 (${data.vote_count})</span>  </p> 
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
	  				${trailer}
				</div>
				<div>
					<h2 class="sub-header">OTHER DETAILS</h2>
					<ul class="list-details">
						<li class="details-li">Budget: <span class="details-content">$${
							data.budget
						} </span></li>
						<li class="details-li">Revenue: <span class="details-content">$${
							data.revenue
						} </span></li>
						<li class="details-li">Status: <span class="details-content"> ${
							data.status
						} </span></li>
						<li class="details-li">Spoken Languages: ${spokenLanguages}</li>
						<li class="details-li">Production Countries: ${productionCountries}</li>
						<li class="details-li">Production Companies: ${productionCompanies}</li>
						<li class="details-li"><a target="_blank" class="blank-link" href="https://www.imdb.com/title/${
							data.imdb_id
						}"> View on IMDB </a> </li>
					</ul>
				</div>
				<div>
					<h2 class="sub-header">REVIEWS</h2>
					${reviews}
				</div>
			</div>
		</div>
		<hr>
		<footer>
	    <p class="designed">Designed and developed by <a target="_blank" href="https://github.com/StefanSelfTaught">Pop Stefan</a></p>
	    <p class="copy">&copy; 2020 Eco Network. All Rights Reserved. This site may contain mature content.</p>
  	</footer>
		`;

		document.body.innerHTML = output;

		$(".slick-carousel-cast").slick({
			slidesToShow: 5,
			lazyLoad: "ondemand",
			slidesToScroll: 1,
			infinite: true,
			nextArrow: $(".nextCast"),
			focusOnSelect: false,
			prevArrow: $(".prevCast"),
			responsive: [
				{
					breakpoint: 1300,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
					},
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
					},
				},
				{
					breakpoint: 770,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
					},
				},
			],
		});

		let background = `
			background: linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.45) 92%) 
			no-repeat center/cover, 
			url(https://image.tmdb.org/t/p/original${data.backdrop_path}) 
			no-repeat center top/cover rgb(255, 255, 255)`;

		document.getElementById("movie").setAttribute("style", background);

		setTimeout(function() {
			document.getElementById("movie").classList.remove("blur");
			document.getElementById("movie").classList.add("noblur");
			document.getElementById("spinner-blur").style.display = "none";
		}, 200);
	})
	.finally(() => {
		lax.setup(); // init

		const updateLax = () => {
			lax.update(window.scrollY);
			window.requestAnimationFrame(updateLax);
		};

		window.requestAnimationFrame(updateLax);
	});
