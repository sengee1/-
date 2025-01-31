/*
@title: getting_started
@author: leo, edits: samliu, belle, kara

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.3.3..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [ box, bitmap`
................
.88888888888888.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.88888888888888.
................`],
  [ goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

const myTune = tune`
500: C4^500,
500: B5^500,
15000`;


// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
.........w..................w
..........w..............wwww
.....www...w...ww........wwww
...www.w..www.ww.ww..w...w..w
..w.......w...w...w.ww.....ww
..www......ww.w...ww..w..ww..
....www....ww.w..............
......www.....w.......www.w..
........www...w............w.
..........ww.w........wwww.w.
............www.......w......
..............www.....ww.....
...........w..w.www.....ww...
...........w...b.wwww...w....
p..........w.ww.....www.w....
...........w..........www...g`,
  map`
p..
.b.
..g`,
  map`
p..g
.b.w
....
ww..`,
  map`
p...
...b
...b
.bbg`,
  map`
...
.p.
...`,
  map`
p.w.
.b.g
..b.
...g`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box], [box]: [box]
  
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  playTune(myTune);
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(myTune);
});

onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(myTune);
});

onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(myTune);
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
