FROM python:3.8.5

WORKDIR /app/api

COPY requirements.txt .
COPY api.py .
RUN pip install -r requirements.txt

EXPOSE 8086
CMD ["gunicorn", "api:app", "--bind", "0.0.0.0:8086"]