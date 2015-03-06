var pageMod = require("sdk/page-mod");
var notifications = require("sdk/notifications");
var self = require("sdk/self");
var prefs = require('sdk/simple-prefs');
var notificationIconURL = self.data.url("owa_full.png");
var addonWorker;

pageMod.PageMod({
    include: /https?:\/\/.*\/owa\/.*/,
    contentStyleFile: self.data.url("fix_style.css"),
    contentScriptWhen: 'ready',
    contentScriptFile: self.data.url("icon_notifications.js"),
    attachTo: ["existing", "top"],
    onAttach: function(worker) {
    	addonWorker = worker;
        worker.port.on("notify", function(message) {
            notifications.notify({
            	title: worker.tab.title,
                text: message,
                iconURL: notificationIconURL,
                onClick: function() {
                    worker.tab.activate();
                }
            });
        });

        prefs.on("delayBetweenChecks", startWorker); 
        prefs.on("faviconBgColor", startWorker);
        prefs.on("faviconFontColor", startWorker);

        startWorker();
    }
});

function startWorker() {
	addonWorker.port.emit("startMonitor", prefs.prefs.delayBetweenChecks, prefs.prefs.faviconBgColor, prefs.prefs.faviconFontColor);
};