$(document).ready(function () {

    // ----------------- CHAT AND MSG LOADS FUNCTION ----------------------------
    function loadData(chats){

        var dateArr = [];
        for(let i = 0; i < chats.length; i++){
            dateArr.push(chats[i].datetime.substr(0,10));
        }
        var mapped = dateArr.reduce((map, val)=>{
            if(!map[val]) {
                map[val]=[];
            }
            map[val].push(val);
            return map;
        }, {});
        let outerArray = Object.keys(mapped);
        let k = 0;

        for(var i = 0; i < outerArray.length; i++){
            dynamicMsgDate.dynamicDate(outerArray[i], "chatHistory");
            for( var j = 1; j <= mapped[outerArray[i]].length; j++){
                dynamic.dynamicChat(chats[k],"chatHistory");
                k++;
            }
        }

    }

    // ----------------- FUNCTION CALL FOR LOAD OLD MSGs----------------------------
    chat.getChatHistory(loadData);

    // ----------------- DYNAMIC CHAT SUBMIT FUNCTIONALITY ----------------------------
    var z = 0;
    $("#chatSubmit").on("click", function (){
        texts = $("#chatInput").val();
        let dateTime = new Date().toJSON().slice(0,10);
        let newDate = dateTime;
        if(z === 0){
            dynamicMsgDate.dynamicDate(dateTime,"liveChat");
        }
        if(newDate === dateTime){
            z++;
        }else{
            z = 0;
        }
        chat.sendChat(texts);
        $("#chatInput").val('');
        $(".chat-body").scrollTop($(".chat-body")[0].scrollHeight);
        setTimeout(function (){
            $(".chat-body").scrollTop($(".chat-body")[0].scrollHeight);
        },2000);
    });

    // ----------------- CHATBOX APPEARS FUNCTIONALITY ----------------------------
    $(".live-chat-icon-anchor").on("click", function (){
        $(".chat-widget").removeClass("closed");
        $(".chat-widget").addClass("show");
        $(this).parent().hide();
        $(".chat-body").scrollTop($(".chat-body")[0].scrollHeight);
    });

    // ----------------- CHAT MINIMIZE FUNCTIONALITY ----------------------------
    $("#minimize-btn").on("click", function (){
        $(".chat-body").toggleClass("closed");
        $(".chat-buttons-container").toggleClass("closed");
        $(".chat-widget").toggleClass("minimize");
    });

    // ----------------- CHAT CLOSE FUNCTIONALITY ----------------------------
    $("#close-btn").on("click", function (){
        $(".chat-widget").removeClass("show");
        $(".chat-body").removeClass("closed");
        $(".chat-buttons-container").removeClass("closed");
        $(".chat-widget").removeClass("minimize");
        $(".chat-widget").addClass("closed");
        $(".live-chat-icon").show();
    });

});


// ----------------- DYNAMIC CHAT FUNCTION ----------------------------

var dynamic = new function (){
    this.dynamicChat = dynamicChat;
    function dynamicChat(chats, id){

        let dateTime = new Date(chats.datetime);
        let hours = dateTime.getUTCHours();
        let minutes = dateTime.getUTCMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;

        var a = document.createElement("div");
        a.setAttribute("class", "cx-message-group");

        var b = document.createElement("div");
        b.setAttribute("class", 'msg-sender '+ chats.from);

        var c = document.createElement("div");
        c.setAttribute("class", "message");

        var d = document.createElement("span");
        d.setAttribute("class", "text");
        d.innerHTML = chats.message;

        var e = document.createElement("span");
        e.setAttribute("class", "date-time");
        e.innerHTML = hours + ":" + minutes + " " + ampm ;

        a.appendChild(b);
        b.appendChild(c);
        c.appendChild(d);
        c.appendChild(e);

        $("#"+id).append(a);
    }
}

// ----------------- DYNAMIC DATE FUNCTION ----------------------------

var dynamicMsgDate = new function (){
    this.dynamicDate = dynamicDate;

    function dynamicDate(date, id){

        let dateTime = new Date(date);
        let dateBox = String(dateTime).slice(0,15);

        var msgDate = document.createElement("div");
        msgDate.setAttribute("class","msg-date");
        msgDate.innerHTML = "<span>" + dateBox + "</span>";
        $("#"+id).append(msgDate);
    }
}