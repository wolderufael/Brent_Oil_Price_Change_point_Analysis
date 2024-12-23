import pandas as pd
import re
import matplotlib.pyplot as plt
from statsmodels.tsa.stattools import adfuller
import statsmodels.api as sm

class Preprocessor:
    def __init__(self):
        """
        Constructor to initialize file paths for data loading
        """
        self.price_data_path = 'data/Copy of BrentOilPrices.csv'


    def load_data(self):
        brent_oil_price_data = pd. read_csv(self.price_data_path)
        
        return brent_oil_price_data
    
    def data_overview(self,df):
        num_rows = df.shape[0]
        num_columns = df.shape[1]
        data_types = df.dtypes

        print(f"Number of rows:{num_rows}")
        print(f"Number of columns:{num_columns}")
        print(f"Data types of each column:\n{data_types}")
        
    def check_missing(self,df):
        missing=df.isnull().sum()
        
        return missing
    
    def convert_to_datetime(self,df):        
        def parse_date(date_str):
            # Check if the date matches 'Oct 31, 2022' format
            if re.match(r'^[A-Za-z]{3} \d{2}, \d{4}$', date_str):
                return pd.to_datetime(date_str, format='%b %d, %Y', errors='coerce')
            
            # Check if the date matches '20-May-87' format
            elif re.match(r'^\d{2}-[A-Za-z]{3}-\d{2}$', date_str):
                return pd.to_datetime(date_str, format='%d-%b-%y', dayfirst=True, errors='coerce')
        
        # Apply the parse_date function to each element in the column
        df['Date'] = df['Date'].apply(parse_date)
        return df
    
    def summarize_dataset(self,df):
            summary_list = []
            summary_stats = {
                    'Min' : df['Price'].min(),
                    'Max' : df['Price'].max(),
                    'Mean': df['Price'].mean(),
                    'Median': df['Price'].median(),
                    'Mode': df['Price'].mode().iloc[0],  # Taking the first mode in case of multiple modes
                    'Standard Deviation': df['Price'].std(),
                    'Variance': df['Price'].var(),
                    'Range': df['Price'].max() - df['Price'].min(),
                    'IQR': df['Price'].quantile(0.75) - df['Price'].quantile(0.25),
                    'Skewness': df['Price'].skew(),
                    'Kurtosis': df['Price'].kurtosis()
                }
                
            # Append the summary statistics for the current column to the list
            summary_list.append(summary_stats)
            
            # Convert summary stats list to DataFrame with appropriate index
            summary_df = pd.DataFrame(summary_list, index=['Price'])
            
            return summary_df
        
    def save_data(self,df,file_path):
            df.to_csv(file_path)
            
    def visualize_time_series(self ,df):    
        # Set the date column as index
        df['Date'] = pd.to_datetime(df['Date'])
        df.set_index(df['Date'], inplace=True)  
        
        # Line plot
        plt.figure(figsize=(14, 6))
        plt.subplot(3, 1, 1)
        plt.plot(df['Price'], label='Price')
        plt.title("Brent Oil Prices Over Time")
        plt.xlabel("Date")
        plt.ylabel("Price")
        plt.legend()
        
        # Seasonal plot
        plt.subplot(3, 1, 2)
        sm.tsa.seasonal_decompose(df['Price'], model='additive', period=365).plot()
        plt.title('Seasonal Decomposition')
        
        # Autocorrelation plot
        plt.subplot(3, 1, 3)
        sm.graphics.tsa.plot_acf(df['Price'], lags=365)
        plt.title('Autocorrelation Plot')
        
        plt.tight_layout()
        plt.show()
            
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
        
    def decompose_time_series(self,df):
        # Set the date column as index
        df['Date'] = pd.to_datetime(df['Date'])
        df.set_index('Date', inplace=True)
         
         
        # Set the frequency of the Date index (e.g., daily = 'D', monthly = 'M')
        df = df.asfreq('D')  # Adjust 'D' to the correct frequency of your data

        # Decompose the time series with specified period if needed
        decomposition = sm.tsa.seasonal_decompose(df['Price'], model='additive', period=12)
         
         
        # Decompose the time series
        # decomposition = sm.tsa.seasonal_decompose(df['Price'], model='additive')
        fig = decomposition.plot()
        fig.set_size_inches(14, 10)
        plt.title('Time Series Decomposition')
        plt.show()