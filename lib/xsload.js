let Events = [];
Events.deleteList = [];
Events.update = function () {
    if (this.length == 0) return;
    for (let i = 0; i < this.length; i++) {
        let event = this[i];
        let allSatisfied = true;

        for (var name in event.condition) {
            if (event.condition[name] == false) {
                allSatisfied = false;
                break;
            }
        }

        if (allSatisfied) {
            event.fun();
            this.deleteList.push(i);
        }
    }
    for (let i = 0; i < this.deleteList.length; i++) {
        let index = this.deleteList[i];
        let event = this[index];
        this.splice(index, 1);
        Events.reset(event);

    }
    this.deleteList.length = 0;
}
/**
 * @param  event 
 * condition:{boolean...},
 * fun:function
 */
Events.add = function (event) {
    this.push(event);
    event.index = this.length - 1;
}
Events.remove = function (event) {
    this.splice(event.index, 1);
    Events.reset(event);
}
Events.reset = function (event) {
    for (var name in event.condition) {
        event.condition[name] = false;
        event.index = undefined;
    }
}
Events.setConditionOk = function (event, name) {
    if (event.index != undefined)//&&  this[event.index]!=undefined
    {
        this[event.index].condition[name] = true;
    }

}

function loadHtml(div, name, fun) {
    if(!name){
        div.innerHTML="";
        return;
    }
    sendRequest(`/loadHtml${name}`, loadHtmlOk, null, div);
    function loadHtmlOk(html) {
        this.innerHTML = html;
        if (fun) fun();
    }
}

function sendRequest(url, fun, data, owner) {
    url += "?data=" + encodeURIComponent(data);//parsedUrl.query.data
    let xhttp = new XMLHttpRequest();
    xhttp.open("get", url, true);
    xhttp.setRequestHeader("x-requested-with", "XMLHttpRequest");
    xhttp.setRequestHeader("Content-Type", "text/plain");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (fun != undefined) {
                fun.call(owner, this.responseText);
            }
            if (this.readyState == 4 && this.status == 500) {
                window.stop();
                console.trace();
                throw new Error("internal server error");
            }
        }

    };
};

