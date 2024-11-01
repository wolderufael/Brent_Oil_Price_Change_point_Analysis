import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import ruptures as rpt
import pymc as pm

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