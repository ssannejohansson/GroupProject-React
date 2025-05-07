import React from "react";
import { useEffect, useState, useRef } from "react";

// This is to make sure there are no special characters (it returns plain text)
const returnPlainText = (text) => {
    const parser = new DOMParser();
    return parser.parseFromString(text, "text/html").body.textContent;
  };
  
  function TriviaGame() {
    const [questions, setQuestions] = useState([]); //stores questions from API
    const [index, setIndex] = useState(0);          //current question
    const [score, setScore] = useState(0);          //user score
    const [gameOver, setGameOver] = useState(false);  //ends the game when questions run out, currently set to 10
    const fetchRef = useRef(false); //prevents unneccesary API calls
  
    //fetches data from the API once the game starts
    useEffect(() => {
      if (fetchRef.current) return; // Prevent multiple fetch requests
      fetchRef.current = true; // Mark as fetched
    
      setTimeout(() => { // Start delay because 
        fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple")
          .then(response => response.json())
          .then(data => setQuestions(data.results))
          .catch(error => console.error("Error fetching data:", error));
      }, 5000); // 5-second delay
    }, []);
    
  
    if (!questions.length) return <div>Preparing your quiz...</div>; //if questions aren´t loaded
    if (gameOver) return <div><h2>Game Over! Your score is: {score} / 10</h2></div>; //when questions run out (10)
  
    const question = questions[index]; //gets the current question
  
    const handleAnswerClick = (answer) => {
      if (answer === question.correct_answer) {
        setScore(score + 1);
      }
      if (index + 1 < 10) { // Game ends after 10 questions
        setIndex(index + 1);
      } else {
        setGameOver(true);
      }
    };
  
    return (
      <div>
        <h2>{returnPlainText(question.question)}</h2>
        {[...question.incorrect_answers, question.correct_answer]
          .sort(() => Math.random() - 0.5) //randomize order of answers
          .map((answer, i) => (
            <button key={i} onClick={() => handleAnswerClick(answer)}>
              {returnPlainText(answer)}
            </button>
          ))}
        <p>Current score: {score}</p>
      </div>
    );
  }
  
  export default TriviaGame;