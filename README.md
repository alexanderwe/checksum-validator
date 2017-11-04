#  checksum-validator

checksum-validator is a small convenient Electron application, which can quickly calculate hashes of files. This is primarily intended to verify the checksums of downloaded files. 


# Usage

## Installation

_Supported platforms_

* MacOS (tested under V. 10.13 (High Sierra)) 

Head over to the [releases section](https://github.com/alexanderwe/checksum-validator/releases) and download the latest distribution. 

After installing it you are ready to use checksum-validator.

## Update
On start the application will check if an update is available. If this is the case, the small tag on the bottom will change and on click the update will be downloaded and installed. You can also trigger this check by `checksum-validator --> Check for updates...`


![img1](https://github.com/alexanderwe/checksum-validator/blob/master/.github/img/img1.png)



## Calculate checksum

To calculate and check the checksum of files, either drag them onto the application pane or open them via the `Choose file...` button. Then select your preferred hash algorithm and insert the hash to check against. 

![img2](https://github.com/alexanderwe/checksum-validator/blob/master/.github/img/img2.png)

# How was it built ?

This project is only possible with these awesome technologies !

* [Electron](https://github.com/electron/electron)
* [React](https://github.com/facebook/react)
* [Typescript](https://github.com/Microsoft/TypeScript)
* [Webpack](https://github.com/webpack/webpack)
* [Bulma CSS](https://bulma.io)


# Issues

If you find any bugs or issues with this application feel free to report them in the [issue section](https://github.com/alexanderwe/checksum-validator/issues).
In case you want to do some local debugging, open the logs via `Help --> Open Logs` and take a look at it.


# License

[Licensed under the MIT license](https://github.com/alexanderwe/checksum-validator/blob/master/LICENSE.md)
