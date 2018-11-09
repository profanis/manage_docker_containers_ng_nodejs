## GUI for Docker Manager

### Based on yarn
The project is based on yarn package manager. It would work with npm, but it's not guaranteed that correct versions will be installed. For more info please check https://www.npmjs.com/package/semver

### How to install
execute on the cli `yarn install`

### How to start
execute on the cli `yarn start`

### How to test
execute on the cli `yarn test`

### How to build
execute on the cli `yarn build`

### How to build the docker container

- **Prerequisites**
  
  The user should be in `docker` group. For more https://docs.docker.com/install/linux/linux-postinstall/

```
yarn install
yarn build
docker build .  
```
