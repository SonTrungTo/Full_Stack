FROM node:10.19.0

RUN mkdir -p /usr/src/booksstore

COPY build /usr/src/booksstore/build
COPY authMiddleware.js /usr/src/booksstore/
COPY productionData.json /usr/src/booksstore/
COPY server.js /usr/src/booksstore/
COPY deploy-package.json /usr/src/booksstore/package.json

COPY serverMutationsResolver.js /usr/src/booksstore/
COPY serverMutationsSchema.graphql /usr/src/booksstore/
COPY serverQueriesResolver.js /usr/src/booksstore/
COPY serverQueriesSchema.graphql /usr/src/booksstore/

WORKDIR /usr/src/booksstore

RUN echo 'package-lock=false' >> .npmrc

RUN npm install

EXPOSE 80

CMD ["node", "server.js", "./productionData.json", "80"]