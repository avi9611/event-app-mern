import { useState } from "react";

const NoChatSelected = () => {
  
  const [showGame, setShowGame] = useState(false);

  const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);

    const checkWinner = (board) => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    };

    const winner = checkWinner(board);
    const handleClick = (index) => {
      if (board[index] || winner) return;
      const newBoard = [...board];
      newBoard[index] = isXTurn ? "X" : "O";
      setBoard(newBoard);
      setIsXTurn(!isXTurn);
    };

    const resetGame = () => {
      setBoard(Array(9).fill(null));
      setIsXTurn(true);
    };

    return (
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">
          {winner ? `Winner: ${winner}` : `Turn: ${isXTurn ? "X" : "O"}`}
        </h3>
        <div className="grid grid-cols-3 gap-2 w-40 mx-auto">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="w-12 h-12 bg-blue-200 border border-gray-400 text-xl font-bold flex items-center justify-center"
            >
              {cell}
            </button>
          ))}
        </div>
        {winner && (
          <button
            onClick={resetGame}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow-md"
          >
            Play Again
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-blue-50 to-blue-100">
      {!showGame ? (
        <div className="max-w-md text-center space-y-8">
          {/* Icon Display */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500
              flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <span className="text-white text-3xl font-extrabold">C</span>
              </div>
              <div
                className="absolute top-0 left-0 w-16 h-16 rounded-full bg-primary/10 blur-xl opacity-70 
              animate-ping"
              ></div>
            </div>
          </div>

          {/* Welcome Text */}
          <h2 className="text-3xl font-extrabold text-gray-800">
            Welcome to <span className="text-primary">ClickTalk!</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Select a conversation from the sidebar to start chatting, or play a
            fun game to connect with your friends.
          </p>

          {/* Call to Action */}
          <div className="mt-6">
            <button
              onClick={() => setShowGame(true)}
              className="btn btn-primary px-8 py-3 rounded-full text-white font-medium 
            hover:bg-primary-focus shadow-md transform hover:scale-105 transition-all duration-300"
            >
              Play Tic-Tac-Toe
            </button>
          </div>
        </div>
      ) : (
        <TicTacToe />
      )}
    </div>
  );
};

export default NoChatSelected;
