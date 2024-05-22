console.log('lets write Javascript now..');
let currentSong = new Audio();
let songs;
let currVol = 0.4;
let currFolder;

function sceToMins(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formatedMins = String(mins).padStart(2, '0');
    const formatedSecs = String(secs).padStart(2, '0');

    return `${formatedMins}:${formatedSecs}`;

}

async function getSongs(folder) {
    let a = await fetch(`http://127.0.0.1:3000/exercises/Spotify-clone/songs/${folder}/`);
    currFolder = folder;
    let response = await a.text();
    // console.log(response);
    let div = document.createElement('div');
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    // console.log('here');
    // console.log(as);
    songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith('.mp3')) {
            songs.push(element.href.split(`/songs/${folder}/`)[1]);
        }
    }

    let songUl = document.querySelector('.songList').getElementsByTagName('ul')[0];
    //create li elements and add them to the ul
    songUl.innerHTML = ""

    for (const song of songs) {
        // songUl.innerHTML = songUl.innerHTML + `<li>${song.replaceAll('%20', ' ')}</li>`;
        songUl.innerHTML = songUl.innerHTML + `
        <li>
                            <img src="music.svg" alt="Music Icon">
                            <div class="info">
                                <div>${song.replaceAll('%20', ' ')}</div>
                                <div>Artist Name</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img src="play.svg" alt="Play Button">
                            </div> </li>`;
    }

    // var audio = new Audio(songs[10]);
    // audio.play();

    Array.from(document.querySelector('.songList').getElementsByTagName('li')).forEach(e => {
        e.addEventListener('click', element => {
            play.src = 'pause.svg';
            console.log(e.querySelector('.info').firstElementChild.innerHTML)
            playMusic(e.querySelector('.info').firstElementChild.innerHTML.trim())
            // e.querySelector('.playnow').getElementsByTagName('img')[0].src = 'pause.svg';
        })
    })

    // return songs;
}

function playMusic(tarck, pause = false) {
    // var audio = new Audio('/exercises/Spotify-clone/songs/' + tarck);
    currentSong.src = `/exercises/Spotify-clone/songs/${currFolder}/` + tarck;
    if (!pause) {
        currentSong.play();
        play.src = 'pause.svg';
    }

    document.querySelector(".songInfo").innerHTML = decodeURI(tarck);
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00"
}

async function displayAlbums(){
    let a = await fetch(`http://127.0.0.1:3000/exercises/Spotify-clone/songs/`);
    let response = await a.text();
    // console.log(response);
    let div = document.createElement('div');
    div.innerHTML = response;
    let anchors = div.getElementsByTagName('a');

    let array = Array.from(anchors)
    for(let index = 0; index < array.length; index++) {
        const e = array[index]
        if (e.href.includes("/songs")) {
            let folder = e.href.split('/').slice(-2)[0]

            // Get metaData for each album
            let a = await fetch(`http://127.0.0.1:3000/exercises/Spotify-clone/songs/${folder}/info.json`)
            let response = await a.json();
            console.log(response)
            
            document.querySelector(".cardContainer").innerHTML += `<div data-folder="${folder}"  class="card">
            <div class="play op">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 4 26 24" width="24" height="24"
                    color="black" style="width: 70%; height: 70%;">
                    <path
                        d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                        stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                </svg>
            </div>
            <img src="/exercises/Spotify-clone/songs/${folder}/cover.png" alt="Animal">
            <h4>${response.title}</h4>
            <p>${response.description}</p>
        </div>`
        }
    }

    // adding albums
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log(item.currentTarget, item.currentTarget.dataset)
            songs = await getSongs(`${item.currentTarget.dataset.folder}`);
        })
    })

}
async function main() {
    await getSongs("cs");
    // console.log(songs);
    playMusic(songs[0], true)

    // Display Albums
    displayAlbums()

    play.addEventListener('click', () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = 'pause.svg';
        } else {
            currentSong.pause();
            play.src = 'play.svg';
        }
    })

    // Listner for time duration
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songTime").innerHTML = `${sceToMins(currentSong.currentTime)} / ${sceToMins(currentSong.duration)}`
        document.querySelector(".circle").style.left = ((currentSong.currentTime) / (currentSong.duration)) * 100 + "%";
    })

    // Listner for seekar circle movement
    document.querySelector(".seekbar").addEventListener("click", e => {
        let currentPercent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = currentPercent + "%";
        currentSong.currentTime = (currentSong.duration * currentPercent) / 100;
    })

    // Listeners for hamburger icon

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0%";
        document.querySelector(".left").style.transition = "all 0.5s ease";
    })

    document.querySelector(".hamBurgerOn").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-110%";
        document.querySelector(".left").style.transition = "all 0.5s ease";
    })

    
    // adding event listner for previous and next button

    previous.addEventListener("click", () => {
        console.log('hello')
        let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0]);
        if (index <= 0){
            index = songs.length - 1;
        }
        playMusic(songs[index - 1]);
    })

    next.addEventListener("click", () => {
        console.log("hello2");
        let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0]);
        if (songs.length <= index + 1){
            index = -1;
        }
        playMusic(songs[index + 1]);
    })

    // adding evenListner for volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        mute.src = "volume.svg";
        currentSong.volume = parseInt(e.target.value) / 100;
        currVol = currentSong.volume
    })

    document.querySelector(".volume").getElementsByTagName("img")[0].addEventListener("click", () => {
        if (currentSong.volume == 0){
            currentSong.volume = currVol;
            mute.src = "volume.svg";
        } else {
            currentSong.volume = 0;
            mute.src = "mute.svg";   
        }
    })

}

main();