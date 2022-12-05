#!/bin/bash

ENV_CONFIG_PATH="./env-config.js"
ENV_PREFIX="JS_APP_"

rm -rf $ENV_CONFIG_PATH
touch $ENV_CONFIG_PATH 

echo "window._env_ = {" >> $ENV_CONFIG_PATH 

echo "***Loaded env values***"
while IFS='=' read -r name value ; do
  if [[ $name == $ENV_PREFIX* ]]; then
    echo "  $name: \"$value\"," >> $ENV_CONFIG_PATH 
    echo "$name: $value"
  fi
done < <(env)

echo "}" >> $ENV_CONFIG_PATH 
