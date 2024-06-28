
//  take the element when needed
const quizBtn= document.querySelector(".quizBtn");
const exitBtn= document.querySelector(".exitBtn");
const modal= document.querySelector(".modalContainer");
const quizBox= document.querySelector(".quizBoxContainer");
const quizBoxQuestion=document.querySelector('.quizBoxQuestion')
const quizBoxOption1=document.querySelector('.quizBoxOption1')
const quizBoxOption2=document.querySelector('.quizBoxOption2')
const quizBoxOption3=document.querySelector('.quizBoxOption3')
const quizBoxOption4=document.querySelector('.quizBoxOption4')
const quizBoxBtn=document.querySelector('.quizBoxBtn')
const quizBoxTrack=document.querySelector('.quizBoxTrack')
const continueBtn=document.querySelector('.continueBtn')
const resultBoxContainer=document.querySelector('.resultBoxContainer')
const resultBoxBtn2=document.querySelector('.resultBoxBtn2')
const resultBoxBtn1=document.querySelector('.resultBoxBtn1')
const quizBoxTimerNum=document.querySelector('.quizBoxTimerNum')
const quizBoxTimeLine=document.querySelector('.quizBoxTimeLine')
const resultBox1=document.querySelector('.resultBox1')


quizBoxBtn.style.pointerEvents='none';
let initialIndex=0; // index to move upon array of questions
let quizNumber=0;   // manage quiz number
let resultValue=0;  // manage result value
let initialTimer=15; // set time value = 15 seconds
let initialTimeLine=0;
let counter; // handle set time interval for function startTimer 
let counterLine;

  // event listener on start button iska kaam quiz start krna h
quizBtn.addEventListener('click',()=>{
  modal.classList.add('modalactive');
})

   // event listener on exit button iska kaam quiz exit karna h
exitBtn.addEventListener('click',()=>{
  modal.classList.remove('modalactive');
})

// continue button event listener
continueBtn.addEventListener('click',()=>{
  modal.classList.remove('modalactive'); 
  quizBox.classList.add('quizactive');
  startTimer(initialTimer); // start timer as soon as get quiz function called
  startTimerLine(initialTimeLine);// line ko update krdo
  getQuiz();// first time quiz upload krdo
})

function startTimer(time){
  quizBoxTimerNum.innerText=time<10?`0${time}`:time;
  counter=setInterval(()=>{
    manageSeconds();
    if(time==0){
      clearInterval(counter);
      disableAllOptions();
      highlightCorrectOption(initialIndex-1);
      quizBoxBtn.style.pointerEvents='auto';
      quizBoxBtn.style.opacity=1;
    }
  },1000)
  function manageSeconds(){
    time--;
    quizBoxTimerNum.innerText=time<10?`0${time}`:time;
  }
}

function startTimerLine(timeLine){

  counterLine = setInterval(()=>{
    timer();
    if(timeLine > 479){ 
      clearInterval(counterLine); 
 }
  }, 33);
  function timer(){
      timeLine += 1; 
      quizBoxTimeLine.style.width  = timeLine + "px"; 
      }
}
// question copy from reference

let questions = [
  {
    numb: 1,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets",
    options: [
      "Computing Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computerized Style Sheets"
    ]
  },
  {
    numb: 2,
    question: "Which HTML attribute is used to define inline styles?",
    answer: "style",
    options: [
      "class",
      "style",
      "styles",
      "font"
    ]
  },
  {
    numb: 3,
    question: "Which property is used to change the background color?",
    answer: "background-color",
    options: [
      "bgcolor",
      "color",
      "background-color",
      "background"
    ]
  },
  {
    numb: 4,
    question: "Which CSS property is used to change the text color of an element?",
    answer: "color",
    options: [
      "text-color",
      "font-color",
      "color",
      "text-style"
    ]
  },
  {
    numb: 5,
    question: "Which CSS framework is known for its responsive grid system?",
    answer: "Bootstrap",
    options: [
      "Foundation",
      "Bulma",
      "Tailwind CSS",
      "Bootstrap"
    ]
  },
  {
    numb: 6,
    question: "Which HTML tag is used to define an internal style sheet?",
    answer: "<style>",
    options: [
      "<css>",
      "<script>",
      "<style>",
      "<link>"
    ]
  }
];

// next quiz fxn
function getQuiz(){
  quizBoxQuestion.textContent=questions[initialIndex].question; // dibbe m initialIndex  waala quiz daal so
  getOption(); // saare option waale dibbe m options daal do
}

// getoption btn
function getOption(){  
  quizBoxOption1.textContent=questions[initialIndex].options[0];
  quizBoxOption2.textContent=questions[initialIndex].options[1];
  quizBoxOption3.textContent=questions[initialIndex].options[2];
  quizBoxOption4.textContent=questions[initialIndex].options[3];
  initialIndex++;
  updateQuizNumber(); // ab quiz number ko update bhi krdo
 }

// update quiz number
function updateQuizNumber(){
  quizNumber++; // quiz numbr add krdo dibbe m
  quizBoxTrack.textContent=`${quizNumber} of 6 Questions`
}

// Event listeners for quiz options
quizBoxOption1.addEventListener('click', () => handleOptionClick(quizBoxOption1, initialIndex - 1));
quizBoxOption2.addEventListener('click', () => handleOptionClick(quizBoxOption2, initialIndex - 1));
quizBoxOption3.addEventListener('click', () => handleOptionClick(quizBoxOption3, initialIndex - 1));
quizBoxOption4.addEventListener('click', () => handleOptionClick(quizBoxOption4, initialIndex - 1));

function handleOptionClick(selectedOption, quizIndex) {
  clickOption(selectedOption, quizIndex);
// ek baar koi option select ho jaaye baaki sb disabled ho jaaye
  disableAllOptions();
  quizBoxBtn.style.opacity=1;
  quizBoxBtn.style.pointerEvents='auto';
  clearInterval(counter);// set initial value
  clearInterval(counterLine);
   // agr select option wrong ho jaaye toh si color ko highlight krdo
  if (selectedOption.innerText !== questions[quizIndex].answer) {
    highlightCorrectOption(quizIndex);
  }

}

function clickOption(optNum, index) {
  let text = optNum.innerText;
  if (text == questions[index].answer) {
    optNum.style.backgroundColor = '#299e444d'; // Greenish color for correct answer
    resultValue++;
  } else {
    optNum.style.backgroundColor = '#d6192b8f'; // Reddish color for incorrect answer
  }
}

// saare option p se pointer htaado
function disableAllOptions() {
  quizBoxOption1.style.pointerEvents = 'none';
  quizBoxOption2.style.pointerEvents = 'none';
  quizBoxOption3.style.pointerEvents = 'none';
  quizBoxOption4.style.pointerEvents = 'none';
}


function highlightCorrectOption(index) {
  console.log(index)
  let options = [quizBoxOption1, quizBoxOption2, quizBoxOption3, quizBoxOption4];
  options.forEach(option => {
    if (option.innerText == questions[index].answer) {
      option.style.backgroundColor = '#299e444d';  // Greenish color for correct answer
    }
  });
}

//next button event listener
quizBoxBtn.addEventListener('click',()=>{
  quizBoxBtn.style.opacity=0;
  quizBoxBtn.style.pointerEvents='none';

  keepOriginalOpt();
  if(initialIndex==5) quizBoxBtn.textContent='Done';
  
 if(initialIndex==6){
    resultBoxContainer.classList.add('resultactive');
    showResult(resultValue);
    quizBoxBtn.textContent='Next'; 
     initialIndex=0; // index to move upon array of questions
     quizNumber=0;   // manage quiz number
     resultValue=0;  // manage result value
    initialTimer=15; // set time value = 15 seconds
    initialTimeLine=0;
    return ;
 
  }
  // jese hee next button dabaye purani chheze zero ho jaaye , initial timer set ho jaaye or get quiz waala upload ho jaaye
  clearInterval(counter);// set initial value
  clearInterval(counterLine);
  startTimer(initialTimer); // start timer as soon as get quiz function called
  startTimerLine(initialTimer);
  getQuiz();
})

function keepOriginalOpt(){
  let options = [quizBoxOption1, quizBoxOption2, quizBoxOption3, quizBoxOption4];
  options.forEach(option => {
     option.style.backgroundColor = '#007BFF33';
     option.style.pointerEvents = 'auto'; // original answer
    });
}

// quit quiz event listener
resultBoxBtn2.addEventListener('click',()=>{
  resultBoxContainer.classList.remove('resultactive')
  quizBox.classList.remove('quizactive')
})

// replay quiz event listener tricky part is index is set 0
resultBoxBtn1.addEventListener('click',()=>{
  resultBoxContainer.classList.remove('resultactive');
  getQuiz();
  startTimer(initialTimer); // start timer as soon as get quiz function called
  startTimerLine(initialTimer);
})
function showResult(result){
  if(result<3) resultBox1.innerText=`You've commpleted the Quiz! and sorry 😐, You got only ${result} out of 6`
  else if(result<=5) resultBox1.innerText=`Good job! 😊 You got ${result} out of 6. Keep it up!`
  else resultBox1.innerText=`Congratulations! 🎉 You got ${result} out of 6. Excellent work!`
}
