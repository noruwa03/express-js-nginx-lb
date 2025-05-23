-- Creating Database
CREATE DATABASE express_test_db;

-- Columns for express_test_db
CREATE TABLE post (
    id BIGSERIAL,
    uuid UUID DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tags VARCHAR(255)[],
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);