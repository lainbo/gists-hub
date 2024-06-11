#!/bin/bash

# Debian 系，固定DNS配置，防止重启后换源
detect_os() {
  # 输出shell名称
  echo "Shell: $SHELL" >&2

  # 用于Linux系统的检测
  if [ "$(uname)" = "Linux" ]; then
    cat /etc/*release
  else
    uname
  fi
}

os_type=$(detect_os | grep -m1 -oE 'Ubuntu|Debian')

# 检测IPv6支持
if ip -6 addr show scope global | grep -q inet6; then
  # 有全局IPv6地址
  DNS_SETTINGS="nameserver 1.0.0.1
nameserver 8.8.4.4
nameserver 2606:4700:4700::1001
nameserver 2001:4860:4860::8844"
else
  # 仅IPv4
  DNS_SETTINGS="nameserver 1.0.0.1
nameserver 8.8.4.4"
fi

if [ "$os_type" == "Ubuntu" ]; then
  # Ubuntu系统操作
  
  # 备份原始配置文件
  sudo cp /etc/systemd/resolved.conf /etc/systemd/resolved.conf.bak
  
  # 修改/etc/systemd/resolved.conf
  sudo sed -i "s/#DNS=.*/DNS=$(echo "$DNS_SETTINGS" | sed 's/nameserver //g' | tr '\n' ' ')/" /etc/systemd/resolved.conf
  
  # 检查systemd-resolved服务是否正在运行
  if systemctl is-active --quiet systemd-resolved; then
    # 修改/etc/resolv.conf
    echo "nameserver 127.0.0.53" | sudo tee /etc/resolv.conf > /dev/null
  fi
  
  # 重启systemd-resolved服务
  sudo systemctl restart systemd-resolved
  
  # 检查DNS设置
  resolvectl status | grep "DNS Servers"
  
  echo "Ubuntu系统DNS配置已更新。"

elif [ "$os_type" == "Debian" ]; then
  # Debian系统操作
  
  # 写入/etc/resolv.conf
  echo "$DNS_SETTINGS" | sudo tee /etc/resolv.conf > /dev/null
  
  # 锁定/etc/resolv.conf文件
  sudo chattr +ai /etc/resolv.conf
  
  echo "Debian系统DNS配置已更新并锁定。"

else
  echo "不支持的操作系统：$os_type"
  exit 1
fi
