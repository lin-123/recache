 .PHONY: test clean unit e2e

publish:
	npm publish

test:
	./node_modules/mocha/bin/mocha \
	--timeout 10000 \
	./test/*.spec.js  ./test/unit/*.spec.js