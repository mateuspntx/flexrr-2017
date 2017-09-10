window.$ = function(e){
  return document.querySelector(e)
}

const Flexrr = {}

Flexrr.RenderHeaderComponent = function(showId, element){
  
  element = $(element)

  try {

    tmdb.call(`/tv/${showId}`, {},
    function(showData){

    const first_air_date = moment(showData.first_air_date).format('YYYY')

    element.innerHTML = `
    <header class="header">
      <div class="poster">
        <img src="${tmdb.images_uri}/w300${showData.poster_path}" alt="">
      </div>
      <div class="info">
        <h1 class="title">${showData.name} <span class="release">(${first_air_date})</span></h1>
        <h3>Overview</h3>
        <p class="overview">${showData.overview}</p>
        <h4>Creator</h4>
        <p class="-margin-top">${showData.created_by[0].name}</p>
        <h4>Genres</h4>
        <p class="-margin-top">${Flexrr.GenresMap(showData.genres)}</p>
      </div>
    </header>
    <section class="seasons">
      <div class="row">${Flexrr.SeasonsListComponent(showData)}</div>
    </section>`

    }, 
    function(e){

      console.error(e)
      element.innerHTML = `
      <header class="header">
        <h1>Something went wrong. Try refresh the page.</h1>
      </header>`

    })

  }catch(e){

    console.error(e)
    element.innerHTML = `
      <header class="header">
        <h1>Something went wrong. Try refresh the page.</h1>
      </header>`

  }

}

Flexrr.GenresMap = function(genres){
  return genres.map(genre => `${genre.name} `).join(', ')
}

Flexrr.SeasonsListComponent = function(data){

  return data.seasons.map(season =>
    `<div class="col-xs-12 season-box">
	    <div class="cover" style="background-image:url(${tmdb.images_uri}/w300${season.poster_path})"></div>
	    <div class="info">
	      <h2>Season ${season.season_number}</h2>
	      <p>${moment(season.air_date).format('YYYY')} | ${season.episode_count} episodes</p>
	    </div>
	   </div>
     `).join('')

}

Flexrr.Init = function() {

  const showId = '48866'

  Flexrr.RenderHeaderComponent(showId, '.app')

}

Flexrr.Init()