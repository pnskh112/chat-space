$(function(){
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージid取得
    last_message_id = $(".message:last").data("message-id");
    var group_id = $(".chat-main:last").data("group_id");
    // url = `../../groups/` + group_id.toString() + `/api/messages`;
    url = `../../groups/${group_id.toString()}/api/messages`;

    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: url,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data:{id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.messages').append(insertHTML);
      // メッセージ取得後に画面スクロール
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    })
    .fail(function() {
      console.log('error');
    });
  };
  var buildHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=${ message.id }>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${ message.user_name }
          </div>
          <div class="upper-message__date">
            ${ message.created_at }
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${ message.content }
          </p>
          <img src="${ message.image }" class="lower-message__image" >
        </div>
      </div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id= ${ message.id } >
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${ message.user_name }
          </div>
          <div class="upper-message__date">
            ${ message.created_at }
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${ message.content }
          </p>
        </div>
      </div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=${  message.id } >
        <div class="upper-message">
          <div class="upper-message__user-name">
          ${ message.user_name }
          </div>
          <div class="upper-message__date">
          ${ message.created_at }
          </div>
        </div>
        <div class="lower-message">
          <img src="${ message.image }" class="lower-message__image" >
        </div>
      </div>`
    };
    return html;
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var rlm = reloadMessages
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  })
  console.log(111);
  // var group_id = $(".chat-main:last").data("group_id");
  // console.log(group_id);
  // url = `/groups/${ group_id.toString() }/messages`;
  // console.log(url);
  // if(location.pathname === url) {
    setInterval(reloadMessages, 7000); /*一致しなければ何もしない*/
  // }
});