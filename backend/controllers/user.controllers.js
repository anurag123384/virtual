import User from '../models/user.model.js';
import uploadOnCloudinary from '../config/cloudinary.js';
import geminiResponse from '../gemini.js';
import moment from 'moment';

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('getCurrentUser error:', error);
        return res.status(500).json({ message: "getCurrentUser error" });
    }
}

export const updateAssistant = async (req, res) => {
    try {
        const { assistantName, imageUrl } = req.body;
        let assistantImage = imageUrl || null;

        if (req.file) {
            assistantImage = await uploadOnCloudinary(req.file.path);
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            { assistantName, assistantImage },
            { new: true }
        ).select("-password");

        return res.status(200).json(user);
    } catch (error) {
        console.error('updateAssistant error:', error);
        return res.status(500).json({ message: "updateAssistant error" });
    }
}

const normalizeType = (t) => (t || "general").toString().toLowerCase().replace(/_/g, '-');

export const askToAssistant = async (req, res) => {
    try {
        const { command } = req.body || {};
        if (!command || typeof command !== 'string') {
            return res.status(400).json({ message: "command is required" });
        }

        const user = await User.findById(req.userId).select('name assistantName');
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const assistantName = user.assistantName || 'Assistant';
        const userName = user.name || 'User';

        let resultText;
        try {
            resultText = await geminiResponse(command, assistantName, userName);
        } catch (e) {
            // If Gemini is rate-limited / quota exceeded, return a normal 200 response so the UI can speak it.
            return res.json({
                type: 'general',
                userInput: command,
                response: e?.message || 'Assistant service error',
                error: true
            });
        }

        const cleaned = resultText
            .replace(/```json/gi, '')
            .replace(/```/g, '')
            .trim();

        const jsonMatch = cleaned.match(/{[\s\S]*}/);
        if (!jsonMatch) {
            return res.status(400).json({
                type: 'general',
                userInput: command,
                response: "Sorry, I can't understand.",
            });
        }

        let gemResult;
        try {
            gemResult = JSON.parse(jsonMatch[0]);
        } catch {
            return res.status(400).json({
                type: 'general',
                userInput: command,
                response: "Sorry, I can't understand.",
            });
        }

        const type = normalizeType(gemResult.type);
        const userInput = gemResult.userInput || command;

        switch (type) {
            case 'get-date':
                return res.json({
                    type: 'get_date',
                    userInput,
                    response: `Current date is ${moment().format("YYYY-MM-DD")}`,
                });
            case 'get-time':
                return res.json({
                    type: 'get_time',
                    userInput,
                    response: `Current time is ${moment().format("hh:mm A")}`,
                });
            case 'get-day':
                return res.json({
                    type: 'get_day',
                    userInput,
                    response: `Today is ${moment().format("dddd")}`,
                });
            case 'get-month':
                return res.json({
                    type: 'get_month',
                    userInput,
                    response: `Current month is ${moment().format("MMMM")}`,
                });
            case 'youtube-search':
                return res.json({
                    type: 'youtube_search',
                    userInput,
                    response: gemResult.response || 'Searching on YouTube',
                });
            case 'youtube-play':
                return res.json({
                    type: 'youtube_play',
                    userInput,
                    response: gemResult.response || 'Playing on YouTube',
                });
            case 'google-search':
                return res.json({
                    type: 'google_search',
                    userInput,
                    response: gemResult.response || 'Searching on Google',
                });
            case 'calculator-open':
            case 'instagram-open':
            case 'facebook-open':
            case 'weather-show':
            case 'general':
            default:
                return res.json({
                    type: gemResult.type || 'general',
                    userInput,
                    response: gemResult.response || "Okay.",
                });
        }

    } catch (error) {
        console.error('askToAssistant error:', error);
        return res.status(500).json({ response: "ask assistant error" });
    }
}
