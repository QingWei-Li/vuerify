default: dev

.PHONY: dist test

dev:
	npm run dev

dist:
	npm run dist-all

test:
	npm test

deploy:
	npm run deploy

lint:
	npm run lint
