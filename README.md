# campaignviewer

# Build Process

## Setting up docker (Build Environment)

Execute the following command to build a new docker image from the bundled Dockerfile

`docker build  -t campaignviewer .`

This will create a new docker image with the name **campaignviewer**.
Commands can be executed on this image using the following syntax

`docker run --rm -v $(pwd):/data -it campaignviewer <command>`

## Installing dependencies

`docker run --rm -v $(pwd):/data -it campaignviewer yarn install`

This will install the dev dependencies as well as the project dependencies.

## Run code in dev mode and watch for changes (development)

`docker-compose up`

This will run files and then watch for changes.

## Building the files (production)

`docker run --rm -v $(pwd):/data -it campaignviewer yarn build`

This will create the build folder `/dist`.
