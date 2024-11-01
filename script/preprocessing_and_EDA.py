import pandas as pd
import re

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


