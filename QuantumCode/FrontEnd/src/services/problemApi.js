const API_URL = 'http://localhost:3000/api';

// Create a new problem
export const createProblem = async (problemData) => {
    try {
        const response = await fetch(`${API_URL}/problems/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(problemData),
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || `Server error: ${response.status}`);
        }

        const data = await response.json();
        return data.problem;
    } catch (error) {
        console.error('Error creating problem:', error);
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Cannot connect to backend server. Make sure it\'s running on port 3000.');
        }
        throw error;
    }
};

// Get all problems
export const getAllProblems = async () => {
    try {
        const response = await fetch(`${API_URL}/problems`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch problems: ${response.status}`);
        }

        const data = await response.json();
        return data.problems;
    } catch (error) {
        console.error('Error fetching problems:', error);
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Cannot connect to backend server. Make sure it\'s running on port 3000.');
        }
        throw error;
    }
};

// Get problem by ID
export const getProblemById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/problems/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch problem: ${response.status}`);
        }

        const data = await response.json();
        return data.problem;
    } catch (error) {
        console.error('Error fetching problem:', error);
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Cannot connect to backend server. Make sure it\'s running on port 3000.');
        }
        throw error;
    }
};

// Update problem
export const updateProblem = async (id, problemData) => {
    try {
        const response = await fetch(`${API_URL}/problems/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(problemData),
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update problem');
        }

        const data = await response.json();
        return data.problem;
    } catch (error) {
        console.error('Error updating problem:', error);
        throw error;
    }
};

// Delete problem
export const deleteProblem = async (id) => {
    try {
        const response = await fetch(`${API_URL}/problems/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to delete problem');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting problem:', error);
        throw error;
    }
};

// Get problems by difficulty
export const getProblemsByDifficulty = async (difficulty) => {
    try {
        const response = await fetch(`${API_URL}/problems/difficulty/${difficulty}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch problems');
        }

        const data = await response.json();
        return data.problems;
    } catch (error) {
        console.error('Error fetching problems by difficulty:', error);
        throw error;
    }
};

// Get top problems
export const getTopProblems = async () => {
    try {
        const response = await fetch(`${API_URL}/problems/stats/top`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch top problems');
        }

        const data = await response.json();
        return data.problems;
    } catch (error) {
        console.error('Error fetching top problems:', error);
        throw error;
    }
};
