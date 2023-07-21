#!/bin/bash

outputFile=./js/albums.js
echo "// auto-generated please update albums.txt" > $outputFile
echo "var albums = [" >> $outputFile

while IFS= read -r line; do
  result=$(curl "$line" | sed 's/<meta/\n<meta/g' | grep  -E '<meta property="og:(title|image)"' | cut -c36- | sed 's/..$//')
  readarray -t SPLIT < <(echo "$result")
  echo "[\"${SPLIT[0]}\"," >> $outputFile
  echo "\"${line/"https://photos.google.com/share/"}\",">> $outputFile # split on /share/
  echo "\"${SPLIT[1]/"https://lh3.googleusercontent.com/pw/"}\"]," >> $outputFile  # split on .com
done < albums.txt

echo "].map(([title, albumUrl, coverUrl]) => {
    const [year, index, name] = title.split(/\/( *[0-9]{1,2}\. *)/g)
    const parsedEntry = [
      name ? \`\${year}/\${name}\` : year,
      'https://photos.google.com/share/' + albumUrl,
      'https://lh3.googleusercontent.com/pw/' + coverUrl.replace(/=.*\$/g, '=s222-p-k-no')
    ]
    parsedEntry['index'] = parseInt(index) || 100;
    return parsedEntry;
}).sort((a,b) => a.index - b.index)" >> $outputFile
