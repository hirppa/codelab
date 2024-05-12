#!/bin/bash

inotifywait ../cpp -r -e create -e moved_to -e modify |

while read directory action file; do

    clear
    now=$(date +"%T");
    echo "${now} Compile WebAssembly module:"
    docker container exec codelab-apache-1 sh compile.sh
done

sh monitor.sh
