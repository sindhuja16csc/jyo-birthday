import React, { useState, useRef } from "react";
import "./App.css";

const questions = [
  {
    id: 1,
    audio: "/audio/adi.mp3",
    options: ["Tk", "Surya", "Aditya"],
    correct: "Aditya",
    image: "/images/adi.jpg",
  },
  {
    id: 2,
    audio: "/audio/jai.mp3",
    options: ["Vinay", "Jairaj", "Rakesh"],
    correct: "Jairaj",
    image: "/images/jai.jpg",
  },
  {
    id: 3,
    audio: "/audio/lavs.mp3",
    options: ["Lavanya", "Sarika", "Rohini"],
    correct: "Lavanya",
    image: "/images/lavs.jpg",
  },
  {
    id: 4,
    audio: "/audio/rakesh.mp3",
    options: ["Shiva", "Pardiv", "Rakesh"],
    correct: "Rakesh",
    image: "/images/rakesh.jpg",
  },
  {
    id: 5,
    audio: "/audio/rohini.mp3",
    options: ["Sindhu", "Rohini", "Sarika"],
    correct: "Rohini",
    image: "/images/rohini.jpg",
  },
  {
    id: 6,
    audio: "/audio/sarika.mp3",
    options: ["Sarika", "Lavaya", "Sindhu"],
    correct: "Sarika",
    image: "/images/sarika.jpg",
  },
  {
    id: 7,
    audio: "/audio/vinay.mp3",
    options: ["Vinay", "Shiva", "Varun"],
    correct: "Vinay",
    image: "/images/vinay.jpg",
  },
  {
    id: 8,
    audio: "/audio/pardiv.mp3",
    options: ["Pardiv", "Surya", "Sunil"],
    correct: "Pardiv",
    image: "/images/pardiv.jpg",
  },
  {
    id: 9,
    audio: "/audio/tk.mp3",
    options: ["Jairaj", "Aditya", "Ganesh"],
    correct: "Ganesh",
    image: "/images/tk.jpg",
  },
  {
    id: 10,
    audio: "/audio/shiva.mp3",
    options: ["Jairaj", "Sairohit", "Shiva"],
    correct: "Shiva",
    image: "/images/shiva.jpg",
  },

  {
    id: 11,
    audio: "/audio/Surya.mp3",
    options: ["Sunil", "Surya", "Harsha"],
    correct: "Surya",
    image: "/images/surya.jpg", 
  },

  {
    id: 12,
    audio: "/audio/Sindhu.mp3",
    options: ["Sindhu", "sindhu", "Sindu"],
    correct: "Sindhu",
    image: "/images/sindhu.jpg",
  },
  {
    id: 12,
    audio: "/audio/jyo.mp3",
    options: ["Sairohit", "Sunil", "Harsha"],
    correct: "Sairohit",
    image: "/images/jyo.jpg",
  },
];

function App() {
  const [isJyothsna, setIsJyothsna] = useState(null);
  const [confirmCheck, setConfirmCheck] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [unlocked, setUnlocked] = useState([]);
  const [score, setScore] = useState(0);
  const [blast, setBlast] = useState(false);
  const [showCenterImage, setShowCenterImage] = useState(null);
  const [finalStep, setFinalStep] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const [wrong, setWrong] = useState(false);
  const audioRef = useRef(null);

  const handleOption = (ans) => {
    const q = questions[currentQ];
    if (ans === q.correct) {
      setScore(score + 1);
      setShowCenterImage(q.image);
      setBlast(true);
      setTimeout(() => {
        setUnlocked((prev) => [...prev, q]);
        setShowCenterImage(null);
        setBlast(false);
        setAudioEnded(false);
        setWrong(false);
        setCurrentQ((prev) => prev + 1);
      }, 3000);
    } else {
      setWrong(true);
      setAudioEnded(false);
      // Replay the audio
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="page">
      <img src="/images/bg.jpg" alt="bg" className="bg" />

      {/* Score Panel */}
      {isJyothsna && confirmCheck && !finalStep && (
        <div className="score-panel">
          <h3>Score: {score}</h3>
          <div className="unlocked-photos">
            {unlocked.map((q) => (
              <img key={q.id} src={q.image} alt="memory" className="memory" />
            ))}
          </div>
        </div>
      )}

      {/* Welcome */}
      {isJyothsna === null && (
        <div className="center-box">
          <img src="/images/teddy.jpeg" alt="teddy" className="teddy" />
          <h2>Is this Jyothsna?</h2>
          <button onClick={() => setIsJyothsna(true)}>Yes</button>
          <button onClick={() => setIsJyothsna(false)}>No</button>
        </div>
      )}

      {isJyothsna === false && (
        <div className="center-box">
          <h2>Waiting for Jyo...</h2>
        </div>
      )}

      {isJyothsna && !confirmCheck && (
        <div className="center-box">
          <h1 className="big-text">Wait, let me check...</h1>
          <button onClick={() => setConfirmCheck(true)}>OK</button>
        </div>
      )}

      {/* Quiz Box */}
      {isJyothsna && confirmCheck && currentQ < questions.length && (
        <div className="quiz-box centered-box">
          <h3>Guess the audio?</h3>
          <audio
            controls
            autoPlay
            ref={audioRef}
            src={questions[currentQ].audio}
            onEnded={() => setAudioEnded(true)}
            onPlay={() => setAudioEnded(false)}
          ></audio>

          {!audioEnded && (
            <p className="waiting-msg">⏳ Listen completely before answering!</p>
          )}

          <div className="options-row">
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOption(opt)}
                className="option-button"
                disabled={!audioEnded}
              >
                {opt}
              </button>
            ))}
          </div>

          {wrong && (
            <p className="wrong-msg">❌ Oops! Try again after replaying the audio.</p>
          )}
        </div>
      )}

      {/* Blast effect and center image */}
      {blast && <div className="blast-screen">💥</div>}
      {showCenterImage && (
        <div className="full-image-blast">
          <img src={showCenterImage} alt="correct" />
        </div>
      )}

      {/* Gift unlock step */}
      {isJyothsna && confirmCheck && currentQ >= questions.length && !finalStep && (
        <div className="center-box">
          <h2>You can unlock now your gift 🎁</h2>
          <button onClick={() => setFinalStep(true)}>Yup</button>
        </div>
      )}

      {/* Show button for birthday */}
      {finalStep && !showBirthday && (
        <div className="center-box">
          <h1>Click to see surprise 🎉</h1>
          <button onClick={() => setShowBirthday(true)}>Show</button>
        </div>
      )}

      {/* Final Happy Birthday View */}
      {finalStep && showBirthday && (
        <div className="birthday-final centered-box">
          <h1>🎂 Happy Birthday 🎂</h1>
          {unlocked.map((q, i) => (
            <img key={i} src={q.image} alt={`gift-${i}`} className="gift-pic" />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
