# John Prix control app

Control app for **John Prix**, our autonomous car for the MR2006B challenge (STM32 NUCLEO-F446RE + HM-10 Bluetooth Low Energy module).

- Open it on iPhone in the **Bluefy** browser (Safari does not support Web Bluetooth). On a computer use Chrome or Edge.
- Connects to the HM-10 (service `FFE0`, characteristic `FFE1`).
- Manual driving with a joystick (sends `D<v mm/s>,<w deg/s>` 5 times per second), big STOP button (`S`), live telemetry, path plot, CSV export.
- Safety in the car firmware: it stops if no command arrives for 1 s, if the Bluetooth link drops, or if the blue button is pressed.

Telemetry line from the car: `T,t_ms,mode,v_cmd,w_cmd,v_left,v_right,yaw_x10,x_mm,y_mm`
