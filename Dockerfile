FROM node:6

RUN useradd -m runner -u 1050 -N
RUN install -d /opt/app -o runner
WORKDIR /opt/app
USER runner

COPY package.json .
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD cd build && python2 -m SimpleHTTPServer 3000
