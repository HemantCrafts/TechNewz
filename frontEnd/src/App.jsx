import { useEffect, useState } from "react";
import News from "./components/News";
import SummaryPage from "./components/SummaryPage";
import "./App.css";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("technology");
  const [activeTab, setActiveTab] = useState("news");
  const [summaryData, setSummaryData] = useState(null);

  return (
    <div className="app-container">
      <h1 className="title">Latest Tech News</h1>

      {/* ✅ Category Bar */}
      <div className="category-bar">
        {[
          "technology",
          "ai",
          "programming",
          "gadgets",
          "science",
          "space",
          "startup",
          "business",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ✅ Tabs */}
      <div className="tabs">
        <button
          onClick={() => setActiveTab("news")}
          className={activeTab === "news" ? "tab-active" : ""}
        >
          News
        </button>

        <button
          onClick={() => setActiveTab("summary")}
          className={activeTab === "summary" ? "tab-active" : ""}
          disabled={!summaryData}
        >
          Summary
        </button>
      </div>

      {/* ✅ News Tab */}
      {activeTab === "news" && (
        <News
          category={selectedCategory}
          onSummarize={(article) => {
            setSummaryData(article);
            setActiveTab("summary");
          }}
        />
      )}

      {/* ✅ Summary Tab */}
      {activeTab === "summary" && summaryData && (
        <SummaryPage data={summaryData} />
      )}
    </div>
  );
}
