# devicehive-freeboard-datasource

[DeviceHive](http://devicehive.com) datasource plugin. The plugin integrates your realtime device notificaitons with [freeboard](freeboard.io).

The plugin uses [DeviceHive JavaScript Library](https://github.com/devicehive/devicehive-javascript) to connect to the cloud instance. This means that both `websocket` and `longpolling` channels are supported and the final channel type will be determined based on your browser environment.

# Getting Started

Add a plugin to the `freeboard` [index.html](https://github.com/Freeboard/freeboard/blob/master/index.html) file as specified in [the doc](https://github.com/Freeboard/freeboard#testing-plugins) or use a devicehive freeboard fork with a pre-configured plugin - https://github.com/devicehive/freeboard/

Here is the script to install the latest version of the freeboard with the devicehive plugin on your local machine:

```sh
git clone git@github.com:devicehive/freeboard.git
cd freeboard
git submodule update --init --recursive
```

If you want to use more stable version - change the first line:

```sh
git clone git@github.com:devicehive/freeboard.git
```

# Screenshots

![UI](/res/screen-1.png)

![In Action](/res/screen-2.gif)
