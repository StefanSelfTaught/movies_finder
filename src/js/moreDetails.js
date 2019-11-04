import '../css/index.css';

let id = sessionStorage.getItem('id');
let api = 'ce2eb2231a371296cf6ff11a39206d6e';
fetch(
  `https://api.themoviedb.org/3/movie/${id}?api_key=${api}&language=en-US&append_to_response=reviews,videos,images`
)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    let output = '';
    output = `
			<div id="movie">
				<div>
					<a href="index.html"><span class="carousel-control-prev-icon back-arrow" aria-hidden="true"></span></a>
				</div>
				<div class="movie-infos">
					<h1 class="main-movie-title">${data.title}</h1>
					<p class="main-movie-details">
						${data.release_date.split('-')[0]} &nbsp | &nbsp
						${data.genres[0].name + ', ' + data.genres[1].name} &nbsp | &nbsp
						${data.original_language.toUpperCase()} &nbsp | &nbsp 
						${data.runtime} mins			
					</p>
					<p class="main-movie-rating">Rating: &nbsp ${
            data.vote_average
          } <span class="rating"> / 10 (${data.vote_count})</span>  </p> 
				</div>
			</div>
		`;

    let background = `background: linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.45) 92%) no-repeat center/cover, url(https://image.tmdb.org/t/p/original${data.backdrop_path}) no-repeat center top/cover rgb(255, 255, 255)`;

    document.body.innerHTML = output;
    document.getElementById('movie').setAttribute('style', background);
  });
