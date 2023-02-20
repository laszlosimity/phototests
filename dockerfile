FROM node:current-alpine
ADD . /workdir/photon
WORKDIR ./workdir/photon
RUN apk add git
RUN git config --global user.name "laszlosimity"
RUN git config --global user.email "laszlo.simity@saucelabs.com"
RUN git clone https://github.com/laszlosimity/phototests.git ./workdir/photon
RUN cd /workdir/photon
RUN npm install
ENTRYPOINT ["npx"]
CMD ["wdio", "wdio.conf.js"]