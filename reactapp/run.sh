homedirn=$(echo ~)
codedirn="$homedirn/EventServer/Replica/PythonReactClone/reactapp/"
logdirn="${codedirn}runlog.txt"
echo " \n\n\n\n\n\n\n\n\n\n " >> "$logdirn"
date '+%Y-%m-%d %H:%M:%S' >> "$logdirn"
echo "PID of run $$" >> "$logdirn"
echo "PPID of run $PPID" >> "$logdirn"
echo "UID of run $UID" >> "$logdirn"

sh "${codedirn}runLog.sh" 2>&1 | tee -a "$logdirn"
