// Setup initial game stats
var score = 0;
var lives = 2;


// Define your ghosts here

var Inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var Blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var Pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Shadow',
  edible: false
};

var Clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

var ghosts = [Inky, Blinky, Pinky, Clyde]

// replace this comment with your four ghosts setup as objects


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayPowerPellest();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
}

function displayPowerPellest() {
  console.log('\nPower-Pellets: ' + powerPellets)
}

function displayMenu() {
  console.log('\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(p) Eat Power-Pellets');
  console.log('(1) Eat Inky');
  console.log('(2) Eat Blinky');
  console.log('(3) Eat Pinky');
  console.log('(4) Eat Clyde');
  console.log('(q) Quit');
  console.log('HAH GOTEEE');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost)
{
  console.log('\nChomp!');
    if (ghost.edible === false) {
      console.log('\n'+ ghost.name + ' is not edible! You have been hurt!');
      lives -= 1;
       if (lives === 0) {
         console.log('\nYou tried to eat the ' + ghost.colour + ' ghost, ' + ghost.name +'. You died!');
         process.exit();
       }
  } else {
      score += 50;
  }
}

function ghostsEdible() {
  for (var index = 0; index < 4; index++) {
    ghosts[index].edible = true;
  }
}

function eatPowerPellet() {
  ghostsEdible();
  powerPellets -= 1;
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'p':
      eatPowerPellet();
      console.log('\nOm nom nom. Time to eat!');
      break;
    case '1':
      eatGhost(ghosts[1]);
      break;
    case '2':
      eatGhost(ghosts[2]);
      break;
    case '3':
      eatGhost(ghosts[3]);
      break;
    case '4':
      eatGhost(ghosts[4]);
      break;
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

var powerPellets = 4;


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
