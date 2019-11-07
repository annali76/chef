deploy:
	rm -rf dist/
	npm run build
	surge dist/ https://hci-chef.surge.sh
