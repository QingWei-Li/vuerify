default: dev

.PHONY: dist test

dev:
	npm run dev

dist:
	npm run dist

test:
	npm test

deploy:
	npm run deploy

lint:
	npm run lint
