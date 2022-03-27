// Let's Select All required elements
const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist");
mainAudio = wrapper.querySelector("#main-audio"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMusicBtn = musicList.querySelector("#close");



let musicIndex = 2;

window.addEventListener("load", () => {
    loadMusic(musicIndex); //calling loadMusic function
});

//load music function
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb-1].name;
    musicArtist.innerText = allMusic[indexNumb-1].artist;
    musicImg.src = `./assets/images/${allMusic[indexNumb-1].img}.jpg`;
    mainAudio.src = `./assets/Audio/${allMusic[indexNumb-1].src}.mp3`;
}
//play btn
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}
//pause btn
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";

    mainAudio.pause();
}
// next btn
function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}



// Play and Pause function
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
});
//next event
nextBtn.addEventListener("click", () => {
    nextMusic();
});
// prev event
prevBtn.addEventListener("click", () => {
    prevMusic();
});

// progress bar update 
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");

        mainAudio.addEventListener("loadeddata", () => {
        
            // update song total duration
            let audioDuration = mainAudio.duration;
            let totalMin = Math.floor(audioDuration / 60);
            let totalSec = Math.floor(audioDuration % 60);
            if(totalSec < 10){
                totalSec = "0" + totalSec;
            }
            musicDuration.innerText = `${totalMin}:${totalSec}`;

            // update current time playing song
             // update song total duration
        });
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if(currentSec < 10){
            currentSec = "0" + currentSec;
        }
        musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// let's create a function to update the progress bar
progressArea.addEventListener("click", (e) => {
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
});

// let's work on repeat button

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;

    switch(getText){
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped")
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffled")
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped")
            break;
    }    
});

// after song ends
mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randomIndex = Math.floor((Math.random() * allMusic.length)+1);
            do{
                randomIndex = Math.floor((Math.random() * allMusic.length)+1);
            }while(musicIndex == randomIndex);
            musicIndex = randomIndex;
            loadMusic(musicIndex);
            playMusic();
            break;
    }
});


showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", () => {
    showMoreBtn.click();
});
// let's create li according to the music list
const ulTag = wrapper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li>
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class="${allMusic[i].src}" src="./assets/Audio/${allMusic[i].src}.mp3"></audio>
                    <span id="${allMusic[i].src}" class="audio-duration">2:48</span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);
    
    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){
            totalSec = "0" + totalSec;
        }
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
    });
}

// let's work on play particular song on click
const allLiTag = ulTag.querySelectorAll("li");
for(let j = 0; j < allLiTag.length; j++){
    
    allLiTag[j].setAttribute("onclick", `loadMusic(${j+1})`);

    allLiTag[j].addEventListener("click", () => {
        loadMusic(j+1);
        playMusic();
    });
}