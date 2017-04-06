16 DECEMBER 2016
CS25320 Coursework 2016: HTML5 Canvas Game assignment
Aberystwyth University
Received mark: 72.8%
Casual Snake
@author: Karol Kupinski
@e-mail:karol.kupinski@gmail.com
@e-mail:kak40@aber.ac.uk


Table of Contents
1. List of files
2. Comments
3.Rules and Controls



1.List of files
	Name			Description					Source if code is reused
	1. readme.txt		- this file					
	2. about.html		- about page			
	3. help.html		- game desc. + controls desc.
	4. index.html		- page displays game and leadersboard table
	5. sOnn.png		- turned on sound efects icon			https://www.iconfinder.com/icons/763393/audio_device_loudspeaker_sound_speaker_up_volume_icon#size=256
	6. sOff.png		- turned off sound effects icon 		https://www.iconfinder.com/icons/763378/audio_device_loudspeaker_mute_sound_speaker_volume_icon#size=256
	7. bgsound.wav		- background music				https://www.freesound.org/people/stixthule/sounds/161011/
	8. sound.wav		- in-game event sound				https://www.freesound.org/people/ProjectsU012/sounds/341695/
	9. bg.png		- background graphic				http://www.freepik.com/free-photo/blue-background_947188.htm
	10. apple.png		- apple image sprite				
	11. head.png		- snake head sprite			
	12. snake.js		- javascript source code			based on :http://greeboro.linuxpl.eu/playground/wunsz2.html 
											http://jsdn.pl/wip-html5-canvas-snake-w-javascript/
											https://www.developphp.com/video/JavaScript/Ajax-Post-to-PHP-File-XMLHttpRequest-Object-Return-Data-Tutorial 
	13. leaderboardread.php - database read query				http://razorsql.com/articles/postgresql_column_names_values.html
	14. leaderboardadd.php 	- database insert query
	15. style.css		- css stylesheet


Sprites head.png and apple.png are made by me in GIMP, bg.png I only modified.
Sounds are from freesound.org.
Code of the game is based on http://greeboro.linuxpl.eu/playground/wunsz2.html, 
which i were trying to make much better version,
but still for some parts i coudn't find way to write them other/better way
like for example functions checkng colissions and placing new apple on board.

3.Rules
Eating apples makes your snake growing longer.
Snake die if his head touch other 
part of his body or edge of game window.
Every apple is worth 5 points 
The goal is to collect as many apples as you can 

Controls
Use the arrow keys or WSAD to change direction. 
Press space to pause game
Click on the speaker icon to turn on/off sound effects