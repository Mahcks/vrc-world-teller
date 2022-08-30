# vrc-world-teller

This project uses the VR Chat API which requires your VR Chat login and an authentication key. It will routinely update a `world.txt` file that can be placed in OBS which will tell your chat what world you're in.

## Running this on your own machine

*This guide is written assuming you have node.js and npm installed. Haven't done that yet? Check out this guide to get started: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm*

1. Download the latest release and extract the folder to a destination.
2. Open a command prompt there and type in `npm install` to install dependencies.
3. Rename the `example.env` file to `.env`.
4. Open the `.env` file with the text editor of your choice.
5. Change the settings to your liking.
6. Open the command prompt in the same folder again and type in `node index.js`

