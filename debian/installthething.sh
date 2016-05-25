#!/usr/bin/env bash
set -x

npm --cache /tmp/npmcache install
cd node_modules/sails-aaf-rapid-connect
npm --cache /tmp/npmcache install


