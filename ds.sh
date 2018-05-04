#!/bin/sh

PROJECT_ID="$(gcloud config get-value project --quiet)"
# IMG_NAME=weeve-ui
# VERSION=v01
DOCKER_FOLDER=./docker

UI_IMG_NAME=weeve-ui
UI_TAG_NAME=gcr.io/$PROJECT_ID/$UI_IMG_NAME:latest

case "$1" in
  build)
    echo "building"
    docker build -t $UI_IMG_NAME -f $DOCKER_FOLDER/weeve-ui.dockerfile .


    if [[ ! -z $(docker images -f "dangling=true" -q) ]]
    then
      echo "Deleting dangling images"
      docker rmi $(docker images -f "dangling=true" -q)
    fi
    ;;

  push)
    echo "pushing"
    docker tag $UI_IMG_NAME $UI_TAG_NAME

    if [[ ! -z $(docker images -f "dangling=true" -q) ]]
    then
      echo "Deleting dangling images"
      docker rmi $(docker images -f "dangling=true" -q)
    fi
    gcloud docker -- push $UI_TAG_NAME


    docker rmi $UI_TAG_NAME

    ;;

  clean)
    docker kill $(docker ps -aq)
    docker rm $(docker ps -aq)

    if [[ ! -z $(docker images -f "dangling=true" -q) ]]
    then
      echo "Deleting dangling images"
      docker rmi $(docker images -f "dangling=true" -q)
    fi
    ;;

  *)
    echo "Usage: "$1" {build|push}"
    exit 1
esac

exit 0
