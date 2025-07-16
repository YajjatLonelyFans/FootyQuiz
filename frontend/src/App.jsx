import { useState , useEffect} from 'react'
import './App.css'
import io from 'socket.io-client'
import {toast , ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const socket = io('http://localhost:3000') 

function App() {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [info, setInfo] = useState(false)
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState([])
  const [scores, setScores] = useState([])
  const [seconds, setSeconds] = useState(30) // Example timer value
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [answered, setAnswered] = useState(false)

  useEffect(() => {
    if(name){
      socket.emit("joinRoom", { name, room })
    }
  }, [info])
  useEffect(() => {
    socket.on("message", (message) => {
      toast(`${message} joined`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
    return () => {
      socket.off("message");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && room) {
      setInfo(true)
      
    }
  }

  const handleAnswer = (index) => {
    setSelectedAnswerIndex(index)
    setAnswered(true)
    
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {!info ? (
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mb-8 tracking-wide">QuizzyRooms</h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              required
              placeholder='Enter your name...'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              required
              placeholder='Enter Room ID'
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button type='submit' className="mt-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition">Join</button>
          </form>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-xl flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mb-6 tracking-wide">QuizzyRooms</h1>
          <p className="text-gray-300 mb-6 text-lg">Room id: {room}</p>
          <ToastContainer />

          {question ? (
            <div className='quiz-div w-full'>
              <p className="text-right text-gray-400 mb-2 text-sm">Remaining Time: <span className="font-semibold text-white">{seconds}</span></p>

              <div className='question mb-6'>
                <p className='question-text text-2xl font-semibold text-white text-center'>{question}</p>
              </div>

              <ul className="flex flex-col gap-4 mb-8">
                {options.map((answer, index) => (
                  <li key={index} className="w-full">
                    <button
                      className={`options w-full py-3 rounded-lg text-lg font-medium border border-gray-700 transition focus:outline-none ${selectedAnswerIndex === index ? 'bg-blue-600 text-white border-blue-400' : 'bg-gray-700 text-gray-200 hover:bg-blue-700 hover:text-white'} ${answered ? 'opacity-60 cursor-not-allowed' : ''}`}
                      onClick={() => handleAnswer(index)}
                      disabled={answered}
                    >
                      {answer}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="w-full flex flex-col gap-2 mt-4">
                {scores.map((player, index) => (
                  <p key={index} className="text-gray-300 text-base text-center">{player.name}: <span className="font-bold text-blue-400">{player.score}</span></p>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-lg">Loading question...</p>
          )}
        </div>
      )}
    </div>
  )
}

export default App
