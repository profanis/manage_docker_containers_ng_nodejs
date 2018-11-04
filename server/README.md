## Manage Docker Containers

### Prensetation Layer
* Controllers
    
    The code of the routes/endpoints. This layer is dumb and should not have any logic. If needed could orchestrate multiple services. 


### Business Layer
* Services

    All the business logic belongs here


Manage Docker as a non-root user
https://docs.docker.com/install/linux/linux-postinstall/

## View containers
> GET /containers

|Query param|Type           |Description        |Default|
|-----------|---------------|-------------------|-------|
|all        |boolean        |view all containers|false  |

## Create a container
> POST /containers

**body**
```
{
    name: "ubuntu",
    tag: "myUbuntuContainer"
}
```

## Start a container
> PATCH /containers/{id}

**body**
```
{
    status: "start"
}
```

## Stop a container
> PATCH /containers/{id}

**body**
```
{
    status: "stop"
}
```

## Delete a container
> DELETE /containers/{id}

## Monitor the resource usage of each container. (CPU, I/O, etc)
> GET /containers/{id}/resources

## View log output of each container instance.
> GET /containers/{id}/logs

# How to run the docker file
> docker build -t "manage_docker_containers" .
> docker run --env APP_PORT=3001 -p 3001:3001 -it manage_docker_containers
