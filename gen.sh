#!/bin/sh

make -j20
make meun-html
make 
rm -f index.md
make meun-orion
rm -f README.html