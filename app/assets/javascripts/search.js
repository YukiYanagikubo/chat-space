$(function() {

var search_list = $("#user-search-result");

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
    var input = $("#user-search-field").val();
    if(input!==""){
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
    }
  });

var search_list_add = $("#chat-group-user-22");

function appendUserNameAdd(user_name, user_id) {
   var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                <p class='chat-group-user__name'>${user_name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    search_list_add.append(html);
  }

  $("#user-search-result").on("click", ".chat-group-user__btn--add", function () {
    var user_name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    appendUserNameAdd(user_name, user_id);
    $(this).parent().remove()
  });

  $("#chat-group-user-22").on("click", ".js-remove-btn", function () {
    $(this).parent().remove()
  });

});
