import "./index.css";
import Alphabet from "./Alphabet.jsx";
import Assembly from "./Assembly";
import Blank from "./Blank";
import Language from "./Language";
import Message from "./Message";
import React from "react";
import { languages } from "./languages";

const App = () => {
  // 1111111111111111111 GENEREATE A RANDOM WORD FROM THE LIST OF BELOW TO BE GUESSED 1111111111111111111
  const [word, setWord] = React.useState(() => getWord());
  const [attempts, setAttempts] = React.useState(1);
  const [gameWon, setGameWon] = React.useState(false);
  const [guessedWord, setGuessedWord] = React.useState(() => getWordLength());
  const [alert, setAlert] = React.useState("");
  const messageRef = React.useRef(null);
  const [reset, setReset] = React.useState(false);
  const keyboardRef = React.useRef(null);
  function getWord() {
    const wordList = [
      "KEYWORD",
      "SCIENCE",
      "COMPUTER",
      "MOUSE",
      "LIBRARY",
      "PACKAGE",
      "HUMAN",
      "CODE",
      "NUMBER",
      "FUNCTION",
      "INTERFACE",
      "PYTHON",
      "CRICKET",
      "LOVE",
      "JAVASCRIPT",
      "REACT",
      "DEVELOPER",
      "SOFTWARE",
      "ENGINEER",
      "PROGRAMMING",
      "DEBUGGING",
      "DATABASE",
      "ALGORITHM",
      "NETWORK",
    ];

    const index = Math.floor(Math.random() * wordList.length);
    return wordList[index];
  }

  // 22222222222222222222222 END GENEREATE A RANDOM WORD FROM THE LIST OF BELOW TO BE GUESSED 2222222222222

  // 33333333333333333 LANGUAGE RELATED CODE WHICH CONTAINS A LIST OF LANGUAGES AND ITS JSX COMPONENTS 3333333333333333

  const languageComponents = languages.map((language) => (
    <Language
      key={language.id}
      design={`bg-${language.color}-500 text-white py-1 rounded-sm text-center px-2 language`}
      language={language.name}
      id={language.id}
    />
  ));

  // 4444444444444444 END LANGUAGE RELATED CODE WHICH CONTAINS A LIST OF LANGUAGES AND ITS JSX COMPONENTS 4444444444444444

  // 55555555555555555 ALPHABETS RELATED CODE WHICH CONTAINS A LIST OF ALPHABETS AND ITS JSX COMPONENTS 5555555555555555
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphabetsElements = alphabets
    .split("")
    .map((char) => (
      <Alphabet key={char} char={char} click={() => handleClick(char)} />
    ));

  const clickSound = React.useMemo(() => {
    const sound = new Audio("click.mp3");
    return sound;
  }, []);

  const lostSound = React.useMemo(() => {
    const sound = new Audio("lostSound.wav");
    return sound;
  }, []);
  const winSound = React.useMemo(() => {
    const sound = new Audio("win.wav");
    return sound;
  }, []);

  function handleClick(char) {
    clickSound.pause();
    clickSound.preload = true;
    clickSound.play();
    if (word.includes(char)) {
      word.split("").forEach((letter, index) => {
        if (letter === char) {
          const blanks = document.querySelectorAll(".blank");
          // Update the guessedWord state to include the correct letter in the correct position
          setGuessedWord((prev) => {
            const newGuessedWord = [...prev];
            newGuessedWord[index] = letter;
            return newGuessedWord;
          });

          blanks[index].textContent = letter;
          // Disable the button and change its color to green
          document.getElementById(char).disabled = true;
          document.getElementById(char).classList.add("bg-green-500");
        }
      });
    } else {
      // Disable the button and change its color to red
      let lang = document.getElementById(attempts);
      lang.className = `line-through text-gray-500 bg-red-500/30 items-center flex justify-center py-1 rounded-sm text-center language px-2`;
      setAttempts((pre) => pre + 1);
      if (attempts === 8) {
        // setMessage(languages[attempts - 1].error)

        setMessage();
      } else {
        setMessage(languages[attempts - 1].error);
      }
      document.getElementById(char).disabled = true;
      document.getElementById(char).classList.add("bg-red-500");
    }
  }
  // 666666666666666666666 END ALPHABETS RELATED CODE WHICH CONTAINS A LIST OF ALPHABETS AND ITS JSX COMPONENTS 6666666666666666
  if (guessedWord.join("") === word && gameWon === false) {
    winSound.preload = true;
    winSound.play();
    setGameWon(true);
  }
  // 777777777777777777777 Alert Message for every key stroke and the end of the game 77777777777777777777
  function setMessage(text) {
    messageRef.current.classList.remove("invisible");
    messageRef.current.classList.add("visible");
    messageRef.current.classList.add("bg-red-500/70");
    if (text) {
      setAlert(text);
      messageRef.current.classList.remove("bg-red-500/70");
      messageRef.current.classList.add("bg-blue-500/70");
    } else {
      lostSound.preload = true;
      lostSound.play();
      setAlert(
        `You have lost the game! The word was ${word}. start learning Assembly`
      );
      keyboardRef.current.classList.add("opacity-50");
      disableAllButtons();

      // xxx
    }
  }
  function disableAllButtons() {
    document.querySelectorAll(".keyboard").forEach((button) => {
      button.disabled = true;
      // button.classList.add("bg-red-500");
    });
  }
  // 88888888888888888888 END Alert Message for every key stroke and the end of the game 8888888888888888

  // 9999999999999999999 RESET THE GAME 9999999999999999999
  function resetGame() {
    setReset(true);
    setWord(getWord());
    setAttempts(1);
    messageRef.current.classList.remove("visible");
    messageRef.current.classList.add("invisible");
    const blanks = document.querySelectorAll(".blank");
    blanks.forEach((blank) => (blank.textContent = ""));
    const buttons = document.querySelectorAll(".Alphabet button");
    buttons.forEach((button) => {
      button.disabled = false;
      button.classList.remove("bg-red-500", "bg-green-500");
    });
    keyboardRef.current.classList.remove("opacity-50");
    setGameWon(false);
  }
  // 9999999999999999999 END RESET THE GAME 9999999999999999999

  // 0000000000000000000 GET THE LENGTH OF THE WORD 0000000000000000000
  // This function returns an array of zeros with the same length as the word
  function getWordLength() {
    return new Array(word.length).fill(0);
  }
  // 0000000000000000000 END GET THE LENGTH OF THE WORD 0000000000000000000

  React.useEffect(() => {
    if (gameWon) {
      setAlert(`You have won the game!`);
      disableAllButtons();
      keyboardRef.current.classList.add("opacity-50");
      messageRef.current.classList.remove("invisible");
      messageRef.current.classList.add("visible");
    }
  }, [gameWon]);
  React.useEffect(() => {
    document.querySelectorAll(".language").forEach((lang, index) => {
      lang.className = `bg-${languages[index].color}-500 text-white px-2 py-1 rounded-sm text-center language`;
    });
  }, [reset]);

  // 9999999999999999999 RETURN THE JSX COMPONENTS 9999999999999999999
  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col items-center space-y-8 max-w-5xl mx-auto px-2">
        <section className="Header">
          <Assembly />
        </section>
        <section className="Message w-1/2">
          <Message text={alert} ref={messageRef} />
        </section>

        <section className="Languages flex flex-col items-center ">
          <div className="flex flex-wrap gap-2 justify-center text-center mt-4 max-w-2/3">
            {languageComponents}
          </div>
        </section>
        {/* <Language color="green" language="Css" /> */}
        <section className="Blanks">
          <div className="Blanks flex space-x-2">
            {Array.from({ length: word.length }, (_, ind) => (
              <Blank key={ind} char="" />
            ))}
          </div>
        </section>
        {/* grid grid-cols-7 md:grid-cols-12 gap-2 */}
        <section
          className="Kayboard flex flex-col items-center "
          ref={keyboardRef}
        >
          <div className="Alphabet flex flex-wrap gap-1 md:gap-2  justify-center mt-4 md:w-1/2">
            {alphabetsElements}
          </div>
        </section>
        {/* new game */}
        <div>
          {attempts > 8 || gameWon ? (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => {
                resetGame();
              }}
            >
              New Game
            </button>
          ) : null}
        </div>
        <div className="text-center text-gray-200 font-semibold text-xl -mt-4">
          <small>Developed by Nowshad Halimzai</small>
        </div>
      </div>
    </div>
  );
};
// 9999999999999999999 END RETURN THE JSX COMPONENTS 9999999999999999999

export default App;
