# Text Source Controller

![Maintenance](https://img.shields.io/maintenance/yes/2022?style=flat-square)

Easily update text files for use within OBS using a custom web-browser dock. Control your on screen stream text with one monitor!

![Home](https://i.imgur.com/ecoVKci.png)
![Talent](https://i.imgur.com/Q9rAqwf.png)

## Features

### Supports

- 2 teams
- Number scores for both teams
- Two on screen talent
- Swap teams and score
- Reset score to 0

### To Do

- Custom store location
- Unlimited/customizable text sources
- Error logging

## Setup

### Installation

1. Download the exe from releases and double click to run.
2. Access the web app from `localhost:3000`.
3. Minimize the console Window.
4. Add text sources to OBS from `C:\Users\$NAME\OVERLAY_TEXT`
   1. Currently there is no way to change the save location... Feature coming soon!
5. Add custom browser dock in OBS (or use in your favorite web browser of choice)
   1. In the top right go to Docks > Custom Browser Docks
   2. For Dock Name set it to whatever you want
   3. For URL set it to `http://localhost:3000`

### Dev

1. `git clone https://github.com/saamstep/overlay-text-updater`
2. `cd overlay-text-updater/`
3. npm install && npm install pkg -g
4. Run with `npm run dev`
5. Build with pkg app.js

## Tested With

- Windows `10`
- node `v16.15.1`
- npm `8.11.0`
