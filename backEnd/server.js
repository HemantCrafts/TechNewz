import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ NEWS ROUTE
app.get("/api/news", async (req, res) => {
  try {
    const category = req.query.category || "technology";
    const apiKey = process.env.NEWS_API_KEY;

    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&qInTitle=${category}&language=en`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch news",
      details: err.message,
    });
  }
});

// ✅ SUMMARY ROUTE USING HUGGING FACE API
app.post("/api/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing text to summarize" });
    }

    const hfKey = process.env.HUGGINGFACE_API_KEY;

    // ✅ FREE MODEL (WORKS 100%): facebook/bart-large-cnn
    const HF_URL =
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

    const response = await fetch(HF_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text,
        parameters: { max_length: 150, min_length: 60, do_sample: false },
      }),
    });

    const data = await response.json();

    // console.log("🔥 HUGGING FACE RAW:", data);

    const summary =
      data?.[0]?.summary_text ||
      data?.summary_text ||
      "No summary generated";

    res.json({ summary });
  } catch (err) {
    res.status(500).json({
      error: "HuggingFace summarization failed",
      details: err.message,
    });
  }
});

app.listen(3000, () =>
  console.log("✅ Backend running on http://localhost:3000")
);
