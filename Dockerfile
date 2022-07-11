FROM python:3.10-alpine

WORKDIR /backend
COPY . ./

ENV GIT_PYTHON_REFRESH quiet

RUN apk update
RUN apk add git

WORKDIR /backend/backend
RUN pip3 install -r requirements.txt
RUN python manage.py migrate

EXPOSE 8000