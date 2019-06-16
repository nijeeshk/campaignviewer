# Dockerfile
FROM node:10.16.0

LABEL maintainer="Nijeesh K <k.nijeesh91@gmail.com>"

# Let the container know that there is no tty
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -qq && apt-get install -y locales -qq && locale-gen en_US.UTF-8 en_us && dpkg-reconfigure locales && dpkg-reconfigure locales && locale-gen C.UTF-8 && /usr/sbin/update-locale LANG=C.UTF-8

RUN locale-gen en_US.UTF-8

RUN mkdir /data

WORKDIR /data

# Install yarn
RUN apt-get update && apt-get install -y apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

EXPOSE 8080
