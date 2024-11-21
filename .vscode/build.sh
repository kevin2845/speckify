#!/usr/bin/env bash
CLI_LOCATION="$(pwd)/cli"
echo "Building plugin in $(pwd)"

# ask for sudo password only for linux
if [ "$(uname)" == "Linux" ]; then
    printf "Please input sudo password to proceed.\n"
    echo $sudopass | sudo -E $CLI_LOCATION/decky plugin build $(pwd)
else
    printf "Please input sudo password to proceed.\n"
    echo $sudopass | sudo -E $CLI_LOCATION/decky plugin build $(pwd)
    $CLI_LOCATION/decky plugin build $(pwd)
fi