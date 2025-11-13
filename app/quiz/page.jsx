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
      setSelected("");
      setResult("");
      setQuizId(quizData[Math.floor(Math.random() * quizData.length)]);
    }, 1000);
  };
  const handleNext = () => {
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
      <h1 className={Style.title}>常識クイズ！</h1>
      <p>一般常識クイズに答えよう！</p>
      <p>
        分からなかったら<span className={Style.bold}>次の問題</span>を押そう！
      </p>
      <div style={{ textAlign: "center", marginTop: "25px" }}>
        <div className={Style.question}>問題：{quizId.question}</div>
        <div>
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
          <p>スコア：{score}</p>
          <p>残り時間：{timeLeft}</p>
          <button className={Style.nextbutton} onClick={() => handleNext()}>
            次の問題
          </button>
        </div>
      </div>
    </>
  );
}
