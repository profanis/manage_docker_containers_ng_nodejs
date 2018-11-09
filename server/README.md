## API for Docker Manager

### Based on yarn
The project is based on yarn package manager. It would work with npm, but it's not guaranteed that correct versions will be installed. For more info please check https://www.npmjs.com/package/semver

### Build the docker container

- **Prerequisites**
  
  The user should be in `docker` group. For more https://docs.docker.com/install/linux/linux-postinstall/

> yarn tsc
> docker build -t "manage_docker_containers" .
> docker run --env APP_PORT=3001 -p 3001:3001 -it manage_docker_containers

### Test
> yarn test

### Postman collection
Import in postman to get access on the API's endpoints https://www.getpostman.com/collections/4e19e3d2eccf6e36a742

### View containers
> GET /api/containers

|Query param|Type           |Description        |Default|
|-----------|---------------|-------------------|-------|
|all        |boolean        |view all containers|false  |

*by default it returns the running containers*

### Create a container
> POST /api/containers

**body**
```
{
    name: "ngingx",
    tag: "myNginxContainer"
}
```

### Start a container
> PATCH /api/containers/{id}

**body**
```
{
    status: "start"
}
```

### Stop a container
> PATCH /api/containers/{id}

**body**
```
{
    status: "stop"
}
```

### Delete a container
> DELETE /api/containers/{id}

### Monitor the resource usage of each container. (CPU, I/O, etc)
> GET /api/containers/{id}/resources

### View log output of each container instance.
> GET /api/containers/{id}/logs
