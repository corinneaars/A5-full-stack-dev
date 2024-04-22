# First stage: Install dependencies
FROM python:latest as builder

WORKDIR /install

COPY requirements.txt /requirements.txt
RUN pip install --prefix=/install -r /requirements.txt

# Second stage: Copy dependencies and application code
FROM python:latest

COPY --from=builder /install /usr/local
WORKDIR /app
COPY . /app

# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
CMD /app/start.sh > /proc/1/fd/1 2>/proc/1/fd/2 &


