import { useState } from "react"
import "./Predictions.css"

const Predictions = () => {
  const [stock, setStock] = useState("BTC-USD")
  const [noOfDays, setNoOfDays] = useState(10)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const params = new URLSearchParams({ stock, no_of_days: noOfDays })
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/predict?${params}`)
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Failed to fetch prediction. Try again." })
    }

    setLoading(false)
  }

  return (
    <div className="container">
      <h1>Cryptocurrency (Bitcoin) Price Predictor</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Stock Ticker</label>
          <input
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="e.g., BTC-USD"
            required
          />
        </div>

        <div className="mb-3">
          <label>Number of Days to Predict</label>
          <input
            type="number"
            min="1"
            max="100"
            value={noOfDays}
            onChange={(e) => setNoOfDays(parseInt(e.target.value))}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {result && result.error && (
        <div className="error-message">{result.error}</div>
      )}

      {result && !result.error && (
        <div>
          <h2>Results for {result.stock}</h2>

          <h3>Original Closing Prices</h3>
          <img src={result.original_plot} alt="Original Plot" className="img-fluid" />

          <h3>Original vs Predicted Test Data</h3>
          <img src={result.predicted_plot} alt="Predicted Plot" className="img-fluid" />

          <h3>Future Close Price Predictions</h3>
          <img src={result.future_plot} alt="Future Plot" className="img-fluid" />

          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Predicted Close Price</th>
              </tr>
            </thead>
            <tbody>
              {result.future_predictions.map((price, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Predictions
