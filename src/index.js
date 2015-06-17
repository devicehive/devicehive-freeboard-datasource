// devicehive-freeboard-datasource
// http://devicehive.com
//
// Author: Artem Sorokin (https://github.com/sorjef)
//
// Copyright (c) 2015 devicehive.com
// Licensed under the MIT license.

(function () {

    var pluckArraySettings = function (arr) {
        var res = _.compact(_.pluck(arr, 'value'));
        return res.length > 0 ? res : null;
    };

    var DeviceHiveDataSourcePlugin = function(settings, updateCallback) {
        var self = this;

        var buildErrorContainer = function (err) {
            /*jshint multistr: true */
            return $(' \
                <div> \
                    <h2>An error occured: "' + err.error + '".</h2> \
                    <div>Please check the following points and try again: \
                        <ul> \
                            <li>- Is the URL you specified a valid DeviceHive API URL? <small>Example of the valid one: <em>http://domain/api</em></small></li> \
                            <li>- Is you instance accessible from the internet? <small>You can check that by navigating to api-url/info. Example: <em>http://domain/api/info</em></small></li> \
                            <li>- Does an access key have sufficient permissions? <small>You can configure access key permissions with an admin console or <a target="_blank" href="http://devicehive.com/restful#Reference/AccessKey/update"> by manually issuing a PUT request </a></small></li> \
                        </ul> \
                    </div> \
                </div> \
            ');
        };

        var init = function(settings) {
            var dh = self.devicehive = $.dhClient(settings.server, settings.accessKey);
            return dh.openChannel().then(function(channel) {
                var params = {
                    deviceIds: pluckArraySettings(settings.deviceIds),
                    names: pluckArraySettings(settings.names)
                };

                return dh.subscribe(params);
            }).then(function (sub) {
                return sub.message(function (deviceGuid, notification) {
                    updateCallback(notification);
                });
            }).fail(function (err) {
                console.error(err);

                dh.closeChannel();

                var container = buildErrorContainer(err);
                var okCallback = function () {
                    init(settings);
                    // do not hold current modal
                    return false;
                };
                freeboard.showDialog(container, "DeviceHive datasource Error", "Retry", "Cancel", okCallback);
            });
        };

        this.onSettingsChanged = function(newSettings) {
            self.onDispose();
            init(newSettings);
        };

        self.updateNow = function() {};

        self.onDispose = function() {
            if (self.devicehive) {
                self.devicehive.closeChannel();
            }
        };

        init(settings);
    };

    freeboard.loadDatasourcePlugin({
        "type_name"         : "DeviceHive",
        "display_name"      : "DeviceHive",
        "description"       : ' <a target="_blank" href="http://devicehive.com">DeviceHive</a> datasource plugin, by <a target="_blank" href="https://github.com/sorjef">Artem Sorokin</a>. The plugin integrates your realtime device notificaitons with freeboard.',
        "external_scripts"  : [
            "https://rawgit.com/devicehive/devicehive-javascript/0dd7a31f2335dc1cf077d45ff7458492381755bb/build/browser/devicehive.client.min.js",
            "https://rawgit.com/devicehive/devicehive-javascript/0dd7a31f2335dc1cf077d45ff7458492381755bb/build/browser/devicehive.client.jquery.min.js",
        ],
        "settings": [
            {
                "name"          : "server",
                "display_name"  : "Server API URL",
                "type"          : "text",
                "default_value" : "http://nnxxxx.pg.devicehive.com/api",
                "description"   : 'DeviceHive cloud API URL. To quickly get running instance of the DeviecHive cloud you can set up a <a target="_blank" href="http://devicehive.com/playground">playground on devicehive.com website</a>',
                "required"      : true
            },
            {
                "name"          : "accessKey",
                "display_name"  : "Access Key",
                "type"          : "text",
                "default_value" : "AccessKeyExampleAccessKeyExampleAccessKeyEx=",
                "description"   : 'Access key which is authorized to query device notifications. You can generate an access key using admin console by navigating to http://host/admin/#accesskeys or <a target="_blank" href="http://devicehive.com/restful#Reference/AccessKey/insert">by issuing a POST request</a>',
                "required"      : true
            },
            {
                "name"          : "deviceIds",
                "display_name"  : "Device Ids",
                "type"          : "array",
                "settings"      : [
                    {
                        "name"          : "value",
                        "display_name"  : "",
                        "type"          : "text",
                        "default_value" : 'e50d6085-2aba-48e9-b1c3-73c673e414ae',
                        "required"      : true
                    }
                ]
            },
            {
                "name"          : "names",
                "display_name"  : "Notification names",
                "type"          : "array",
                "settings"      : [
                    {
                        "name"          : "value",
                        "display_name"  : "",
                        "type"          : "text",
                        "default_value" : 'some-notification-name',
                        "required"      : true
                    }
                ]
            },
        ],
        newInstance: function(settings, newInstanceCallback, updateCallback)
        {
            newInstanceCallback(new DeviceHiveDataSourcePlugin(settings, updateCallback));
        }
    });
})();
