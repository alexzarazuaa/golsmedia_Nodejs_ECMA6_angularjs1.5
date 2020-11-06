FROM ubuntu

WORKDIR /myApp/rest

COPY . .

RUN apt-get update && apt-get install nodejs -y
RUN apt-get install npm -y
RUN apt-get install mongodb -y

EXPOSE 27017
EXPOSE 3000
RUN npm install

EXPOSE 3000
RUN chmod 77 runrest.sh
CMD ["./runrest.sh"

