@echo off
set CMDDIR=%~dp0
set ROOT=%CMDDIR%..\
set FILE="%~1" 
set ext=.exe

md "%ROOT%\Executables" > nul 2>&1

echo "%ROOT%\Executables"
echo Copying %FILE% to Executables folder...
IF /I "%EXT%" == ".EXE" (
	echo "copying exes"
        copy %FILE% "%ROOT%\Executables\"
	goto end
)

:end
if errorlevel 1 goto theend



:theend
