# KoinX Backend Internship Assignment

## Overview

This repository contains the implementation for the KoinX Backend Internship Assignment, which involves developing a server-side application using Node.js and MongoDB. The application fetches cryptocurrency data and provides APIs to access it.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **MongoDB**: NoSQL database to store cryptocurrency data.
- **Express**: Web framework for building APIs.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/bhavyachopra99/assignment_koinx
   cd assignment_koinx
   ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```
    
3. **Start the Server**:

    ```bash
    npm start
    ```

## API Endpoints
Base URL: https://assignment-koinx-vd6v.onrender.com
1. **/stats**: 

   Description: Returns the latest data about the requested cryptocurrency.
   
   Query Parameters:
   
   coin: bitcoin, matic, or ethereum
   Sample Request:
   
   ```bash
   GET /stats?coin=bitcoin
   ```

   Sample Response:
      
   ```json
   {
       "price": 40000,
       "marketCap": 800000000,
       "24hChange": 3.4
   }
   ```
   
   
2. **/deviation**:

   Description: Returns the standard deviation of the price of the requested cryptocurrency for the last 100 records.
   
   Query Parameters:
   
   coin: bitcoin, matic, or ethereum
   Sample Request:
   
   ```bash
   GET /deviation?coin=bitcoin
   ```
   
   Sample Response:
   
   ```json
   {
       "deviation": 4082.48
   }
   ```

## Background Job
A background job runs every 2 hours to fetch the current price, market cap, and 24-hour change for Bitcoin, Matic, and Ethereum using the CoinGecko API.

## Testing
A test script is provided in test.js for running tests.
```bash
node test.js
```

## Deployment
The application is deployed on Render. You can access the live API here<https://assignment-koinx-vd6v.onrender.com>.
FIRST RESPONSE MAY TAKE 50S AS IT IS A FREE SERVICE
