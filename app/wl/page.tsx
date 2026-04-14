"use client";

import { Orbitron } from "next/font/google";
import { useState } from "react";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export default function WL() {
  const [twitter, setTwitter] = useState("");
  const [wallet, setWallet] = useState("");
  const [proof, setProof] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  function scrollToSignals() {
    document.getElementById("signals")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  async function submitEntry() {
    try {
      const res = await fetch("/api/wl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          twitter,
          wallet,
          proof,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setMsg("ENTRY RECORDED");
        setIsError(false);
      } else {
        setMsg(data.error || "Invalid proof link.");
        setIsError(true);
      }
    } catch {
      setMsg("NETWORK ERROR");
      setIsError(true);
    }
  }

  return (
    <main
      className="page"
      style={{
        backgroundImage: "url('/bg/azolay.jpg')",
      }}
    >
      <div className="overlay" />
      <div className="noise" />

      <header className="nav">
        <div className={`logo ${orbitron.className}`}>SKELETH</div>



        <button
          className={`joinTop ${orbitron.className}`}
          onClick={scrollToSignals}
        >
          JOIN WL
        </button>
      </header>

      <section className="hero" id="lore">
        <p className="topline">✦ ETHEREUM — 2222 SUPPLY — FREE MINT ✦</p>

        <h1 className={`title ${orbitron.className}`}>SKELETH</h1>

        <div className="skulls">💀 💀 💀 💀 💀</div>

        <div className={`badge ${orbitron.className}`}>WHITELIST NOW OPEN</div>

        <p className="desc">
          2222 pixel art skeletons haunting the blockchain.
          <br />
          They don’t sleep. They don’t sell. They haunt forever.
        </p>

        <div className="heroButtons">
          <button
            className={`yellowBtn ${orbitron.className}`}
            onClick={scrollToSignals}
          >
            JOIN WHITELIST →
          </button>

          <a
            href="https://x.com/SkelethNFT"
            target="_blank"
            rel="noreferrer"
            className={`cyanBtn ${orbitron.className}`}
          >
            X FOLLOW
          </a>
        </div>
      </section>

      <section className="signalsSection" id="signals">
        <div className="signalsCard">
          <div className="cardHead">
            <h2 className={`signalsTitle ${orbitron.className}`}>SIGNALS</h2>
            <p className="signalsSub">
              Complete the sequence, then submit your identity and proof.
            </p>
          </div>

          <div className="taskGrid">
            <a
              href="https://x.com/SkelethNFT"
              target="_blank"
              rel="noreferrer"
              className="task cyan"
            >
              <span className="taskRow">
                <span className="taskArrow">↗</span>
                <span className="taskMini">SIGNAL 01</span>
              </span>
              <span className={`taskName ${orbitron.className}`}>FOLLOW</span>
            </a>

            <a
              href="https://x.com/SkelethNFT/status/2043767748539429086"
              target="_blank"
              rel="noreferrer"
              className="task purple"
            >
              <span className="taskRow">
                <span className="taskArrow">↗</span>
                <span className="taskMini">SIGNAL 02</span>
              </span>
              <span className={`taskName ${orbitron.className}`}>LIKE</span>
            </a>

            <a
              href="https://twitter.com/intent/retweet?tweet_id=2043767748539429086"
              target="_blank"
              rel="noreferrer"
              className="task green"
            >
              <span className="taskRow">
                <span className="taskArrow">↗</span>
                <span className="taskMini">SIGNAL 03</span>
              </span>
              <span className={`taskName ${orbitron.className}`}>RETWEET</span>
            </a>

            <a
              href="https://x.com/SkelethNFT/status/2043767748539429086"
              target="_blank"
              rel="noreferrer"
              className="task orange"
            >
              <span className="taskRow">
                <span className="taskArrow">↗</span>
                <span className="taskMini">SIGNAL 04</span>
              </span>
              <span className={`taskName ${orbitron.className}`}>TAG 2</span>
            </a>
          </div>

          <div className="formWrap">
            <label className="fieldLabel">TWITTER</label>
            <input
              placeholder="@twitter"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />

            <label className="fieldLabel">ETH WALLET</label>
            <input
              placeholder="0x wallet"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />

            <label className="fieldLabel">PROOF TAG</label>
            <input
              placeholder="https://x.com/.../status/..."
              value={proof}
              onChange={(e) => setProof(e.target.value)}
            />

            <button
              className={`submitBtn ${orbitron.className}`}
              onClick={submitEntry}
            >
              SUBMIT YOUR ENTRY
            </button>

            {msg && (
              <p className={isError ? "errorMsg" : "okMsg"}>{msg}</p>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        :global(html, body) {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
          overflow-x: hidden;
          background: #05050b;
        }

        :global(*) {
          box-sizing: border-box;
        }

        .page {
          min-height: 100svh;
          width: 100%;
          position: relative;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          background-color: #05050b;
          color: white;
          overflow-x: hidden;
          isolation: isolate;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background:
            linear-gradient(to bottom, rgba(3, 3, 10, 0.45), rgba(3, 3, 10, 0.82)),
            radial-gradient(circle at center, rgba(0, 204, 255, 0.08), rgba(0, 0, 0, 0.72));
          pointer-events: none;
          z-index: 0;
        }

        .noise {
          position: fixed;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 100% 3px;
          opacity: 0.06;
          pointer-events: none;
          z-index: 0;
        }

        .nav,
        .hero,
        .signalsSection {
          position: relative;
          z-index: 2;
        }

        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(6px);
        }

        .logo {
          font-size: 18px;
          color: #ffe600;
          text-shadow: 2px 2px 0 #ff2d8f;
          letter-spacing: 2px;
        }

        .links {
          display: flex;
          gap: 26px;
          font-size: 12px;
          letter-spacing: 1px;
        }

        .links a {
          color: rgba(255, 255, 255, 0.88);
          text-decoration: none;
        }

        .links a:hover {
          color: #00e5ff;
        }

        .joinTop {
          border: 2px solid #ffffff;
          background: #ff4fa1;
          color: white;
          padding: 10px 16px;
          cursor: pointer;
          font-size: 12px;
          box-shadow: 4px 4px 0 #ffffff22;
        }

        .hero {
          min-height: calc(100svh - 72px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px 60px;
        }

        .topline {
          color: #00e5ff;
          font-size: 12px;
          letter-spacing: 4px;
          margin-bottom: 20px;
        }

        .title {
          margin: 0;
          font-size: clamp(64px, 14vw, 160px);
          line-height: 0.95;
          color: #ffffff;
          text-shadow:
            6px 6px 0 #ff2d8f,
            -3px -3px 0 #1ce8ff,
            0 0 24px rgba(255, 255, 255, 0.08);
          animation: titleGlitch 2.8s infinite steps(1);
        }

        .skulls {
          margin-top: 12px;
          font-size: 30px;
          opacity: 0.85;
        }

        .badge {
          display: inline-block;
          margin-top: 24px;
          padding: 12px 18px;
          border: 3px solid #ffe600;
          color: #ffe600;
          background: rgba(0, 0, 0, 0.52);
          font-size: 16px;
          letter-spacing: 2px;
          box-shadow: 0 0 18px rgba(255, 230, 0, 0.1);
        }

        .desc {
          margin-top: 24px;
          font-size: 18px;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.78);
          max-width: 760px;
        }

        .heroButtons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-top: 34px;
          flex-wrap: wrap;
        }

        .yellowBtn,
        .cyanBtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 220px;
          padding: 16px 20px;
          text-decoration: none;
          cursor: pointer;
          font-size: 14px;
          letter-spacing: 1px;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .yellowBtn {
          border: 3px solid #000;
          background: #ffe600;
          color: #000;
          box-shadow: 6px 6px 0 #ff2d8f;
        }

        .cyanBtn {
          border: 3px solid #000;
          background: #00d7ff;
          color: #001018;
          box-shadow: 6px 6px 0 #0a2740;
        }

        .yellowBtn:hover,
        .cyanBtn:hover,
        .joinTop:hover {
          transform: translateY(-2px);
        }

        .signalsSection {
          padding: 40px 20px 90px;
          display: flex;
          justify-content: center;
        }

        .signalsCard {
          width: 100%;
          max-width: 980px;
          background: rgba(0, 0, 0, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 34px;
          backdrop-filter: blur(8px);
          box-shadow: 0 0 26px rgba(0, 0, 0, 0.35);
        }

        .cardHead {
          text-align: center;
          margin-bottom: 24px;
        }

        .signalsTitle {
          margin: 0;
          font-size: 32px;
          color: white;
          letter-spacing: 5px;
        }

        .signalsSub {
          margin-top: 12px;
          color: rgba(255, 255, 255, 0.68);
          font-size: 16px;
        }

        .taskGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 24px;
          margin-bottom: 28px;
        }

        .task {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 120px;
          padding: 18px;
          text-decoration: none;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .task:hover {
          transform: translateY(-2px);
        }

        .taskRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .taskArrow {
          font-size: 24px;
        }

        .taskMini {
          font-size: 11px;
          letter-spacing: 2px;
          opacity: 0.72;
        }

        .taskName {
          font-size: 22px;
          letter-spacing: 1px;
        }

        .cyan {
          box-shadow: 0 0 14px rgba(0, 215, 255, 0.08);
          border-color: rgba(0, 215, 255, 0.28);
        }

        .purple {
          box-shadow: 0 0 14px rgba(195, 83, 255, 0.08);
          border-color: rgba(195, 83, 255, 0.28);
        }

        .green {
          box-shadow: 0 0 14px rgba(103, 255, 127, 0.08);
          border-color: rgba(103, 255, 127, 0.28);
        }

        .orange {
          box-shadow: 0 0 14px rgba(255, 173, 57, 0.08);
          border-color: rgba(255, 173, 57, 0.28);
        }

        .formWrap {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .fieldLabel {
          margin-top: 4px;
          font-size: 12px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.78);
        }

        input {
          width: 100%;
          padding: 15px;
          background: rgba(0, 0, 0, 0.85);
          border: 2px solid rgba(0, 215, 255, 0.22);
          color: #dff7ff;
          font-size: 15px;
          outline: none;
        }

        input:focus {
          border-color: rgba(0, 215, 255, 0.64);
          box-shadow: 0 0 12px rgba(0, 215, 255, 0.1);
        }

        .submitBtn {
          margin-top: 10px;
          border: 3px solid #000;
          background: linear-gradient(90deg, #ffe600, #fff06a);
          color: #000;
          padding: 18px;
          font-size: 14px;
          letter-spacing: 2px;
          cursor: pointer;
          box-shadow: 6px 6px 0 #ff2d8f;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .submitBtn:hover {
          transform: translateY(-2px);
        }

        .okMsg,
        .errorMsg {
          margin-top: 8px;
          text-align: center;
          font-size: 15px;
          font-weight: 600;
        }

        .okMsg {
          color: #79ffb5;
        }

        .errorMsg {
          color: #ff5d63;
        }

        @keyframes titleGlitch {
          0%,
          100% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(-1px, 1px);
          }
          40% {
            transform: translate(2px, -1px);
          }
          60% {
            transform: translate(-2px, 1px);
          }
          80% {
            transform: translate(1px, -1px);
          }
        }

        @media (max-width: 820px) {
          .nav {
            padding: 16px;
            gap: 12px;
          }

          .links {
            display: none;
          }

          .title {
            font-size: clamp(54px, 16vw, 100px);
          }

          .desc {
            font-size: 15px;
          }

          .taskGrid {
            grid-template-columns: 1fr;
          }

          .signalsCard {
            padding: 22px;
          }

          .taskName {
            font-size: 18px;
          }

          .heroButtons {
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
}