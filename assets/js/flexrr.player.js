(function (mouseStopDelay) {
    var timeout;
    document.addEventListener('mousemove', function (e) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            var event = new CustomEvent("mousestop", {
                detail: {
                    clientX: e.clientX,
                    clientY: e.clientY
                },
                bubbles: true,
                cancelable: true
            });
            e.target.dispatchEvent(event);
        }, mouseStopDelay);
    });
}(1000));

window.$ = (e) => document.querySelector(e)
window.oncontextmenu = () => false

Flexrr = {}

Flexrr.Player = {
  videoEl: $('#player'),
  controlsEl: $('.controls')
}

Flexrr.Player.PlayControl = function(btn){
  const video = document.getElementById('player')
  const controls = Flexrr.Player.controlsEl
  if(video.paused){
    video.play()
    btn.src = 'pause-icon.png'
    Flexrr.Player.onHide(controls)
    Flexrr.Player.timeoutShowInfo(false)
  }else{
    video.pause()
    btn.src = 'play-icon.png'
    setTimeout(()=>Flexrr.Player.timeoutShowInfo(true), 5000)
  }
}

Flexrr.Player.timeoutShowInfo = function(enabled){
  const el = $('.show-info')
  if(enabled){
    el.style.display = 'block'
    el.style.animation = 'FadeIn 1s ease-in-out'
  }else{
    el.style.animation = 'FadeOut .1s ease-in-out'
    el.style.display = 'none'
  }
}

Flexrr.Player.HideControls = function(){
  const player = Flexrr.Player.videoEl,
  controls = Flexrr.Player.controlsEl,
  hideControls = setTimeout(Flexrr.Player.onHide(controls), 3000),
  body = $('body')
  
  body.addEventListener('mousemove', () => Flexrr.Player.onShow(controls))
  body.addEventListener('mousestop', function(){
    if(player.paused){
      return false
    }else{
      Flexrr.Player.onHide(controls)
    }
  })
}

Flexrr.Player.ProgressControl = function(){
  const player = Flexrr.Player.videoEl
  player.addEventListener('timeupdate', function(){
    Flexrr.Player.BufferControl()
    let currentPos = player.currentTime,
    currentSecond = Math.floor(currentPos),
		currentMinute = Math.floor(currentSecond / 60),
		currentSeconds = currentSecond - ( currentMinute * 60 ),
		currentSecondss = ( String(currentSecond).length > 1 ) ? currentSecond : ( String("0") + currentSecond ),
    duration = player.duration,
    minutes = Math.floor(duration / 60),
    seconds = Math.floor(duration - (minutes * 60)),
    progressPerc = 100 * currentPos / duration
    
    $('.bar').style.width = progressPerc+'%'
    $('.current-time').innerHTML = `${currentMinute}:${currentSecondss}`
    $('.duration-time').innerHTML = `${minutes}:${seconds}`
  })
}

Flexrr.Player.BufferControl = function(){
  const player = Flexrr.Player.videoEl,
  duration = player.duration,
  bufferedEnd = player.buffered.end(player.buffered.length - 1),
  bufferPerc = bufferedEnd / duration * 100
  
  player.addEventListener('progress', function(){
    if(duration > 0){
      $('.buffered').style.width = bufferPerc+'%'
    }
  })
}

Flexrr.Player.onHide = function(controls){
  setTimeout(function(){
    //controls.style.animation = 'FadeOut 1s ease-in-out'
    //setTimeout(() => controls.style.display = 'none', 1000)
  }, 3000)
} 

Flexrr.Player.onShow = function(controls){
    controls.style.animation = 'FadeIn 0.1s ease-in-out'
    controls.style.display = 'flex'
  }

Flexrr.Player.FullScreenControl = function(btn){
		if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement)
		{
			if (document.documentElement.requestFullscreen)
			{
				document.documentElement.requestFullscreen();
				Flexrr.Player.onFullScreen(btn);
			}
			else if (document.documentElement.msRequestFullscreen)
			{
				document.documentElement.msRequestFullscreen();
				Flexrr.Player.onFullScreen(btn);
			}
			else if (document.documentElement.mozRequestFullScreen)
			{
				document.documentElement.mozRequestFullScreen();
				Flexrr.Player.onFullScreen(btn);
			}
			else if (document.documentElement.webkitRequestFullscreen)
			{
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				Flexrr.Player.onFullScreen(btn);
			}
		}
		else
		{
			if (document.exitFullscreen)
			{
				document.exitFullscreen();
				Flexrr.Player.exitFullScreen(btn);
			}
			else if(document.msExitFullscreen)
			{
				document.msExitFullscreen(btn);
				Flexrr.Player.exitFullScreen();
			}
			else if (document.mozCancelFullScreen)
			{
				document.mozCancelFullScreen();
				Flexrr.Player.exitFullScreen(btn);
			}
			else if (document.webkitExitFullscreen)
			{
				document.webkitExitFullscreen();
				Flexrr.Player.exitFullScreen(btn);
			}
		}
	}

Flexrr.Player.onFullScreen = function(btn){
  console.info('FullScreen enabled')
  btn.src = 'http://lab.pntx.ml/i/minimize-icon.svg'
}

Flexrr.Player.exitFullScreen = function(btn){
  console.info('FullScreen disabled')
  btn.src = 'http://lab.pntx.ml/i/fullscreen-icon.svg'
}

Flexrr.Player.SpaceKeyControl = function(){
  const video = Flexrr.Player.videoEl,
  controls = Flexrr.Player.controlsEl,
  btn = $('.play-pause-btn')
  document.body.addEventListener('keydown', function(e){
    if (e.keyCode == 0 || e.keyCode == 32) {
      if(video.paused){
        video.play()
        btn.src = 'pause-icon.png'
        Flexrr.Player.onHide(controls)
        Flexrr.Player.timeoutShowInfo(false)
      }else{
        video.pause()
        btn.src = 'play-icon.png'
        Flexrr.Player.onShow(controls)
        setTimeout(()=>Flexrr.Player.timeoutShowInfo(true), 5000) 
      }
    }
  })
}

Flexrr.Player.DragCurrentTime = function(){
  const bar = document.getElementById('progress'),
  video = Flexrr.Player.videoEl,
  duration = video.duration,
  width = bar.offsetWidth
  
  bar.addEventListener('click', function(e){
    const x = Math.floor(e.clientX - bar.offsetLeft)
    console.log((duration / width) * x)
    video.currentTime = duration * (x / width)
  })
}

//Flexrr.Player.DragCurrentTime()
//Flexrr.Player.SpaceKeyControl()
//Flexrr.Player.ProgressControl()
//Flexrr.Player.HideControls()