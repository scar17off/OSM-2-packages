var api = {};
api.update = function() {
    return fetch('https://ourworldofpixels.com/api')
        .then(raw => {
            return raw.json()
        })
        .then(json => {
            api.banned = json.banned;
            api.captchaEnabled = json.captchaEnabled;
            api.maxConnectionsPerIp = json.maxConnectionsPerIp;
            api.motd = json.motd;
            api.numSelfBans = json.numSelfBans;
            api.totalConnections = json.totalConnections;
            api.uptime = json.uptime;
            api.users = json.users;
            api.yourConns = json.yourConns;
            api.yourIp = json.yourIp;
            return api.json = json;
        });
};

api.disconnect = function() {
    return fetch('https://ourworldofpixels.com/api/disconnectme')
        .then(raw => {
            return raw.json()
        })
        .then(json => {
            return api.hadEffect = json.hadEffect
        });
};
api.update();
setInterval(api.update, 6e4);
