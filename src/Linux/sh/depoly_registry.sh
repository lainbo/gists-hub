#!/bin/bash

# 脚本部署registry
stop_and_remove_registry() {
    if [ "$(docker ps -q -f name=registry)" ]; then
        echo "正在停止registry..."
        docker stop registry
        docker rm registry
        echo "registry已停止并移除."
    else
        echo "registry容器不存在或已停止,无需移除."
    fi
}


deploy_registry() {
    stop_and_remove_registry
    
    echo "正在拉取并部署registry..."
    docker run -d -p 17951:5000 \
    --pull always \
    --name registry \
    -e REGISTRY_PROXY_REMOTEURL=https://registry-1.docker.io \
    -e REGISTRY_STORAGE_CACHE_BLOBDESCRIPTOR=inmemory \
    -v ./data:/var/lib/registry \
    --restart always \
    registry:2
    echo "registry部署完成."

    PUBLIC_IP=$(curl -s https://api.ipify.org)
    echo "公网访问地址为: http://${PUBLIC_IP}:17951"

    exit 0
}

show_menu() {
    echo -e "\033[96m你要对Docker Registry做些什么? \033[0m"
    echo "1. 停止registry"
    echo "2. 拉取并部署registry"
    echo "0. 退出"
    read -p "请输入选项: " action
    
    case $action in
        1)
            stop_and_remove_registry
            ;;
        2)
            deploy_registry
            ;;
        0)
            echo "退出脚本."
            exit 0
            ;;
        *)
            echo -e "\033[0;31m无效的输入\033[0m"
            ;;
    esac
}

while true; do
    show_menu
done
