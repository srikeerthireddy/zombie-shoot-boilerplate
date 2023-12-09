// Iteration 1: Declare variables required for this game
const gameBody= document.getElementById("game-body");
let seconds=document.getElementById("timer").textContent;

let img=[
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png",
];

// Iteration 1.2: Add shotgun sound
const gunSound=new Audio("./assets/shotgun.wav");

gameBody.onclick = () =>{
    gunSound.pause();
    gunSound.volume=0.1;
    gunSound.currentTime=0;
    gunSound.play();
}
// Iteration 1.3: Add background sound
const backgroundSound= new Audio("./assets/bgm.mp3");
backgroundSound.play();
// Iteration 1.4: Add lives
let lives =4;
let zombieId=0;
// Iteration 2: Write a function to make a zombie
function makeZombie(){
    let randomZombie = img[getRandomInt(0,img.length)];
  
  gameBody.innerHTML += `<img src="./assets/${randomZombie}"
  class="zombie-image" id="zombie${zombieId}"/>`;
  
  
  let zombie = document.getElementById("zombie"+ zombieId);
  zombie.style.transform =`translateX(${getRandomInt(10,90)}vw)`;
  zombie.style.animationDuration = `${getRandomInt(4,7)}s`;
  
  zombie.onclick = () =>{
  killedZombie(zombie);
  }
  
  };
// Iteration 3: Write a function to check if the player missed a zombie
function checkIfZombiePassed(zombie){
    if(zombie.getBoundingClientRect().top<=0){
        lives--;
        return true;
    }
  return false;
}
// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function killedZombie(zombie){
    zombie.style.display="none";
    zombieId++;
    makeZombie();
}
// Iteration 5: Creating timer
function countDown(){
    seconds--;
    document.getElementById("timer").innerText=seconds;

    let zombie=document.getElementById("zombie"+zombieId);

    if(checkIfZombiePassed(zombie)==true){
        if(lives==0){
            clearInterval(timer);
            location.href="./game-over.html";
        }
    }
    if(seconds==0){
        clearInterval(timer);
        location.href="./win.html";
    }
}
let timer=setInterval(countDown,1000)


// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie();
// Iteration 7: Write the helper function to get random integer
function getRandomInt(min,max){
    min=Math.ceil(min);
    max=Math.floor(max);

    let randomNumber=Math.floor(Math.random()*(max-min))+min;

    return randomNumber;
}