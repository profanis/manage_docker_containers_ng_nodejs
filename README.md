## Docker Manager

### Run the `server` and `client` containers through docker-compose

```
cd server
yarn install
yarn tsc
cd ../client
yarn install
yarn build
docker-compose up --build
```

Open in browser http://localhost:4200

### More info
[Server README file](./server/README.md)

[Client README file](./client/README.md)
