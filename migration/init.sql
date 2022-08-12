CREATE TABLE price (
    id VARCHAR(50) PRIMARY KEY,
    symbol VARCHAR (50) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    price DECIMAL(14, 4) NOT NULL,
);