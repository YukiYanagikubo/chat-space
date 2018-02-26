$(function() {

var search_list = $(".chat-group-user__name");

function appendUserName(users) {
   var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${users.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${users.id}" data-user-name="${users.name}">追加</a>
              </div>`
    search_list.append(html);
  }

function appendNoUserName(users) {
  var html = `<p>
                <div class="chat-group-user__name'>${ users }</div>
              </p>`
  search_list.append(html);
}

  $("#user-search-field").on("keyup", function() {
    $('#user-search-result').empty();
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { name: input },
      dataType: 'json'
    })

    .done(function(users) {
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUserName(user);
        });
      }
      else {
        appendNoUserName("一致する名前はありません");
      }
    })
    .fail(function() {
      alert('名前検索に失敗しました');
    })
  });

});
