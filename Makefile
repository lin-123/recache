 .PHONY: test clean unit e2e

refresh:
	DIR=example refresh-cache

dev:
	DIR=example devtool src/index.js

build:
	NODE_ENV=production webpack

publish: build
	npm publish

e2e:
	./node_modules/mocha/bin/mocha \
	--timeout 10000 \
	./test/*.spec.js  ./test/e2e/*.spec.js

unit:
	./node_modules/mocha/bin/mocha \
	--timeout 10000 \
	./test/*.spec.js  ./test/unit/*.spec.js