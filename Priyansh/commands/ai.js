const axios = require("axios");

module.exports.config = {
  name: "ai",
  version: "1.0",
  hasPermssion: 0,
  credits: "Arun + AI",
  description: "AI se baat karo",
  commandCategory: "AI",
  usages: "[sawal]",
  cooldowns: 2
};

module.exports.run = async function({ api, event, args }) {
  const prompt = args.join(" ");
  if (!prompt) return api.sendMessage("Pucho kuch, jaise: ai hello kaise ho", event.threadID);

  // YAHAN APNI GEMINI API KEY DAAL
  const API_KEY = "AQ.Ab8RN6Lg5XYFt4Alr_zFZlw5I67wzWDNNBVHH22T_f_t-PqnCA";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {
    const res = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }]
    });
    const reply = res.data.candidates[0].content.parts[0].text;
    return api.sendMessage(reply, event.threadID, event.messageID);
  } catch (e) {
    console.log(e);
    return api.sendMessage("AI error, API key check kar.", event.threadID);
  }
};
