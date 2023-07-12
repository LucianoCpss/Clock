let clock = document.querySelector(".clock");
let screen = document.querySelector(".screen");
screen.style.width = `${screen.children.length*90}vw`;

let options = document.querySelector(".options");
let screenMode;

let timerOptions = document.querySelector(".timerOptions");
let timerActive = false;
let timeHours = document.querySelector(".time .hours");
let timeMinutes = document.querySelector(".time .minutes");
let timeSeconds = document.querySelector(".time .seconds");
let timeState = true;

let chronoOptions = document.querySelector(".chronoOptions");
let chronoActive = false;
let chronoHours = document.querySelector(".chrono .hours");
let chronoMinutes = document.querySelector(".chrono .minutes");
let chronoSeconds = document.querySelector(".chrono .seconds");
let chronoMilliseconds = document.querySelector(".chrono .milliseconds");
let chronoStart = "";
let chronoState = false;
let chronoDelay = "";

let timerHours = document.querySelector(".timer .hours");
let timerMinutes = document.querySelector(".timer .minutes");
let timerSeconds = document.querySelector(".timer .seconds");
let timerMilliseconds = document.querySelector(".timer .milliseconds");
let timerState = false;
let timerDelay = "";
let timerInterval = "";

let leftArrow = document.getElementById("leftArrow");
let rightArrow = document.getElementById("rightArrow");
let modeTitle = document.querySelector(".modeTitle");
modeTitle.style.gridTemplateColumns = `repeat(${modeTitle.children.length},50vw)`;

let chronoStartButton = document.getElementById("chronoStartButton");
let chronoResetButton = document.getElementById("chronoResetButton")
let chronoPauseButton = document.getElementById("chronoPauseButton");

let timerStartButton = document.getElementById("timerStartButton");
let timerResetButton = document.getElementById("timerResetButton")
let timerPauseButton = document.getElementById("timerPauseButton");

let firstPlus =document.getElementById("firstPlus");
let secondPlus =document.getElementById("secondPlus");
let thirdPlus =document.getElementById("thirdPlus");
let fourthPlus =document.getElementById("fourthPlus");
let fifthPlus =document.getElementById("fifthPlus");
let sixthPlus =document.getElementById("sixthPlus");
let seventhPlus =document.getElementById("seventhPlus");
let eighthPlus =document.getElementById("eighthPlus");

let firstMinus =document.getElementById("firstMinus");
let secondMinus =document.getElementById("secondMinus");
let thirdMinus =document.getElementById("thirdMinus");
let fourthMinus =document.getElementById("fourthMinus");
let fifthMinus =document.getElementById("fifthMinus");
let sixthMinus =document.getElementById("sixthMinus");
let seventhMinus =document.getElementById("seventhMinus");
let eighthMinus =document.getElementById("eighthMinus");

let timerTextSelector = document.querySelector(".timerClock");
let timerText = timerTextSelector.innerHTML;
let timerPlace = timerText.length;

let timerArray = timerText.split("");

timerPlusMinus(firstPlus);
timerPlusMinus(secondPlus);
timerPlusMinus(thirdPlus);
timerPlusMinus(fourthPlus);
timerPlusMinus(fifthPlus);
timerPlusMinus(sixthPlus);
timerPlusMinus(seventhPlus);
timerPlusMinus(eighthPlus);

timerPlusMinus(firstMinus);
timerPlusMinus(secondMinus);
timerPlusMinus(thirdMinus);
timerPlusMinus(fourthMinus);
timerPlusMinus(fifthMinus);
timerPlusMinus(sixthMinus);
timerPlusMinus(seventhMinus);
timerPlusMinus(eighthMinus);

let titleMove = 0;
let screenMove = 0;
let milliCounter=0;
let secondsCounter=0;
let minutesCounter=0;
let hoursCounter=0;
let modesQuantity = modeTitle.children.length;

reloj();

let timeClock = setInterval(reloj,1000);


rightArrow.addEventListener("click",()=>{
	moveScreenToTheRight();
});

leftArrow.addEventListener("click",()=>{
	moveScreenToTheLeft();
});

chronoStartButton.addEventListener("click",()=>{
	clearTimeout(chronoStart);
	chronoStart = setInterval(chronometer,10);

	chronoPauseButton.addEventListener("click",()=>{
		clearTimeout(chronoStart);
	})

	chronoResetButton.addEventListener("click",()=>{
		milliCounter=0;
		chronoMilliseconds.innerHTML = "00";
		secondsCounter=0;
		chronoSeconds.innerHTML = "00";
		minutesCounter=0;
		chronoMinutes.innerHTML = "00";
		hoursCounter=0;
		chronoHours.innerHTML = "00";
	})
})

timerStartButton.addEventListener("click", ()=>{
	clearInterval(timerInterval);
	timerDisplay("none");
	timerInterval = setInterval(()=>{
		timerArray[10]=parseInt(timerArray[10])-1;
		if (timerArray[10]<0) {
			timerArray[9]=parseInt(timerArray[9])-1;
			timerArray[10]=9;
			if (timerArray[9]<0) {
				timerArray[7]=parseInt(timerArray[7])-1;
				timerArray[9]=9;
				if (timerArray[7]<0) {
					timerArray[6]=parseInt(timerArray[6])-1;
					timerArray[7]=9;
					if (timerArray[6]<0) {
						timerArray[4]=parseInt(timerArray[4])-1;
						timerArray[6]=5;
						if (timerArray[4]<0) {
							timerArray[3]=parseInt(timerArray[3])-1;
							timerArray[4]=9;
							if (timerArray[3]<0) {
								timerArray[1]=parseInt(timerArray[1])-1;
								timerArray[3]=5;
								if (timerArray[1]<0) {
									timerArray[0]=parseInt(timerArray[0])-1;
									timerArray[1]=9;
									if (timerArray[0]<0){
										for(let i = 0; i<=10; i++){
											if(i != 2 & i != 5 & i != 8){
												timerArray[i]=0;
											}
										}
										clearInterval(timerInterval);
										timerTextSelector.innerHTML= `${timerArray.join("")}`;
										alert("TERMINÓ EL TIEMPO!!");
										timerDisplay("block");
									}
								}
							}
						}
					}
				}
			}
		}

		timerTextSelector.innerHTML= `${timerArray.join("")}`;
	},10);

	timerPauseButton.addEventListener("click",()=>{
		clearTimeout(timerInterval);
		timerDisplay("block");
	})

	timerResetButton.addEventListener("click",()=>{
		clearInterval(timerInterval);
		timerArray[0]=timerArray[1]=timerArray[3]=timerArray[4]=timerArray[6]=timerArray[7]=timerArray[9]=timerArray[10]=0;
		timerTextSelector.innerHTML= `${timerArray.join("")}`;
		timerDisplay("block");
	})
})

window.addEventListener("resize",()=>{
	modeChanger(titleMove);
	if (window.innerWidth<640) {
		switch(screenMode){
			case "clock":
			screenMove = -90*0;
			break;

			case "chrono":
			screenMove = -90*1;
			break;

			case "timer":
			screenMove = -90*2;
			break;
		}
	}
	else{
		switch(screenMode){
			case "clock":
			screenMove = -60*0;
			break;

			case "chrono":
			screenMove = -60*1;
			break;

			case "timer":
			screenMove = -60*2;
			break;
		}
	}
	screen.style.transform = `translateX(${screenMove}vw)`
	modeTitle.style.transform = `translateX(${titleMove}vw)`
})


// FUNCIONES

function moveScreenToTheRight(){
	titleMove-=50;
	if (window.innerWidth<640) {
		screenMove-=90;
	}
	else{
		screenMove-=60;	
	}

	if (titleMove<=modesQuantity*-50) {
		titleMove=screenMove=0;
	}

	screen.style.transform = `translateX(${screenMove}vw)`
	modeTitle.style.transform = `translateX(${titleMove}vw)`
	modeChanger(titleMove);
}

function moveScreenToTheLeft(){
	titleMove+=50;
	if (window.innerWidth<640) {
		screenMove+=90;
	}
	else{
		screenMove+=60;
	}

	if (titleMove>0) {
		titleMove=(modesQuantity-1)*-50;
		if (window.innerWidth<640) {
			screenMove=(modesQuantity-1)*-90;
		}
		else{
			screenMove=(modesQuantity-1)*-60;	
		}
	}

	screen.style.transform = `translateX(${screenMove}vw)`
	modeTitle.style.transform = `translateX(${titleMove}vw)`

	modeChanger(titleMove);
}

function reloj() {
	let fecha = new Date();

	timeHours.innerHTML = fecha.getHours();
	AgregarCero(timeHours);

	timeMinutes.innerHTML = fecha.getMinutes();
	AgregarCero(timeMinutes);
	
	timeSeconds.innerHTML = fecha.getSeconds();
	AgregarCero(timeSeconds);
}

function AgregarCero(valorDelTiempo){
	if (valorDelTiempo.innerHTML<10) {
		valorDelTiempo.innerHTML = `0${valorDelTiempo.innerHTML}`
	}
}

function modeChanger(mode){
	
	switch(mode){
		
		// CLOCK
		case 0:

		screenMode = "clock"
		chronoOptions.style.width = `0`;
		timerOptions.style.width = `0`;
		if (chronoState==true || timeState==true) {
			clearTimeout(timerDelay);
			clearTimeout(chronoDelay);
			timerState=false;
			chronoState=false;
		}

		break;


		// CHRONOMETER
		case -50:

		screenMode = "chrono"
		timerOptions.style.width = `0`;
		chronoState = true;
		chronoDelay = setTimeout(()=>{if(window.innerWidth<640){chronoOptions.style.width = `85vw`;}else{chronoOptions.style.width = `25vw`;}},650)
		if (chronoState==true || timeState==true) {
			clearTimeout(timerDelay);
			timerState=false;
		}

		break;

		// TIMER
		case -100:

		screenMode = "timer";
		chronoOptions.style.width = `0`;
		timerState = true;
		timerDelay = setTimeout(()=>{if(window.innerWidth<640){timerOptions.style.width = `85vw`;}else{timerOptions.style.width = `25vw`}},650)
		if (chronoState==true || timeState==true) {
			clearTimeout(chronoDelay);
			chronoState=false;
		}

		break;
	}
}

function chronometer(){
	milliCounter+=1;

	if (milliCounter==100) {
		milliCounter=0;
		secondsCounter+=1;

		if (secondsCounter==60) {
			secondsCounter=0;
			minutesCounter+=1;

			if (minutesCounter==60) {
				minutesCounter=0;
				hoursCounter+=1;
				chronoHours.innerHTML= hoursCounter;
				AgregarCero(chronoHours);	
			}

			chronoMinutes.innerHTML= minutesCounter;
			AgregarCero(chronoMinutes); 
		}

		chronoSeconds.innerHTML= secondsCounter;
		AgregarCero(chronoSeconds); 
	}

	chronoMilliseconds.innerHTML= milliCounter;
	AgregarCero(chronoMilliseconds);
}

function timerPlusMinus(button){
	button.addEventListener("click",()=>{
		switch(button.id){
			case "firstPlus":
			timerPlus(0);
			break
			case "firstMinus":
			timerMinus(0);
			break

			case "secondPlus":
			timerPlus(1)
			break
			case "secondMinus":
			timerMinus(1)
			break

			case "thirdPlus":
			timerPlus(3)
			break
			case "thirdMinus":
			timerMinus(3)
			break

			case "fourthPlus":
			timerPlus(4)
			break
			case "fourthMinus":
			timerMinus(4)
			break

			case "fifthPlus":
			timerPlus(6)
			break
			case "fifthMinus":
			timerMinus(6)
			break

			case "sixthPlus":
			timerPlus(7)
			break
			case "sixthMinus":
			timerMinus(7)
			break

			case "seventhPlus":
			timerPlus(9)
			break
			case "seventhMinus":
			timerMinus(9)
			break

			case "eighthPlus":
			timerPlus(10)
			break
			case "eighthMinus":
			timerMinus(10)
			break
		}
		timerTextSelector.innerHTML= `${timerArray.join("")}`;
	})
}

function timerPlus(position){
	if (timerArray[position]==9) {
		timerArray[position]=9;	
	}
	else{
		timerArray[position]=parseInt(timerArray[position])+1;	
	}
}

function timerMinus(position){
	if (timerArray[position]==0) {
		timerArray[position]=0;	
	}
	else{
		timerArray[position]=parseInt(timerArray[position])-1;
	}
}

function timerDisplay(displayState){
	firstPlus.style.display = `${displayState}`
	secondPlus.style.display = `${displayState}`
	thirdPlus.style.display = `${displayState}`
	fourthPlus.style.display = `${displayState}`
	fifthPlus.style.display = `${displayState}`
	sixthPlus.style.display = `${displayState}`
	seventhPlus.style.display = `${displayState}`
	eighthPlus.style.display = `${displayState}`
	firstMinus.style.display = `${displayState}`
	secondMinus.style.display = `${displayState}`
	thirdMinus.style.display = `${displayState}`
	fourthMinus.style.display = `${displayState}`
	fifthMinus.style.display = `${displayState}`
	sixthMinus.style.display = `${displayState}`
	seventhMinus.style.display = `${displayState}`
	eighthMinus.style.display = `${displayState}`
}