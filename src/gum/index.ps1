$folderPath = $PSScriptRoot
$directories = Get-ChildItem -Path $folderPath -Directory

foreach ($directory in $directories) {
  $gitDirectory = Join-Path $directory.FullName ".git"
  
  if(Test-Path -Path $gitDirectory){
    Set-Location -Path $directory.FullName
    Write-Output "文件夹 $($directory.FullName) 开始执行"
    gum use github
    Set-Location -Path $folderPath
  }
  else{
    Write-Output "文件夹 $($directory.FullName) 跳过执行"
  }
}

Write-Output "执行完毕"
