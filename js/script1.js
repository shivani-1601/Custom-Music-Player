// Array Containing All Songs
let allMusic = [
    {
      name: "Happy at - Home",   
      artist: "Lady Gaga",
      img: "music-1",
      src: "music-1"
    },
    {
      name: "Freedom Inspired – Cinematic",
      artist: "Justin Bieber",
      img: "music-2",
      src: "music-2"
    },
    {
      name: "Beauz & Jvna - Crazy",
      artist: "Beauz & Jvna",
      img: "music-3",
      src: "music-3"
    },
    {
      name: "Tederness - Vision NCS",
      artist: "NCS Release",
      img: "music-7",
      src: "music-7"
    },
    {
      name: "Creative Minds",
      artist: "Ed sheeran",
      img: "music-4",
      src: "music-4"
    },
    {
      name: " Tomorrow ",
      artist: "Annie",
      img: "music-5",
      src: "music-5"
    },
    {
      name: "Going Higher - Vision NCS",
      artist: "NCS Release",
      img: "music-6",
      src: "music-6"
    },
    {
      name: "Memories Faded-Jon",
      artist: "Audio Library",
      img: "music-8",
      src: "music-8"
    },
    {
      name: "Going Good",
      artist: "Katy Perry",
      img: "music-9",
      src: "music-9"
    }
  ];

// Selecting HTML elements and assigning them to a const variable
const container = document.querySelector(".container"),
Audio = container.querySelector("#main-audio"),

volSlider = document.querySelector('.slider'),
musicImg = container.querySelector(".img-area img"),

musicName = container.querySelector(".music-info .name"),
musicArtist = container.querySelector(".music-info .artist"),

playPauseBtn = container.querySelector(".play-pause"),
prevBtn = container.querySelector("#prev"),
nextBtn = container.querySelector("#next"),
repeatBtn =container.querySelector("#repeat-plist");

progressArea = container.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),

musicList = container.querySelector(".music-list"),
moreMusicBtn = container.querySelector("#more-music"),
closeBtn = musicList.querySelector("#cross");
const ulTag = container.querySelector("ul");

// Globally used values
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);//genereting random index/numb with max range of array length
isMusicPaused = true;

// when webpage will load fully
window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
   playingMusic(); 
});

// load Music Function
function loadMusic(index){
  musicName.textContent= allMusic[index - 1].name;
  musicArtist.textContent = allMusic[index - 1].artist;
  musicImg.src = `images/${allMusic[index - 1].img}.jpg`;
  Audio.src = `songs/${allMusic[index - 1].src}.mp3`;
}

// volume slider
volSlider.addEventListener('input',function(){
  Audio.volume=volSlider.value / 100;
  },false);

//play music function
function playMusic(){
  isMusicPaused=false;
  container.classList.add("paused");
  musicImg.classList.add('image-animation');
  playPauseBtn.querySelector("i").innerText = "pause";
  Audio.play();
}

//pause music function
function pauseMusic(){
  isMusicPaused=true;
  container.classList.remove("paused");
  musicImg.classList.remove('image-animation');
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  Audio.pause();
}

// play or pause button event
playPauseBtn.addEventListener("click", ()=>{
  //if isMusicPaused is true then call playMusic else call pauseMusic
  if( isMusicPaused)
  {
    playMusic();
  }
  else
  {
    pauseMusic();
  }
  playingMusic();
});

//prev music function
function prevMusic(){
  musicIndex--; //decrement of musicIndex by 1
  //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingMusic(); 
}

//next music function
function nextMusic(){
  musicIndex++; //increment of musicIndex by 1
  //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingMusic(); 
}

//prev music button click event
prevBtn.addEventListener("click", ()=>{
  prevMusic();
});

//next music button click event
nextBtn.addEventListener("click", ()=>{
  nextMusic();
});

 // update progress bar width according to music current time
Audio.addEventListener("timeupdate", (e)=>{
  const currTime = e.target.currentTime; //getting playing song current Time
  const duration = e.target.duration; //getting playing song total Time
  let progressWidth = (currTime / duration) * 100; //current width of progess bar
   progressBar.style.width = `${progressWidth}%`;
   let musicCurrentTime = container.querySelector(".curr-time"),
   musicDuartion = container.querySelector(".total-time");
  Audio.addEventListener("loadeddata", ()=>{
    // update song total duration
    let mainAdDuration = Audio.duration;//seconds
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song current time
  let currentMin = Math.floor(currTime / 60);
  let currentSec = Math.floor(currTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing song currentTime on click according to the progress bar width
 progressArea.addEventListener("click", (e)=>{
  const progressWidth = progressArea.clientWidth; //getting total width of progress bar
  console.log(progressWidth);
  let clickedOffsetX = e.offsetX; //getting offset x value ,The x-coordinate, relative to the left edge of the progess bar
  console.log(clickedOffsetX);
  let songDuration = Audio.duration; //getting song total duration
    Audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
   playMusic(); //calling playMusic function
    playingMusic();
 });

//change loop,repeat, shuffle icon on click
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

// After song ended
Audio.addEventListener("ended", ()=>{
  //it  will according to the icon means if user has set icon to loop song then we'll repeat the current song and will do accordingly
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat"://playlist looped
      nextMusic(); //calling nextMusic function
      break;
    case "repeat_one":
      loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusic(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      musicIndex = randIndex; //passing randomIndex to musicIndex
      loadMusic(musicIndex);
      playMusic();
      playingMusic();
      break;
  }
});

//show music list onclick of music icon
moreMusicBtn.addEventListener("click", ()=>{
  musicList.classList.toggle("show");
});

//close Music list onclick of cross icon
closeBtn.addEventListener("click", ()=>{
  moreMusicBtn.click();
});

//creating  li tags according to array length 
 for (let i = 0; i < allMusic.length; i++) {
  //passing the song name, artist from the array
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag
  let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
  });
}

//play particular song from the list onclick of li tag
function playingMusic(){
  const allLiTag = ulTag.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }
    //if the li tag index is equal to the musicIndex then add playing class in it
    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }
    // adding onclick attribute in all li tags
    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

//particular li clicked function
function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //updating current song index with clicked li index
  loadMusic(musicIndex);
  playMusic();
  playingMusic();
}
