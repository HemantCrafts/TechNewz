export default function SummaryPage({ data, onBack }) {
  return (
    <div style={styles.card}>
      {article.image_url && (
        <img src={article.image_url} style={styles.image} />
      )}

      <h2 style={styles.title}>{article.title}</h2>

      <p style={styles.description}>{article.description}</p>

      <button style={styles.button} onClick={onSummarize}>
        Summarize Article
      </button>

      <a href={article.link} target="_blank" style={styles.read}>
        Read Full Article →
      </a>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#111",
  },
  description: {
    fontSize: "14px",
    color: "#444",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    background: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  read: {
    display: "block",
    marginTop: "10px",
    color: "#ff5722",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
