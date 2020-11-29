#!/usr/local/bin/python3
import os
import sys

if len(sys.argv) != 2:
  print("Usage: python3 setHerokuVars.py NAME_OF_APP")
  exit(1)

app_name = sys.argv[1]

print(f'heroku config:set HEROKU_PROPERTIES="$(cat secrets-heroku.properties)" "$@" --app {app_name}')
os.system(f'heroku config:set HEROKU_PROPERTIES="$(cat secrets-heroku.properties)" "$@" --app {app_name}')

print(app_name)

def setVar(key, value):
  print(f'heroku config:set {key}={value} --app {app_name}')
  os.system(f'heroku config:set {key}={value} --app {app_name}')

with open('javascript/.env.production') as f:
  lines = f.read().split('\n')
  print(lines)
  for line in lines:
    values = line.split('=')
    if len(values) == 2:
      [key, value] = values
      setVar(key, value)
