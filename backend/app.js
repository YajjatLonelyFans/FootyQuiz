const express = require('express')
const http = require('http')
const cors = require('cors')
const socketIo = require("socket.io")
const { clear } = require('console')

const app = express()
const server = http.createServer(app)
app.use(cors())
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})
const questions = []
const rooms = {}
const PORT = process.env.PORT || 3000
io.on("connection", (socket) => {
  
  socket.on("joinRoom", ({ name, room }) => {
    socket.join(room);
    io.to(room).emit("message", `${name} has joined the room`);
    if (!rooms[room]) {
        rooms[room] = {
            players: [],
            currentQuestion: null,
            correctAnswer: null,
            questionTimeout: null,
            shouldAskNewQuestion: true
        }
    }
    rooms[room].players.push({ name, id: socket.id });
    if(!rooms[room].currentQuestion) {
        askNewQuestions(room);
    }
  })
})

const askNewQuestions = (room) => {
    if(rooms[room].players.length === 0){
        clearTimeout(rooms[room].questionTimeout);
        delete rooms[room];
        return;
    }
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    rooms[room].currentQuestion = question

    const correctAnswerIndex = question.answers.findIndex(answer => answer.correct);
    rooms[room].correctAnswer = correctAnswerIndex;

    io.to(room).emit("newQuestion", {
        question: question.question,
        answers: question.answers.map(answer => answer.text),
        timer: 15
    });
}
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})