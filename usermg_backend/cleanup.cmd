echo off
set CMDDIR=%~dp0
set ROOT=%CMDDIR%

echo "%ROOT%"
rem clean-up bin/obj folders


rmdir /s/Q "%ROOT%\LMS.Data\bin"
rmdir /s/Q "%ROOT%\LMS.Data\obj"
echo 'LMS.Data' cleaned

rmdir /s/Q "%ROOT%\LMS.Library\bin"
rmdir /s/Q "%ROOT%\LMS.Library\obj"
echo 'LMS.Library' cleaned

