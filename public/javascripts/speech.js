/*jslint browser:true*/
/*global window jQuery SpeechInput*/
(function(global, $) {

    "use strict";

    var Speech = function() {
        var that = this;
        that.speechInput = null;
    };

    Speech.prototype = {
        constructor: Speech,

        init: function() {
            var that = this;
            that.speechInput = new SpeechInput($("#speech-input-mic-svg"));
            console.log(that.speechInput);
            $(document).on('sphcommand', that, that.onSpeechCommand);
            $("#sendbtn").on('click', that, that.onSendCommand);
        },
        onSendCommand:function(e){
            var that = e.data,
                sendTextFiled = $("#sendtext"),
                command;

            command = sendTextFiled.val().trim();
            if (command == '') {
                alert('The command cannot be empty!');
                return;
            }
            that.appendElement("right", command);
            that.parseCommand(command);
            sendTextFiled.val("");
        },
        onSpeechCommand: function(e, command) {
            var that = e.data;
            console.log('onSpeechCommand:--' + command);
            that.appendElement("right", command);
            that.parseCommand(command);
        },
        appendElement:function(pos, text){
            var contentUl = $(".content"),
                elementStr;
            if(pos ==="right"){
                elementStr = '<li><img src="stylesheets/images/user.png" class = "imgright"><span class= "spanright">' + text + '</span></li>';
            }else{
                elementStr = '<li><img src="stylesheets/images/robot.png" class = "imgleft"><span class= "spanleft">' + text + '</span></li>';
            }
            contentUl.append(elementStr);
        },
        parseCommand: function(cmd){
            var that = this, 
                postData = {"command":cmd};
            $.ajax({
                url: "/speechassistant/command/parseCommand",
                dataType: "json",
                type: 'GET',
                data: postData,
                success: function(msg, status) {
                    if (!msg.ok) {
                        return;
                    }
                    that.appendElement('left', msg.data);
                },
                error: function(res, status) {
                    console.log("Error occurs when parse command.");
                }
            });
        }
    };

    global.Speech = Speech;

    $(document).ready(function() {
        var sph = new Speech();
        sph.init();
        $(window).on("unload", function() {
            console.log("document unload!");
            sph.speechInput.explicitStop();
        });
    });

}(window, jQuery));