# get latest node image from docker hub
FROM node:latest

# change work directory to /app
WORKDIR /app

# copy package.json into cwd
COPY package.json .

# add NODE_ENV argument to check development environment 
# will be received from docker compose file
ARG NODE_ENV

# install dependencies depending on the environment
RUN if [ "$NODE_ENV" = "development" ]; \
      then yarn install; \
      else yarn install --production; \
    fi

# copy the project to cwd ignoring files in .dockerignore file
COPY . ./

# expose port 3000
ENV PORT=3000
EXPOSE ${PORT}

# run project
CMD [ "tsx", "src/index.ts" ]