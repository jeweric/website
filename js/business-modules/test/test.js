/**
 * H5 微信传播
 *
 * Created by zhouhai on 2015-04-16
 * Update  by zhouhai on 2015-04-16
 */
seajs.use(['zepto','iscroll'], function($,iscroll) {
    var suit = {
        init: function(){
            this.socket = io.connect('211.151.14.187', {port: 3000});
            this.dealSocket();

            this.entry_el = $('#data-message');
            this.content = $('#messages');
            this.send_message_btn = $('#send-message');

            var height = document.documentElement.clientHeight;
            var playerHeight = $('#h5player').height();
            $('#wrapper').height(height-50-playerHeight);
            myScroll = new iscroll('wrapper',{
                hScroll:false,
                vScroll:true,
                checkDOMChanges:true,
                momentum:true,
                vScrollbar:false,
                bounce:false
            });
            this.bindEvent();
        },
        bindEvent:function(){ 
            var self = this;
            self.entry_el.bind('input',function (event) {
                //When enter is pressed send input value to node server
                if (event.keyCode != 13) {
                    // highlight the the send button
                    if($(this).val() != ''){
                        self.send_message_btn.addClass('highlight');
                    }else{
                        self.send_message_btn.removeClass('highlight');
                    }
                }else{
                    var chat_content = self.entry_el.val();
                    if (chat_content) {

                        var msg = {
                            content: chat_content
                        };

                        console.log(msg);
                        if (msg) {
                            self.socket.emit('send_message', msg, function (data) {
                                console.log("send message");
                                console.log(data);
                            });

                            //Clear input value
                            self.entry_el.val('');
                        }
                    }
                }
                
            });

            

            self.send_message_btn.click(function () {
                var chat_content = self.entry_el.val();
                var msg = {
                    content: chat_content
                };

                console.log(msg);
                if (msg && chat_content) {

                    self.socket.emit('send_message', msg, function (data) {
                        console.log("send message");
                        console.log(data);
                    });

                    //Clear input value
                    self.entry_el.val('');
                }
            });

            $('#closeAd').click(function(e) {
                $('.fixed-footer').hide();
            });

        },
        dealSocket:function(){
            var self = this;
            this.socket.on('auth', function (message) {
                console.log(message);

                var auth_obj = {
    //                chat_key : user.chat_key,
                    chat_key: 'chat_key_75kNtDkS2u',
                    room_id: '636'
                };
                console.log("send auth information");

                self.socket.emit('chat_auth', JSON.stringify(auth_obj));
            });


            this.socket.on('connect', function () {
                console.log("connect");
            });


            this.socket.on('message', function (message) {
                console.log('got the new message :::' + message);

                var data = JSON.parse(message);


                console.log(data.content);
                // var txt2 = $("<p></p>").text(data.content);
                var faceImg = './img/1.jpg';
                var txt2 = '';
                if(data.from_user == 'maven'){
                    txt2 = $('<div class="my-bubble">'+
                    '<div class="face" style="background:url('+faceImg+') -30px 0 no-repeat;background-size:250%;"></div>'+
                    '<p>'+data.content+'</p></div>');
                }else if(data.from_user == 'system'){
                    txt2 = $('<div class="sys-bubble">'+
                    '<div class="face" style="background:url('+faceImg+') -30px 0 no-repeat;background-size:250%;"></div>'+
                    '<p>'+data.content+'</p></div>');
                }else{
                    txt2 = $('<div class="bubble">'+
                    '<div class="face" style="background:url('+faceImg+') -30px 0 no-repeat;background-size:250%;"></div>'+
                    '<p>'+data.content+'</p></div>');
                }
                
                self.content.prepend(txt2);
                self.entry_el.focus();
            });
        }
    };
    
    suit.init();
});
