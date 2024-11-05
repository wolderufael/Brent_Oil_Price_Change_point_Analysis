import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.stattools import adfuller
from sklearn.metrics import mean_absolute_error, mean_squared_error, mean_absolute_percentage_error,r2_score



class Modelling:
    def check_stationarity(self,df,col):
        df["rollingMean"]=df[col].rolling(window=90).mean()
        df["rollingStd"]=df[col].rolling(window=90).std()
        result=adfuller(df[col],autolag="AIC")
        
        print(f"Test Statistics: {result[0]}")
        print(f"p-Value: {result[1]}")
        print(f"Lag used: {result[2]}")
        print(f"Number of observation: {result[2]}")
        print(f"Critical Values': {result[4]}")
        print(f"Conclusion: {'Stationary' if result[1] < 0.05 else 'Non-Stationary'}")
        
        plt.figure(figsize=(10,5))
        sns.lineplot(df,x=df.index,y=df[col])
        sns.lineplot(df,x=df.index,y=df["rollingMean"],label="RollingMean")
        sns.lineplot(df,x=df.index,y=df["rollingStd"],label="RollingStd")
        plt.legend()
        
    def trai_test_split(self,brentoil_price):
        train_df=brentoil_price[:round(len(brentoil_price)*0.7)]
        test_df=brentoil_price[round(len(brentoil_price)*0.7):]
        
        return train_df,test_df
    
    def train_arima_model(self,train_df,test_df):
        arima_model=ARIMA(train_df['Price'],order=(1,1,1))
        model_fit=arima_model.fit()
        
        prediction=model_fit.forecast(steps=len(test_df))
        
        predicted_Price=pd.Series(prediction,name='predicted_Price')
        actual_vs_prediction=test_df
        actual_vs_prediction['predicted_Price']=predicted_Price.values
        
        # Assuming y_true and y_pred are your true and predicted values
        y_true = actual_vs_prediction['Price']  # Replace with actual values
        y_pred = actual_vs_prediction['predicted_Price'] # Replace with actual predicted values
        
        return y_true,y_pred,actual_vs_prediction
    
    def evaluate_arima_model(self,y_true,y_pred):
        # Calculate metrics
        mae = mean_absolute_error(y_true, y_pred)
        mse = mean_squared_error(y_true, y_pred)
        rmse = np.sqrt(mse)
        r2_Score=r2_score(y_true,y_pred)
        mape = mean_absolute_percentage_error(y_true, y_pred) * 100  # MAPE as a percentage

        # Print metrics
        print("Mean Absolute Error (MAE):", mae)
        print("Mean Squared Error (MSE):", mse)
        print("Root Mean Squared Error (RMSE):", rmse)
        print("R Square Score (r2_score):", r2_Score)
        print("Mean Absolute Percentage Error (MAPE):", mape, "%")

    def plot_result(self,actual_vs_prediction):
        plt.figure(figsize=(14, 5))
        plt.plot(actual_vs_prediction.index, actual_vs_prediction['Price'], label="Original Price")
        plt.plot(actual_vs_prediction.index,actual_vs_prediction['predicted_Price'], label="Predicted Price")
        plt.title('ARIMA Model Brent Oil Price Prediction')
        plt.xlabel("Date")
        plt.ylabel("Price")
        plt.legend()
        plt.show()  