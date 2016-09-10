@ECHO OFF
REM Simple build batch for pre-processing JS
ECHO Doing pre-processing work on JS input
rm game.bak.js
mv game.dist.js game.bak.js
gcc -E -x c -o game.dist.js main.js
sed -i '/^#/d' game.dist.js
touch buildstatus.txt
ECHO Done!
