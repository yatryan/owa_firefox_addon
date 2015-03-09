var timer;
var currentUnreadMessageCount = 0;
var currentReminderCount = 0;
var documentTitle = document.title;
var documentHead = document.head || document.getElementsByTagName("head")[0];
var EMAIL_ICON_64 = "iVBORw0KGgoAAAANSUhEUgAAAGcAAABVCAYAAABU8/pfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5JJREFUeNrsnU1rE1EUhk+Ky8T+AZVEbMFWcPQH2LgorkQEqy67U/zAaFwqmehGxEDBz+KmS7VFKW5Fk50iaISm7kxQIdvG/IBxTpgZprWd3qmTmXOT94UDSTNdnPfpez8yaW7KsizaRlm7DKegaFR3qhV0USoAzqxdBbsOw8u+6Ztdc3YtqMLJOhdPwbvYVHPC0AqCw0NX1a5R+BW7OnblneHuHzhZ5wWASRaQ4SbID6eKoUzMEMcJohHf5A8wMjTl8PCSU8eqTNwqzmA4PNc04Yc45UawuRQrA3CEw4GECnAABwIcwIEABwoH5+Onz1S4XqRUKoUKWewb+xdKlmWZloKWXi/z+zyo/yz2UVGmEpy1tY6Vy+2HuREU+8h+qsBRGtbeva9Ss/nDe37rdomhohSL/XLFPrKfkc057Xbbe3ytcIPu3jExW4cQ+8W+beZnpKu1A2PjcHsH2olvWEpjnwMBDuBA2sL5+ev3UBrZj74jhdPp/KFi8SbNnD1PjdXvQwGF++R+uW/RcJ7OP6elxZe9OjQ5QY+ezA80GO6P+3R7vne/IhdOOp1e9/zq5YsDmSI3LdxfUP+i4Fy5dIFWGqt0Zuac97NBS5E/La64X+6b+xe9IJicOEiLr17Qw8fPBipFW6WF++R+uW9tltKDlKI40xLbPkf3FCWRltg3oTqmKKm0JPIOgS4pSjotib59IzlFEtKSKByJKZKUlsThSEqRtLSIgZNkiqSmRRScJFIkOS0i4cSRIh3SIhZOP1OkS1rEw4kyRbqlRQs4UaRIx7RoBScoRWGlQ1r82kUaif/aj+ePkWmWvefbXV+rfug9Ns2SNlC0hONPkeoHKiqVB7Rv7x7SUdp+NErVcF3BaA1nGAQ4gAMBDuBAgAMBDuBAgAM4EOBAgAM4EOAADt+84v/9hNTFfrk3/cJI6Wbb+PiY99i9H18sFuG6oiqVyrrPMfj9DJTq961NT5/AV3JFUOxjpN+3xlpprAJQBGDYR1U4qR4hopLq2Plm+S3Vv36hbreL8UpRmUyGjCNH6fSpkzQ6ulv118qh4ECxqoylNPY5EOAADgQ4UA9OHTaIVB1ntslVDqcdylTvtEN3zpmDH6LU44ETduXJO2EXZ1PL0pZnUxPhVPekweT9q+eN+5y6A6gGr2IfyoyN25qNyfFr1q4CVnF9X5Xx5L+w2YtBcPxzkUE4iTfSDaZTraCL/gowAJOxaZVDH/yyAAAAAElFTkSuQmCC";
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
        self.port.emit("notify", generateEmailMessage());
    }
    if (haveNewReminders()){
        self.port.emit("notify", generateReminderMessage());
    }
    
    currentUnreadMessageCount = newUnreadEmailCount;
    currentReminderCount = newReminderCount;
    setFavicon(); 
}