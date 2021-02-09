## [commit](https://github.com/Arcuman/rsclone/tree/a11f38f507ffc7a14a513e25d4ec757b3d91ea56) on 3 Feb, 2021 
### Added
@Ilya-Baklanov
- added mana crystal

 @Arcuman
- add exit button in game

### Fixed
- fixed bugs before last deploy
- write instruction for start
- add database dump

##  [commit](https://github.com/Arcuman/rsclone/tree/b099cb2384dbc09525acff47d1b14dc6820fb04e) on 31 Jan- 2 Feb, 2021 ##

### Added
@annastartseva
- Render many decks
- Add control button in MyCards and change default cursor

 @Arcuman
- Add end-turn-button style
- Add card from player deck

@HalinaPP
- Implement mute audio options
- Create current deck choosen scene (deck for next game)
- Add sounds to authorization page, MyCards page, Current deck page

### Changed
@HalinaPP
- Change settings for heroku upload
       
### Fixed
@Arcuman
- fix menu button on gameOver scene,
- fix disconnect win
- fix max table player card
- fix timer bug


       
## [commit](https://github.com/Arcuman/rsclone/tree/15613f8802d2bea1fdd232638fe0d2d25da069c3) on 26-29 Jan, 2021 ##

### Added
@annastartseva
- Create slider of pages in MyCards block
- Create slider of pages in Decks block
- Render card list from the deck
- Render deck list

@Arcuman
- Create levels model and controller
- Create client side win/lose logic
- Create server side win/lose logic
- Create moving cards to dropzone with animation
- Create logig for playing cards on the table
- Create dropzone for enemy cards

@Halinapp
- Add Audio sounds in the game: background audio, on click, on hover events, cards, decks and others
- Create route for level on the server side, set level info to user profile settings
- Log all requests and errors on the server side

### Changed
@Ilya-Baklanov
- Relocate components
- Change Timer component: add background for timer, add new spritesheets, fix animation

### Fixed
@annastartseva
- fix style for auth button
      
              
       
## [commit](https://github.com/Arcuman/rsclone/tree/02668729994d551e11a8d5baeb242ac0f5753a39) 21-25 Jan, 2021 ##

### Added
@annastartseva
- create MyCards scene

@Arcuman
- Create change turn functional: logic, add next turn button
- Create dragable card in the game, drag&drop, move to the table
- Create differrent type of the Card, implement init draw, create functional of card and avatar, set received data from server

@Halinapp
- Create Deck component on the client side,  request data from API (data from server side)
- Create User Profile scene on the client side, request data from API 
- Create Button component
- Render Authorization form element on the client side
- Implement global ErrorHandler, all error handle in one place.

@Ilya-Baklanov
- Render timer, set data, create animation
- Add new assets, wick and boom

### Changed
@annastartseva
- refactor: change structure of Cards


## [commit](https://github.com/Arcuman/rsclone/tree/d1d67301cf16359ccefb76236c003196cc195e98) on 16-20 Jan, 2021 ##

### Added
@annastartseva
- Create component Card and add it“s functionality
- Render user avatar, game table, set position constants

@Arcuman
- Create finding enemy scene.
- Init game state
- Create connection of 2 players
- Close room if one of the  players is disconnected

@Halinapp
- Set deploy configuration of db for Heroku 
- Create Swagger specification for users, decks, cards and auth requests
- Create initial data (initial cards, initial decks) during registration of new user
- Create CRUD actions for user profile
- Create CRUD actions for cards
- Create CRUD actions for decks


       
### Changed	
@annastartseva
- Create and set background image for scenes

@Arcuman
- change router, using Phaser


 ## [commit](https://github.com/Arcuman/rsclone/tree/9757a0d8fea15e1fc0f21fbf34a5f564504161a4) on 11-15 Jan, 2021 ##

   ### Added
@annastartseva
- Create favicon, set card images
- Implement exit button
- Add menu style and change interface name for menu item

@Arcuman
- Add location of the game objects

@Halinapp
- Implement authorization with refreshToken on the client side
- Handle login,  registration, logout actions on the client side, set authorized user information to the state
- Create server part of refreshToken, create UserRefreshSession model
- Check authentication before all most of queries on server
 
@Ilya-Baklanov
- Add router, write test work structure
- Add redux, write test work structure
       
### Changed
   @annastartseva
   - Refactor menu Scene
   
   @Arcuman
   - Change table board style
   
   ### Fixed
   @Arcuman
   - Fix router work
   
   @Ilya-Baklanov
   - Renamed variables, add interface and types
   
       
## [commit](https://github.com/Arcuman/rsclone/tree/7f9f959eb8a42fd86af0ea7b1aad2d943da6eff0) on Jan 6-10, 2021 ##
### Added
@annastartseva
- Create menu component, structure, main actions

@Arcuman
- GameBoard: add card on hand player,  set mana for players on each round, create play table, create timers
- Set initial state of game
- Create connection and disconection using sockets(in rooms) 

@Halinapp
- Render login form on the client
- Set user data after authentication to state.
- Create JWT token, use passport-Bear authentication for verifying users
- Write and compare hash of uset password
- Create user Auth component on server. Implement next user route actions: get all users, get user by id, post, put, delete users




## [commit](https://github.com/Arcuman/rsclone/tree/b055ed9cf03eb833d46ea2e0ff3905b5200b7822) on 5 Jan, 2021

### Added
@Arcuman
- Create and configure settings of: eslint, gitignore, typescript

### Changed
@Arcuman
- Change webpack settings: add aliases, airbnb, eslint

### Fixed
@Arcuman
- Webpack imports
- Delete react settings in the webpack
     

## [commit](https://github.com/Arcuman/rsclone/tree/b0a47b4b552e05e5a518f6f792c1bebc9eb03d6e) on 26 dec 2020 — 4 Jan 2021 
     
   ### Added
@Arcuman
- Create database structure
- Set webpack on server, include nodejs, typescript, eslint, postgresql(pg)
- Create structure of the server, add folders, empty files 
- Create structure of the client, add folders, empty files

 @Halinapp
- Add new dependences for authenticate on server
  
 @Ilya-Baklanov
 - Set webpack on client, include typescript, eslint
  
  


