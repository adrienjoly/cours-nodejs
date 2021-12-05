#!/bin/bash

set -e # stop script on any non-zero exit code

function test {
  # Hide TECHIO messages to students, from printMessage()
  HIDE_TECHIO_MESSAGES=1 \
  CODE_FILE="$1.solution.js" \
  node_modules/mocha/bin/mocha "$1.spec.js"
}

# cd nodejs-project
# test "1-fs-base"
# test "2-fs-async"
# test "3-fs-interm"
# test "4-fs-promise"
# test "5-fs-await"

npx . test 3-1 minuscules.js # pour faire tester minuscules.js au robot de 
