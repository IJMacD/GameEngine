echo Combining default modules
$files = @("gl-matrix.js","core.js","basic.js","world.js","collision.js","camera.js","canvasREnder.js","webglRender.js","debug.js")
Clear-Content build/ge.js
$files | ForEach { Get-Content -Path $_ | Add-Content build/ge.js }
echo minifying ge.js
java -jar ..\yuicompressor-2.4.8\yuicompressor-2.4.8.jar -v -o build/ge.min.js build/ge.js
pause
