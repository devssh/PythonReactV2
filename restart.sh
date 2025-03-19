homedirn=$(echo ~)
codedirn="$homedirn/EventServer/Replica/PythonReactClone/"
logdirn="${codedirn}runlog.txt"
processids=$(ps aux | grep runClonePython | awk '{print $2}' | xargs)
for procids in $processids
do
echo "Restart" > "$logdirn"
kill $procids
done
