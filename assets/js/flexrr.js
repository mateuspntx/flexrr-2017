window.$ = function(e){
  return document.querySelector(e)
}

const Flexrr = {}

Flexrr.SmoothScroll = function(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
         window.requestAnimationFrame(Flexrr.SmoothScroll);
         window.scrollTo (0,currentScroll - (currentScroll/5));
    }
}

Flexrr.RenderHeaderComponent = function(showId, element){
  
  element = $(element)

  try {

    tmdb.call(`/tv/${showId}`, {},
    function(showData){

    Flexrr.SetBackgroundImage(`${tmdb.images_uri}/w1000${showData.backdrop_path}`)
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
      <div class="row">${Flexrr.SeasonsListComponent(showId, showData)}</div>
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

Flexrr.SeasonsListComponent = function(showId, data){

  return data.seasons.map(season =>
    `<div class="col-xs-12 season-box" onclick="Flexrr.RenderSeasonEpsComponent(${showId}, '${data.name}', ${season.season_number}, '.app')">
	    <div class="cover" style="background-image:url(${tmdb.images_uri}/w300${season.poster_path})"></div>
	    <div class="info">
	      <h2>Season ${season.season_number}</h2>
	      <p>${moment(season.air_date).format('YYYY')} | ${season.episode_count} episodes</p>
	    </div>
	   </div>`).join('')

}

Flexrr.SeasonEpsComponent = function(data){

  return data.episodes.map(episode =>
      `<div class="col-xs episode-box">
          <div class="cover" style="background-image:url(${tmdb.images_uri}/w227_and_h127_bestv2${episode.still_path})"></div>
          <div class="info">
            <h2><span class="ep-number">${episode.episode_number}</span> ${episode.name}</h2>
            <p>${episode.overview}</p>
          </div>
        </div>`).join('')

}

Flexrr.RenderSeasonEpsComponent = function(showId, showName, season, element, singlePage){

  element = $(element)

  try {

    if(singlePage == 'sp'){

    tmdb.call(`/tv/${showId}`, {}, 
      function(showInfo){

        const showName = showInfo.name

        tmdb.call(`/tv/${showId}/season/${season}`, {}, 
        function(showData){

          Flexrr.SmoothScroll()

          Flexrr.SetBackgroundImage(`${tmdb.images_uri}/w1000${showData.poster_path}`)

          element.innerHTML = `
          <section class="season-eps">
            <div class="show-info">
              <img src="https://flexrr.ml/assets/images/left-arrow.svg" onclick="Flexrr.RenderHeaderComponent(${showId}, '.app')" alt="Back" title="Back" class="back-btn">
              <h1>Season ${season} <span class="show-name">${showName}</span> </h1>
            </div>
            <div class="row ep-container">${Flexrr.SeasonEpsComponent(showData)}</div>
          </section>`

        }, 
        function(e){
          console.error(e)
          element.innerHTML = `
          <header class="header">
            <h1>Something went wrong. Try refresh the page.</h1>
          </header>`
        })

      }, 
      function(e){
          console.error(e)
          element.innerHTML = `
          <header class="header">
            <h1>Something went wrong. Try refresh the page.</h1>
          </header>`
      })

    }else{

    tmdb.call(`/tv/${showId}/season/${season}`, {}, 
      function(showData){

        Flexrr.SmoothScroll()

        Flexrr.SetBackgroundImage(`${tmdb.images_uri}/w1000${showData.poster_path}`)

        element.innerHTML = `
        <section class="season-eps">
          <div class="show-info">
            <img src="https://flexrr.ml/assets/images/left-arrow.svg" onclick="Flexrr.RenderHeaderComponent(${showId}, '.app')" alt="Back" title="Back" class="back-btn">
            <h1>Season ${season} <span class="show-name">${showName}</span> </h1>
          </div>
          <div class="row ep-container">${Flexrr.SeasonEpsComponent(showData)}</div>
        </section>`

      }, 
      function(e){
        console.error(e)
        element.innerHTML = `
        <header class="header">
          <h1>Something went wrong. Try refresh the page.</h1>
        </header>`
      })
    }
  }catch(e){
    console.error(e)
    element.innerHTML = `
      <header class="header">
        <h1>Something went wrong. Try refresh the page.</h1>
      </header>`
  }

}


Flexrr.SetBackgroundImage = function(image_uri){
  var sheet = document.createElement('style');
  sheet.innerHTML = `
  body:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%; 
    height: 100%;  
    opacity: .4; 
    z-index: -1;
    filter: blur(20px);
    background: url(${image_uri});
    background-position: center;
    background-size: cover;
    animation: FadeIn ease-in-out 1s;
  }`
  document.head.appendChild(sheet);
}


Flexrr.Init = function(showId, showSeason) {

  if(showId == ''){
    const app = $('.app')
    app.innerHTML = `
    <header class="header"><h1>Ops... This TV Show does not exist.</h1></header>`
    return false
  }

  const location = document.location.pathname

    if(location.includes('episode')){
        document.write('play episode here')
    }else if(location.includes('season')){
        Flexrr.RenderSeasonEpsComponent(showId, 0, showSeason, '.app', 'sp')
    }else{
        Flexrr.RenderHeaderComponent(showId, '.app')
    }

}