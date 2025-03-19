homedirn=$(echo ~)
codedirn="$homedirn/EventServer/Replica/PythonReactClone/reactapp/"
logdirn="${codedirn}runlog.txt"
processids=$(ps aux | grep runCloneReact | awk '{print $2}' | xargs)
for procids in $processids
do
	kill $procids
done
echo "Restart React" > "$logdirn"
