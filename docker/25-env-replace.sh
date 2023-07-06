#!/bin/bash

CONFIG_BK=/opt/frontend/config-manager/assets/config.json.bk
CONFIG=/opt/frontend/config-manager/assets/config.json
TMPCFG=/tmp/__cfg.json

if [ -f  "$CONFIG_BK" ]
then
  cp $CONFIG_BK $CONFIG
else
  cp $CONFIG $CONFIG_BK
fi

echo "$MPM_READONLY"

if [ ! -z "$MPM_READONLY" ]
then
    jq ".readOnly = $MPM_READONLY" $CONFIG > $TMPCFG
    cp $TMPCFG $CONFIG
fi

if [ ! -z "$MPM_BACKEND_URL" ]
then
    printf -v TMP "%q" "$MPM_BACKEND_URL"
    jq ".backendUrl = \"$TMP\"" $CONFIG > $TMPCFG
    cp $TMPCFG $CONFIG
fi

