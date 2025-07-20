import { useState, useEffect } from 'react';
import './App.css';
import socket from './socket';
import SideBar from './SideBar';
import Leaderboard from './LeaderBoard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFutbol, FaStopwatch, FaTrophy } from 'react-icons/fa';


function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [info, setInfo] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [scores, setScores] = useState([]);
  const [seconds, setSeconds] = useState(30);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (seconds === 0) return;
    const interval = setInterval(() => setSeconds(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
  if (info && name && room) {
    socket.emit('joinRoom', { name, room });
  }
}, [info, name, room]);


  useEffect(() => {
    socket.on('newQuestion', (data) => {
      setQuestion(data.question);
      setOptions(data.answers);
      setScores(data.scores);
      setSeconds(30);
      setAnswered(false);
      setSelectedAnswerIndex(null);
    });

    socket.on('answerResult', (data) => {
      if (data.isCorrect) {
        toast.success(`${data.playerName} answered correctly!`, { theme: 'dark' });
      }
      setScores(data.scores);
    });

    socket.on('gameOver', (data) => {
      setWinner(data.winner);
    });

    return () => {
      socket.off('newQuestion');
      socket.off('answerResult');
      socket.off('gameOver');
    };
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      toast(`${message} joined`, { theme: 'dark' });
    });
    return () => socket.off('message');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && room) setInfo(true);
  };

  const handleAnswer = (index) => {
    if (!answered) {
      setSelectedAnswerIndex(index);
      setAnswered(true);
      socket.emit('submitAnswer', { room, answerIndex: index });
    }
  };

  return (
    <div className="min-h-screen mature-bg flex items-center justify-center p-0 lg:p-4 overflow-hidden">
      {!info ? (
        <div className="glass-card shadow-2xl p-8 w-full max-w-md flex flex-col items-center border border-[var(--color-border)]">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] mb-8 tracking-widest flex items-center gap-3">
            <FaFutbol className="text-[var(--color-primary)]" />
            <span className="hidden sm:inline">FootyQuiz</span>
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              required
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-lg border font-semibold text-base"
            />
            <input
              required
              placeholder="Enter Room ID"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="px-4 py-3 rounded-lg border font-semibold text-base"
            />
            <button
              type="submit"
              className="mt-4 py-3 rounded-lg font-bold text-base transition shadow"
            >
              Join
            </button>
          </form>
        </div>
      ) : winner ? (
        <div className="glass-card shadow-2xl p-8 w-full max-w-md flex flex-col items-center border border-[var(--color-primary)]">
          <h1 className="text-4xl font-extrabold text-[var(--color-primary)] mb-6 tracking-widest flex items-center gap-3">
            <FaTrophy className="text-[var(--color-primary)]" />Winner!
          </h1>
          <p className="text-white text-2xl mb-4 font-bold">{winner} has won the game <span className="text-3xl">🎉</span></p>
          <p className="text-[var(--color-text-muted)] mb-8 text-lg">Room ID: {room}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-3 rounded-lg font-bold text-lg transition shadow"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row w-full h-screen overflow-hidden">
          
          <div className="flex-1 bg-transparent p-4 lg:p-8 flex flex-col items-center justify-start">
           
            <div className="w-full max-w-4xl flex flex-col items-center mb-6">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] mb-4 tracking-widest flex items-center gap-3">
                <FaFutbol className="text-[var(--color-primary)]" />
                <span className="hidden sm:inline">FootyQuiz</span>
              </h1>
              <p className="text-[var(--color-text-muted)] text-sm lg:text-lg">Room id: {room}</p>
            </div>

            <ToastContainer />

           
            <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center">
             
              <div className="w-full lg:w-80 flex-shrink-0 order-2 lg:order-1">
                <Leaderboard scores={scores} currentUser={name} />
              </div>

             
              <div className="flex-1 max-w-2xl order-1 lg:order-2">
                {question ? (
                  <div className="quiz-div w-full">
                    <p className="text-right text-[var(--color-accent)] mb-4 text-sm lg:text-lg flex items-center gap-2 justify-end">
                      <FaStopwatch className="text-[var(--color-primary)]" />
                      <span className="font-semibold text-white text-2xl lg:text-3xl">{seconds}</span>
                    </p>
                    <div className="question mb-6 lg:mb-8">
                      <p className="question-text text-xl lg:text-3xl font-extrabold text-center drop-shadow-lg leading-tight text-white">
                        {question}
                      </p>
                    </div>
                    <ul className="flex flex-col gap-3 lg:gap-4">
                      {options.map((answer, index) => (
                        <li key={index} className="w-full">
                          <button
                            className={`options w-full py-3 lg:py-4 px-4 lg:px-6 text-base lg:text-lg font-bold border-2 transition focus:outline-none shadow-lg rounded-lg ${
                              selectedAnswerIndex === index 
                                ? 'selected' 
                                : ''
                            } ${answered ? 'opacity-60 cursor-not-allowed' : ''}`}
                            onClick={() => handleAnswer(index)}
                            disabled={answered}
                          >
                            {answer}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-[var(--color-text-muted)] text-xl lg:text-2xl">Loading question...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        
          <div className="fixed lg:relative top-0 right-0 w-full lg:w-[400px] h-full lg:h-auto z-50 lg:z-auto">
            <SideBar name={name} room={room} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;