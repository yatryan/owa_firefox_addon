var pageMod = require("sdk/page-mod");
var notifications = require("sdk/notifications");
var self = require("sdk/self");
var prefs = require('sdk/simple-prefs');
var emailIconName = self.data.url("email.png");
var reminderIconName = self.data.url("calendar.png");
var addonWorker;

pageMod.PageMod({
    include: /https?:\/\/.*\/owa\/.*/,
    contentStyleFile: self.data.url("fix_style.css"),
    contentScriptWhen: 'ready',
    contentScriptFile: self.data.url("icon_notifications.js"),
    attachTo: ["existing", "top"],
    onAttach: function(worker) {
        worker.port.on("notify", function(message, isEmail) {
    	addonWorker = worker;
            notifications.notify({
            	title: worker.tab.title,
                text: message,
                iconURL: (isEmail) ? emailIconName : reminderIconName ;
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
