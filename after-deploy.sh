#!/bin/bash

cd /home/ec2-user/onef_front
npm install
npm run build
pm2 restart NEXT_APP --update-env