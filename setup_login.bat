@echo off
curl -s --cookie-jar ./ejudge_cookie https://ejudge.it.kmitl.ac.th/auth/login > temp.txt
FOR /F "skip=144 delims=" %%A IN (temp.txt) DO (
    echo %%A > temp.txt
    goto continue_process
)

:continue_process
set /p token=<temp.txt
set "token=%token:~160,40%"
echo %token% > current_token
set /p username="Username: "
powershell -Command $pword = read-host "Password" -AsSecureString ; $BSTR=[System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($pword) ; [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR) > .tmp.txt & set /p password=<.tmp.txt & del .tmp.txt
curl --cookie ./ejudge_cookie --cookie-jar ./ejudge_cookie -d "username=%username%" -d "password=%password%" -d "_token=%token%" -d "remember=true" https://ejudge.it.kmitl.ac.th/auth/loggedin
set /p cid="Course ID: "
curl --cookie ./ejudge_cookie --cookie-jar ./ejudge_cookie https://ejudge.it.kmitl.ac.th/course/%cid%/enter
del temp.txt
PAUSE