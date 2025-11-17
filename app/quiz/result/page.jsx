"use client";
import { useSearchParams } from "next/navigation";
import Style from "./result.module.css";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const score = searchParams.get("score"); // ← URLから取得

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 className={Style.subtitle}>リザルト画面</h1>
      <p className={Style.font}>
        あなたのスコアは <strong className={Style.point}>{score} 点</strong>
        です！
      </p>
    </div>
  );
}
