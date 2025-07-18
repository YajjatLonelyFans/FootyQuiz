const express = require('express')
const http = require('http')
const cors = require('cors')
const socketIo = require("socket.io")
const { clear } = require('console')
const e = require('express')

const app = express()
const server = http.createServer(app)
app.use(cors())
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})
const questions = [
  [
  {
    question: "Which player holds the record for the fastest hat-trick in Premier League history?",
    answers: [
      { text: "Wayne Rooney", correct: false },
      { text: "Mohamed Salah", correct: false },
      { text: "Michael Owen", correct: false },
      { text: "Sadio Mané", correct: true }
    ]
  },
  {
    question: "Which team has never been relegated from the Bundesliga since its founding in 1963?",
    answers: [
      { text: "Bayern Munich", correct: true },
      { text: "Werder Bremen", correct: false },
      { text: "Hamburger SV", correct: false },
      { text: "Borussia Dortmund", correct: false }
    ]
  },
  {
    question: "Who scored the winning goal in the 2010 FIFA World Cup Final?",
    answers: [
      { text: "Xavi Hernández", correct: false },
      { text: "Andrés Iniesta", correct: true },
      { text: "Robin van Persie", correct: false },
      { text: "David Villa", correct: false }
    ]
  },
  {
    question: "Who is the only player to win the Champions League with three different clubs?",
    answers: [
      { text: "Clarence Seedorf", correct: true },
      { text: "Cristiano Ronaldo", correct: false },
      { text: "Zlatan Ibrahimović", correct: false },
      { text: "Andrés Iniesta", correct: false }
    ]
  },
  {
    question: "Which club has the most domestic league titles in the world?",
    answers: [
      { text: "Rangers", correct: true },
      { text: "Real Madrid", correct: false },
      { text: "Boca Juniors", correct: false },
      { text: "Al Ahly", correct: false }
    ]
  },
  {
    question: "Which goalkeeper has the most clean sheets in Premier League history?",
    answers: [
      { text: "Petr Čech", correct: true },
      { text: "Peter Schmeichel", correct: false },
      { text: "Edwin van der Sar", correct: false },
      { text: "David de Gea", correct: false }
    ]
  },
  {
    question: "Which country has the most Copa América titles?",
    answers: [
      { text: "Uruguay", correct: true },
      { text: "Argentina", correct: false },
      { text: "Brazil", correct: false },
      { text: "Chile", correct: false }
    ]
  },
  {
    question: "Who was the manager of Greece when they won Euro 2004?",
    answers: [
      { text: "Otto Rehhagel", correct: true },
      { text: "Carlos Alberto Parreira", correct: false },
      { text: "Luis Aragonés", correct: false },
      { text: "Marcello Lippi", correct: false }
    ]
  },
  {
    question: "Which club won the first ever UEFA Champions League (formerly European Cup)?",
    answers: [
      { text: "Real Madrid", correct: true },
      { text: "Benfica", correct: false },
      { text: "Ajax", correct: false },
      { text: "Inter Milan", correct: false }
    ]
  },
  {
    question: "Which African player won the Ballon d'Or in 1995?",
    answers: [
      { text: "George Weah", correct: true },
      { text: "Samuel Eto'o", correct: false },
      { text: "Didier Drogba", correct: false },
      { text: "Abedi Pele", correct: false }
    ]
  },
  {
    question: "Which country has the most FIFA Club World Cup titles?",
    answers: [
      { text: "Spain", correct: true },
      { text: "Brazil", correct: false },
      { text: "Argentina", correct: false },
      { text: "Italy", correct: false }
    ]
  },
  {
    question: "Who captained Spain during their Euro 2008 win?",
    answers: [
      { text: "Iker Casillas", correct: true },
      { text: "Xavi", correct: false },
      { text: "Fernando Torres", correct: false },
      { text: "Raúl", correct: false }
    ]
  },
  {
    question: "Which player scored the most goals in a single World Cup tournament?",
    answers: [
      { text: "Just Fontaine", correct: true },
      { text: "Gerd Müller", correct: false },
      { text: "Ronaldo", correct: false },
      { text: "Kylian Mbappé", correct: false }
    ]
  },
  {
    question: "Which country was banned from the 1994 World Cup qualifiers for fielding overage players in a youth tournament?",
    answers: [
      { text: "Nigeria", correct: false },
      { text: "Mexico", correct: true },
      { text: "Cameroon", correct: false },
      { text: "Colombia", correct: false }
    ]
  },
  {
    question: "Which club won the most Serie A titles before the 21st century?",
    answers: [
      { text: "Juventus", correct: true },
      { text: "AC Milan", correct: false },
      { text: "Internazionale", correct: false },
      { text: "Roma", correct: false }
    ]
  },
  {
    question: "Which player won the UEFA Best Player in Europe Award in 2012?",
    answers: [
      { text: "Andrés Iniesta", correct: true },
      { text: "Cristiano Ronaldo", correct: false },
      { text: "Lionel Messi", correct: false },
      { text: "Frank Ribéry", correct: false }
    ]
  },
  {
    question: "Which nation has appeared in the most World Cup finals without winning?",
    answers: [
      { text: "Netherlands", correct: true },
      { text: "Hungary", correct: false },
      { text: "Czechoslovakia", correct: false },
      { text: "Croatia", correct: false }
    ]
  },
  {
    question: "Which World Cup final had the most goals scored in total?",
    answers: [
      { text: "1958", correct: false },
      { text: "1954", correct: true },
      { text: "2018", correct: false },
      { text: "1986", correct: false }
    ]
  },
  {
    question: "Which country won the first Olympic gold medal in football?",
    answers: [
      { text: "Great Britain", correct: true },
      { text: "Uruguay", correct: false },
      { text: "France", correct: false },
      { text: "Germany", correct: false }
    ]
  },
  {
    question: "Who is the only manager to win league titles in England, Spain, and Italy?",
    answers: [
      { text: "José Mourinho", correct: false },
      { text: "Carlo Ancelotti", correct: true },
      { text: "Pep Guardiola", correct: false },
      { text: "Fabio Capello", correct: false }
    ]
  }
],
[
  {
    question: "Which player has scored in four different World Cup tournaments for Portugal?",
    answers: [
      { text: "Cristiano Ronaldo", correct: true },
      { text: "Eusébio", correct: false },
      { text: "Deco", correct: false },
      { text: "Luis Figo", correct: false }
    ]
  },
  {
    question: "Which stadium hosted the most UEFA Champions League finals?",
    answers: [
      { text: "Wembley Stadium", correct: true },
      { text: "San Siro", correct: false },
      { text: "Santiago Bernabéu", correct: false },
      { text: "Allianz Arena", correct: false }
    ]
  },
  {
    question: "Who won the UEFA European Championship in 1992?",
    answers: [
      { text: "Denmark", correct: true },
      { text: "Germany", correct: false },
      { text: "France", correct: false },
      { text: "Italy", correct: false }
    ]
  },
  {
    question: "Which footballer won the most international caps for England?",
    answers: [
      { text: "Peter Shilton", correct: true },
      { text: "David Beckham", correct: false },
      { text: "Wayne Rooney", correct: false },
      { text: "Steven Gerrard", correct: false }
    ]
  },
  {
    question: "Which club did Ronaldinho play for before joining Barcelona?",
    answers: [
      { text: "Paris Saint-Germain", correct: true },
      { text: "AC Milan", correct: false },
      { text: "Flamengo", correct: false },
      { text: "Grêmio", correct: false }
    ]
  },
  {
    question: "Which team eliminated Brazil in the 1982 FIFA World Cup?",
    answers: [
      { text: "Italy", correct: true },
      { text: "Argentina", correct: false },
      { text: "France", correct: false },
      { text: "Germany", correct: false }
    ]
  },
  {
    question: "Which German player missed a penalty in the 2006 World Cup semi-final shootout?",
    answers: [
      { text: "Lukas Podolski", correct: false },
      { text: "Michael Ballack", correct: false },
      { text: "Oliver Neuville", correct: true },
      { text: "Miroslav Klose", correct: false }
    ]
  },
  {
    question: "Who scored a hat-trick in the 1966 World Cup Final?",
    answers: [
      { text: "Geoff Hurst", correct: true },
      { text: "Bobby Charlton", correct: false },
      { text: "Eusébio", correct: false },
      { text: "Franz Beckenbauer", correct: false }
    ]
  },
  {
    question: "Which African country was the first to reach a World Cup quarter-final?",
    answers: [
      { text: "Cameroon", correct: true },
      { text: "Nigeria", correct: false },
      { text: "Senegal", correct: false },
      { text: "Ghana", correct: false }
    ]
  },
  {
    question: "Who was the manager of Barcelona during their 2008–09 treble-winning season?",
    answers: [
      { text: "Pep Guardiola", correct: true },
      { text: "Frank Rijkaard", correct: false },
      { text: "Luis Enrique", correct: false },
      { text: "Ronald Koeman", correct: false }
    ]
  },
  {
    question: "Which country has produced the most Ballon d'Or winners?",
    answers: [
      { text: "Germany", correct: false },
      { text: "Brazil", correct: false },
      { text: "France", correct: true },
      { text: "Argentina", correct: false }
    ]
  },
  {
    question: "Who was the first footballer to be knighted by the British monarchy?",
    answers: [
      { text: "Stanley Matthews", correct: true },
      { text: "Bobby Charlton", correct: false },
      { text: "George Best", correct: false },
      { text: "Kenny Dalglish", correct: false }
    ]
  },
  {
    question: "Which team has the longest unbeaten run in international football?",
    answers: [
      { text: "Italy", correct: true },
      { text: "Brazil", correct: false },
      { text: "Spain", correct: false },
      { text: "Argentina", correct: false }
    ]
  },
  {
    question: "Who scored the fastest goal in World Cup history?",
    answers: [
      { text: "Hakan Şükür", correct: true },
      { text: "Pelé", correct: false },
      { text: "Cristiano Ronaldo", correct: false },
      { text: "Kylian Mbappé", correct: false }
    ]
  },
  {
    question: "Which manager won the Champions League with both Porto and Inter Milan?",
    answers: [
      { text: "José Mourinho", correct: true },
      { text: "Carlo Ancelotti", correct: false },
      { text: "Louis van Gaal", correct: false },
      { text: "Jupp Heynckes", correct: false }
    ]
  },
  {
    question: "Which country won the 1986 World Cup?",
    answers: [
      { text: "Argentina", correct: true },
      { text: "Germany", correct: false },
      { text: "France", correct: false },
      { text: "Italy", correct: false }
    ]
  },
  {
    question: "Who is the youngest player to ever score in a World Cup match?",
    answers: [
      { text: "Pelé", correct: true },
      { text: "Kylian Mbappé", correct: false },
      { text: "Michael Owen", correct: false },
      { text: "Lionel Messi", correct: false }
    ]
  },
  {
    question: "Which club did Fernando Torres start his professional career with?",
    answers: [
      { text: "Atlético Madrid", correct: true },
      { text: "Liverpool", correct: false },
      { text: "Chelsea", correct: false },
      { text: "Sevilla", correct: false }
    ]
  },
  {
    question: "Which team won Euro 1988?",
    answers: [
      { text: "Netherlands", correct: true },
      { text: "Germany", correct: false },
      { text: "Soviet Union", correct: false },
      { text: "Italy", correct: false }
    ]
  }
],
[
  {
    question: "Which football club has the most official trophies in history?",
    answers: [
      { text: "Al Ahly", correct: true },
      { text: "Rangers", correct: false },
      { text: "Real Madrid", correct: false },
      { text: "Barcelona", correct: false }
    ]
  },
  {
    question: "Which country was the runner-up in the 2002 FIFA World Cup?",
    answers: [
      { text: "Germany", correct: true },
      { text: "Brazil", correct: false },
      { text: "Turkey", correct: false },
      { text: "South Korea", correct: false }
    ]
  },
  {
    question: "Who won the Golden Boot in the 2014 FIFA World Cup?",
    answers: [
      { text: "James Rodríguez", correct: true },
      { text: "Lionel Messi", correct: false },
      { text: "Thomas Müller", correct: false },
      { text: "Neymar", correct: false }
    ]
  },
  {
    question: "Which Dutch player missed a crucial penalty in the 2000 Euro semi-final?",
    answers: [
      { text: "Patrick Kluivert", correct: false },
      { text: "Frank de Boer", correct: true },
      { text: "Dennis Bergkamp", correct: false },
      { text: "Clarence Seedorf", correct: false }
    ]
  },
  {
    question: "Which country has never qualified for a FIFA World Cup?",
    answers: [
      { text: "Luxembourg", correct: true },
      { text: "Slovakia", correct: false },
      { text: "Iceland", correct: false },
      { text: "Trinidad and Tobago", correct: false }
    ]
  },
  {
    question: "Who scored the only goal in the Euro 2004 final?",
    answers: [
      { text: "Angelos Charisteas", correct: true },
      { text: "Theodoros Zagorakis", correct: false },
      { text: "Cristiano Ronaldo", correct: false },
      { text: "Zisis Vryzas", correct: false }
    ]
  },
  {
    question: "Who was the first ever Ballon d'Or winner?",
    answers: [
      { text: "Stanley Matthews", correct: true },
      { text: "Alfredo Di Stéfano", correct: false },
      { text: "Ferenc Puskás", correct: false },
      { text: "Lev Yashin", correct: false }
    ]
  },
  {
    question: "Which Brazilian club has won the most Copa Libertadores titles?",
    answers: [
      { text: "São Paulo", correct: false },
      { text: "Palmeiras", correct: true },
      { text: "Flamengo", correct: false },
      { text: "Santos", correct: false }
    ]
  },
  {
    question: "Who is the youngest Ballon d’Or winner in history?",
    answers: [
      { text: "Ronaldo Nazário", correct: false },
      { text: "Lionel Messi", correct: false },
      { text: "George Best", correct: false },
      { text: "Michael Owen", correct: true }
    ]
  },
  {
    question: "Which team did Diego Maradona score his famous solo goal against in the 1986 World Cup?",
    answers: [
      { text: "England", correct: true },
      { text: "Belgium", correct: false },
      { text: "Germany", correct: false },
      { text: "Italy", correct: false }
    ]
  },
  {
    question: "Which club won the treble in the 1998–99 season?",
    answers: [
      { text: "Manchester United", correct: true },
      { text: "Bayern Munich", correct: false },
      { text: "Juventus", correct: false },
      { text: "Arsenal", correct: false }
    ]
  },
  {
    question: "Who holds the record for the most assists in a single Premier League season?",
    answers: [
      { text: "Kevin De Bruyne", correct: true },
      { text: "Cesc Fàbregas", correct: false },
      { text: "Thierry Henry", correct: false },
      { text: "Mesut Özil", correct: false }
    ]
  },
  {
    question: "Which team did Lionel Messi make his senior debut against for Argentina?",
    answers: [
      { text: "Hungary", correct: true },
      { text: "Brazil", correct: false },
      { text: "Germany", correct: false },
      { text: "Croatia", correct: false }
    ]
  },
  {
    question: "Which club has the nickname 'The Old Lady'?",
    answers: [
      { text: "Juventus", correct: true },
      { text: "AC Milan", correct: false },
      { text: "Inter Milan", correct: false },
      { text: "Real Madrid", correct: false }
    ]
  },
  {
    question: "Which African country hosted the 2010 FIFA World Cup?",
    answers: [
      { text: "South Africa", correct: true },
      { text: "Egypt", correct: false },
      { text: "Nigeria", correct: false },
      { text: "Morocco", correct: false }
    ]
  },
  {
    question: "Which footballer has won the most UEFA Super Cups?",
    answers: [
      { text: "Dani Alves", correct: false },
      { text: "Cristiano Ronaldo", correct: false },
      { text: "Lionel Messi", correct: false },
      { text: "Paolo Maldini", correct: true }
    ]
  },
  {
    question: "Who scored the winning penalty in the 2006 World Cup Final shootout?",
    answers: [
      { text: "Fabio Grosso", correct: true },
      { text: "Andrea Pirlo", correct: false },
      { text: "Daniele De Rossi", correct: false },
      { text: "Francesco Totti", correct: false }
    ]
  },
  {
    question: "Which Premier League team is nicknamed 'The Magpies'?",
    answers: [
      { text: "Newcastle United", correct: true },
      { text: "Fulham", correct: false },
      { text: "Swansea City", correct: false },
      { text: "West Bromwich Albion", correct: false }
    ]
  },
  {
    question: "Who scored the infamous own goal for Colombia in the 1994 World Cup?",
    answers: [
      { text: "Andrés Escobar", correct: true },
      { text: "Carlos Valderrama", correct: false },
      { text: "Freddy Rincón", correct: false },
      { text: "René Higuita", correct: false }
    ]
  },
  {
    question: "Which national team is known as 'La Roja'?",
    answers: [
      { text: "Spain", correct: true },
      { text: "Portugal", correct: false },
      { text: "Chile", correct: false },
      { text: "Mexico", correct: false }
    ]
  }
]
]
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
      };
    }
    rooms[room].players.push({ name, id: socket.id });
    if (!rooms[room].currentQuestion) {
      askNewQuestions(room);
    }
  });

  socket.on("submitAnswer", ({ room, answerIndex }) => {
    const currentPlayer = rooms[room].players.find(p => p.id === socket.id);
    if (currentPlayer) {
      const correctAnswer = rooms[room].correctAnswer;
      const isCorrect = correctAnswer !== null && answerIndex === correctAnswer;
      currentPlayer.score = isCorrect ? (currentPlayer.score || 0) + 1 : (currentPlayer.score || 0) - 1;
      clearTimeout(rooms[room].questionTimeout);

      io.to(room).emit("answerResult", {
        playerName: currentPlayer.name,
        isCorrect,
        correctAnswer,
        scores: rooms[room].players.map(p => ({ name: p.name, score: p.score || 0 }))
      });

      const winner = rooms[room].players.find(p => p.score >= 10);
      if (winner) {
        io.to(room).emit("gameOver", { winner: winner.name });
        delete rooms[room];
      } else {
        askNewQuestions(room);
      }
    }
  });
  socket.on("sendMessage", ({ room, message , name }) => {
    io.to(room).emit("chatMessage", { name, message });
  })

  socket.on("disconnect", () => {
    for (const room in rooms) {
      rooms[room].players = rooms[room].players.filter(p => p.id !== socket.id);
      if (rooms[room].players.length === 0) {
          clearTimeout(rooms[room].questionTimeout);
          delete rooms[room];
      }
    }
});

});


function askNewQuestions(room) {
  if (!rooms[room] || rooms[room].players.length === 0) {
    clearTimeout(rooms[room]?.questionTimeout);
    delete rooms[room];
    return;
  }
  const setIndex = Math.floor(Math.random() * questions.length);
  const questionSet = questions[setIndex];
  const question = questionSet[Math.floor(Math.random() * questionSet.length)];
  
  rooms[room].currentQuestion = question;
  rooms[room].correctAnswer = question.answers.findIndex(ans => ans.correct);

  io.to(room).emit("newQuestion", {
    question: question.question,
    answers: question.answers.map(a => a.text),
    scores: rooms[room].players.map(p => ({ name: p.name, score: p.score || 0 })),
    timer: 30
  });

  rooms[room].questionTimeout = setTimeout(() => {
    io.to(room).emit("answerResult", {
      playerName: "no one",
      isCorrect: false,
      correctAnswer: rooms[room].correctAnswer,
      scores: rooms[room].players.map(p => ({ name: p.name, score: p.score || 0 }))
    });
    askNewQuestions(room);
  }, 30000);
}


server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
