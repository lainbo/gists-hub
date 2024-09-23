@echo off

REM Get the directory where the batch file and ffmpeg.exe are located
set "FFMPEG_DIR=%~dp0"

REM Define input and output folders
set "INPUT_DIR=%FFMPEG_DIR%input"
set "OUTPUT_DIR=%FFMPEG_DIR%output"

REM Read configuration
for /f "usebackq tokens=1,2 delims==" %%a in ("%FFMPEG_DIR%config.ini") do (
    set "%%a=%%b"
)

REM Set default values if not specified in config
if not defined codec set "codec=h264"
if not defined crf set "crf=30"

REM Check if input folder exists
if not exist "%INPUT_DIR%" (
    echo Error: Input folder "%INPUT_DIR%" does not exist.
    pause
    exit /b
)

REM Create output folder if it doesn't exist
if not exist "%OUTPUT_DIR%" (
    md "%OUTPUT_DIR%"
)

REM Check if ffmpeg.exe exists
if not exist "%FFMPEG_DIR%ffmpeg.exe" (
    echo Error: ffmpeg.exe not found in "%FFMPEG_DIR%".
    pause
    exit /b
)

REM List all files in the input directory
echo Files in the input directory:
dir /b "%INPUT_DIR%"

set "FILES_FOUND=false"

REM Process all video files in the input folder
for %%F in ("%INPUT_DIR%\*.mp4" "%INPUT_DIR%\*.avi" "%INPUT_DIR%\*.mov") do (
    set "FILES_FOUND=true"
    echo File found: "%%~nxF"
    echo Converting "%%~nxF"...

    REM Perform the conversion with the specified ffmpeg command
    if "%codec%"=="h264" (
        "%FFMPEG_DIR%ffmpeg.exe" -i "%%F" -c:v libx264 -tag:v avc1 -movflags faststart -crf %crf% -preset superfast "%OUTPUT_DIR%\%%~nF_converted.mp4"
    ) else if "%codec%"=="h265" (
        "%FFMPEG_DIR%ffmpeg.exe" -i "%%F" -c:v libx265 -tag:v hvc1 -movflags faststart -crf %crf% -preset superfast "%OUTPUT_DIR%\%%~nF_converted.mp4"
    ) else (
        echo Error: Unknown codec "%codec%". Supported codecs are h264 and h265.
        pause
        exit /b
    )
    
    if errorlevel 1 (
        echo Error occurred while processing "%%~nxF"
    ) else (
        echo Successfully converted "%%~nxF"
    )
)

if "%FILES_FOUND%"=="false" (
    echo No files found to process. Please make sure you have placed video files in the input folder.
) else (
    echo All files have been processed. Output files are saved in "%OUTPUT_DIR%".
)

echo.
echo Press any key to exit...
pause > nul
