#!/bin/bash

ARRAY=("https://data-seed-prebsc-1-s1.binance.org:8545" "https://data-seed-prebsc-2-s1.binance.org:8545" "https://data-seed-prebsc-1-s2.binance.org:8545" "https://data-seed-prebsc-2-s2.binance.org:8545" "https://data-seed-prebsc-1-s3.binance.org:8545" "https://data-seed-prebsc-2-s3.binance.org:8545")
ELEMENTS=${#ARRAY[@]}
for ((i=0;i<$ELEMENTS;i++)); do
  URL=${ARRAY[${i}]}
  echo "Making query on url: $URL"
  CMD=`curl --location --request POST $URL --header 'Content-Type: application/json' --data-raw '{"jsonrpc":"2.0", "id": 1, "method":"eth_getBalance","params":["0x4DeD312eB774B9828665448C55Faa8AE15353E56", "latest"]}'`
  echo $CMD
done
