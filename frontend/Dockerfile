
FROM ubuntu
WORKDIR /myApp/frontend
COPY . .

RUN apt update
RUN apt install -y nodejs && apt install -y npm &&  npm install -g gulp -y
RUN npm install
EXPOSE 4000

CMD ["gulp"]