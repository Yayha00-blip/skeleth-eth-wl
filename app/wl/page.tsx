"use client";

import { useEffect, useRef, useState } from "react";
import { Orbitron, Inter } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function WL() {
  const [twitter, setTwitter] = useState("");
  const [wallet, setWallet] = useState("");
  const [proof, setProof] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [needsSoundUnlock, setNeedsSoundUnlock] = useState(false);

  const ambientRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    async function tryPlay() {
      try {
        if (!ambientRef.current) return;
        ambientRef.current.volume = 0.22;
        await ambientRef.current.play();
        setNeedsSoundUnlock(false);
      } catch {
        setNeedsSoundUnlock(true);
      }
    }

    tryPlay();
  }, []);

  async function enableSound() {
    try {
      if (!ambientRef.current) return;
      ambientRef.current.volume = 0.22;
      await ambientRef.current.play();
      setNeedsSoundUnlock(false);
    } catch {
      setNeedsSoundUnlock(true);
    }
  }

  async function send() {
    try {
      const r = await fetch("/api/wl", {
        method: "POST",
        body: JSON.stringify({
          twitter,
          wallet,
          proof,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const d = await r.json();

      if (d.ok) {
        setMsg("ENTRY RECORDED");
        setIsError(false);
      } else {
        setMsg(d.error || "Invalid proof link.");
        setIsError(true);
      }
    } catch {
      setMsg("NETWORK ERROR");
      setIsError(true);
    }
  }

  function scrollToSignals() {
    document.getElementById("signals")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <div
      className={`screen ${inter.className}`}
      style={{
        backgroundImage: "url('/bg/skeleth.png')",
      }}
    >
      <audio ref={ambientRef} src="/sound/ambient.mp3" preload="auto" loop />

      <div className="overlay" />
      <div className="heroGlow heroGlowA" />
      <div className="heroGlow heroGlowB" />
      <div className="grain" />

      {needsSoundUnlock && (
        <button
          className={`soundUnlock ${orbitron.className}`}
          onClick={enableSound}
        >
          ENABLE SOUND
        </button>
      )}

      <section className="hero">
        <div className="heroInner">
          <p className="eyebrow">ETH COLLECTION</p>

          <h1 className={`title ${orbitron.className}`}>SKELETH</h1>

          <p className="desc">
            Skeleth are lost souls reborn on Ethereum, drifting between a fading
            past and a neon future. Their bones hold forgotten memories… and the
            chain never lets them die.
          </p>

          <div className="supplyBox">
            <span className="supplyLabel">TOTAL SUPPLY</span>
            <span className={`supplyValue ${orbitron.className}`}>2222</span>
          </div>

          <button
            className={`enterBtn ${orbitron.className}`}
            onClick={scrollToSignals}
          >
            ENTER THE VAULT
            <span className="arrow">↓</span>
          </button>
        </div>
      </section>

      <section id="signals" className="content">
        <div className="card">
          <div className="cardHead">
            <h2 className={`signalsTitle ${orbitron.className}`}>SIGNALS</h2>
            <p className="signalsSub">
              Complete the sequence, then submit your identity and proof.
            </p>
          </div>

          <div className="grid">
            <a
              href="https://x.com/SkelethNFT"
              target="_blank"
              rel="noreferrer"
              className="task cyan"
            >
              <span className="taskTop">
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
              <span className="taskTop">
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
              <span className="taskTop">
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
              <span className="taskTop">
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

            <label className="fieldLabel">PROOF LINK</label>
            <input
              placeholder="https://x.com/.../status/..."
              value={proof}
              onChange={(e) => setProof(e.target.value)}
            />

            <button
              className={`submitBtn ${orbitron.className}`}
              onClick={send}
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
        .screen {
          min-height: 100vh;
          position: relative;
          color: white;
          background-size: cover;
          background-position: center;
          overflow-x: hidden;
          background-color: #05070d;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background:
            linear-gradient(
              to bottom,
              rgba(5, 7, 13, 0.24),
              rgba(5, 7, 13, 0.78)
            ),
            radial-gradient(
              circle at center,
              rgba(64, 194, 255, 0.12),
              rgba(0, 0, 0, 0.7)
            );
          z-index: 0;
          pointer-events: none;
        }

        .heroGlow {
          position: fixed;
          border-radius: 999px;
          filter: blur(90px);
          z-index: 0;
          pointer-events: none;
          opacity: 0.18;
        }

        .heroGlowA {
          width: 340px;
          height: 340px;
          top: 10%;
          left: 10%;
          background: rgba(75, 145, 255, 0.3);
          animation: driftA 8s ease-in-out infinite alternate;
        }

        .heroGlowB {
          width: 300px;
          height: 300px;
          right: 8%;
          bottom: 8%;
          background: rgba(173, 83, 255, 0.24);
          animation: driftB 9s ease-in-out infinite alternate;
        }

        .grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.07;
          background-image: radial-gradient(#ffffff 0.45px, transparent 0.45px);
          background-size: 12px 12px;
          animation: grainMove 10s linear infinite;
        }

        @keyframes driftA {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }
          to {
            transform: translate3d(24px, -18px, 0) scale(1.14);
          }
        }

        @keyframes driftB {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }
          to {
            transform: translate3d(-22px, 16px, 0) scale(1.12);
          }
        }

        @keyframes grainMove {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(6px, -4px);
          }
          50% {
            transform: translate(-4px, 5px);
          }
          75% {
            transform: translate(4px, 3px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        .soundUnlock {
          position: fixed;
          top: 18px;
          right: 18px;
          z-index: 5;
          padding: 10px 14px;
          border: 1px solid rgba(0, 204, 255, 0.45);
          background: rgba(0, 0, 0, 0.75);
          color: #dff8ff;
          cursor: pointer;
          font-size: 11px;
          letter-spacing: 2px;
          box-shadow: 0 0 18px rgba(0, 204, 255, 0.18);
        }

        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .heroInner {
          width: 100%;
          max-width: 940px;
        }

        .eyebrow {
          font-size: 13px;
          letter-spacing: 6px;
          opacity: 0.8;
          margin-bottom: 18px;
          color: rgba(226, 242, 255, 0.82);
          text-shadow: 0 0 12px rgba(101, 214, 255, 0.18);
          animation: heroFloat 4.8s ease-in-out infinite;
        }

        .title {
          margin: 0;
          font-size: clamp(50px, 10vw, 96px);
          letter-spacing: 12px;
          color: #ffffff;
          text-shadow:
            0 0 12px rgba(108, 210, 255, 0.45),
            0 0 30px rgba(78, 155, 255, 0.18);
          animation: titlePulse 4s ease-in-out infinite;
        }

        .desc {
          max-width: 760px;
          margin: 26px auto 0;
          font-size: 19px;
          line-height: 2;
          color: rgba(236, 245, 255, 0.88);
          text-shadow: 0 0 18px rgba(112, 199, 255, 0.08);
          animation: heroFloat 5.5s ease-in-out infinite;
        }

        .supplyBox {
          margin: 30px auto 0;
          width: fit-content;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 18px 24px;
          border: 1px solid rgba(95, 183, 255, 0.34);
          background: rgba(10, 14, 22, 0.42);
          box-shadow:
            0 0 18px rgba(93, 203, 255, 0.18),
            inset 0 0 12px rgba(145, 209, 255, 0.05);
          animation: heroFloat 6.4s ease-in-out infinite;
        }

        .supplyLabel {
          font-size: 11px;
          letter-spacing: 3px;
          opacity: 0.72;
          color: rgba(232, 246, 255, 0.82);
        }

        .supplyValue {
          font-size: 34px;
          letter-spacing: 4px;
          color: #ffffff;
          text-shadow: 0 0 12px rgba(90, 203, 255, 0.24);
        }

        .enterBtn {
          margin-top: 34px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 24px;
          border: 1px solid rgba(98, 194, 255, 0.4);
          background: linear-gradient(
            90deg,
            rgba(38, 174, 255, 0.95),
            rgba(104, 202, 255, 0.95)
          );
          color: #061018;
          cursor: pointer;
          font-size: 12px;
          letter-spacing: 2px;
          box-shadow: 0 0 24px rgba(0, 204, 255, 0.22);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .enterBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(0, 204, 255, 0.34);
        }

        .arrow {
          font-size: 16px;
        }

        @keyframes heroFloat {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes titlePulse {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-4px) scale(1.01);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        .content {
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
          border-radius: 18px;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 204, 255, 0.22);
          box-shadow:
            0 0 24px rgba(0, 204, 255, 0.16),
            inset 0 0 20px rgba(0, 204, 255, 0.04);
        }

        .cardHead {
          text-align: center;
          margin-bottom: 26px;
        }

        .signalsTitle {
          margin: 0;
          font-size: 32px;
          letter-spacing: 7px;
          color: #ffffff;
          text-shadow: 0 0 12px rgba(0, 204, 255, 0.35);
        }

        .signalsSub {
          margin: 14px auto 0;
          max-width: 620px;
          color: rgba(230, 248, 255, 0.68);
          line-height: 1.8;
          font-size: 15px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 26px;
        }

        .task {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 120px;
          padding: 18px;
          text-decoration: none;
          color: white;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: transform 0.22s ease, box-shadow 0.22s ease,
            border-color 0.22s ease;
        }

        .task:hover {
          transform: translateY(-3px);
        }

        .taskTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .taskMini {
          font-size: 11px;
          letter-spacing: 2px;
          opacity: 0.76;
        }

        .taskArrow {
          font-size: 24px;
          line-height: 1;
        }

        .taskName {
          font-size: 20px;
          line-height: 1.5;
          letter-spacing: 1px;
        }

        .cyan {
          border-color: rgba(0, 204, 255, 0.32);
          box-shadow: 0 0 18px rgba(0, 204, 255, 0.08);
        }

        .cyan:hover {
          box-shadow: 0 0 26px rgba(0, 204, 255, 0.18);
        }

        .purple {
          border-color: rgba(168, 85, 247, 0.32);
          box-shadow: 0 0 18px rgba(168, 85, 247, 0.08);
        }

        .purple:hover {
          box-shadow: 0 0 26px rgba(168, 85, 247, 0.18);
        }

        .green {
          border-color: rgba(34, 197, 94, 0.32);
          box-shadow: 0 0 18px rgba(34, 197, 94, 0.08);
        }

        .green:hover {
          box-shadow: 0 0 26px rgba(34, 197, 94, 0.18);
        }

        .orange {
          border-color: rgba(249, 115, 22, 0.32);
          box-shadow: 0 0 18px rgba(249, 115, 22, 0.08);
        }

        .orange:hover {
          box-shadow: 0 0 26px rgba(249, 115, 22, 0.18);
        }

        .formWrap {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .fieldLabel {
          margin-top: 6px;
          font-size: 12px;
          letter-spacing: 2px;
          color: rgba(226, 246, 255, 0.72);
        }

        input {
          width: 100%;
          padding: 15px;
          background: rgba(0, 0, 0, 0.78);
          border: 1px solid rgba(0, 204, 255, 0.28);
          color: #d9f7ff;
          font-size: 15px;
          outline: none;
        }

        input:focus {
          border-color: rgba(0, 204, 255, 0.72);
          box-shadow: 0 0 12px rgba(0, 204, 255, 0.16);
        }

        .submitBtn {
          margin-top: 8px;
          padding: 18px;
          background: linear-gradient(
            90deg,
            #00ccff,
            #47d1ff 45%,
            #a6eeff
          );
          color: #031019;
          border: none;
          cursor: pointer;
          font-size: 13px;
          letter-spacing: 2px;
          box-shadow: 0 0 26px rgba(0, 204, 255, 0.22);
          transition: transform 0.22s ease, box-shadow 0.22s ease,
            filter 0.22s ease;
          text-transform: uppercase;
        }

        .submitBtn:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 0 34px rgba(0, 204, 255, 0.34);
          filter: brightness(1.04);
        }

        .okMsg,
        .errorMsg {
          margin-top: 6px;
          text-align: center;
          font-size: 15px;
          font-weight: 600;
        }

        .okMsg {
          color: #7fffd4;
          text-shadow: 0 0 10px rgba(127, 255, 212, 0.22);
        }

        .errorMsg {
          color: #ff4d4f;
          text-shadow: 0 0 10px rgba(255, 77, 79, 0.2);
        }

        @media (max-width: 760px) {
          .heroInner {
            max-width: 100%;
          }

          .title {
            letter-spacing: 6px;
          }

          .desc {
            font-size: 15px;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .card {
            padding: 24px;
          }

          .signalsTitle {
            font-size: 24px;
          }

          .taskName {
            font-size: 17px;
          }

          .soundUnlock {
            top: 12px;
            right: 12px;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}