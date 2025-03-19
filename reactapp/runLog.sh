homedirn=$(echo ~)
codedirn="$homedirn/EventServer/Replica/PythonReactClone/reactapp/"
logdirn="${codedirn}runlog.txt"
echo "PID of runlog $$" >> "$logdirn"
echo "PPID of runlog $PPID" >> "$logdirn"
echo "UID of runlog $UID" >> "$logdirn"

export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
npm start -prefix $codedirn
