const axios = require("axios");

// Judge0 API Key from environment - NEVER hardcode in production
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

if (!JUDGE0_API_KEY) {
  console.warn('⚠️  WARNING: JUDGE0_API_KEY is not set in environment variables');
}

const getLanguageById = (lang) => {
    const language = {
        "c++": 54,
        "cpp": 54,
        "java": 62,
        "javascript": 63,
        "python": 71,
        "python3": 71
    };
    return language[lang.toLowerCase()];
};

const submitBatch = async (submissions) => {
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            base64_encoded: 'false'
        },
        headers: {
            'x-rapidapi-key': JUDGE0_API_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            submissions
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Error in submitBatch:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const waiting = async (timer) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timer);
    });
};

const submitToken = async (resultTokens) => {
    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            tokens: resultTokens.join(','),
            base64_encoded: 'false',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': JUDGE0_API_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
        try {
            const response = await axios.request(options);
            const result = response.data;

            const submissions = Array.isArray(result) ? result : result.submissions || [];
            const isResultObtained = submissions.every((r) => r.status_id > 2);

            if (isResultObtained) {
                return submissions;
            }

            await waiting(1000);
            attempts++;
        } catch (error) {
            console.error("Error in submitToken:", error.response ? error.response.data : error.message);
            throw error;
        }
    }

    throw new Error("Maximum attempts reached while waiting for submission results");
};

module.exports = {
    getLanguageById,
    submitBatch,
    submitToken
};
