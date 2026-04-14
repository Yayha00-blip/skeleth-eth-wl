"use client";

import { useState } from "react";
import { Press_Start_2P } from "next/font/google";

const arcade = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export default function WL() {
  const [t, setT] = useState("");
  const [w, setW] = useState("");
  const [p, setP] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  async function send() {
    try {
      // 🔊 SOUND FIX
      const a = new Audio("/sound/hover.mp3");
      a.volume = 0.4;
      a.play().catch(() => {});

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
        setMsg("Invalid proof link.");
        setIsError(true);
      }
    } catch {
      setMsg("ERROR");
      setIsError(true);
    }
  }

  function scroll() {
    document.getElementById("tasks")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <div
      className="screen"
      style={{
        backgroundImage: "url('/bg/skeleth.png')",
      }}
    >
      <div className="overlay" />

      {/* HERO */}
      <div className="hero">
        <h1 className={`title ${arcade.className}`}>SKELETH</h1>

        <p className="desc animated">
          Skeleth are lost souls reborn on Ethereum, drifting between a fading
          past and a neon future. Their bones hold forgotten memories… and the
          chain never lets them die.
        </p>

        <div className="supply">TOTAL SUPPLY — 2222</div>

        <button onClick={scroll}>ENTER ↓</button>
      </div>

      {/* TASKS */}
      <div id="tasks" className="card">
        <h2 className={arcade.className}>SIGNALS</h2>

        <div className="grid">
          <a href="https://x.com/SkelethNFT" target="_blank" className="task">
            ↗ FOLLOW
          </a>

          <a
            href="https://x.com/SkelethNFT/status/2043767748539429086"
            target="_blank"
            className="task purple"
          >
            ↗ LIKE
          </a>

          <a
            href="https://twitter.com/intent/retweet?tweet_id=2043767748539429086"
            target="_blank"
            className="task green"
          >
            ↗ RETWEET
          </a>

          <a
            href="https://x.com/SkelethNFT/status/2043767748539429086"
            target="_blank"
            className="task orange"
          >
            ↗ TAG 2
          </a>
        </div>

        <input
          placeholder="@twitter"
          onChange={(e) => setT(e.target.value)}
        />
        <input
          placeholder="0x wallet"
          onChange={(e) => setW(e.target.value)}
        />
        <input
          placeholder="proof link"
          onChange={(e) => setP(e.target.value)}
        />

        <button onClick={send}>SUBMIT</button>

        {msg && (
          <p className={isError ? "error" : "ok"}>{msg}</p>
        )}
      </div>

      <style jsx>{`
        .screen {
          min-height: 100vh;
          background-size: cover;
          background-position: center;
          color: white;
          position: relative;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          pointer-events: none;
        }

        /* HERO */
        .hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          text-align: center;
          padding: 20px;
          z-index: 1;
          position: relative;
        }

        .title {
          font-size: 60px;
          text-shadow: 0 0 20px cyan;
        }

        .desc {
          max-width: 700px;
          line-height: 1.9;
          font-size: 16px;
          opacity: 0.9;
        }

        /* ✨ ANIMATION */
        .animated {
          animation: float 4s ease-in-out infinite;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }

        .supply {
          font-size: 14px;
          letter-spacing: 3px;
          opacity: 0.7;
        }

        button {
          padding: 12px 24px;
          background: cyan;
          color: black;
          cursor: pointer;
          border: none;
        }

        /* CARD */
        .card {
          padding: 40px;
          max-width: 600px;
          margin: auto;
          background: rgba(0, 0, 0, 0.9);
          position: relative;
          z-index: 2;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 20px;
        }

        .task {
          border: 1px solid cyan;
          padding: 12px;
          transition: 0.2s;
        }

        .task:hover {
          background: rgba(0, 255, 255, 0.1);
        }

        .purple { border-color: violet; }
        .green { border-color: lime; }
        .orange { border-color: orange; }

        input {
          width: 100%;
          margin-top: 10px;
          padding: 10px;
          background: black;
          border: 1px solid cyan;
          color: cyan;
        }

        .error {
          color: red;
          margin-top: 10px;
        }

        .ok {
          color: lime;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}