FROM python:3.8-slim

RUN pip install --upgrade pip

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . /app
WORKDIR /app

COPY ./entry.sh .
ENTRYPOINT ["sh", "/app/entry.sh"]