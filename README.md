Basically, when I was using spotify w spicetify installed, there were too many clean songs, so I made this. The toggle is located in the same bar as the play/pause button and should look like an exclamation point enclosed in a circle.



How to install:

Download the js file and paste this in file explorer (windows):

%localappdata%/spicetify/Extensions

move the js file into that folder.

then, paste these commands in powershell:

spicetify config extensions skipClean.js

spicetify apply

The powershell window should not have admin privileges.
