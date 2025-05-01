#!/bin/bash

sleep 10

xrandr --setmonitor virt auto HDMI-1,HDMI-2

chromium-browser --kiosk --ozone-platform=x11 --window-size=3840,1080 --window-position=0,0 /media/$USER/AUTOLAUNCH/p5js/index.html &

pd -alsa -midiindev 1 -midioutdev 0 /media/$USER/AUTOLAUNCH/<YOUR_PATCH_NAME>.pd &