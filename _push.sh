#!/bin/sh

git add .
git commit -m "add _site"

git update-ref refs/heads/master $(echo 'Add commit message here!' | git commit-tree dev^{tree}:_site -p $(cat .git/refs/heads/master))

git checkout master

git push origin master

exit 0