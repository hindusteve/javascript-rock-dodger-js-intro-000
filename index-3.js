/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

var counter2 = 0;
/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
console.log("checkCollision has been called")
counter2 += 1;

  const top = positionToInteger(rock.style.top)

///console.log("top in checkCollision is ", top)
  if (top > 360) {
console.log("in checkCollision if, so top should be > 360")
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    if (
      ((rockLeftEdge < dodgerLeftEdge) && (rockRightEdge > dodgerLeftEdge))
      || ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge))
      || ((rockLeftEdge < dodgerRightEdge) && (rockRightEdge > dodgerRightEdge))
             )
    {
console.log("returning true from checkCollision, counter2 is --> ", counter2)
      return true
    } else {
      return false
      }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here? --> AK answer:(?) so that it will be locally scoped
  var top = 0;
  //var testvar

  var counter = 0; //variable for debugging


  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   GAME.appendChild(rock)

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
counter += 1;
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */

     rock.style.top = `${positionToInteger(rock.style.top) + 2}px`;
console.log("calling checkCollision, top is --> ", positionToInteger(rock.style.top))
     if (checkCollision(rock)) {
       //debugger;
console.log("calling endgame from collision check, counter is --> ", counter)
       return endGame();
     }
  //   /**
  //    * Otherwise, if the rock hasn't reached the bottom of
  //    * the GAME, we want to move it again.
  //    */
     if (positionToInteger(rock.style.top) < 380) { // AK: do we know what rock.style.bottom is? Is 0 the proper lower bound? {changed it, looking at top}
//console.log("the top is --> ", positionToInteger(rock.style.top))
//console.log(" counter is --> ", counter)
       window.requestAnimationFrame(moveRock);
     }
     else {
//console.log(rock)
        rock.remove()
     }
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
  }

  // We should kick off the animation of the rock around here
//console.log("1st move rock call")
  window.requestAnimationFrame(moveRock)  // AK: feeling uncertain about this, feeling better once I removed the moveRock call from above and placed it here
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)
//console.log("now there are this many rocks on the array ", ROCKS.length)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  // gameInterval = null;
console.log("In end game")
  var numRocks = ROCKS.length

  clearInterval(gameInterval);
// console.log("# of rocks ", ROCKS.length)

  ROCKS.forEach(function (rock) {rock.remove()})

//   for (var i = 0; i < numRocks; i++) {
// //console.log("poppin' rocks ", i, " --> ", ROCKS.length)
// //    console.log(ROCKS[i])
//     var rock = ROCKS[0]
//     rock.remove();
//     ROCKS.pop();
//   }
  window.removeEventListener('keydown', moveDodger)
  // debugger;
  // console.log("YOU LOSE!");
  return alert("YOU LOSE!");

}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   if (e.which === LEFT_ARROW) {
     moveDodgerLeft();
     e.preventDefault();
     e.stopPropagation();
   } else if (e.which === RIGHT_ARROW) {
     moveDodgerRight();
     e.preventDefault();
     e.stopPropagation();

   }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var left = positionToInteger(DODGER.style.left)

   function step() {
     if ((positionToInteger(DODGER.style.left)) > 0) {
       DODGER.style.left = `${(positionToInteger(DODGER.style.left)) - 1}px`
       if (positionToInteger(DODGER.style.left) > (left - 4)) {
         window.requestAnimationFrame(step) //won't this be a recursive call and not stop....actually, I want it to stop after the 4th pixel
       }
     }
   }
   window.requestAnimationFrame(step)
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var right = positionToInteger(DODGER.style.left)

   function step() {
     if (positionToInteger(DODGER.style.left) < 360) {
       DODGER.style.left = `${positionToInteger(DODGER.style.left) + 1}px`

       if (positionToInteger(DODGER.style.left) < (right + 4)) {
         window.requestAnimationFrame(step) //won't this be a recursive call and not stop....actually, I want it to stop after the 4th pixel
       }
     }
   }
   window.requestAnimationFrame(step)
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  console.log("creating a rock")
  }, 1000)
}
