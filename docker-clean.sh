#!/bin/bash

# Navigate to the directory containing your docker-compose.yml file
cd /path/to/your/docker-compose/directory

# Stop and remove containers, networks, and volumes
docker-compose down --volumes

# To remove all images associated with the service
docker-compose rm -f -s -v

# To remove any unused images
docker image prune -a -f

