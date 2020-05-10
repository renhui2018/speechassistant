/*jslint browser:true*/
/*global window jQuery*/

(function (global, $) {

    "use strict";
    var default_opts = {
        lang: 'en-GB',
        volume: 1,
        rate: 1,
        pitch: 1
    };

    var SpeechOutput = function (opts) {
        var that = this,
            sUtter;
        that.opts = $.extend({}, default_opts, opts);
        if('speechSynthesis' in window){
            sUtter = new SpeechSynthesisUtterance();
        }else{
            throw new Error("Your browser is not supported speech synthesis.");
        }
        that.sUtter = sUtter;
        sUtter.lang = that.opts.lang;
        sUtter.volume = that.opts.volume;
        sUtter.rate = that.opts.rate;
        sUtter.pitch = that.opts.pitch;
        that.initEvent();
    };

    SpeechOutput.prototype = {
        constructor: SpeechOutput,
        initEvent: function () {
            var that = this,
                sUtter = that.sUtter;

            sUtter.onstart = function (e) {
                console.log('--speak on start.--');
            };
            sUtter.onend = function (e) {
                console.log('--speak on start.--');
            };
            sUtter.onerror = function (e) {
                console.log('--speak on error.--', e);
            };
        },

        speak:function(){
            var that = this;
            global.speechSynthesis.speak(that.sUtter);
        }

    };

    global.SpeechOutput = SpeechOutput;

}(window, jQuery));
