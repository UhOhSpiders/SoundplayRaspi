#!/bin/bash

sleep 10

# Load virtual MIDI device (if not already loaded)
sudo modprobe snd-virmidi midi_devs=1

# Wait for virtual ports to become available
sleep 2

VIRTUAL_MIDI_PORT="36:0"

# Automatically connect all MIDI inputs to the virtual port
for port in $(aconnect -i | grep -E 'client [0-9]+' | grep -v 'Virtual' | awk '{print $2}' | sed 's/://'); do
    echo "Connecting MIDI input port ${port}:0 to $VIRTUAL_MIDI_PORT"
    aconnect "${port}:0" "$VIRTUAL_MIDI_PORT"
done

# Set up dual monitor layout
xrandr --setmonitor virt auto HDMI-1,HDMI-2

# Launch Chromium in kiosk mode
chromium-browser --kiosk --ozone-platform=x11 --window-size=3840,1080 --window-position=0,0 /media/$USER/AUTOLAUNCH/p5js/index.html &

# Launch Pure Data with a midi inputs
pd -nogui -alsa -ossmidi -midiindev 1,2,3 -audiooutdev 4,5  /media/$USER/AUTOLAUNCH/pd/chords.pd &

sleep 10

xdotool key --repeat 3 Tab

xdotool key Return

