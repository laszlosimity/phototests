FROM node:current-alpine
#ADD ./workdir/photon
#WORKDIR ./workdir/photon
#RUN git clone https://github.com/laszlosimity/phototests.git ./workdir/photon
#RUN cd ./workdir/photon
#RUN npm install
#ENTRYPOINT ["npx wdio.conf.js"]