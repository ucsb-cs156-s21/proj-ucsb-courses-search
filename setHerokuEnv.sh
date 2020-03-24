#!/usr/bin/env bash
heroku config:set HEROKU_PROPERTIES="$(cat secrets-heroku.properties)" "$@"
