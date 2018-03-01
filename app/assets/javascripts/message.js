$(function(){

  function buildHTML(message){
    var content = message.is_content_present ? `${message.content} ` : ''
    var image = message.is_image_present ? `<img src='${message.image.url}'> ` : ''

    var html = `<div class = "main-contents__body__list__message" data-id=${message.id}>
                  <div class = "main-contents__body__list__message__name">
                    ${message.user_name}
                  </div>
                  <div class = "main-contents__body__list__message__data">
                    ${message.date}
                  </div>
                  <div class = "main-contents__body__list__message__body">
                    ${content}
                    ${image}
                  </div>
                </div>`
    return html;
  }
  //非同期通信
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    e.stopPropagation();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-contents__body__list').append(html);
      $(".main-contents__body").animate({scrollTop:$('.main-contents__body__list')[0].scrollHeight});
      $('.new_message .message').val('');
    })
    .fail(function(){
      alert('error');
    })
  })
  // 自動更新
    var interval = setInterval(function() {
      if (location.href.match(/\/groups\/\d+\/messages/)){
        var message_id = $('.main-contents__body__list__message').last().data('id');
        $.ajax({
          url: location.href,
          type: "GET",
          data: {id: message_id},
          dataType: "json"
        })
        .done(function(data) {
          data.forEach(function(message) {
            var html = buildHTML(message);
            $('.main-contents__body__list').append(html);
            $(".main-contents__body").animate({scrollTop:$('.main-contents__body__list')[0].scrollHeight});
            $('.new_message .message').val('');
          })
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
      } else {
          clearInterval(interval);
        }
    } , 5000 );
});

