@echo off
set /p /a st=startOn: 
set /p /a en=endOn: 

for /l %%x in (14, 1, 80) do (
	node start fisner%%x
)
pause