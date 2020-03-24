#!/usr/bin/env python

# Check the syntax of the localhost.json file

import json
import os
from pprint import pprint
import sys

try:
  with open('localhost.json') as json_data:
     vars = json.load(json_data)
  back_to_json = json.dumps(vars,indent=2)
  print(back_to_json)
  print("JSON looks ok")
except IOError as e:
  print("Error reading from localhost.json")
  print(type(e),e.args)
except Exception as e:
  print("Error in JSON: ")
  print(type(e),e.args)
