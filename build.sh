#!/usr/bin/env bash
browserify dom.js --s dom > dist/dom.js
browserify diff.js --s diff > dist/diff.js
browserify patch.js --s patch > dist/patch.js