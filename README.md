# Dasha The Short (Telegram Bot for downloading YouTube Shorts)

## Installation

TBD

## Deployment

First, create a folder on your server and export `BOT_TOKEN` environment variable:

```bash
mkdir -p dasha-the-short
export DASHA_BOT_TOKEN=<YOUR_BOT_TOKEN_HERE>
export DASHA_API_PORT=<YOUR_BOT_TOKEN_HERE>
```

Then you can use this script to pull, build and run the bot:
```bash
#!/bin/bash
cd dasha-the-short
# git clone https://github.com/ksenkso/dasha-the-short.git .
git checkout master
git pull
yarn install --frozen-lockfile
yarn run build
pm2 start ecosystem.config.js
```
