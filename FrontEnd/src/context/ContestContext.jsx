import React, { createContext, useState, useCallback } from 'react';
import io from 'socket.io-client';

export const ContestContext = createContext();

export const ContestProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [roomCode, setRoomCode] = useState(null);
    const [opponentCode, setOpponentCode] = useState('');
    const [myCode, setMyCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [players, setPlayers] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
    const [problem, setProblem] = useState(null);
    const [messages, setMessages] = useState([]);
    const [winner, setWinner] = useState(null);
    const [winnerUserId, setWinnerUserId] = useState(null);
    const [contestStarted, setContestStarted] = useState(false);

    // Initialize socket connection
    const initializeSocket = useCallback(() => {
        const newSocket = io(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}`, {
            withCredentials: true
        });

        newSocket.on('connect', () => {
            console.log('Connected to socket server');
            setSocket(newSocket);
        });

        newSocket.on('user-joined', (data) => {
            setPlayers(data.players);
            if (data.players.length === 2) {
                setContestStarted(true);
            }
        });

        newSocket.on('opponent-code-update', (data) => {
            setOpponentCode(data.opponentCode);
        });

        newSocket.on('player-submitted', (data) => {
            setPlayers(data.players);
            setIsSubmitted(true);
        });

        newSocket.on('new-message', (data) => {
            setMessages(prev => [...prev, data]);
        });

        newSocket.on('user-left', (data) => {
            setPlayers(data.players);
        });

        return newSocket;
    }, []);

    // Join room
    const joinRoom = useCallback((code, userId, username) => {
        if (socket) {
            socket.emit('join-room', { roomCode: code, userId, username });
            setRoomCode(code);
        }
    }, [socket]);

    // Update code
    const updateCode = useCallback((code) => {
        setMyCode(code);
        if (socket && roomCode) {
            socket.emit('code-update', { roomCode, code, language });
        }
    }, [socket, roomCode, language]);

    // Submit code
    const submitCode = useCallback((code, lang) => {
        if (socket && roomCode) {
            socket.emit('submit-code', {
                roomCode,
                code,
                language: lang,
                result: { status: 'ACCEPTED' }
            });
        }
    }, [socket, roomCode]);

    // Send message
    const sendMessage = useCallback((message, username) => {
        if (socket && roomCode) {
            socket.emit('send-message', { roomCode, message, username });
        }
    }, [socket, roomCode]);

    // Leave room
    const leaveRoom = useCallback(() => {
        if (socket && roomCode) {
            socket.emit('leave-room', roomCode);
            setRoomCode(null);
            setMyCode('');
            setOpponentCode('');
            setPlayers([]);
            setMessages([]);
        }
    }, [socket, roomCode]);

    return (
        <ContestContext.Provider
            value={{
                socket,
                initializeSocket,
                roomCode,
                myCode,
                opponentCode,
                language,
                setLanguage,
                players,
                problem,
                setProblem,
                isSubmitted,
                setIsSubmitted,
                timeRemaining,
                setTimeRemaining,
                messages,
                winner,
                setWinner,
                winnerUserId,
                setWinnerUserId,
                contestStarted,
                joinRoom,
                updateCode,
                submitCode,
                sendMessage,
                leaveRoom
            }}
        >
            {children}
        </ContestContext.Provider>
    );
};
