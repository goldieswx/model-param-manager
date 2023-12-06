#!/bin/bash

# frontend version prefix
VERSION_PREFIX="bk-v"
DOCKER_HUB_IMAGE_NAME="paulwurthsda/config-manager-api"


HEAD=$(git rev-parse HEAD)
TAG=$(git describe --tag $HEAD)

if [ -z $@ ]
then
  echo "current HEAD already tagged with $TAG (not patching version, just rebuilding)"
else
  npm version patch --no-git-tag
fi;

VERSION=$(node -p "require('./package.json').version")
if [ ! -z $TAG ] && [[ $TAG =~ .*"$VERSION_PREFIX".* ]]
then
  if [ "$VERSION_PREFIX$VERSION" != $TAG ]
  then
    echo "current TAG($TAG) different from NPM Version(($VERSION_PREFIX)$VERSION), giving up."
    echo "either remove tag or update package.json"
    exit 1;
  fi;
fi;

docker build . -t $DOCKER_HUB_IMAGE_NAME:$VERSION

if [ -z $@ ]
then
   if [ ! -z $TAG ]
   then
      git tag $VERSION_PREFIX$VERSION
  fi;

  echo "Built image $DOCKER_HUB_IMAGE_NAME:$VERSION"
  docker push $DOCKER_HUB_IMAGE_NAME:$VERSION


else
   echo "Docker build failed."
fi;


