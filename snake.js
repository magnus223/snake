// AJAX post reqest inserts to databse
function sendScore(name, score) {

    var hr = new XMLHttpRequest();
    var url = "leaderboardadd.php";  // insert script
	var vars = "name=" + name + "&score=" + score;
    hr.open("POST", url, true);
    // Set content type header information for sending url encoded variables in the request
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Send the data to PHP now... and wait for response to update the status div
    hr.send(vars); // Actually execute the request
}

// AJAX post reqest loads records from database
function loadDatabase() {

    var hr = new XMLHttpRequest();
    // Create some variables we need to send to our PHP file
    var url = "leaderboardread.php";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
            if (hr.readyState == 4 && hr.status == 200) {
                var return_data = hr.responseText;
                document.getElementById("records").innerHTML = return_data;
            }
        }
        // Send the data to PHP now... and wait for response to update the status div
    hr.send(null); // Actually execute the request	
}
// loads, initialize game and loads current best scores from database
window.onload = function() {
        var play = new Game();
        play.init();
        loadDatabase();


    }
    // prepare canvas 
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 400;


// variables to load sprites and sounds
var sound = new Audio();
var bgSound = new Audio();
sound.src = "sound.wav";
bgSound.src = "bgsound.wav";

var onButton = new Image();
var offButton = new Image();
onButton.src = "sOnn.png";
offButton.src = "sOff.png";

var volume = false; // sounds turned off by default

var appleImg = new Image(); // apple sprite
var bgImage = new Image(); // background
var headImg = new Image(); //  head sprite
bgImage.src = "bg2.png";
appleImg.src = "apple.png";
headImg.src = "head.png";

var size = 25; // basic cell size, size of frames width/height and lenght of the side of the square/ one snake part

//  checks trigger state and draw sounds turned on / off icon
function drawIcon() {
    if (volume) {
        ctx.drawImage(onButton, canvas.width - onButton.width, canvas.height - onButton.height)
    } else {
        ctx.drawImage(offButton, canvas.width - offButton.width, canvas.height - offButton.height);
    }
}

// check if mouse click were on sound button
function checkIcon(e) {
    var pos = getMousePos(canvas, e);
    posx = pos.x;
    posy = pos.y; // area on canvas where icon is drawn
    if (posy < canvas.height && posy > canvas.height - onButton.height &&
        posx < canvas.width && posx > canvas.width - onButton.width) {
        if (volume == true) {
            bgSound.pause();
            volume = false;
        } else {
            bgSound.loop = true;
            bgSound.play();
            volume = true;

        }
    }
}

// Reused function, which calculates  mouse position on canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
// Class Apple
function Apple() {

    var appleFrames = 8; // total number of apple  frames in sprite img
    var frameAppleShift = 0; // counter from where frame gonna be clipped
    var currentAppleFrame = 0; // counter which frame is in use

    this.onBoard = false; // if apple is already on board
    this.x = 0;
    this.y = 0;
    this.scoreValue = 5;
    this.randomize = function() {
        this.x = Math.floor(Math.random() * (canvas.width / size));
        this.y = Math.floor(Math.random() * (canvas.height / size));
    };


    // function for animated apple
    this.drawApple = function() {
        //draw each frame and calculates place of next one 
        ctx.drawImage(appleImg, frameAppleShift, 0, size, size,
            this.x * size, this.y * size, size, size);
        frameAppleShift += size;

        // return to first frame after using last one
        if (currentAppleFrame == appleFrames - 1) {
            frameAppleShift = 0;
            currentAppleFrame = 0;
        }
        currentAppleFrame++;
    };
}

// Snake class
//Reused variables
function Snake() {
    var that = this;
    this.partsNum = 7; //number of snake's parts at beginning
    this.bodyArray = []; // array keeps positions of every snake segment
    this.direction = "right"; // snake direction at beginning
    this.paused = false;   // game paused
    this.alive = true; 
    this.eaten = false; // if in this frame snake found apple
    this.multiply = 1; // number of parts which snake receives for every apple, used in grow()
    var frameHeadShift = 75; //value for sprite, snake goes right direction
    //at start, head, which going right is placed as third frame (3*25=75)

    //  Creates array for Snake parts
    this.initSnake = function() {
        for (var i = 0; i < this.partsNum; i++) {
            this.bodyArray.push({x: i, y: i });
        };
        this.snakeControls();
        ////////////////////////////////////////////////////
    };
    this.updatePosition = function() {
        var tempx = this.bodyArray[this.partsNum - 1].x;
        var tempy = this.bodyArray[this.partsNum - 1].y;
        var prevX = tempx;
        var prevY = tempy;
        switch (this.direction) {
            case "right":
                this.bodyArray[this.partsNum - 1].x++;
                break;
            case "down":
                this.bodyArray[this.partsNum - 1].y++;
                break;
            case "left":
                this.bodyArray[this.partsNum - 1].x--;
                break;
            case "up":
                this.bodyArray[this.partsNum - 1].y--;
                break;
        }

        for (var i = this.partsNum - 2; i >= 0; i--) {
            tempx = this.bodyArray[i].x;
            tempy = this.bodyArray[i].y;
            this.bodyArray[i].x = prevX;
            this.bodyArray[i].y = prevY;
            prevX = tempx;
            prevY = tempy;
        }
    };
    ///////////////////////////////////////////////////////
    this.snakeControls = function() {
        window.onkeydown = function(e) { //  controls by arrows or WSAD
            switch (e.keyCode) {
				case 65: // A
                case 37:
                    if (that.direction != "right") {	//  snake cant turn 180 degrees
                        that.direction = "left";  
                        frameHeadShift = 25;
                    }
                    break;
				case 87: // W
                case 38:
                    if (that.direction != "down") {
                        that.direction = "up";
                        frameHeadShift = 50;
                    }
                    break;
				case 68: // D
                case 39:
                    if (that.direction != "left") {
                        that.direction = "right";
                        frameHeadShift = 75;
                    }
                    break;
				case 83: // S
                case 40:
                    if (that.direction != "up") {
                        that.direction = "down";
                        frameHeadShift = 0;
                    }
                    break;
                case 32 /*SPACE*/ :
                    if (that.paused) {
                        that.paused = false;
                    } else {
                        that.paused = true;
                    }
                    break;
            }
        };


        window.addEventListener('mousedown', checkIcon, false);

    };

    this.drawSnake = function() {  // to avoid boring monotonous snake body, my pattern
        for (var i = 0; i < this.partsNum - 1; i++) {

            ctx.beginPath();
            ctx.fillStyle = "#2cc353";
            if ((this.partsNum - i) % 3 == 0) ctx.fillStyle = "#d0e636";
            ctx.rect(this.bodyArray[i].x * size, this.bodyArray[i].y * size, size, size);
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "white";
            ctx.stroke();

            if ((this.partsNum - i) % 4 == 0) {
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.arc(this.bodyArray[i].x * size + size / 2, this.bodyArray[i].y * size + size / 2, 3, 0 * Math.PI, 2 * Math.PI);
                ctx.fill();
            };



        }		// head 
        ctx.drawImage(headImg, frameHeadShift, 0, size, size,
            this.bodyArray[this.partsNum - 1].x * size, this.bodyArray[this.partsNum - 1].y * size, size, size);


    };//reused, improved function
    this.colision = function(appleX, appleY) {
      var sHead = this.bodyArray[this.partsNum - 1];

      for (var i = 0; i < this.bodyArray.length - 1; i++) { //  body parts collision check
          if (this.bodyArray[i].x == sHead.x && sHead.y == this.bodyArray[i].y) {
              this.alive = false;
          }
      }
						
		if(sHead.x == appleX && sHead.y == appleY){ // apple cant be outside canvas, 
		this.eaten = true;}
		else{																			//if head is at apple position, no need for further checking
      if (sHead.x * size >= canvas.width || sHead.x < 0) { //  canvas edges
          this.alive = false;
      } else { 							// if first is true, no need to check secod statement
          if (sHead.y * size >= canvas.height || sHead.y < 0) { 
              this.alive = false;
          }
	  }
      }
  };


    // Snake gains another part
    this.grow = function() {
        this.bodyArray.unshift({ // -1 values to prevent from displaing before next snake position update
            x: -1,
            y: -1
        })
        this.partsNum++;

        if (that.score % 15 == 0) { // every 3 apples, snake receives 2 parts instead of one
            this.bodyArray.unshift({
                x: -1,
                y: -1
            });
            this.partsNum++;
        }



    };
} ////////////////////////////////////////////////////////////////////////////////////

// Main Game class,
  
// list of needed variables reused 
function Game() {
    var that = this;
    this.width = canvas.width;
    this.height = canvas.height;
    this.state = "New";
    this.snake = new Snake();
    this.apple = new Apple();
    this.appleCorrect = true;
    this.score = 0;
    var name; //  i added player name


    this.drawStartScreen = function() { // Start screen function
        ctx.drawImage(bgImage, 0, 0);
        var charTable = new Array();

        ctx.font = "50px Elephant";
        ctx.fillStyle = "#70e72c";
        ctx.fillStyle = ctx.createLinearGradient(0, 0, 290, 320);
        ctx.fillStyle.addColorStop(1, "#cccccc");
        ctx.fillStyle.addColorStop(0.25, "#f4c524");
        ctx.fillText("Casual Snake", 40, 90);
        ctx.font = "30px serif";
        ctx.fillText("Press ENTER to begin.", 20, 150);
        ctx.fillText("Use arrows or WSAD to control Snake", 20, 280);
        ctx.fillText("and SPACE to Pause game.", 20, 180);

        window.onkeydown = function(e) { 				// Smart part
            switch (e.keyCode) {									// using  onkeydown  keyboard keycodes are keeped in array
                case 13 /*enter*/ :									// and changed to user name
                    ctx.drawImage(bgImage, 0, 0);
                    ctx.fillText("Type name and press Enter:", 20, 140);

                    window.onkeydown = function(e) {
                        if (e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode == 13 || e.keyCode == 8 || e.keyCode == 32 ||
                            e.keyCode >= 96 && e.keyCode <= 105) { //restrict input chars to alphanumeric, enter, space and backspace
                            switch (e.keyCode) {
                                case 8: //backspace
                                    charTable.pop();
                                    break;

                                case 13: //enter
                                    that.state = "PlayGame";
                                    that.init();
                                    break;

                                default: // other 
                                    if (charTable.length <= 12) { // no more than 12 char's
                                        charTable.push(e.keyCode);
                                    }
                                    break;
                            }
                            ctx.drawImage(bgImage, 0, 0);
                            ctx.fillText("Type name and press Enter:", 20, 140);
                            name = String.fromCharCode.apply(this, charTable);
                            ctx.fillText(name, 60, 240);
                        }
                    }

                    break;



            }
        }


    }//// end of drawSmartScreen function


// reused code till  452 line
    this.init = function() {
        switch (this.state) {
            case "New":
                this.drawStartScreen();
                break;
            case "PlayGame":
                this.activateGame();
                break;
            case "GameLost":
                window.onkeydown = function(e) {
                    switch (e.keyCode) {
                        case 13 /*enter*/ :
                            that.score = 0;
                            ctx.drawImage(bgImage, 0, 0); // i added background
                            drawIcon();
                            that.snake = null;
                            that.snake = new Snake();
                            that.apple = new Apple();
                            that.state = "PlayGame";
                            that.init();
                            break;
                    }
                };
                break;
        }
    };


    this.activateGame = function() {
        this.snake.initSnake();
        this.intervalID = setInterval(function() { /////////// main gameloop


            if (that.snake.eaten) {
                that.score += that.apple.scoreValue;
                that.apple.onBoard = false;
                that.snake.grow();
                that.snake.eaten = false;
                if (volume) sound.play(); // i have added sound effect
            }


            //setting apple on a board
            if (that.apple.onBoard != true) { 
                do {
                    that.appleCorrect = true;
                    that.apple.randomize(); // cant place apple on a snake
                    for (var i = 0; i < that.snake.bodyArray.length; i++) {
                        if (that.apple.x == that.snake.bodyArray[i].x && that.apple.y == that.snake.bodyArray[i].y) {
                            that.appleCorrect = false;
                            break;
                        }
                    }
                } while (!(that.appleCorrect));
                that.apple.onBoard = true;
            }


            if (that.snake.alive) { // snake condition check, and draw 
                if (that.snake.paused != true) {

                    that.snake.updatePosition();
                    that.snake.colision(that.apple.x, that.apple.y);

                    ctx.drawImage(bgImage, 0, 0);
                    drawIcon();
                    that.apple.drawApple();
                    that.snake.drawSnake();   ////////////////////// end of reused part
                } else {
                    ctx.drawImage(bgImage, 0, 0); //Game Paused
                    drawIcon();
                    ctx.font = "55px Elephant";
                    ctx.fillStyle = "black";
                    ctx.fillText("Game Paused", 120, 150);
                    ctx.fillText("Press SPACE", 120, 280);
                   // ctx.fillStyle = "black";
                }
            } else { // Game Lost
                ctx.fillStyle = "black";
                ctx.font = "55px Elephant";
                ctx.fillText("Game Over", 80, 180);
                ctx.font = "30px Elephant";
                ctx.fillText("Press ENTER", 110, 230);
                ctx.fillText("Your Score: " + that.score, 150, 285);
                loadDatabase();						//download top 10 records table
                ctx.fillStyle = "black";
                clearInterval(that.intervalID);
				sendScore(name, that.score);   // send score to database
                that.state = "GameLost";
                that.init();
            }
        },150); //interval att.
    };

};
