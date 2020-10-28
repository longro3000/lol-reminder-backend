#!/usr/bin/env bash

cd /home/ubuntu/app
pm2 start main.js -i 0 --name lol-reminder-backend &
sudo service nginx restart
