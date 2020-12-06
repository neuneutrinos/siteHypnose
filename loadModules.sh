#!/bin/sh
modules=(ejs nodemon express express-session mysql)

for module in "${modules[@]}"
do
    echo "installation / update du module $module --------------------"
    npm i --save $module
done