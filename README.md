# 🥧 Raspberry Pi/USB Drive Autolaunch Setup

On boot, this Raspberry Pi / USB Drive setup automatically launches a fullscreen p5js sketch accross 1 or 2 monitors, and Pure Data patch (with no gui) for audio.

## You will need:

- A USB drive
- A Raspberry Pi with Pure Data and Chromium installed

## USB drive setup:

1. Name your USB drive `AUTOLAUNCH`.
2. Copy the contents of the `usb` directory.
3. The USB drive file structure should look like this:

```
AUTOLAUNCH/
    ├── p5js/
    │   ├── css/
    │   ├── js/
    │   └── index.html
    └── pd/
    	├── samples/
	└── YOUR_PATCH.pd
```

## Raspberry Pi setup:

1. Add the `auto_launch.sh` script to `/home/<YOUR_USERNAME>/auto_launch.sh`.

2. Run the following in the terminal to make this executable:

`chmod +x /home/$USER/auto_launch.sh`

3. To execute on boot, run: `sudo nano /etc/xdg/lxsession/LXDE-pi/autostart` and add: `@bash /home/soundplay/auto_start.sh` to the bottom of this file.

4. `Control` + `S` to save and `Control` + `X` to exit.

5. Turn down the resolution on both monitors to get a better framerate from the p5js sketch via: `Preferences > Screen Configuration > Screens > HDMI1 > Resolution`.

6. Save this and reboot the Pi to try it out.

## Notes:

- Press `Alt` + `F4` to exit the fullscreen visuals.
- `auto_launch.sh` waits 10 seconds before it does anything. This lets everything load properly. If it looks like nothing is happening just wait a bit.
- This script can of course be modified to run whatever you need! Notes on the p5js structure found in the p5js folder.
