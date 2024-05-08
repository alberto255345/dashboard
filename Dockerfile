# Use the official lightweight Node.js 20 image.
# https://hub.docker.com/_/node
FROM node:20-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package.json package-lock.json ./

# Install production dependencies.
RUN npm install --frozen-lockfile --production

# Copy local code to the container image.
COPY . ./

# Instale o TypeScript localmente
RUN npm install typescript

RUN npm run build

RUN rm -rf src

EXPOSE 8080

CMD [ "npm", "run", "preview" ]