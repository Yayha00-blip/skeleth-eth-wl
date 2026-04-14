"use client";

import { useEffect, useState } from "react";
import { Orbitron, Inter } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function WL() {
  const [t, setT] = useState("");
  const [w, setW] = useState("");
  const [p, setP] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const MAX_SUPPLY = 2222;

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  async function send() {
    try {
      const r = await fetch("/api/wl", {
        method: "POST",
        body: JSON.stringify({ twitter: t, wallet: w, proof: p }),
        headers: { "Content-Type": "application/json" },
      });

      const d = await r.json();

      if (d.ok) {
        setMsg("ACCESS GRANTED");
        setIsError(false);
      } else {
        setMsg(d.error || "ERROR");
        setIsError(true);
      }
    } catch {
      setMsg("NETWORK ERROR");
      setIsError(true);
    }
  }

  function scrollToTasks() {
    const el = document.getElementById("tasks-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      className={`screen ${inter.className}`}
      style={{
        backgroundImage: "url('/bg/skeleth.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overlay" />

      <div
        className="cursorAura"
        style={{
          left: mouseX,
          top: mouseY,
        }}
      />
      <div
        className="cursorSkull"
        style={{
          left: mouseX,
          top: mouseY,
        }}
      >
        ☠
      </div>

      <div className="ambient ambientOne" />
      <div className="ambient ambientTwo" />

      <section className="hero">
        <div className="heroInner">
          <p className="eyebrow">ETH COLLECTION</p>
          <h1 className={`heroTitle ${orbitron.className}`}>SKELETH</h1>
          <p className="heroDesc">
            Skeleth are lost souls reborn on Ethereum, drifting between a fading past and a neon future.
Their bones hold forgotten memories… and the chain never lets them die.
          </p>

          <div className="supplyBox">
            <span className="supplyLabel">TOTAL SUPPLY</span>
            <span className={`supplyValue ${orbitron.className}`}>
              {MAX_SUPPLY}
            </span>
          </div>

          <button className={`scrollBtn ${orbitron.className}`} onClick={scrollToTasks}>
            ENTER BELOW
            <span className="scrollArrow">↓</span>
          </button>
        </div>
      </section>

      <section id="tasks-section" className="tasksWrap">
        <div className="card">
          <h2 className={`title ${orbitron.className}`}>RITUAL ACCESS</h2>
          <p className="subtitle">
            Complete the signal tasks, then submit your identity.
          </p>

          <div className="tasksGrid">
            <a
              href="https://x.com/SkelethNFT"
              target="_blank"
              rel="noreferrer"
              className="taskCard task1"
            >
              <span className="taskTop">
                <span className="taskLabel">SIGNAL 01</span>
                <span className="taskArrow">↗</span>
              </span>
              <span className={`taskName ${orbitron.className}`}>
                FOLLOW THE ENTITY
              </span>
            </a>

            <a
              href="https://x.com/SkelethNFT/status/2043767748539429086"
              target="_blank"
              rel="noreferrer"
              className="taskCard task2"
            >
              <span className="taskTop">
                <span className="taskLabel">SIGNAL 02</span>
                <span className="taskArrow">↗</span>
              </span>
              <span className={`taskName ${orbitron.className}`}>
                LIKE THE SIGNAL
              </span>
            </a>

            <a
              href="https://twitter.com/intent/retweet?tweet_id=2043767748539429086"
              target="_blank"
              rel="noreferrer"
              className="taskCard task3"
            >
              <span className="taskTop">
                <span className="taskLabel">SIGNAL 03</span>
                <span className="taskArrow">↗</span>
              </span>
              <span className={`taskName ${orbitron.className}`}>
                AMPLIFY THE SIGNAL
              </span>
            </a>

            <a
              href="https://x.com/SkelethNFT/status/2043767748539429086"
              target="_blank"
              rel="noreferrer"
              className="taskCard task4"
            >
              <span className="taskTop">
                <span className="taskLabel">SIGNAL 04</span>
                <span className="taskArrow">↗</span>
              </span>
              <span className={`taskName ${orbitron.className}`}>
                TAG 2 FRIENDS
              </span>
            </a>
          </div>

          <div className="formBox">
            <input
              placeholder="@twitter"
              value={t}
              onChange={(e) => setT(e.target.value)}
            />

            <input
              placeholder="0x wallet"
              value={w}
              onChange={(e) => setW(e.target.value)}
            />

            <input
              placeholder="Proof tag 2 friends"
              value={p}
              onChange={(e) => setP(e.target.value)}
            />

            <button className={orbitron.className} onClick={send}>
              SUBMIT ENTRY
            </button>

            {msg && (
              <p className={isError ? "msg errorMsg" : "msg successMsg"}>
                {msg}
              </p>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .screen {
          min-height: 100vh;
          position: relative;
          color: #dff8ff;
          background-color: #02030a;
          overflow-x: hidden;
          cursor: none;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background:
            linear-gradient(
              to bottom,
              rgba(2, 3, 10, 0.38),
              rgba(2, 3, 10, 0.82)
            ),
            radial-gradient(
              circle at center,
              rgba(0, 190, 255, 0.1),
              rgba(0, 0, 0, 0.74)
            );
          z-index: 0;
        }

        .cursorAura {
          position: fixed;
          width: 180px;
          height: 180px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(0, 204, 255, 0.22) 0%,
            rgba(0, 204, 255, 0.08) 35%,
            rgba(0, 204, 255, 0) 70%
          );
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 3;
          filter: blur(12px);
        }

        .cursorSkull {
          position: fixed;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 4;
          color: rgba(255, 255, 255, 0.82);
          text-shadow: 0 0 12px rgba(0, 204, 255, 0.8);
          font-size: 18px;
        }

        .ambient {
          position: fixed;
          border-radius: 999px;
          filter: blur(70px);
          opacity: 0.22;
          z-index: 0;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }

        .ambientOne {
          width: 280px;
          height: 280px;
          top: 10%;
          left: 8%;
          background: rgba(0, 204, 255, 0.22);
          animation-name: driftOne;
          animation-duration: 7s;
        }

        .ambientTwo {
          width: 220px;
          height: 220px;
          bottom: 8%;
          right: 10%;
          background: rgba(147, 51, 234, 0.18);
          animation-name: driftTwo;
          animation-duration: 9s;
        }

        @keyframes driftOne {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }
          to {
            transform: translate3d(35px, -20px, 0) scale(1.12);
          }
        }

        @keyframes driftTwo {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }
          to {
            transform: translate3d(-30px, 15px, 0) scale(1.15);
          }
        }

        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          padding: 40px 20px;
        }

        .heroInner {
          width: 100%;
          max-width: 980px;
          text-align: center;
          padding: 32px;
        }

        .eyebrow {
          font-size: 13px;
          letter-spacing: 5px;
          opacity: 0.75;
          margin-bottom: 16px;
        }

        .heroTitle {
          font-size: clamp(54px, 10vw, 104px);
          letter-spacing: 12px;
          margin: 0;
          color: #ffffff;
          text-shadow:
            0 0 14px rgba(0, 204, 255, 0.65),
            0 0 40px rgba(0, 204, 255, 0.22);
        }

        .heroDesc {
          max-width: 780px;
          margin: 26px auto 0;
          font-size: 18px;
          line-height: 1.95;
          color: rgba(230, 248, 255, 0.82);
        }

        .supplyBox {
          margin: 30px auto 0;
          width: fit-content;
          display: flex;
          flex-direction: column;
          gap: 7px;
          padding: 18px 24px;
          border: 1px solid rgba(0, 204, 255, 0.32);
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 0 18px rgba(0, 204, 255, 0.18);
        }

        .supplyLabel {
          font-size: 11px;
          letter-spacing: 3px;
          opacity: 0.65;
        }

        .supplyValue {
          font-size: 32px;
          color: #ffffff;
          letter-spacing: 4px;
        }

        .scrollBtn {
          margin-top: 36px;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 15px 30px;
          border: 1px solid rgba(0, 204, 255, 0.42);
          background: rgba(0, 0, 0, 0.56);
          color: #d9f7ff;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease,
            border-color 0.25s ease;
          letter-spacing: 2px;
          font-size: 14px;
        }

        .scrollBtn:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 204, 255, 0.75);
          box-shadow: 0 0 22px rgba(0, 204, 255, 0.28);
        }

        .scrollArrow {
          display: inline-block;
          animation: bounce 1.4s infinite;
          font-size: 18px;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(5px);
          }
        }

        .tasksWrap {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
        }

        .card {
          width: 100%;
          max-width: 920px;
          padding: 36px;
          border-radius: 16px;
          background: rgba(0, 0, 0, 0.62);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 204, 255, 0.24);
          box-shadow:
            0 0 24px rgba(0, 204, 255, 0.2),
            inset 0 0 24px rgba(0, 204, 255, 0.04);
        }

        .title {
          text-align: center;
          font-size: 34px;
          letter-spacing: 7px;
          margin: 0;
          color: #ffffff;
          text-shadow: 0 0 12px rgba(0, 204, 255, 0.45);
        }

        .subtitle {
          margin: 14px 0 28px;
          text-align: center;
          color: rgba(230, 248, 255, 0.7);
          line-height: 1.8;
          font-size: 16px;
        }

        .tasksGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
        }

        .taskCard {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 120px;
          padding: 20px;
          text-decoration: none;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: transform 0.25s ease, box-shadow 0.25s ease,
            border-color 0.25s ease;
          background: rgba(255, 255, 255, 0.04);
        }

        .taskCard:hover {
          transform: translateY(-3px);
        }

        .taskTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .taskLabel {
          font-size: 11px;
          letter-spacing: 2px;
          opacity: 0.78;
        }

        .taskArrow {
          font-size: 22px;
          line-height: 1;
          opacity: 0.9;
        }

        .taskName {
          font-size: 18px;
          line-height: 1.55;
          letter-spacing: 1px;
        }

        .task1 {
          border-color: rgba(0, 204, 255, 0.3);
          box-shadow: 0 0 18px rgba(0, 204, 255, 0.08);
        }

        .task1:hover {
          box-shadow: 0 0 24px rgba(0, 204, 255, 0.2);
        }

        .task2 {
          border-color: rgba(168, 85, 247, 0.3);
          box-shadow: 0 0 18px rgba(168, 85, 247, 0.08);
        }

        .task2:hover {
          box-shadow: 0 0 24px rgba(168, 85, 247, 0.2);
        }

        .task3 {
          border-color: rgba(34, 197, 94, 0.3);
          box-shadow: 0 0 18px rgba(34, 197, 94, 0.08);
        }

        .task3:hover {
          box-shadow: 0 0 24px rgba(34, 197, 94, 0.2);
        }

        .task4 {
          border-color: rgba(249, 115, 22, 0.3);
          box-shadow: 0 0 18px rgba(249, 115, 22, 0.08);
        }

        .task4:hover {
          box-shadow: 0 0 24px rgba(249, 115, 22, 0.2);
        }

        .formBox {
          margin-top: 26px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        input {
          width: 100%;
          padding: 15px;
          background: rgba(0, 0, 0, 0.76);
          border: 1px solid rgba(0, 204, 255, 0.28);
          color: #d9f7ff;
          font-size: 15px;
          outline: none;
        }

        input:focus {
          border-color: rgba(0, 204, 255, 0.72);
          box-shadow: 0 0 12px rgba(0, 204, 255, 0.16);
        }

        button {
          padding: 15px;
          background: linear-gradient(90deg, #00ccff, #36bffa);
          color: #021018;
          border: none;
          cursor: pointer;
          font-weight: 700;
          letter-spacing: 2px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          font-size: 14px;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(0, 204, 255, 0.3);
        }

        .msg {
          margin: 4px 0 0;
          text-align: center;
          letter-spacing: 1px;
          font-size: 15px;
          font-weight: 600;
        }

        .successMsg {
          color: #7fffd4;
          text-shadow: 0 0 10px rgba(127, 255, 212, 0.28);
        }

        .errorMsg {
          color: #ff4d4f;
          text-shadow: 0 0 10px rgba(255, 77, 79, 0.22);
        }

        @media (max-width: 700px) {
          .screen {
            cursor: auto;
          }

          .cursorAura,
          .cursorSkull {
            display: none;
          }

          .heroInner {
            padding: 20px;
          }

          .tasksGrid {
            grid-template-columns: 1fr;
          }

          .card {
            padding: 22px;
          }

          .heroDesc {
            font-size: 15px;
          }

          .title {
            font-size: 26px;
          }

          .taskName {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}