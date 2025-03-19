homedirn=$(echo ~)
codedirn="$homedirn/EventServer/Replica/PythonReactClone/"
logdirn="${codedirn}runlog.txt"
echo "PID of runlog $$"
echo "PPID of runlog $PPID"
echo "UID of runlog $UID"

#flask run
/opt/homebrew/anaconda3/bin/python "${codedirn}app.py"
