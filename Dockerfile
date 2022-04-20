# Estagio 1 - Será responsavel em construir nossa aplicação
FROM node:11.13-slim as node
WORKDIR /app
COPY package.json /app/
RUN npm i npm@latest -g
RUN npm install
COPY ./ /app/
RUN npm install -g @angular/cli
ARG env=prod
RUN ng build --prod


# Estagio 2 - Será responsavel por expor a aplicação
#USER root
#WORKDIR /var/www
#COPY ./ /var/www
#COPY --from=node /app/dist /var/www/dist/ui-base
#RUN cd /var/www && npm i express
#ENV TZ=America/Sao_Paulo
#EXPOSE 80
#CMD ["node", "server.js"]

#Servidor de produção
FROM nginx:1.15.10
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

