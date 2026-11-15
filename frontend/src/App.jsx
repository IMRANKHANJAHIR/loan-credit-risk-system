
import { useState } from "react";
import { ShieldCheck, Activity, BrainCircuit } from "lucide-react";
import api from "./services/api";
import "./App.css";

function App() {
  const [status, setStatus] = useState("Not tested");
  const [loading, setLoading] = useState(false);

  async function checkBackend() {
    setLoading(true);
    setStatus("Connecting...");

    try {
      const response = await api.get("/health");

      if (response.data.success) {
        setStatus("Connected successfully");
      } else {
        setStatus("Unexpected API response");
      }
    } catch (error) {
      console.error(error);
      setStatus("Connection failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <div className="panel">
        <div className="brand">
          <ShieldCheck size={30} />
          <span>Credit Intelligence</span>
        </div>

        <span className="eyebrow">
          AI-POWERED FINANCIAL ANALYTICS
        </span>

        <h1>Loan Eligibility & Credit Risk</h1>

        <p className="description">
          A machine learning decision-support platform
          for responsible loan assessment and credit
          risk analysis.
        </p>

        <div className="features">
          <div className="feature">
            <BrainCircuit size={22} />
            <span>AI Predictions</span>
          </div>

          <div className="feature">
            <Activity size={22} />
            <span>Risk Analytics</span>
          </div>
        </div>

        <div className="status-card">
          <strong>Backend connectivity</strong>
          <p role="status">{status}</p>

          <button
            onClick={checkBackend}
            disabled={loading}
          >
            {loading ? "Testing..." : "Test API Connection"}
          </button>
        </div>

        <p className="disclaimer">
          Prototype for research and decision support.
          Not an automated lending approval system.
        </p>
      </div>
    </main>
  );
}

export default App;
