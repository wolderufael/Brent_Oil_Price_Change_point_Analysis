import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import ruptures as rpt
import pymc as pm
from statsmodels.tsa.stattools import adfuller
import statsmodels.api as sm

class Analyzer:  
    def plot_time_series(self,df):
        df['Date'] = pd.to_datetime(df['Date'])
        df.set_index('Date', inplace=True)
        df.dropna(inplace=True)

        # Plot the data
        plt.figure(figsize=(10, 6))
        plt.plot(df['Price'], label='Price')
        plt.title("Brent Oil Prices Over Time")
        plt.xlabel("Date")
        plt.ylabel("Price")
        plt.legend()
        plt.show()
        
    def seasonal_plot(self,df):
        plt.figure(figsize=(14, 6))
        sm.tsa.seasonal_decompose(df['Price'], model='additive', period=12).plot()
        plt.title('Seasonal Decomposition')
        plt.xlabel("Date")
        plt.ylabel("Price")
        plt.legend()
        plt.show()
    
    def autocorrelation_plot(self,df):
        plt.figure(figsize=(14, 6))
        sm.graphics.tsa.plot_acf(df['Price'], lags=40)
        plt.title('Autocorrelation Plot')
        plt.xlabel("Date")
        plt.ylabel("Price")
        plt.legend()
        plt.show()
        
    def check_stationarity(time_series):
        adf_result = adfuller(time_series.dropna()) 
        
        result = {
            'ADF Statistic': adf_result[0],
            'p-value': adf_result[1],
            'Critical Values': adf_result[4],
            'Conclusion': 'Stationary' if adf_result[1] < 0.05 else 'Non-Stationary'
        }
        
        print("ADF Statistic:", result['ADF Statistic'])
        print("p-value:", result['p-value'])
        print("Critical Values:", result['Critical Values'])
        print("Conclusion:", result['Conclusion'])
        
        return result
        
    def cusum_plot(self,df):
        mean_price=df['Price'].mean()
        cusum=np.cumsum(df['Price']-mean_price)
        plt.figure(figsize=(14,7))
        plt.plot(df.index,cusum,label='CUSUM')
        plt.axhline(y=0,color='r',linestyle='--')
        plt.xlabel('Date')
        plt.ylabel('CUSUM Value')
        plt.ylabel('CUSUM Analysis')
        plt.legend
        plt.show()