
FROM ubuntu
WORKDIR /myApp/grapqhl
COPY . .

RUN apt update
RUN apt install -y nodejs &&  apt install -y npm && apt install -y mongodb
RUN npm install -y
EXPOSE 3002


RUN chmod 777 rungraphql.sh
CMD ["./rungraphql.sh"]
