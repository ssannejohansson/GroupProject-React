import React from "react";
import { useEffect, useState, useRef } from "react";
import {useNavigate} from "react-router";
import "./TriviaGame.css";

// This is to make sure there are no special characters (it returns plain text)
const returnPlainText = (text) => {
    const parser = new DOMParser();
    return parser.parseFromString(text, "text/html").body.textContent;
  };
  
  function TriviaGame() {
    const [questions, setQuestions] = useState([]); //stores questions from API
    const [index, setIndex] = useState(0);          //monitors current question number
    const [score, setScore] = useState(0);          //monitors user score
    const [gameOver, setGameOver] = useState(false);  //ends the game when questions run out, currently set to 10
    const fetchRef = useRef(false); //prevents unneccesary API calls

    const navigate = useNavigate()

    const handleRestart = () => {
    navigate (0);
    };

    const onSignOut = () => {
      navigate (-1);
    };
  
    //fetches data from the API once the game starts
    useEffect(() => {
      if (fetchRef.current) return; // exit if data is already fetched
      fetchRef.current = true; // Mark as fetched
    
      setTimeout(() => { // Start delay because the trivia API had a limit of 1 request every 5 seconds
        fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple")
          .then(response => response.json())
          .then(data => setQuestions(data.results))
          .catch(error => console.error("Error fetching data:", error));
      }, 5000); // 5-second delay
    }, []);
    
  
    if (!questions.length) return <div className="preparing">Preparing your quiz...</div>; //if questions aren´t ready
    if (gameOver) return <div className="gameover"><h2 className="gameover-title">Game Over!</h2><h2 className="gameover-text"> Your score is: {score} / 10</h2>
    <button className="restart" onClick={handleRestart}>Restart</button><button
        className="sign-out-button"
        onClick={onSignOut}
        aria-label="Sign out of Trivia Game"
      >
        Sign Out
      </button></div>; //when questions run out (10)
  
    const question = questions[index]; //gets the current question
  
    const handleAnswerClick = (answer) => {
      if (answer === question.correct_answer) {
        setScore(score + 1); //increase score +1 if correct answer
      }
      if (index + 1 < 10) { // Game continues until 10 questions are done
        setIndex(index + 1);
      } else {
        setGameOver(true);
      }
    };
  
    return (
      <div>
        <div className="quiz-container">
         
          <h1 className="quiz-title">Triva Game 2025</h1> 
          <div className="quiz-card">
        <h2 className="question-text">{returnPlainText(question.question)}</h2>
        <div className="options-container"> 
        {[...question.incorrect_answers, question.correct_answer]
          .sort(() => Math.random() - 0.5) //randomize order of answers
          .map((answer, i) => (
         
           <button className="trivia" id="quiz-button" key={i} onClick={() => handleAnswerClick(answer)}>
              {returnPlainText(answer)}
            </button>
          ))}
          </div>
          
        <p className="score">Current score: {score}</p>
        </div>
        </div>
      </div>
    );
  }
  
  export default TriviaGame;