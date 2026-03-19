const activeRooms = new Map();

class RoomManager {
    // Add user to room
    static addUserToRoom(roomCode, userId, socketId, username) {
        if (!activeRooms.has(roomCode)) {
            activeRooms.set(roomCode, {
                players: [],
                startTime: null,
                endTime: null,
                winner: null
            });
        }

        const room = activeRooms.get(roomCode);
        room.players.push({
            userId,
            socketId,
            username,
            code: '',
            language: 'javascript',
            isSubmitted: false,
            submittedAt: null,
            points: 0
        });

        return room;
    }

    // Remove user from room
    static removeUserFromRoom(roomCode, socketId) {
        if (!activeRooms.has(roomCode)) return null;

        const room = activeRooms.get(roomCode);
        room.players = room.players.filter(p => p.socketId !== socketId);

        if (room.players.length === 0) {
            activeRooms.delete(roomCode);
            return null;
        }

        return room;
    }

    // Get room
    static getRoom(roomCode) {
        return activeRooms.get(roomCode);
    }

    // Update player code
    static updatePlayerCode(roomCode, socketId, code, language) {
        const room = activeRooms.get(roomCode);
        if (!room) return null;

        const player = room.players.find(p => p.socketId === socketId);
        if (player) {
            player.code = code;
            player.language = language;
        }

        return room;
    }

    // Mark player as submitted
    static submitPlayerCode(roomCode, socketId) {
        const room = activeRooms.get(roomCode);
        if (!room) return null;

        const player = room.players.find(p => p.socketId === socketId);
        if (player) {
            player.isSubmitted = true;
            player.submittedAt = new Date();
            player.points = 50;  // Winner gets 50 points
        }

        return room;
    }

    // Get all rooms
    static getAllRooms() {
        return Array.from(activeRooms.entries());
    }
}

module.exports = RoomManager;
