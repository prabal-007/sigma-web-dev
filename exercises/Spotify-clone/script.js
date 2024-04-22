console.log('lets write Javascript now..');
let currentSong = new Audio();

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

function playMusic(tarck) {
    // var audio = new Audio('/exercises/Spotify-clone/songs/' + tarck);
    currentSong.src = '/exercises/Spotify-clone/songs/' + tarck;
    currentSong.play();
}

// const playMusic = (tarck) => {
//     let audio = new Audio("/exercises/Spotify-clone/songs/" + tarck);
//     audio.play();
// }

async function main() {
    
    let songs = await getSongs();
    // console.log(songs);

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

    Array.from(document.querySelector('.songList').getElementsByTagName('li')).forEach(e=>{
        e.addEventListener('click', element=>{
            play.src = 'pause.svg';
            console.log(e.querySelector('.info').firstElementChild.innerHTML)
            playMusic(e.querySelector('.info').firstElementChild.innerHTML.trim())
            // e.querySelector('.playnow').getElementsByTagName('img')[0].src = 'pause.svg';
        })
    })

    play.addEventListener('click', ()=> {
        if (currentSong.paused){
            currentSong.play();
            play.src='pause.svg';
        } else {
            currentSong.pause();
            play.src = 'play.svg';
        }
    })


}

main();