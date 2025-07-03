import React, { useState, useRef } from "react";
import "./App.css";

const questions = [
  {
    id: 1,
    audio: `${process.env.PUBLIC_URL}/audio/adi.mp3`,
    options: ["Tk", "Surya", "Aditya"],
    correct: "Aditya",
    image: `${process.env.PUBLIC_URL}/images/adi.jpg`,
  },
  {
    id: 2,
    audio: `${process.env.PUBLIC_URL}/audio/jai.mp3`,
    options: ["Vinay", "Jairaj", "Rakesh"],
    correct: "Jairaj",
    image: `${process.env.PUBLIC_URL}/images/jai.jpg`,
  },
  {
    id: 3,
    audio: `${process.env.PUBLIC_URL}/audio/lavs.mp3`,
    options: ["Lavanya", "Sarika", "Rohini"],
    correct: "Lavanya",
    image: `${process.env.PUBLIC_URL}/images/lavs.jpg`,
  },
  {
    id: 4,
    audio: `${process.env.PUBLIC_URL}/audio/rakesh.mp3`,
    options: ["Shiva", "Pardiv", "Rakesh"],
    correct: "Rakesh",
    image: `${process.env.PUBLIC_URL}/images/rakesh.jpg`,
  },
  {
    id: 5,
    audio: `${process.env.PUBLIC_URL}/audio/rohini.mp3`,
    options: ["Sindhu", "Rohini", "Sarika"],
    correct: "Rohini",
    image: `${process.env.PUBLIC_URL}/images/rohini.jpg`,
  },
  {
    id: 6,
    audio: `${process.env.PUBLIC_URL}/audio/sarika.mp3`,
    options: ["Sarika", "Lavanya", "Sindhu"],
    correct: "Sarika",
    image: `${process.env.PUBLIC_URL}/images/sarika.jpg`,
  },
  {
    id: 7,
    audio: `${process.env.PUBLIC_URL}/audio/vinay.mp3`,
    options: ["Vinay", "Shiva", "Varun"],
    correct: "Vinay",
    image: `${process.env.PUBLIC_URL}/images/vinay.jpg`,
  },
  {
    id: 8,
    audio: `${process.env.PUBLIC_URL}/audio/pardiv.mp3`,
    options: ["Pardiv", "Surya", "Sunil"],
    correct: "Pardiv",
    image: `${process.env.PUBLIC_URL}/images/pardiv.jpg`,
  },
  {
    id: 9,
    audio: `${process.env.PUBLIC_URL}/audio/tk.mp3`,
    options: ["Jairaj", "Aditya", "Ganesh"],
    correct: "Ganesh",
    image: `${process.env.PUBLIC_URL}/images/tk.jpg`,
  },
  {
    id: 10,
    audio: `${process.env.PUBLIC_URL}/audio/shiva.mp3`,
    options: ["Jairaj", "Sairohit", "Shiva"],
    correct: "Shiva",
    image: `${process.env.PUBLIC_URL}/images/shiva.jpg`,
  },
  {
    id: 11,
    audio: `${process.env.PUBLIC_URL}/audio/surya.mp3`,
    options: ["Sunil", "Surya", "Harsha"],
    correct: "Surya",
    image: `${process.env.PUBLIC_URL}/images/surya.jpg`,
  },
  {
    id: 12,
    audio: `${process.env.PUBLIC_URL}/audio/sindhu.mp3`,
    options: ["Sindhu", "sindhu", "Sindu"],
    correct: "Sindhu",
    image: `${process.env.PUBLIC_URL}/images/sindhu.jpg`,
  },
  {
    id: 13,
    audio: `${process.env.PUBLIC_URL}/audio/jyo.mp3`,
    options: ["Sairohit", "Sunil", "Harsha"],
    correct: "Sairohit",
    image: `${process.env.PUBLIC_URL}/images/jyo.jpg`,
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
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="page">
      <img src={`${process.env.PUBLIC_URL}/images/bg.jpg`} alt="bg" className="bg" />
      {isJyothsna && confirmCheck && !finalStep && (
        <div className="score-panel">
          <h3>Score: {score}</h3>
          <div className="unlocked-photos">
            {unlocked.map((q) => (
              <img key={q.id} src={q.image} alt={`${q.correct}'s photo`} className="memory" />
            ))}
          </div>
        </div>
      )}

      {isJyothsna === null && (
        <div className="center-box">
          <img src={`${process.env.PUBLIC_URL}/images/teddy.jpeg`} alt="teddy" className="teddy" />
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

          {!audioEnded && <p className="waiting-msg">⏳ Listen completely before answering!</p>}

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

          {wrong && <p className="wrong-msg">❌ Oops! Try again after replaying the audio.</p>}
        </div>
      )}

      {blast && <div className="blast-screen">💥</div>}
      {showCenterImage && (
        <div className="full-image-blast">
          <img src={showCenterImage} alt="correct" />
        </div>
      )}

      {isJyothsna && confirmCheck && currentQ >= questions.length && !finalStep && (
        <div className="center-box">
          <h2>You can unlock now your gift 🎁</h2>
          <button onClick={() => setFinalStep(true)}>Yup</button>
        </div>
      )}

      {finalStep && !showBirthday && (
        <div className="center-box">
          <h1>Click to see surprise 🎉</h1>
          <button onClick={() => setShowBirthday(true)}>Show</button>
        </div>
      )}

      {finalStep && showBirthday && (
        <div className="birthday-final scroll-container">
          <h1>🎂 Happy Birthday 🎂</h1>
          <button
            className="scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Scroll to Top
          </button>
          {unlocked.map((q, i) => (
            <img
              key={i}
              src={q.image}
              alt={`gift-${i}`}
              className="floating-photo"
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
