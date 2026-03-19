const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/contest` : `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/contest`;

export const contestApi = {
    // Create new contest room
    createRoom: async () => {
        try {
            const response = await fetch(`${API_BASE}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating room:', error);
            throw error;
        }
    },

    // Join existing contest room
    joinRoom: async (roomCode) => {
        try {
            const response = await fetch(`${API_BASE}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomCode }),
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            console.error('Error joining room:', error);
            throw error;
        }
    },

    // Get contest details
    getContestDetails: async (roomCode) => {
        try {
            const response = await fetch(`${API_BASE}/${roomCode}`, {
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching contest:', error);
            throw error;
        }
    },

    // Run test cases
    runTests: async (roomCode, code, language) => {
        try {
            const response = await fetch(`${API_BASE}/run-tests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roomCode,
                    code,
                    language
                }),
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            console.error('Error running tests:', error);
            throw error;
        }
    },

    // Submit code
    submitCode: async (roomCode, playerId, code, language) => {
        try {
            const response = await fetch(`${API_BASE}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roomCode,
                    playerId,
                    code,
                    language
                }),
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            console.error('Error submitting code:', error);
            throw error;
        }
    },

    // End contest
    endContest: async (roomCode) => {
        try {
            const response = await fetch(`${API_BASE}/${roomCode}/end`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            console.error('Error ending contest:', error);
            throw error;
        }
    }
};
