"use client";
import Quiz from "next"
import { useState } from "react";
import { quizData } from "../../data";
import Style from "./quiz.module.css"

export default function Question(){
    const [quizId,setQuizId] = useState(0);
    const [selected, setSelected] = useState("");
    const [result, setResult] = useState(null);

    const handleAnswer = (option) => {
    setSelected(option);
    if (option === quizId.answer) {
      setResult("正解！🎉");
    } else {
      setResult("不正解...💦");
    }


  };
    return(
        <>
        <div>{quizData[quizId].question}</div>
        <div className={Style.containar}>{quizData[quizId].options.map((option,index) => (
            <button className={Style.button} 
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={!!result}
            >{option}</button>
        ))}</div>
        {result && (
          <p className={result.includes("正解") ? "green" : "red"}>
            {result}
          </p>
        )}
        </>
    )
}