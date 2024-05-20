# Electron clipboard
Electron clipboard is a clipboard manager  written (surprisingly) in  electron. Application allows storing and accesing previous clipboard values (both text and images) with as simple GUI as possible. All the data is stored locally in text file, while user settings are saved in the system directory.

Besides storing past clipboard data electron-clipboard also provides utility tools like screenshot editing:

![alt text](https://raw.githubusercontent.com/ezrnew/electron-clipboard/main/assets/paint-demo.gif "paint demo")

Or storing temporary data in multiple clipboards:

![alt text](https://raw.githubusercontent.com/ezrnew/electron-clipboard/main/assets/shortcuts-demo.gif "shortcuts demo")

Note that these override default clipboard for copy/paste operations. Key bindings can be changed in settings.


# Installation
Python 3.x is required. Since version 3.12 of python library  **distutils** has been removed and it must be installed manually. The easiest way is to install **setuptools** package:
```
pip install setuptools
```
As mentioned [here](https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules) all native node modules must be recompiled for Electron -  use npm rebuild after installation.
```
npm i
npm rebuild
```
