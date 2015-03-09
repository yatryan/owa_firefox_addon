var pageMod = require("sdk/page-mod");
var notifications = require("sdk/notifications");
var self = require("sdk/self");
var prefs = require('sdk/simple-prefs');
var emailIconName = self.data.url("email.png");
var reminderIconName = self.data.url("calendar.png");

pageMod.PageMod({
    include: /https?:\/\/.*\/owa\/.*/,
    contentStyleFile: self.data.url("fix_style.css"),
    contentScriptWhen: 'ready',
    contentScriptFile: self.data.url("icon_notifications.js"),
    attachTo: ["existing", "top"],
    onAttach: function(worker) {
        worker.port.on("notify", function(message, isEmail) {
            notifications.notify({
                text: message,
                iconURL: (isEmail) ? emailIconName : reminderIconName ;
                onClick: function() {
                    worker.tab.activate();
                }
            });
        });
        prefs.on("delayBetweenChecks", function(prefName) {
            worker.port.emit("startMonitor", prefs.prefs.delayBetweenChecks);
        }); 
        worker.port.emit("startMonitor", prefs.prefs.delayBetweenChecks);
    }
});