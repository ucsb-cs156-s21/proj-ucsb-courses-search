#!/usr/bin/env python

# This file takes the values in heroku.json, and sets those values
# on a remote app.

# You should invoke this with
# ./setHerokuEnv.py --app APPNAME
#
# Any additional arguments passed after ./setHerokuEnv.py are passed to the "heroku config:set" commandn

import json
import os
from pprint import pprint
import sys

try:
  with open('heroku.json') as json_data:
     vars = json.load(json_data)
  back_to_json = json.dumps(vars)
  print(back_to_json)
  print("JSON looks ok")
except IOError as e:
  print("Error reading from heroku.json")
  print(type(e),e.args)
  sys.exit(1)
except Exception as e:
  print("Error in JSON: ")
  print(type(e),e.args)
  sys.exit(2)

  
# https://stackoverflow.com/questions/89228/calling-an-external-command-in-python

addl_args = ""
for a in sys.argv[1:]:
   addl_args += (" " + a)

command = "heroku config:set SPRING_APPLICATION_JSON=" + "'" + back_to_json + "'" + addl_args;
print("\nExecuting: " + command);
os.system(command);
