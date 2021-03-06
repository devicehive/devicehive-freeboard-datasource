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

If you want to use more stable version - checkout `v1.1.0-dh` branch. The full script looks as follows

```sh
git clone git@github.com:devicehive/freeboard.git
cd freeboard
git checkout v1.1.0-dh
git submodule update --init --recursive
```

# Screenshots

![UI](/res/screen-1.png)

![In Action](/res/screen-2.gif)

# DeviceHive Datasource Setup

To add [DeviceHive](http://devicehive.com) datasource click add button below Datasources.
1. Select DeviceHive datasource type

2. Enter the following parameters:
    
    2.1. Type: DeviceHive
    
    2.2. Name: You can enter any name you like (e.g. 'DH')
    
    2.3. Server API URL: Enter your [DeviceHive](http://devicehive.com) Server.
     
        Examples: 
    
        2.3.1. For Playground use http://playground.devicehive.com/api/rest,
    
        2.3.2. For Local Server use http://localhost:8080/dh/rest
    
    2.4. JWT Token: Can be found on your [DeviceHive](http://devicehive.com) Server, e.g on [Playground Swagger JwtToken](http://playground.dev.devicehive.com/api/swagger.html?url=http://playground.dev.devicehive.com:80/api/rest/swagger.json#!/JwtToken/login)
    
    2.5. DEVICE IDS: From these devices notifications will be shown. Device Id Can be found in admin console. User needs to hit Add button to add several devices.
    
    ![Devices](/res/devices.png)
    
    If left blank the notification for all devices will be visualized.
    
    2.6. NOTIFICATION NAME: Notification with the mentioned names only will be shown. If left blank all notification names will be visualized. User needs to hit Add button to add several notification names.

     
# Widget setup examples

Notification sample 1 (integer value)

![Notification](/res/notification.png)

Widget 1

![Widget 1-1 Setup](/res/widget-1-1-setup.png)

![Widget 1](/res/widget-1.png)

Widget 2

![Widget 1-2 Setup](/res/widget-1-2-setup.png)

![Widget 2](/res/widget-2.png)


Notification sample 2 (json object) 

![Notification](/res/notification_json.png)

Widget 1

![Widget 2-1 Setup](/res/widget-2-1-setup.png)

![Widget 1](/res/widget-1.png)


Widget 2

![Widget 2-2 Setup](/res/widget-2-2-setup.png)

![Widget 2](/res/widget-2.png)


#Start freeboard

Freeboard can be started with

`open index.html`
    
Or it can be started in nginx. For this add
     
```
location /freeboard {
    sendfile on;
    root path/to/the/parent/of/freeboard/;
    index index.html;
}
```

to the server section of nginx.conf. [More details on github](https://github.com/devicehive/freeboard).


#Load/Start freeboard

User can load or save freeboards with a help of corresponding icons in the upper left corner (below the 'Freeboard' caption).

If saved freeboards with DeviceHive Datasource are used it can be required to change some datasource settings such as for example JWT token. 

