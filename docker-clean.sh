#!/bin/bash

# Navigate to the directory containing your docker-compose.yml file
cd /path/to/your/docker-compose/directory

# Stop and remove containers, networks, and volumes
docker-compose down --volumes

# To remove all images associated with the service
docker-compose rm -f -s -v

# To remove any unused images
docker image prune -a -f

rm -rf fastapi/app/__pycache__
rm -rf fastapi/app/.pytest_cache
rm -rf fastapi/app/.mypy_cache
rm -rf nextjs/.next
rm -rf nextjs/node_modules
rm -rf nextjs/.vercel
rm -rf nextjs/.vercel_cache
rm -rf nextjs/.vercel_output
rm -rf nextjs/.vercel_url
rm -rf nextjs/.vercelignore


