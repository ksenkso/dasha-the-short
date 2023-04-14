# Dasha The Short (Telegram Bot for downloading YouTube Shorts)

## Installation

TBD

## Deployment

First, create a folder on your server:

```bash
mkdir -p bash-backend
```

Then you can use this script to pull, build and run the bot:
```bash
#!/bin/bash
cd bash-backend
# git clone https://github.com/ksenkso/dasha-the-short.git .
git checkout master
git pull
yarn install --frozen-lockfile
yarn run build
pm2 start ecosystem.config.js --env production
```
