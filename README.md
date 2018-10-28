# checksum-validator

[![Build Status](https://travis-ci.org/alexanderwe/checksum-validator.svg?branch=master)](https://travis-ci.org/alexanderwe/checksum-validator)

checksum-validator is a small convenient Electron application, which can quickly calculate hashes of files. It is primarily intended to validate checksums of downloaded files.

```
Since V 1.1.1 the update process should work with the correct visualization. 
Previous versions had a little bug, which caused the download process not being visualized.
```


# Usage

## Installation

_Supported platforms_

* MacOS (tested under V. 10.13 (High Sierra))
* Windows (tested under Win 10 Pro, Version 1803)
* Ubuntu
  * https://snapcraft.io/checksum-validator
    
Head over to the [releases section](https://github.com/alexanderwe/checksum-validator/releases) and download the latest distribution.

After installing it you are ready to use checksum-validator.

## Calculate checksum

To calculate and validate the checksum of files, head over to the `Check pane` and either drag and drop four file into the drag area or select it by clicking on it. Then just type in the checksum you want to validate and select the hash algorithm which was used to generate the checksum.

![img2](https://github.com/alexanderwe/checksum-validator/blob/master/assets/screenshots/img2.png)

On the `Past Checks` pane you have the opportunity to have a look at all checksums you have validated so far. Furthermore you can export the checked file as .json and take a look at other hashes of the file.

![img3](https://github.com/alexanderwe/checksum-validator/blob/master/assets/screenshots/img3.png)

## Update

On start the application will check if an update is available. If an update is available it will either be installed automatically or the application will tell you that an update is ready to be installed. You can also trigger this check manually by `checksum-validator --> Check for updates...`

![img1](https://github.com/alexanderwe/checksum-validator/blob/master/assets/screenshots/img1.png)

## Settings

On the `Settings` pane you can configure the application so it is suitable for your use case.
Additionally you can select the language of the application. By default `Checksum Validator` will take the `app locale` to set the language but you can also manually change the language. By now 2 languages are available:

* English
* German

![img4](https://github.com/alexanderwe/checksum-validator/blob/master/assets/screenshots/img4.png)

# How was it built ?

This project is only possible with these awesome technologies !

* [Electron](https://github.com/electron/electron)
* [React](https://github.com/facebook/react)
* [Typescript](https://github.com/Microsoft/TypeScript)
* [Webpack](https://github.com/webpack/webpack)
* [antd-design](https://github.com/ant-design/ant-design)

# Issues

If you find any bugs or issues with this application feel free to report them in the [issue section](https://github.com/alexanderwe/checksum-validator/issues).
In case you want to do some local debugging, open the logs via `Help --> Open Logs` and take a look at it.

# License

[Licensed under the MIT license](https://github.com/alexanderwe/checksum-validator/blob/master/LICENSE.md)
