@echo off
cd js
echo Combining default modules
type core.js basic.js camera.js canvasRender.js debug.js webglRender.js vector.js > build/ge.js
echo minifying ge.js
java -jar ..\yuicompressor-2.4.7\build\yuicompressor-2.4.7.jar -v -o build/ge.min.js build/ge.js
pause