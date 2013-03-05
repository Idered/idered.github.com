#!/bin/sh

git add .

git commit -m "update _site"

git update-ref refs/heads/master $(echo 'add _site!' | git commit-tree dev^{tree}:_site -p $(cat .git/refs/heads/master))

git checkout master

git push origin master

git checkout dev