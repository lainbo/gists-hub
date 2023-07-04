$folderPath = $PSScriptRoot
$directories = Get-ChildItem -Path $folderPath -Directory
foreach ($directory in $directories) {
  Set-Location -Path $directory.FullName
  Write-Output "文件夹 $($directory.FullName) 开始执行"
  gum use github
  Set-Location -Path $folderPath
}

Write-Output "执行完毕"
