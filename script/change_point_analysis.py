import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import ruptures as rpt
import pymc as pm
from statsmodels.tsa.stattools import adfuller
import statsmodels.api as sm

class Analyzer:  
    
        
        
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
    
    def rpt_change_point_detection(self,df):
        price_array=df['Price'].values
        model='rbf'
        algo=rpt.Pelt(model=model).fit(price_array)
        change_points=algo.predict(pen=10)

        valid_change_points = [i for i in change_points if i < len(df)]
        change_point_dates = df['Date'].iloc[valid_change_points].tolist()
        print("Change Point Dates (actual dates):", change_point_dates)

        plt.figure(figsize=(14,7))
        plt.plot(df.index,df['Price'],label='Brent Oil Price')
        for cp in change_points[:-1]:
            plt.axvline(x=df.index[cp], color='r',linestyle='--' ,label="Change Point" if cp ==change_points[0] else None)
        plt.title("Brent Oil Prices Over Time")
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