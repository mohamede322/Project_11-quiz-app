const Questions = "questions.json"

const questionNumber = document.getElementById("q-number")
const Question = document.querySelector(".question")
const answerA = document.querySelector("#a p")
const answerB = document.querySelector("#b p")
const answerC = document.querySelector("#c p")
const answerD = document.querySelector("#d p")
const answers = document.querySelectorAll(".answer")
const questionsBox = document.querySelector(".box")
const finalResultBox = document.querySelector(".final-result-box")
let finalResultText = document.querySelector(".final-result-box h1")
const submitBtn = document.getElementById("submit")
const container = document.querySelector(".container")
let correctAnswers = ["C","D","A","D","C","A","C","D","C","A"]

answersClick()
getQuestions()
preventCheat()


function preventCheat() {
    window.addEventListener("contextmenu" , (e) => {
        e.preventDefault()
    }
    )
    window.addEventListener("keydown" , (e) => {
        if (e.keyCode === 123) {
            e.preventDefault()
        }
    })
    
}

function answersClick() {
    answers.forEach((answer)=> {
        answer.addEventListener("click", (e) => {
            answers.forEach((answer)=> {
                answer.classList.remove("active")
            })
            e.currentTarget.classList.add("active")
        })
    })
}

async function getQuestions() {
    let res = await fetch(Questions);
    let data = await res.json()

    let index = 0
    let correct = 0
    submitBtn.addEventListener("click" , () => {
        let active = document.querySelector(".active")
        if (active.classList.contains(correctAnswers[index])) {
            correct+=1
        }

        if (index === 9) {
            index = 9
            questionsBox.style.display = "none"
            submitBtn.style.display = "none"
            finalResultBox.style.display = "block"
            let result = document.createElement("h1")
            result.className = "result"
            if (correct >= 5) {
                result.innerHTML = `Congratulations You Have Passed ${correct} / ${index + 1}`
            }else if (correct < 5) {
                result.innerHTML = `Sadly You Didn't Pass more than the half you got ${correct}/${index + 1}`
            }
            finalResultText.innerHTML = result.innerHTML
            container.style.height = "100vh"
        }else {
            index+=1
        }

        answers.forEach((answer)=> {
            answer.classList.remove("active")
        })

        questionNumber.innerHTML = `Question ${index +1} / ${10}`
        Question.innerHTML = data[index].Q.Question
        answerA.innerHTML = data[index].Q.Answers.A
        answerB.innerHTML = data[index].Q.Answers.B
        answerC.innerHTML = data[index].Q.Answers.C
        answerD.innerHTML = data[index].Q.Answers.D
    })

    questionNumber.innerHTML = `Question ${index +1} / ${10}`
    Question.innerHTML = data[index].Q.Question
    answerA.innerHTML = data[index].Q.Answers.A
    answerB.innerHTML = data[index].Q.Answers.B
    answerC.innerHTML = data[index].Q.Answers.C
    answerD.innerHTML = data[index].Q.Answers.D

}




