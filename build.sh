#!/bin/bash 

echo "打包文件"
yarn build
echo "传输文件"

scp -P 1802 -r ./dist/** root@219.159.20.119:/back/avue/avue/avue-cli1

echo "部署成功"