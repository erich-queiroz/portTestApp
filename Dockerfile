FROM tomsik68/xampp

USER root

WORKDIR /app

RUN apt update

COPY ./frontEnd /opt/lampp/htdocs/frontEnd
COPY ./backEnd /opt/lampp/htdocs/backEnd
COPY index.html /opt/lampp/htdocs

EXPOSE 80

