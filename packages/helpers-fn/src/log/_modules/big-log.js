const CFonts = require('cfonts')

function bigLog(msg){
  CFonts.say(msg, {
    font          : 'chrome', // define the font face
    align         : 'left', // define text alignment
    colors        : [ '#77a', '#a7a', '#77a' ], // define all colors
    background    : 'white', // define the background color, you can also use `backgroundColor` here as key
    letterSpacing : 0, // define letter spacing
    lineHeight    : 0, // define the line height
    space         : false, // define if the output text should have empty lines on top and on the bottom
    maxLength     : '0', // define how many character can be on one line
  })
}

exports.bigLog = bigLog
