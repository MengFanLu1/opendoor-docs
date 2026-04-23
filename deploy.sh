#!/bin/bash
# GitHub webhook 触发后执行：git pull + docker rebuild

set -e

cd /home/ubuntu/docs
git pull origin main
docker compose build
docker compose up -d

echo "Deploy done at $(date)"
