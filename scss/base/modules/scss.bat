@echo off
cd site\
sass -C -t compressed --watch scss:css
rem  sass -C -t compact --watch scss:css
pause