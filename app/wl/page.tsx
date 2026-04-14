"use client";

import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

export default function WL() {
  return (
    <div className="screen">

      {/* NAVBAR */}
      <div className="nav">
        <div className="logo">SKELETH</div>

        <div className="links">
          <span>LORE</span>
          <span>GALLERY</span>
          <span>TRAITS</span>
          <span>ROADMAP</span>
        </div>

        <button className="join">JOIN WL</button>
      </div>

      {/* HERO */}
      <div className="hero">
        <p className="top">✦ ETHEREUM — 2222 SUPPLY — FREE MINT ✦</p>

        <h1 className={`title ${orbitron.className}`}>
          SKELETH
        </h1>

        <div className="skulls">💀 💀 💀 💀 💀</div>

        <div className="badge">WHITELIST NOW OPEN</div>

        <p className="desc">
          2222 pixel art skeletons haunting the blockchain.<br/>
          They don’t sleep. They don’t sell. They haunt forever.
        </p>

        <div className="buttons">
          <button className="yellow">JOIN WHITELIST →</button>
          <button className="cyan">✕ FOLLOW</button>
        </div>
      </div>

      <style jsx>{`
        .screen {
          min-height: 100vh;
          background: black;
          color: white;
          font-family: monospace;
        }

        /* NAV */
        .nav {
          display: flex;
          justify-content: space-between;
          padding: 20px 40px;
          border-bottom: 1px solid #111;
        }

        .logo {
          color: yellow;
        }

        .links {
          display: flex;
          gap: 20px;
          font-size: 12px;
        }

        .join {
          background: hotpink;
          border: none;
          padding: 8px 15px;
        }

        /* HERO */
        .hero {
          text-align: center;
          margin-top: 80px;
        }

        .top {
          color: cyan;
          font-size: 12px;
        }

        .title {
          font-size: 90px;
          margin: 20px 0;
          color: white;
          text-shadow:
            4px 4px 0 pink,
            -4px -4px 0 cyan;
          animation: glitch 2s infinite;
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        .skulls {
          margin: 10px;
        }

        .badge {
          border: 2px solid yellow;
          display: inline-block;
          padding: 8px 15px;
          margin: 20px 0;
          color: yellow;
        }

        .desc {
          font-size: 12px;
          opacity: 0.7;
        }

        .buttons {
          margin-top: 30px;
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .yellow {
          background: yellow;
          color: black;
          padding: 12px 20px;
        }

        .cyan {
          border: 1px solid cyan;
          color: cyan;
          padding: 12px 20px;
          background: transparent;
        }

      `}</style>
    </div>
  );
}