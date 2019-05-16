FROM node:12
RUN npx create-react-app doit
COPY . ./doit
RUN cd doit
RUN npm install bootstrap
WORKDIR /doit
ENTRYPOINT ["/usr/local/bin/npm", "start"]