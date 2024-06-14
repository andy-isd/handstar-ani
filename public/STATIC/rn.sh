#!/bin/bash

for i in $(seq 1001 2 1239); do
  newindex=$(((i - 1000)/2+1000))
  echo "mv REND_STAR_1_${i}.png star_static_${newindex}.png"
  mv REND_STAR_1_${i}.png star_static_${newindex}.png
done
