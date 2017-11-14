var borderCells = [];
var gameIsRunning = false;
var isOver = false;
var AIcounter = randomIntFromInterval(10, 20);
var isShowingMods = false;


setTimeout(function() {
   document.getElementById("intro").classList.add("noAnimation");
}, 2000)



var player = {
   name: "", //whatever the player specifies
   color: "", //color of the player
   direction: "left", //can be right down left or up
   headPos: "", //id of the td where the head is located
   pos: [], //contains all places the player has been, pos[0] will always = headPos
   time: 80, //determines the time between movements normally 80
   score: 0, //The players score, each square moved is plus one score
}

var player2 = {
   type: "computer", //whether its an AI or not
   name: "", //whatever the player specifies
   color: "", //color of the player
   direction: "right", //can be right down left or up
   headPos: "", //id of the td where the head is located
   pos: [], //contains all places the player has been, pos[0] will always = headPos
   time: 80, //determines the time between movements normally 80
   score: 0, //The players score, each square moved is plus one score
   currRelDir: "", //Stores the AI's current relative turn direction, eg clockwise or anti-clickwise
   lastRelDir: "", //Stores the AI's last relative turn direction, eg clockwise or anti-clickwise
}





function generatePlayers() {

   gameIsRunning = true;
   isOver = false;
   player.headPos = 2448;
   player.pos = [2448];
   document.getElementById(player.headPos).style.backgroundColor = player.color;
   document.getElementById("name1").innerHTML = player.name;
   document.getElementById("name1").style.borderBottom = "2px solid " + player.color;
   document.getElementById("rightScore").style.border = "2px solid " + player.color;

   player2.headPos = 2381;
   player2.pos = [2381];
   document.getElementById(player2.headPos).style.backgroundColor = player2.color;

   if (player2.type == "computer") {
      document.getElementById("name2").innerHTML = "Computer";
   } else {
      document.getElementById("name2").innerHTML = player2.name;
   }
   document.getElementById("name2").style.borderBottom = "2px solid " + player2.color;
   document.getElementById("leftScore").style.border = "2px solid " + player2.color;

}



function beginMoving() {
   movePlayer(player.direction);

   if (player2.type == "player") {
      movePlayer2(player2.direction);
   } else if (player2.type == "computer") {
      moveAI(player2.direction);
   }
}



//prepares game
function gogo() {
   player.name = document.getElementById("nameInput").value;
   player.color = document.getElementById("color1").value;
   player.time = document.getElementById("player1speed").value;
   player2.name = document.getElementById("nameInput2").value;
   player2.color = document.getElementById("color2").value;
   player2.time = document.getElementById("player2speed").value;
   if (player.name == "") {
      alert("Please choose a name.");
      return;
   }
   if (player2.name == "" && player2.type == "player") {
      alert("Please choose a name.");
      return;
   }
   if (player.color == player2.color) {
      alert("Please choose dirrerent colors.");
      return;
   }
   if (player.color == "#ffffff" || player2.color == "#ffffff") {
      alert("Consider a different color...");
      return;
   }
   if (player.name == player2.name) {
      alert("Choose different names.");
      return;
   }
   document.getElementById("introBack").style.display = "none";
   document.getElementById("game").style.display = "block";
   document.getElementById("leftScore").style.display = "block";
   document.getElementById("rightScore").style.display = "block";
   generateGame();
   generatePlayers();


   document.getElementById("countdown").style.display = "block";
   document.getElementById("countdown").innerHTML = "3";
   document.getElementById("countdown").style.color = "red";
   setTimeout(function() {
      document.getElementById("countdown").innerHTML = "2";
      document.getElementById("countdown").style.color = "orange";
      setTimeout(function() {
         document.getElementById("countdown").innerHTML = "1";
         document.getElementById("countdown").style.color = "yellow";
         setTimeout(function() {
            document.getElementById("countdown").innerHTML = "GO";
            document.getElementById("countdown").style.color = "green";
            setTimeout(function() {
               document.getElementById("countdown").style.display = "none";
               beginMoving();
            }, 200)
         }, 1000);
      }, 1000);
   }, 1000);
}



//generates the 70x70 game board with each td having a unique id
function generateGame() {
   var currentTd = 0;
   var table = document.getElementById("table");
   for (i = 0; i < 70; i++) {
      var rows = document.createElement("tr");
      rows.setAttribute("id", "row" + i);
      rows.classList.add("row");
      for (x = 0; x < 70; x++) {
         var tds = document.createElement("td");
         tds.setAttribute("id", currentTd);
         tds.classList.add("td");
         rows.appendChild(tds);
         currentTd++;
      }
      table.appendChild(rows);
   }
   generateBorder();
}



function generateBorder() {

   for (i = 0; i <= 69; i++) {
      borderCells.push(i);
   }
   for (i = 4830; i <= 4899; i++) {
      borderCells.push(i);
   }
   for (i = 70; i <= 4860; i = i + 70) {
      borderCells.push(i);
   }
   for (i = 139; i <= 4829; i = i + 70) {
      borderCells.push(i);
   }

   for (i = 0; i < borderCells.length; i++) {
      document.getElementById(borderCells[i]).style.backgroundColor = "white";
   }
}





function player2input() {
   var drop = document.getElementById("nameDropdown").value;
   if (drop == "Player 2") {
      document.getElementById("nameInput2").style.opacity = 1;
      document.getElementById("nameInput2").disabled = false;
      player2.type = "player";
      player2.name = "";
   } else if (drop == "Computer") {
      document.getElementById("nameInput2").style.opacity = 0;
      document.getElementById("nameInput2").disabled = true;
      player2.type = "computer";
      player2.name = "Computer";
   }
}





document.onkeydown = function() {
   //Used to detect when a player presses a key
   //and checks to see if it is an arrow key
   //and sets player.direction accordingly
   switch (window.event.keyCode) {
      case 13:
         if (gameIsRunning) return;
         gogo();
         break;

      case 65:
         if (!gameIsRunning) return;
         if (player2.direction == "right") return;
         player2.direction = "left";
         break;
      case 87:
         if (!gameIsRunning) return;
         if (player2.direction == "down") return;
         player2.direction = "up";
         break;
      case 68:
         if (!gameIsRunning) return;
         if (player2.direction == "left") return;
         player2.direction = "right";
         break;
      case 83:
         if (!gameIsRunning) return;
         if (player2.direction == "up") return;
         player2.direction = "down";
         break;

      case 37:
         if (!gameIsRunning) return;
         if (player.direction == "right") return;
         player.direction = "left";
         break;
      case 38:
         if (!gameIsRunning) return;
         if (player.direction == "down") return;
         player.direction = "up";
         break;
      case 39:
         if (!gameIsRunning) return;
         if (player.direction == "left") return;
         player.direction = "right";
         break;
      case 40:
         if (!gameIsRunning) return;
         if (player.direction == "up") return;
         player.direction = "down";
         break;
      case 77:
         if (gameIsRunning) return;
			var nameInput = document.getElementById("nameInput");
			var nameInput2 = document.getElementById("nameInput2");
			if (nameInput == document.activeElement) return;
			if (nameInput2 == document.activeElement) return;
         showMods();
         break;
   }
};





//IMPORTANT:
//I chose very intentionally to make two of these functions
//because if I used one with a parameter for the other players
//then it ran a lot slower and lagged so I chose o use two.
//
//moves the player 1px in their current direction & checks for loss
function movePlayer() {
   if (player.direction == "up") {
      player.headPos = player.headPos - 70;
   } else if (player.direction == "right") {
      player.headPos++
   } else if (player.direction == "down") {
      player.headPos = player.headPos + 70;
   } else if (player.direction == "left") {
      player.headPos = player.headPos - 1;
   }
   //since the following 4 lines are univertal all directions i included them here
   player.score++;
   document.getElementById("score1").innerHTML = player.score;
   player.pos.unshift(player.headPos);
   document.getElementById(player.headPos).style.backgroundColor = player.color;
   //
   //CHECK PLAYER LOSS
   //
   //Checks to see if the player has hit themselves
   for (i = 1; i < player.pos.length; i++) {
      if (player.pos[i] == player.headPos) {
         gameOver(player);
         return;
      }
   }
   //Checks to see if the player has hit Player 2
   for (i = 0; i < player2.pos.length; i++) {
      if (player2.pos[i] == player.headPos) {
         gameOver(player);
         return;
      }
   }
   //Checks to see if the player went out of the board
   for (i = 0; i < borderCells.length; i++) {
      if (player.headPos == borderCells[i]) {
         gameOver(player);
         return;
      }
   }
   if (isOver) return;
   setTimeout(function() {
      movePlayer();
   }, player.time)
}



//moves the player2 1px in their current direction & checks for loss
function movePlayer2() {
   if (player2.direction == "up") {
      player2.headPos = player2.headPos - 70;
   } else if (player2.direction == "right") {
      player2.headPos++
   } else if (player2.direction == "down") {
      player2.headPos = player2.headPos + 70;
   } else if (player2.direction == "left") {
      player2.headPos = player2.headPos - 1;
   }
   //since the following 4 lines are universal all directions i included them here
   player2.score++;
   document.getElementById("score2").innerHTML = player2.score;
   player2.pos.unshift(player2.headPos);
   document.getElementById(player2.headPos).style.backgroundColor = player2.color;
   //
   //CHECK PLAYER LOSS
   //
   //Checks to see if the player has hit themselves
   for (i = 1; i < player2.pos.length; i++) {
      if (player2.pos[i] == player2.headPos) {
         gameOver(player2);
         return;
      }
   }
   //Checks to see if the player has hit Player 1
   for (i = 0; i < player.pos.length; i++) {
      if (player.pos[i] == player2.headPos) {
         gameOver(player2);
         return;
      }
   }
   //Checks to see if the player went out of the board
   for (i = 0; i < borderCells.length; i++) {
      if (player2.headPos == borderCells[i]) {
         gameOver(player2);
         return;
      }
   }
   if (isOver) return;
   setTimeout(function() {
      movePlayer2();
   }, player2.time)
}



//---------------------------------AI------------------------------------------





function moveAI() {
   var originalDir = player2.direction;

   updateAIdirection()

   var newDir = player2.direction;

   //This block makes it recognise it's relative direction based on it's movement.
   if (originalDir == newDir) {
      //do nothing
   } else if (originalDir == "up" && newDir == "left") {
      player2.currRelDir = "anticlockwise";
   } else if (originalDir == "up" && newDir == "right") {
      player2.currRelDir = "clockwise";
   } else if (originalDir == "right" && newDir == "up") {
      player2.currRelDir = "anticlockwise";
   } else if (originalDir == "right" && newDir == "down") {
      player2.currRelDir = "clockwise";
   } else if (originalDir == "down" && newDir == "left") {
      player2.currRelDir = "clockwise";
   } else if (originalDir == "down" && newDir == "right") {
      player2.currRelDir = "anticlockwise";
   } else if (originalDir == "left" && newDir == "up") {
      player2.currRelDir = "clockwise";
   } else if (originalDir == "left" && newDir == "down") {
      player2.currRelDir = "anticlockwise";
   }

   //this does what, as I understand, Jaxon's didn't ;)
   //It makes the AI less likely to box itlsef in because to box itself in
   //to requires it to turn the same relative direction 3 times,
   //so this just makes a biased descision yet only 75% so it
   //doesen't become predictable and simultaniously nearly,
   //nearly unbeatable.
   if (player2.lastRelDir == "") {
      //intentionally empty
   } else if (player2.lastRelDir == player2.currRelDir) {
      //make a biased choice to the opposite of what they equal, 75%
      var random = randomIntFromInterval(1, 4);
      if (player2.lastRelDir == "clockwise" && random != 1) {
         if (originalDir == "up" && newDir == "right") {
            player2.direction = "left";
         } else if (originalDir == "right" && newDir == "up") {
            player2.direction = "down";
         } else if (originalDir == "down" && newDir == "left") {
            player2.direction = "right";
         } else if (originalDir == "left" && newDir == "up") {
            player2.direction = "down";
         }
      } else if (player2.lastRelDir == "anticlockwise" && random == 1) {
         if (originalDir == "up" && newDir == "left") {
            player2.direction = "right";
         } else if (originalDir == "right" && newDir == "up") {
            player2.direction = "down";
         } else if (originalDir == "down" && newDir == "right") {
            player2.direction = "left";
         } else if (originalDir == "left" && newDir == "down") {
            player2.direction = "up";
         }
      }
   }


   updateAIdirection();

   if (AIcounter > 0) {
      player2.direction = "right";
      AIcounter--
   }


   if (player2.direction == "up") {
      player2.headPos = player2.headPos - 70;
   } else if (player2.direction == "right") {
      player2.headPos++
   } else if (player2.direction == "down") {
      player2.headPos = player2.headPos + 70;
   } else if (player2.direction == "left") {
      player2.headPos = player2.headPos - 1;
   }

   //since the following 4 lines are univertal all directions i included them here
   player2.score++;
   document.getElementById("score2").innerHTML = player2.score;
   player2.pos.unshift(player2.headPos);
   document.getElementById(player2.headPos).style.backgroundColor = player2.color;
   //
   //CHECK PLAYER LOSS
   //
   //Checks to see if the player has hit themselves
   for (i = 1; i < player2.pos.length; i++) {
      if (player2.pos[i] == player2.headPos) {
         gameOver(player2);
         return;
      }
   }
   //Checks to see if the player has hit Player 1
   for (i = 0; i < player.pos.length; i++) {
      if (player.pos[i] == player2.headPos) {
         gameOver(player2);
         return;
      }
   }
   //Checks to see if the player went out of the board
   for (i = 0; i < borderCells.length; i++) {
      if (player2.headPos == borderCells[i]) {
         gameOver(player2);
         return;
      }
   }
   //prepares function for next run
   player2.lastRelDir = player2.currRelDir;
   if (isOver == true) return;
   setTimeout(function() {
      moveAI();
   }, player2.time)
}


function updateAIdirection() {
   var change = needChange(player2.direction);
   if (change) {
      var choices = options();
      player2.direction = choices[Math.floor(Math.random() * choices.length)];
      //chooses a random value of the array choices
   } else {
      var rand = randomIntFromInterval(1, 13);
      if (rand == 1) {
         var choices = options();
         player2.direction = choices[Math.floor(Math.random() * choices.length)];
         //chooses a random value of the array choices
      }
   }
}



function needChange(direction) {
   var squareAhead;
   var direction = player2.direction;
   if (direction == "up") {
      squareAhead = player2.headPos - 70;
   } else if (direction == "right") {
      squareAhead = player2.headPos + 1;
   } else if (direction == "down") {
      squareAhead = player2.headPos + 70;
   } else if (direction == "left") {
      squareAhead = player2.headPos - 1;
   }
   var isSquareSafe = checkSquare(squareAhead);
   if (isSquareSafe) {
      return false;
   } else {
      return true;
   }
}





function options() {
   var arr = [];
   var direction = player2.direction;

   var up = player2.headPos - 70;
   var right = player2.headPos + 1;
   var down = player2.headPos + 70;
   var left = player2.headPos - 1;

   var test;

   test = checkSquare(up);
   if (test == true) {
      arr.push("up");
   }
   test = checkSquare(right);
   if (test == true) {
      arr.push("right");
   }
   test = checkSquare(down);
   if (test == true) {
      arr.push("down");
   }
   test = checkSquare(left);
   if (test == true) {
      arr.push("left");
   }

   return arr;
}





function checkSquare(square) {
   for (i = 0; i < borderCells.length; i++) {
      if (square == borderCells[i]) {
         return false;
      }
   }
   for (i = 0; i < player.pos.length; i++) {
      if (square == player.pos[i]) {
         return false;
      }
   }
   for (i = 0; i < player2.pos.length; i++) {
      if (square == player2.pos[i]) {
         return false;
      }
   }
   //else
   return true;
}






function gameOver(loser) {
   document.getElementById(loser.headPos).style.backgroundColor = "red";
   //adds 10 to winners score to distinguish the scores better
   if (loser == player) {
      //param player is the loser so I do oppsosite here
      player2.score = player2.score + 10;
      document.getElementById("score2").innerHTML = player2.score;
   } else {
      player.score = player.score + 10;
      document.getElementById("score1").innerHTML = player.score;
   }
   if (loser == player) {
      document.getElementById("output2").innerHTML = "WINNER";
      document.getElementById("output2").style.color = "green";
      document.getElementById("output1").innerHTML = "LOSER";
      document.getElementById("output1").style.color = "red";
   } else {
      document.getElementById("output2").innerHTML = "LOSER";
      document.getElementById("output2").style.color = "red";
      document.getElementById("output1").innerHTML = "WINNER";
      document.getElementById("output1").style.color = "green";
   }

   document.getElementById("restart").style.display = "block";
   isOver = true;
}


function restart() {
   document.getElementById("restart").style.display = "none";
   document.getElementsByClassName("row").remove();
   document.getElementById("output1").innerHTML = "";
   document.getElementById("output2").innerHTML = "";
   AIcounter = randomIntFromInterval(10, 20);
   player.direction = "left";
   player.headPos = "";
   player.pos = [];
   player.score = 0;
   player2.direction = "right";
   player2.headPos = "";
   player2.pos = [];
   player2.score = 0;
   gogo();
}


function showMods() {
   if (isShowingMods == false) {
      document.getElementById("intro").style.display = "none";
      document.getElementById("modScreen").style.display = "block";
      isShowingMods = true;
   } else {
      document.getElementById("intro").style.display = "block";
      document.getElementById("modScreen").style.display = "none";
      isShowingMods = false;
   }
}


//These were created by StackOverflow user Johan Dettmar
Element.prototype.remove = function() {
   this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
   for (var i = this.length - 1; i >= 0; i--) {
      if (this[i] && this[i].parentElement) {
         this[i].parentElement.removeChild(this[i]);
      }
   }
}

//RNG function by Francisc on StackOverflow
function randomIntFromInterval(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}
