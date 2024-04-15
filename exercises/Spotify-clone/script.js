console.log('lets write Javascript now..');

async function getSongs() {
    let a = await fetch('http://127.0.0.1:3000/exercises/Spotify-clone/songs/');
    let response = await a.text();
    console.log(response);
    let div = document.createElement('div');
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    console.log('here');
    console.log(as);
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith('.mp3')) {
            songs.push(element.href.split('/songs/')[1]);
        }
    }
    return songs;
}

async function main() {
    let songs = await getSongs();
    console.log(songs);

    let songUl = document.querySelector('.songlist').getElementsByTagName('ul')[0];
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
                            </div>
                            
                        </li>`;
    }

    var audio = new Audio(songs[10]);
    audio.play();
}

main();