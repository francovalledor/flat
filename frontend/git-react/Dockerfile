FROM node:alpine

WORKDIR /
COPY . ./

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

EXPOSE 3000

#RUN npm run build
CMD npm start