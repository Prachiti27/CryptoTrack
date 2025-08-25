from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import yfinance as yf
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import matplotlib
import matplotlib.pyplot as plt
import io
import base64
from datetime import datetime
from dotenv import load_dotenv
import os

matplotlib.use('Agg')  

load_dotenv() 
FRONTEND_URL = os.getenv("FRONTEND_URL")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

model = load_model("model.keras")

def plot_to_base64(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format='png')
    buf.seek(0)
    data = base64.b64encode(buf.getbuffer()).decode("ascii")
    buf.close()
    plt.close(fig)  
    return f"data:image/png;base64,{data}"

@app.get("/predict")
def predict(stock: str = Query("BTC-USD"), no_of_days: int = Query(10)):
    end = datetime.now()
    start = datetime(end.year - 15, end.month, end.day)

    stock_data = yf.download(stock, start, end)
    if stock_data.empty:
        return {"error": "Invalid stock ticker or no data available."}

    splitting_len = int(len(stock_data) * 0.9)
    x_test = stock_data[['Close']][splitting_len:]
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(x_test)

    x_data, y_data = [], []
    for i in range(100, len(scaled_data)):
        x_data.append(scaled_data[i-100:i])
        y_data.append(scaled_data[i])
    x_data, y_data = np.array(x_data), np.array(y_data)

    predictions = model.predict(x_data)
    inv_predictions = scaler.inverse_transform(predictions)
    inv_y_test = scaler.inverse_transform(y_data)

    plotting_data = pd.DataFrame({
        "Original Test Data": inv_y_test.flatten(),
        "Predicted Test Data": inv_predictions.flatten()
    }, index=x_test.index[100:])

    # Plot 1: Original closing prices
    fig1 = plt.figure(figsize=(15,6))
    plt.plot(stock_data['Close'], 'b', label='Close Price')
    plt.title("Closing Prices Over Time")
    plt.xlabel("Date")
    plt.ylabel("Close Price")
    plt.legend()
    original_plot = plot_to_base64(fig1)

    # Plot 2: Original vs predicted
    fig2 = plt.figure(figsize=(15,6))
    plt.plot(plotting_data['Original Test Data'], label="Original Test Data")
    plt.plot(plotting_data['Predicted Test Data'], label="Predicted Test Data", linestyle="--")
    plt.legend()
    plt.title("Original vs Predicted Closing Prices")
    plt.xlabel("Date")
    plt.ylabel("Close Price")
    predicted_plot = plot_to_base64(fig2)

    # Plot 3: Future predictions
    last_100 = stock_data[['Close']].tail(100)
    last_100_scaled = scaler.transform(last_100)
    future_predictions = []
    last_100_scaled = last_100_scaled.reshape(1, -1, 1)

    for _ in range(no_of_days):
        next_day = model.predict(last_100_scaled)
        future_predictions.append(float(scaler.inverse_transform(next_day)[0][0]))
        last_100_scaled = np.append(last_100_scaled[:,1:,:], next_day.reshape(1,1,-1), axis=1)

    fig3 = plt.figure(figsize=(15,6))
    plt.plot(range(1, no_of_days + 1), future_predictions, marker='o', color='purple', label="Predicted Future Prices")
    plt.title("Future Close Price Predictions")
    plt.xlabel("Days Ahead")
    plt.ylabel("Predicted Close Price")
    plt.grid(alpha=0.3)
    plt.legend()
    future_plot = plot_to_base64(fig3)

    return {
        "stock": stock,
        "original_plot": original_plot,
        "predicted_plot": predicted_plot,
        "future_plot": future_plot,
        "future_predictions": future_predictions
    }
