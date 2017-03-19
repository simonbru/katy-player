FROM python:3-slim

RUN useradd -m runner -u 1050 -N
RUN install -d /opt/app -o runner
WORKDIR /opt/app


COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY . .

EXPOSE 3001
USER runner
RUN mkdir /tmp/cache
CMD env CACHE_DIR=/tmp/cache ./server.py
