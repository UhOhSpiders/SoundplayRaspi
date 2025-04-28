#!/bin/bash

sleep 10

chromium-browser --kiosk --ozone-platform=wayland /media/$USER/AUTOLAUNCH/p5js/index.html &

pd /media/$USER/AUTOLAUNCH/<YOUR_PATCH_NAME>.pd &