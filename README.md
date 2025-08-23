
---

# 📊 CryptoTrack

CryptoTrack is a **cryptocurrency tracking and prediction web application**.
It fetches live cryptocurrency data directly from the **CoinGecko API** in the frontend and integrates a **Machine Learning model (LSTM)** in the backend to predict Bitcoin price trends.

---

## ✨ Features

* 🔹 **Live Cryptocurrency Data**

  * Frontend fetches real-time data from [CoinGecko API](https://www.coingecko.com/en/api).
  * Displays price, market cap, 24h change, and trading volume.

* 🔹 **Bitcoin Price Prediction (ML Model)**

  * Backend hosts an **LSTM model** trained on historical Bitcoin prices.
  * API endpoint `/predict` returns the predicted price.

* 🔹 **Modern Frontend (React + CSS)**

  * Built with **React (Vite)** and styled using **plain CSS**.
  * Simple and clean UI for tracking multiple cryptocurrencies.

* 🔹 **Backend (FastAPI)**

  * Handles ML model loading & predictions only.
  * Keeps frontend and ML separated for scalability.

---

## 🛠️ Tech Stack

### Frontend

* ⚛️ React (Vite)
* 🎨 CSS (custom stylesheets)
* 🔗 Axios for API requests

### Backend

* ⚡ FastAPI
* 🐍 Python (Uvicorn, Pydantic)
* 🤖 TensorFlow / Keras for LSTM model

---

## 📂 Project Structure

```
cryptotrack/
│── backend/                # FastAPI backend (only ML model)
│   ├── main.py              # FastAPI app
│   ├── model/               # Trained LSTM model + preprocessing scripts
│   ├── requirements.txt     # Python dependencies
│
│── frontend/               # React (Vite) frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Page-level components
│   │   ├── styles/          # CSS files
│   │   └── App.jsx          # Entry point
│   ├── package.json         # Node dependencies
│
│── .gitignore
│── README.md
│── .env.example            # Example environment variables
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/cryptotrack.git
cd cryptotrack
```

### 2️⃣ Backend Setup (FastAPI + LSTM)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt

# Run FastAPI server
uvicorn main:app --reload
```

### 3️⃣ Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```
FRONTEND_URL=http://127.0.0.1:5173
```

### Frontend (`frontend/.env`)

```
VITE_BACKEND_URL=http://127.0.0.1:8000
VITE_COINGECKO_API_key=https://api.coingecko.com/api/v3
```

---

## 📈 LSTM Model (Backend)

* Trained on historical Bitcoin price data.
* Saved as `bitcoin_lstm.h5`.
* Loaded by FastAPI for predictions.

Example FastAPI route:

```python
@app.get("/predict")
def predict_price():
    # Load latest sequence
    prediction = model.predict(last_60_days)
    return {"predicted_price": float(prediction[0][0])}
```

---

## 📜 License

This project is licensed under the MIT License.

---

⚡ *CryptoTrack – Track Live Crypto & Predict the Future with AI!* ⚡

---

