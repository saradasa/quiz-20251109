"use client";
import Quiz from "next";
import { useEffect, useState } from "react";
import { quizData } from "../../data";
import Style from "./quiz.module.css";
import { useRouter } from "next/navigation";

export default function Question() {
  const [quizId, setQuizId] = useState(getRandomQuiz());
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(1);

  function getRandomQuiz() {
    const index = Math.floor(Math.random() * quizData.length);
    return quizData[index];
  }
  const handleAnswer = (option) => {
    setSelected(option);
    if (option === quizId.answer) {
      setResult("正解！🎉");
      setScore((prev) => prev + 1);
    } else {
      setResult("不正解...💦");
      setScore((prev) => prev - 1);
    }
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSelected("");
      setResult("");
      setQuizId(quizData[Math.floor(Math.random() * quizData.length)]);
    }, 1000);
  };
  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setQuizId(getRandomQuiz());
    setSelected("");
    setResult(null);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push(`/quiz/result?score=${score}`);
    }
  }, [timeLeft, router, score]);

  return (
    <>
      <p className={Style.back}>
        <span className={Style.title}>常識クイズ！</span>
        <span className={Style.space}>スコア：{score}　</span>
        <span className={Style.space}>残り時間：{timeLeft}</span>
      </p>
      <p style={{ textAlign: "center", fontSize: "20px", marginTop: "15px" }}>
        {currentIndex}問目
      </p>
      <div style={{ textAlign: "center", marginTop: "25px" }}>
        <div className={Style.question}>問題：{quizId.question}</div>
        <div className={Style.options}>
          {quizId.options.map((option, index) => (
            <button
              className={Style.button}
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={!!result}
            >
              {option}
            </button>
          ))}
        </div>
        {result && <p>{result}</p>}
        <div>
          <button className={Style.nextbutton} onClick={() => handleNext()}>
            次の問題
          </button>
        </div>
      </div>
    </>
  );
}
