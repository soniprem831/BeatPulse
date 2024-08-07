//initialize the variables
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));


let songs=[
    {songName:"Legio",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Trap",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"They Mad",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Plug Walk",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Artist Name",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"Safety dance",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"Back it up",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
    {songName:"Baby Baby",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},
    {songName:"Shami nameya",filePath:"songs/9.mp3",coverPath:"covers/9.jpg"},
    {songName:"Let me love you",filePath:"songs/10.mp3",coverPath:"covers/10.jpg"}
]


songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML=songs[i].songName;
})

//Handle play/pause Click

// Update the play/pause state of all song items
const updateSongItemIcons = () => {
    songItems.forEach((item, i) => {
        let icon = item.getElementsByClassName('songItemPlay')[0];
        if (i === songIndex && !audioElement.paused) {
            icon.classList.remove('fa-circle-play');
            icon.classList.add('fa-circle-pause');
        } else {
            icon.classList.remove('fa-circle-pause');
            icon.classList.add('fa-circle-play');
        }
    });
}

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
    updateSongItemIcons();
})

//Listen to events
//song update hoga toh bar move karega
audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})
//bar update hoga toh song time bharega
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

// joh phle bjha tha woh pause ho gya
const makeAllPlays=()=>{
    songItems.forEach((element)=>{
        element.getElementsByClassName('songItemPlay')[0].classList.remove('fa-circle-pause');
        element.getElementsByClassName('songItemPlay')[0].classList.add('fa-circle-play');
    })
}


songItems.forEach((item) => {
    item.getElementsByClassName('songItemPlay')[0].addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);

        if (songIndex === clickedIndex && !audioElement.paused) {
            // Pause the current song if it's the same song
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
        } else {
            // Stop the currently playing song and play the new one
            makeAllPlays();
            songIndex = clickedIndex;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');

            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();

            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            updateSongItemIcons();
        }
    });
});

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex + 1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
   
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity=1;
    updateSongItemIcons();
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= songs.length - 1){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex + 1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
   
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity=1;
    updateSongItemIcons();
})