# Corkboard

This project leverages Webpack, Babel, and React to create an online live note editing website.  You can create, delete, and edit notes using markdown, as well as drag around and resize the notes.  They perfectly handle z-indexes to keep the one you're working on on top!

One small problem I ran into was with image loading with webpack.  It kept not finding the files, until I eventually just used 'url-loader' for the smaller .png, and pulled the .jpg from the internet.

### Extra Credit
* Resizing notes
* Pretty note keeping
* zIndex sorting (note pops to top when dragging/clicked)

Check it out live at http://cs52-corkboard.surge.sh!