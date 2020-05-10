/*jslint browser:true*/
/*global window jQuery*/

(function (global, $) {

    "use strict";
    var default_opts = {
        //lang: 'en-GB',
        lang: 'cmn-Hans-CN',
        continuous: true,
        interimResults: true
    };

    var SpeechInput = function (target, opts) {
        var that = this,
            recognition;
        that.opts = $.extend({}, default_opts, opts);
        that.prev_launch_time = null;
        that.is_recognizing = false;
        that.is_explicit_stop = false;
        that.dom_target = $(target);
        if(global.webkitSpeechRecognition){
            recognition = new global.webkitSpeechRecognition();
        }else{
            throw new Error("Your browser is not supported webkitSpeechRecognition.");
        }
        that.recognition = recognition;
        recognition.lang = that.opts.lang;
        recognition.continuous = that.opts.continuous;
        recognition.interimResults = that.opts.interimResults;
        that.initEvent();
    };

    SpeechInput.prototype = {
        constructor: SpeechInput,

        initEvent: function () {
            var that = this,
                dom_target = that.dom_target,
                recognition = that.recognition;

            /*
             * events handle for recognition object.
            */
            recognition.onresult = function (e) {
                var final_transcript = '';
                var interim_transcript = '';
                var tmp_transcript = '';
                var idx = 0;
                for (idx = e.resultIndex; idx < e.results.length; idx += 1) {
                    tmp_transcript = e.results[idx][0].transcript;
                    if (e.results[idx].isFinal) {
                        final_transcript += tmp_transcript;
                    } else {
                        interim_transcript = interim_transcript + '-[' + tmp_transcript + ']-';
                    }
                }

                //console.log('--interim results:' + interim_transcript);
                if (final_transcript) {
                    //console.log('--recognition results:' + final_transcript);
                    $(document).trigger('sphcommand', final_transcript);
                }
            };

            recognition.onstart = function () {
                console.log('--recognition on start.--');
                that.is_recognizing = true;
                that.prev_launch_time = (new Date()).getTime();
                that.dom_target.addClass('speech-input-recognizing');
            };

            recognition.onend = function () {
                console.log('--recognition on end.--');
                that.is_recognizing = false;
                that.prev_launch_time = null;
                that.dom_target.removeClass('speech-input-recognizing');

                if (!that.is_explicit_stop) {
                    console.log("Stop unexpeted, restart!");
                    recognition.start();
                }
            };

            recognition.onerror = function (e) {
                console.log('--recognition on error.--', e);
            };

            /*
             * events handle for DOM target.
            */
            dom_target.on('click', function () {
                if (that.is_recognizing) {
                    that.is_explicit_stop = true;
                    recognition.stop();
                } else {
                    recognition.start();
                }
            });
        },

        explicitStop: function () {
            var that = this;
            that.is_explicit_stop = true;
            that.recognition.stop();
        }
    };

    global.SpeechInput = SpeechInput;

}(window, jQuery));