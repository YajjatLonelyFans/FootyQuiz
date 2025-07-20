# FootyQuiz

A real-time, multiplayer football quiz web application. Challenge your friends, join rooms, answer football trivia, and climb the live leaderboard!

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
FootyQuiz is a full-stack web application where users can join quiz rooms, answer real-time football trivia, and compete for the top spot on the leaderboard. Built with React and Node.js, it leverages Socket.IO for seamless real-time communication.

## Features
- ⚡ **Real-time Multiplayer:** Join rooms and compete live with friends or other players.
- 🏆 **Live Leaderboard:** See scores update instantly as players answer questions.
- ⏱️ **Timed Questions:** Each question has a countdown timer to keep the game fast-paced.
- 🎉 **Winner Announcement:** Celebrate the winner at the end of each game.
- 📱 **Responsive UI:** Modern, mobile-friendly design.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, React Icons, React Toastify, Socket.IO Client
- **Backend:** Node.js, Express, Socket.IO, CORS



## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (v8+ recommended)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd FootyQuiz
```

### 2. Install Dependencies
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Start the Application
#### Start Backend Server
```bash
cd backend
npm start
```
_Backend runs on http://localhost:3000 by default._

#### Start Frontend Dev Server
```bash
cd ../frontend
npm run dev
```
_Frontend runs on http://localhost:5173 by default._

### 4. Open in Browser
Visit [http://localhost:5173](http://localhost:5173) to play FootyQuiz!

## Usage
- Enter your name and a room ID to join or create a quiz room.
- Wait for the quiz to start and answer questions as quickly as possible.
- Watch the leaderboard update in real time.
- The player with the highest score at the end wins!

## Folder Structure
```
FootyQuiz/
  backend/      # Node.js + Express + Socket.IO server
  frontend/     # React + Vite client
```

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.

