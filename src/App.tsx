import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import TextTransition, { presets } from "react-text-transition";
import pop from "../src/assets/pop.mp3";
import "bootstrap/dist/css/bootstrap.min.css";

const GAME_TIME = 1;

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(GAME_TIME);
  const [targetPosition, setTargetPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 50, left: 50 });
  const [play] = useSound(pop);

  // Démarrer le jeu
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(GAME_TIME);
    moveTarget();
  };

  // Gestion du timer et fin de partie
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false); // Fin du jeu
    }
  }, [isPlaying, timeLeft]);

  // Déplacer la cible aléatoirement sur l'écran
  const moveTarget = () => {
    const randomTop = Math.random() * 80 + 15;
    const randomLeft = Math.random() * 80 + 15;
    setTargetPosition({ top: randomTop, left: randomLeft });
  };

  // Gérer les clics sur la cible
  const handleClick = () => {
    if (isPlaying) {
      play();
      setScore((prevScore) => prevScore + 1);
      moveTarget();
    }
  };

  return (
    <div className="">
      <div className="container text-center mt-5">
        <h1 className="mb-4">Click War</h1>
        <div className="mb-3">
          <h3>Score: {score}</h3>
          {isPlaying ? (
            <h3>
              {"Temps restant : "}
              {timeLeft}
              {" s"}
            </h3>
          ) : null}
        </div>

        {!isPlaying && (
          <button onClick={startGame} className="btn btn-dark btn-lg">
            Jouer
          </button>
        )}

        {isPlaying && (
          <div
            className="position-absolute"
            style={{
              top: `${targetPosition.top}%`,
              left: `${targetPosition.left}%`,
              width: "50px",
              height: "50px",
              backgroundColor: "#28242c",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "red",
              fontSize: "24px",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            🔥
          </div>
        )}

        <TextTransition className="h3 mx-5" springConfig={presets.wobbly}>
          {!isPlaying && timeLeft === 0 && (
            <div className="mt-4">
              <br />
              <p className="h4">Game Over!</p>
              <button
                className="btn btn-dark btn-md"
                onClick={() => {
                  window.open("https://dev.imaki.fr");
                }}
              >
                Voir plus de projets
              </button>
            </div>
          )}
        </TextTransition>
      </div>
    </div>
  );
};

export default App;
