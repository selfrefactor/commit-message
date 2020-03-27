# Tuna Player

Linux MP3 player which applies various sound effects to the songs

## Bugs

`sudo apt-get install libgtk2.0-0`

## Screen

![Screen](/screen.png)

## Argumentation

I used to like tools as *Traktor*, *Ableton Live*. But then I realized, that they are not flexible enough for my needs so I ditched them.

I accepted the situation up until I found [Tuna.js](https://github.com/Theodeus/tuna) library. Then I thought, that this could be the answer I was looking for.

The rest of the story is code.

## How to install

1. `git clone https://github.com/selfrefactor/tuna-player.git&&cd tuna-player` 

2. `yarn install`

3. `yarn start` - This will open the program and attach an icon. You can close the program and start it from the icon without the need to repeat `yarn start`.

4. Initially, you will see a notification that you have to load a local MP3 folder. To do that, you have to click ⏏ and point to a local folder.

5. Now that the files list is loaded, you need to select a track. You can do that by either pressing **Plus** button or use the select menu.

6. After few second, you should be able to hear the modified sound of the selected track. Next time you open the application, it will load the last opened local folder. It will load your saved effects settings as well.

# Buttons

- **Save** - save your current settings to reuse next time you start *Tuna Player*

- **Eject** - to load a local folder with MP3 files. Don't load folder, while there is track playing. You need to either stop or pause it.

- **Check** - to confirm the **Tuna.js settings**(the 11 equalizers). Note, that the track will start from the start.

- **Pause** - to pause the track

- **Play** - to resume a paused track

- **Next** - to load the next song from the list. Loop functionality is already enabled. The next song will be played with the current visual state of the **Tuna.js settings**

- **Plus** - alternative way of selecting songs. Number of songs displayed are dependent of your display resolution.

# Additional info

- The programs uses local port 3002, so be sure that this port is free.

- When modifying the effect, those settings will apply for the next track. If you want to apply them to the current track, then you need to click the **Check** button, which will reload the current track with the new settings.

- There is no autoplay, so you have to select each song, that you want to hear.

As a fallback, if you don't select a next track within 8 minutes, the next button would be pressed.

# Tuna.js

![Tuna](https://i.chzbgr.com/completestore/12/9/4/rjttPiC7WE6S4Bi22aYp1A2.jpg)

`Tuna Player` uses `Tuna.js` developed by [Oskar Eriksson](https://github.com/Theodeus)
