#!/bin/bash

outputFile=./js/albums.js
echo "// auto-generated please update albums.txt" > $outputFile
echo "var albums = [" >> $outputFile

while IFS= read -r line; do
  result=$(curl "$line" | sed 's/<meta/\n<meta/g' | grep  -E '<meta property="og:(title|image)"' | cut -c36- | sed 's/..$//')
  readarray -t SPLIT < <(echo "$result")
  echo "[\"${SPLIT[0]}\"," >> $outputFile
  echo "\"$line\",">> $outputFile
  echo "\"${SPLIT[1]}\"]," >> $outputFile
done < albums.txt

echo "]" >> $outputFile

# curl  https://photos.google.com/share/AF1QipMJvmy_L9vgzsQiyXm13EwQ4jwVm5LWMQst-kmd9VOtAJpF_ogRgla-g0UrPdpB1A?key=Z0l3WUFGUXdITGl0QjN5LTdLRUlMd0U5NXROc2t3 | sed 's/<meta/\n<meta/g' | grep  -E '<meta property="og:(title|image)"' | cut -c36- | sed 's/..$//'
#
# 2022-2023/Lake Placid
# https://lh3.googleusercontent.com/zqqHsDCIzFRS5jt45DpLfqB3BtTd43vUxk4V2E4x6F9lCkokHVKXWQ2_M8BFb3vBwB9gRTBsnIeMElMjfnw0zJNWW7_-9muCT71NsFz5nWd8pgtvQYPMGUdklIC-zde4Wr_TLZjsXA=w600-h315-p-k
