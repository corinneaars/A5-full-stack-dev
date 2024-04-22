#!/bin/bash
# Logging INFO

# Wait for MySQL
echo "Waiting for MySQL"
python /app/wait_for_mysql.py > /proc/1/fd/1 2>/proc/1/fd/2
echo "MySQL is up and available"

# Start FastAPI
echo "Starting FastAPI"
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload > /proc/1/fd/1 2>/proc/1/fd/2
echo "FastAPI is up and available"



