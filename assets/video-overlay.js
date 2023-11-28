const bgVideoID = document.querySelector('.js-background-video').getAttribute('data-video');

const playerOptions = {
  autoplay: 1,
  mute: 1,
  autohide: 1,
  modestbranading: 1,
  rel: 0,
  showinfo: 0,
  constrols: 0,
  disablekb: 1,
  enablejsapi: 0,
  iv_load_policy: 3,
  // for looping video set 'loop' to 1
  // And 'playlist' value equal to your currently playing video
  loop: 1,
  playlist: bgVideoID,
};

const videoOverlay = document.querySelector('js-video-overlay');

let ytPlayer;

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('yt-player', {
    width: '1288',
    height: '728',
    videoId: bgVideoID,
    playerVars: playerOptions,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();

  const videoDuration = event.target.getDuration();

  setInterval(function () {
    const videoCurrentTime = event.target.getCurrentTime();
    const timeDifference = videoDuration - videoCurrentTime;

    if (2 > timeDifference > 0) {
      event.target.seekTo(0);
    }
  }, 1000);
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    videoOverlay.classList.add('video-overlay-fadeOut');
  }
}
