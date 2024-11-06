# from flask import Flask, request, jsonify,render_template
# from flask_cors import CORS
# import pandas as pd
# # import pickle
# import datetime
# import numpy as np
# import sys
# import os
# import json


# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)

# df=pd.read_csv('data/brent_oil_price_data.csv')
# # macro_df=pd.read_csv('data/merged_with_macroeco_indice.csv')

# ######################ROUTES################################
# @app.route('/api/time_series', methods=['GET'])
# def get_data():
#     json_data = df.to_json(orient='columns')
    
#     return json_data

# @app.route('/api/change_point_detection', methods=['GET'])
# def get_change_point():
#     change_point_dates= ['1990-08-06', '1991-01-16', '1997-12-29', '1999-08-09', '2003-12-29', '2004-07-27', '2005-06-16', '2007-05-18', '2007-10-24', '2008-04-11', '2008-09-03', '2008-10-15', '2009-05-21', '2009-10-13', '2010-11-30', '2011-02-17', '2012-05-15', '2014-09-08', '2014-12-02', '2015-08-04', '2016-05-10', '2017-09-19', '2018-04-10', '2018-11-08', '2020-03-09', '2020-05-21', '2021-01-06', '2021-06-01', '2022-02-04', '2022-08-04']
#     json_data = df.to_json(orient='columns')
#     json_dict = json.loads(json_data)
#     json_dict['change_points'] = change_point_dates
#     json_data_with_detection = json.dumps(json_dict)
    
#     return json_data_with_detection
# @app.route('/api/corr_matrix', methods=['GET'])
# def get_macro_correlation():
#     macro_df=pd.read_csv('data/merged_with_macroeco_indice.csv')
#     macro_data=macro_df
#     macro_data.set_index("Date",inplace=True)
#     correlation_dict = macro_data.corr().round(2).to_dict(orient='index')
#     correlation_json = json.dumps(correlation_dict, indent=2)

#     return correlation_json

# # Define a health check route
# @app.route('/health', methods=['GET'])
# def health():
#     return jsonify({'status': 'API is running', 'time': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")})

# # Run Flask app
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd
import datetime
import numpy as np
import sys
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load data
df = pd.read_csv('public/brent_oil_price_data.csv')
# Uncomment and load the macroeconomic data if needed
# macro_df = pd.read_csv('data/merged_with_macroeco_indice.csv')

###################### ROUTES ################################
@app.route('/api/time_series', methods=['GET'])
def get_data():
    json_data = df.to_dict(orient='dict')
    return jsonify(json_data)

@app.route('/api/change_point_detection', methods=['GET'])
def get_change_point():
    change_point_dates = [
        '1990-08-06', '1991-01-16', '1997-12-29', '1999-08-09', '2003-12-29', '2004-07-27', 
        '2005-06-16', '2007-05-18', '2007-10-24', '2008-04-11', '2008-09-03', '2008-10-15', 
        '2009-05-21', '2009-10-13', '2010-11-30', '2011-02-17', '2012-05-15', '2014-09-08', 
        '2014-12-02', '2015-08-04', '2016-05-10', '2017-09-19', '2018-04-10', '2018-11-08', 
        '2020-03-09', '2020-05-21', '2021-01-06', '2021-06-01', '2022-02-04', '2022-08-04'
    ]
    
    data_with_change_points = df.to_dict(orient='dict')
    data_with_change_points['change_points'] = change_point_dates
    return jsonify(data_with_change_points)

@app.route('/api/corr_matrix', methods=['GET'])
def get_macro_correlation():
    macro_df = pd.read_csv('public/merged_with_macroeco_indice.csv')
    macro_df.set_index("Date", inplace=True)
    correlation_dict = macro_df.corr().round(2).to_dict(orient='index')
    return jsonify(correlation_dict)

# Define a health check route
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'API is running', 'time': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")})

# Run Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
