FROM python:3

RUN useradd -m runner -u 1050 -N
RUN install -d /opt/app -o runner
WORKDIR /opt/app
USER runner

COPY . .
RUN pip3 install --user -r requirements.txt

EXPOSE 3001
CMD ["./server.py"]
