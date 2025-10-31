import { useEffect } from "react";

export default function SummaryPage({ data }) {
  
  // ✅ TEST SUMMARY API CALL (console me response dekhne ke liye)
  useEffect(() => {
    if (data?.description || data?.content) {
      const sendText = data.description || data.content;

      console.log("⏳ SENDING TEXT TO BACKEND:", sendText);

      fetch("http://localhost:3000/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sendText }),
      })
        .then((res) => res.json())
        .then((out) => {
          console.log("✅ SUMMARY RESPONSE:", out);
        })
        .catch((err) => console.error("❌ SUMMARY ERROR:", err));
    }
  }, [data]);

  return (
    <div className="summary-container">
      <h2 className="summary-title">{data.title}</h2>

      {data.image_url && (
        <img src={data.image_url} alt="" className="summary-image" />
      )}

      <p className="summary-desc">{data.description}</p>

      {/* Summary (IF generated later) */}
      {data.summary && (
        <div className="summary-box">
          <h3>AI Summary</h3>
          <p>{data.summary}</p>
        </div>
      )}
    </div>
  );
}
