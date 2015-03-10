var timer;
var currentUnreadMessageCount = 0;
var currentReminderCount = 0;
var documentTitle = document.title;
var documentHead = document.head || document.getElementsByTagName("head")[0];
var EMAIL_ICON_64 = "iVBORw0KGgoAAAANSUhEUgAAAaEAAAGhCAYAAADIqAvCAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAF2NJREFUeNrs3f1ZFFcDxuFdrvwfU0GggmgFkgrECpQKlAqQCpQKlAokFYgVoBWAFcRUwLvPZsfsi4j7ceb7vq9rgx8JgdllfnvOnJmZTlp2c3OzO/vwcPF4vPjj/QkAJX2dPT7NHtezx5fZ4yK/n06nX9v8oqYtROfB7MPBIjiJza7XBkBrPi2CdDYL0qfBRmgWn4Tn2SJAAHRPRknns8fpLEjXvY/QYtTzchEfIx6A/rhYxOi8dxFais+L2eOB5xKg16Ojo7piVDxCswA9n314LT4AgxsZHZU+blQsQotVbm8nVrYBDNmb2eOk1Kq6IhGaBShTb8dGPwCjcD17PC0xKtoqQotjPxn9WPEGMD6ZnnvTSoRmAXq4CNBDzwPAaL1bxGij6bmNIrQI0IeJ6TcA/j3h9c9NQrSzQYCeCxAAS+YDk8UhmvpGQosAvbW9ASgxIlo5QqbgACgdopWm4wQIgBWlF+9X/Zd/GqGlZdgCBMAq9mftWOnQzSojIcuwAVjX88U6gntNfzIKypUQXtuWAGwgx4Ue3XdbiOk9AXIcCIBt5e6tj370l/dNx7kSNgDberiYVVt9JOR8IAAKyrTc3l3LtnfuCNCDieNAAJTzw67cNR33cmIaDoCyni/uO/fjCC1GQS9sKwBqcPyzkZBREACNjYZuR+iZbQRAjf5vtu3b6rhZnXJ31Pe2DwA1+jqdTn+7ayRkFARA3R4sX85nZzEKynGgA9sGgAY8uT0SEiAAmnJwO0KPbRMAmrJYh/AtQvs2CQANmg9+dhZrtndtDwAatF+NhNywDoCmPRQhAFpzc3OznwhZlABAGx7s2AYAtORhIrRvOwDQgl+NhABodSQEAK0QIQBECAARAgARAkCEAECEABAhABAhAEQIAEQIABECABECQIQAQIQAECEAECEARAgAEQIAEQJAhABAhAAQIQAQIQBECABECAARAgARAkCEAECEABAhABAhAEQIAEQIABECQIQAQIQAECEAqNEvffyir6+vJxcXF5MvX77MP1Z/lgfA0D18+HDy4MGD+SO/fvz48bc/65vpzUwfvtBPnz5Nzs7OJufn52IDcIf9/f3JkydPJs+fP+9LkC4mNx339u3bm1nhE0oPDw8PjxUfsxDdXF5edn0X/6GzEfrw4cPN7u6uF5OHh4fHljG6urrq7K6+cwsTvn79Onn69Onkzz//NO0GsKV3795NHj16NDk5OXFM6GdyvOfw8HAeIgDKHzN6//59l44XXXRmJPTmzZv5CEiAAGra419cTPb29uYLvbqiExHK6Ofo6MgrBKBmeaOfwx2ZeeqC1qfjEqDMWQLQrA8fPsyn6NocnLU6EsoUnAABtCOHQNqemmttJJShYDYAAO3Z3d2dXF5etrVYoZ2RUJZeZxoOgHa1vT9uZSSUg2LVNd9KqK6Z1NdrJwGsE408Mo1WcjXx27dv55f7aXok1HiESk3D5WDas2fPJgcHB8IDjFJC9Ndff82PrW97cn/2o1dXV03vT5uPUNaob7uxWp7DBOhUiDK7VGJU9OrVq8nx8fFwI5Ral5p7zNRblhcKESBA5abl/v777yb3q80uTCh57aI6Nj7AmAMUp6enjX4fjUUoCxFKX5BUiAABKqvpczcbi1BuSNe3JwNgTAGKDBaavKRPYxGq85sSIkCAyvn48eOwIlR6PbsQAQLUz0FDKxEqeWKqEAECVK9MyTX1/2okQp8/fx7skwUwxH1aUxc2bSRCTd+mW4gAAfrPJuf9NHVcqJMRyhURtj1ZSogAAfrvxP6u6mSEcl24EldDECJAgD7MP9a93+50hNaVkVCpy/IIETDmAFX70HVDNOoI/WgjChEgQJvtO7t6nc2drj8pQgQIUPP7TBESIkCABh2g3kRIiAABGl6AehUhIQIEaFgB6l2EhAgQoOEEqJcREiJAgIYRoN5GSIgAAep/gHodISECBOhB77fJTt+/ASECBEiEhAhAgMYZISECBEiEhAhAgMYbISECBEiEhAgQIAEab4SECBAgERIiQIAEaLwREiJAgERIiAABEqDxRkiIAAESISECBEiAxhshIQIESISECBAgARpvhIQIECAREiJAgEZuZ+wbQIgAARIhIQIESISESIgAARIhIQIESISESIhAgARIhIQIECAREiIhAgESIBESIkCAREiIhAgESIBESIgAARIhIRIiECBESIgAARIhIRIiECBESIgAARIhIRIiECBESIhAgARIhIRIiECARAghAgESIBESIiECARIhhAgESIBE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";
var bgColor, fontColor;

documentHead.appendChild(getOwaIcon());


self.port.on("startMonitor", function(delayBetweenChecks, faviconBgColor, faviconFontColor) {
    if (timer) {
        clearInterval(timer);
    }
    if (delayBetweenChecks < 1) {
        delayBetweenChecks = 1;
    }
    timer = setInterval(notify, delayBetweenChecks * 5000);
	bgColor = faviconBgColor;
	fontColor = faviconFontColor;
});

self.port.on("detach", function() {
    tearDown();
});

function tearDown(){
    clearInterval(timer);
    setFavicon(0);
}

function getOwaIcon(){
    var owaIcon = document.createElement("link");
    owaIcon.rel = "icon";
    owaIcon.type = "image/png";
    owaIcon.sizes = "100x100";
    owaIcon.href = "data:image/png;base64," + EMAIL_ICON_64;
    return owaIcon;
}

function drawRoundedRectangle(ctx, x, y, width, height, radius){
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.strokeStyle = bgColor;
    ctx.stroke();
    ctx.fillStyle = bgColor;
    ctx.fill();
}
function addTextToFavicon(ctx){
    ctx.font = "bold 40px Arial";
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillStyle = fontColor;
    var number = getPrettyNumber(getNewUnreadMessageCount());
    var numberString = (number >= 99) ? new String(number + "+") : new String(number);
    ctx.fillText(numberString, 40,15);
}

function drawIcon(){
    var canvas; 
    var context; 
    canvas = document.createElement("canvas");
    canvas.width = 75;
    canvas.height = 75;

    context = canvas.getContext("2d");
    drawRoundedRectangle(context, 0, 0, 75, 70, 30);
    addTextToFavicon(context);
    return canvas.toDataURL("image/png");
}

function getPrettyNumber(number){
    var num = number;
    if (!number){
        num = 0;
    } else if (number > 99){
        num = 99;
    }
    return num;
}

function setFavicon() {
    var icon = drawIcon();
    var s = document.querySelectorAll("link[rel*='icon'][type='image/png']");

    if (s.length != 1 || s[0].href != icon) {
        for(var i = s.length-1; i >= 0; i--){
            s[i].remove();
        }
        var newIcon = getOwaIcon();
        if(currentUnreadMessageCount > 0){
            newIcon.href = icon;
        }
        documentHead.appendChild(newIcon);
    }
}

function getCountBasedOffFolders(folders){
    var count = 0;
    for (var folderIndex = folders.length-1 ; folderIndex >= 0; folderIndex--){
        var activeCounts = getItemsWithActiveCount(folders[folderIndex]);
        for (var activeCountIndex = activeCounts.length-1; activeCountIndex >= 0; activeCountIndex--){
            count += getCountFromHTML(activeCounts[activeCountIndex]);
        }
    }
    return count;
}

function getCountBasedOffSpans(spanContainer){
    var count = 0;
    for (var spanContainerIndex = spanContainer.length-1; spanContainerIndex >= 0 ; spanContainerIndex--){
        count += getCountFromHTML(spanContainer[spanContainerIndex]);
    }
    return count;
}

function getCountFromHTML(container){
    return parseInt(container.innerHTML.match(/\d/gi).join(""), 10);
}

function getFolders (){
    return document.querySelectorAll("[aria-label='Folder Pane']");
}

function getItemsWithActiveCount(folder){
    return folder.querySelectorAll("[id*='.ucount']");
}

function getContainersBySpanId(){
    //Selecting an based off id will return 1 item (or should)
    var containers = document.querySelectorAll('#spnCV');
    var spans = [];
    for(var containerIndex = containers.length-1; containerIndex >= 0; containerIndex--) {
        var folderName = containers[containerIndex].parentNode.parentNode.querySelector('#spnFldrNm').getAttribute("fldrnm");
        // Can be used to check for other folder names also
        if(folderName == "Unread Mail") {
            spans.push(containers[containerIndex]);
        }
    }
    return spans;
}

function getNewReminderCount(){
    //OWA check
    var reminderCount;
    var containers = document.querySelectorAll('[aria-label="New Notification"]');
    if (containers.length > 2){
        reminderCount = parseInt(containers[3].title.match(/\d/gi).join(""));
    } else {
        //365 check
        containers = document.getElementsByClassName('o365cs-notifications-notificationCounter');
        if (containers[0]){
            reminderCount = parseInt(containers[0].innerHTML.match(/\d/gi).join(""));
        }
    }
    return (reminderCount);
}

function haveNewReminders(){
    return ( getNewReminderCount() > currentReminderCount );
}

function haveNewMessages(){
    return ( getNewUnreadMessageCount() > currentUnreadMessageCount);
}

function getNewUnreadMessageCount() {
    var newUnreadMessageCount = 0;
    var folders = getFolders();
    if (folders.length > 0) {
        newUnreadMessageCount = getCountBasedOffFolders(folders);
    } else {
        newUnreadMessageCount = getCountBasedOffSpans(getContainersBySpanId());
    }
    return newUnreadMessageCount;
}

function generateEmailMessage(){
    var count = getNewUnreadMessageCount();
    return "You have " + count + " new" + ((count > 1) ? " messages" : " message") + ".";
}

function generateReminderMessage(){
    var reminderCount = getNewReminderCount();
    return "You have " + reminderCount + " new" + ((reminderCount > 1) ? " reminders" : " reminder") + ".";
}

function notify() {
    var newUnreadEmailCount = getNewUnreadMessageCount();
    var newReminderCount = getNewReminderCount();
    
    if (haveNewMessages()) {
        self.port.emit("notify", generateEmailMessage(), true);
    }
    if (haveNewReminders()){
        self.port.emit("notify", generateReminderMessage(), false);
    }
    
    currentUnreadMessageCount = newUnreadEmailCount;
    currentReminderCount = newReminderCount;
    setFavicon(); 
}