FROM python:3

RUN apt-get update && apt-get install -y npm
RUN ln -s /usr/bin/nodejs /usr/local/bin/node
COPY . /opt/app
WORKDIR /opt/app
RUN useradd -m runner -u 1050
RUN chown -R runner .
USER runner

RUN pip3 install --user -r api_server/requirements.txt
RUN npm install
RUN npm run build

CMD bash
