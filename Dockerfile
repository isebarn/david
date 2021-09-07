FROM node:alpine
#RUN apt-get update
#RUN apt-get install -y nodejs && apt-get install -y npm
COPY . /david
WORKDIR david
RUN npm install
RUN npm install node-fetch cheerio
RUN npm run build

ENTRYPOINT npm start