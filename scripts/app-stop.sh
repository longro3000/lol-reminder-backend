#!/usr/bin/env bash

pm2 stop lol-reminder-backend || true
pm2 delete lol-reminder-backend || true
