#!/bin/bash

while true; do
    rm game.bak.js
    mv game.dist.js game.bak.js 
    gcc -E -x c -o game.dist.js main.js
    sed -i '/^#/d' game.dist.js
    cmp --silent game.bak.js game.dist.js || touch buildstatus.txt
    sleep 1;
done

