"use client";

import { useEffect, useState } from "react";
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

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const a = new Audio("/sound/hover.mp3");
    a.volume = 0.3;
    setAudio(a);

    window.addEventListener("mousemove", (e) => {
      setX(e.clientX);
      setY(e.clientY);
    });
  }, []);

  function play() {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  async function send() {
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
  }

  function scroll() {
    document
      .getElementById("tasks")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      className="screen"
      style={{
        backgroundImage: "url('/bg/skeleth.png')",
      }}
    >
      <div className="overlay" />

      {/* mouse effect */}
      <div
        className="cursor"
        style={{ left: x, top: y }}
      />
      <div
        className="skull"
        style={{ left: x, top: y }}
      >
        ☠
      </div>

      {/* HERO */}
      <div className="hero">
        <h1
          className={`title glitch ${arcade.className}`}
          data-text="SKELETH"
        >
          SKELETH
        </h1>

        <p>RITUAL ACCESS ONLY</p>

        <button onClick={scroll}>ENTER ↓</button>
      </div>

      {/* TASKS */}
      <div id="tasks" className="card">
        <h2 className={arcade.className}>SIGNALS</h2>

        <div className="grid">
          <a
            href="https://x.com/SkelethNFT"
            target="_blank"
            onMouseEnter={play}
            className="task"
          >
            ↗ FOLLOW
          </a>

          <a
            href="https://x.com/SkelethNFT/status/2043767748539429086"
            target="_blank"
            onMouseEnter={play}
            className="task purple"
          >
            ↗ LIKE
          </a>

          <a
            href="https://twitter.com/intent/retweet?tweet_id=2043767748539429086"
            target="_blank"
            onMouseEnter={play}
            className="task green"
          >
            ↗ RETWEET
          </a>

          <a
            href="https://x.com/SkelethNFT/status/2043767748539429086"
            target="_blank"
            onMouseEnter={play}
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
          cursor: none;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
        }

        /* mouse */
        .cursor {
          position: fixed;
          width: 120px;
          height: 120px;
          background: radial-gradient(
            circle,
            rgba(0,255,255,0.3),
            transparent
          );
          transform: translate(-50%, -50%);
        }

        .skull {
          position: fixed;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        /* hero */
        .hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .title {
          font-size: 60px;
          text-shadow: 0 0 20px cyan;
        }

        button {
          padding: 10px 20px;
          background: cyan;
          color: black;
          cursor: pointer;
        }

        /* card */
        .card {
          padding: 40px;
          max-width: 600px;
          margin: auto;
          background: rgba(0,0,0,0.8);
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 20px;
        }

        .task {
          border: 1px solid cyan;
          padding: 10px;
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

        .error { color: red; }
        .ok { color: lime; }

        /* glitch */
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
        }

        .glitch::before {
          color: cyan;
          animation: g 1s infinite;
        }

        .glitch::after {
          color: red;
          animation: g 1s infinite reverse;
        }

        @keyframes g {
          0% { transform: translate(0); }
          50% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
}