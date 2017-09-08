const Flexrr = {}

Flexrr.RenderHeaderComponent = function(showId, element){
  
  element = document.querySelector(element);

  tmdb.call(`/tv/${showId}`, {},
  function(showData){
    element.innerHTML = `
  <header class="header">
    <div class="poster">
      <img src="https://image.tmdb.org/t/p/w300${showData.poster_path}" alt="">
    </div>
    <div class="info">
      <h1 class="title">${showData.name} <span class="release">(${moment(showData.first_air_date).format('YYYY')})</span></h1>
      <h3>Overview</h3>
      <p class="overview">${showData.overview}</p>
      <h4>Creator</h4>
      <p class="-margin-top">${showData.created_by[0].name}</p>
      <h4>Genres</h4>
      <p class="-margin-top">${Flexrr.GenresMap(showData.genres)}</p>
    </div>
  </header>
  <section class="seasons">
    <div class="row"></div>
  </section>`
  }, 
  function(e){
    console.log("Error: "+e)
  })

}

Flexrr.GenresMap = function(genres){
  return genres.map(genre => `${genre.name} `).join(', ')
}

Flexrr.SeasonsComponent = function(data){

  return data.map(season => 
    `<div class="col-xs-12 season-box">
	    <div class="cover" style="background-image:url(${season.coverUrl})"></div>
	    <div class="info">
	      <h2>${season.name}</h2>
	      <p>${season.release} | ${season.epCount} episodes</p>
	    </div>
	   </div>
     `).join('')

}

Flexrr.RenderSeasonsComponent = function(data){

  const seasonBox = document.querySelector('.row')
  
  try {
    seasonBox.innerHTML = Flexrr.SeasonsComponent(data)
  }catch(e){
    seasonBox.innerHTML = ``
  }

}

Flexrr.Init = function() {

  const showId = '48866'

  Flexrr.RenderHeaderComponent(showId, '.app')
  //Flexrr.RenderSeasonsComponent(Flexrr.data)

}

Flexrr.Init()