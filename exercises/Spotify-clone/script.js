console.log('lets write Javascript now..');
let currentSong = new Audio();
let songs;

function sceToMins(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formatedMins = String(mins).padStart(2, '0');
    const formatedSecs = String(secs).padStart(2, '0');

    return `${formatedMins}:${formatedSecs}`;

}

async function getSongs() {
    let a = await fetch('http://127.0.0.1:3000/exercises/Spotify-clone/songs/');
    let response = await a.text();
    // console.log(response);
    let div = document.createElement('div');
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    // console.log('here');
    // console.log(as);
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith('.mp3')) {
            songs.push(element.href.split('/songs/')[1]);
        }
    }
    return songs;
}

function playMusic(tarck, pause = false) {
    // var audio = new Audio('/exercises/Spotify-clone/songs/' + tarck);
    currentSong.src = '/exercises/Spotify-clone/songs/' + tarck;
    if (!pause) {
        currentSong.play();
        play.src = 'pause.svg';
    }

    document.querySelector(".songInfo").innerHTML = decodeURI(tarck);
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00"
}

// const playMusic = (tarck) => {
//     let audio = new Audio("/exercises/Spotify-clone/songs/" + tarck);
//     audio.play();
// }

async function main() {

    songs = await getSongs();
    // console.log(songs);
    playMusic(songs[0], true)

    let songUl = document.querySelector('.songList').getElementsByTagName('ul')[0];
    //create li elements and add them to the ul

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
}

main();