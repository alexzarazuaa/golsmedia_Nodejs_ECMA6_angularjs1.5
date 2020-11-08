FROM ubuntu

WORKDIR /myApp/rest

COPY . .

RUN apt-get update && apt-get install nodejs -y
RUN apt-get install npm -y
RUN apt-get install mongodb -y
RUN npm install -y

EXPOSE 3000

RUN chmod +x runrest.sh
CMD ["./runrest.sh"] 