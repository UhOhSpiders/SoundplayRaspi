# 🥧 Raspberry Pi/USB Autolaunch Setup

On boot, this setup automatically launches a fullscreen p5js sketch, and a Pure Data patch for audio. 

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
    └── pure_data_patch.pd
```

## Raspberry Pi setup:

1. Add this `auto_launch.sh` script to `/home/<YOUR_USERNAME>/auto_launch.sh`:

```bash
#!/bin/bash

sleep 10

chromium-browser --kiosk --ozone-platform=wayland /media/$USER/AUTOLAUNCH/p5js/index.html &

pd /media/$USER/AUTOLAUNCH/<YOUR_PATCH_NAME>.pd &
```

2. Run the following in the terminal to make `auto_launch.sh` executable:

 `chmod +x /home/$USER/auto_launch.sh` 

3. To execute on boot, run: `mkdir /home/pi/.config/autostart`
4. Then: `nano /home/pi/.config/autostart/auto_launch.desktop`
5. Copy and paste:

```
[Desktop Entry]
Type=Application
Name=auto_launch
Exec=/home/<YOUR_USERNAME>/auto_launch.sh
```

6. Save this.
7. To hide the cursor, run `sudo nano /etc/lightdm/lightdm.conf`
8. Add `xserver-command=X -nocursor` beneath the `[Seat*]`section.
9. Note: this permanently hides your cursor and you'll have to use the terminal to disable this if you need it back.
10. Save this and reboot the Pi to try it out. 

## Notes:

- Press `Alt` + `F4` to exit the fullscreen visuals.
- `auto_launch.sh` waits 10 seconds before it does anything. This lets everything load properly. If it looks like nothing is happening just wait a bit.
- This script can of course be modified to run whatever you need! Notes on the p5js structure found in the p5js folder.

