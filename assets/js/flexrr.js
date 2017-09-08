const App = {
  data: [
    {
      id: 1,
      name: 'Season 1',
      desc: 'Set 97 years after a nuclear war has destroyed civilization, when a spaceship housing humanity\'s lone survivors sends 100 juvenile delinquents back to Earth in hopes of possibly re-populating the planet.',
      epCount: '13',
      release: '2014',
      coverUrl: 'https://image.tmdb.org/t/p/w130_and_h195_bestv2/jAsSkxSGEjeEEHL3KiWXr3NwyPG.jpg'
    },
    {
      id: 2,
      name: 'Season 2',
      desc: 'The second season picks up with the group still scattered and desperate to be reunited. As members of The 100 and new arrivals from the Ark stake out their place in a dangerous and beautiful new world, they are confronted with the physical peril and moral dilemmas that come with reforging a society.',
      epCount: '16',
      release: '2014',
      coverUrl: 'https://image.tmdb.org/t/p/w130_and_h195_bestv2/4ngujsHppz4Imxh7qf9NQIIMlLY.jpg'
    },
    {
      id: 3,
      name: 'Season 3',
      desc: 'Reunited with the survivors of the space-station Ark that fell to Earth, Clarke Griffin and her band of juvenile delinquents have faced death at every turn. Though Clarke was alternately challenged, supported and betrayed by her own people and alliances with the Grounders, they could always find common ground in survival. But victory came with a terrible price. The challenges continue in season three as they not only determine what kind of lives they will build, but what it will ultimately cost them.',
      epCount: '16',
      release: '2016',
      coverUrl: 'https://image.tmdb.org/t/p/w130_and_h195_bestv2/ayebqASxTXVSo9Qoug6M5YowZS0.jpg'
    },
    {
      id: 4,
      name: 'Season 4',
      desc: 'The fight to survive has torn The 100 apart, turned them against each other, and taken the lives of their closest friends. Last season, our heroes found themselves at the epicenter of both the Grounder world and the struggle for Arkadia’s soul. Despite their best efforts, war appeared unavoidable, until a new, even more dangerous threat – one that had been quietly rising all along – exploded to the surface: ALIE, the A.I. that ended the world, offered relief from pain and eternal life in the “City of Light.” But as her ranks grew, it quickly became clear that she was building an army dedicated to controlling all sentient life on Earth. This was no longer a battle between warring factions; it was a fight for humanity itself. Now, a hard truth lands on the shoulders of those who remain. Will they go quietly into the night, or will they find hope and faith in each other, as they face their darkest chapter yet?',
      epCount: '13',
      release: '2017',
      coverUrl: 'https://image.tmdb.org/t/p/w130_and_h195_bestv2/qCdJvikZUQkr4sOVYNkKHntRfha.jpg'
    }
  ]
}

App.SeasonsComponent = function(data){
  return data.map(season => 
    `
    <div class="col-xs-12 season-box">
	    <div class="cover" style="background-image:url(${season.coverUrl})"></div>
	    <div class="info">
	      <h2>${season.name}</h2>
	      <p>${season.release} | ${season.epCount} episodes</p>
	    </div>
	</div>
     `).join('');
}

App.RenderSeasonsComponent = function(data){
  const seasonBox = document.querySelector('.row')
  
  try {
    seasonBox.innerHTML = App.SeasonsComponent(data)
  }catch(e){
    seasonBox.innerHTML = ``
  }
}

App.Init = function() {
  App.RenderSeasonsComponent(App.data)
}

App.Init()