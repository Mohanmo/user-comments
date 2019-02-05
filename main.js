function init() {
  var form = document.getElementById("myForm");
  form.addEventListener("submit", postUserComments, false);

};

var mainObject = {
  allComments: []
};

function postUserComments(e) {
  var comments = document.getElementById('comments').value;
  var username = document.getElementById('username').value;
  console.log(comments, username);
  // if (comments == '' && username == '') {
  //   return alert('enter all details')
  // }
  let allCommentsDetails = {
    comments,
    username,
    userComments:[]
  };
  mainObject.allComments.push(allCommentsDetails);
  console.log(mainObject);
  showUserComments();
  resetUserInput();
  userReply();
  userComments();
  e.preventDefault()
  // return false;
};

function userReply() {
  var replyBtn = document.querySelector('.reply');
  replyBtn.addEventListener('click', function () {
    console.log('called');
    document.getElementById('usercomment').style.display = 'block'
    return false;
  }); 
}


function showUserComments() {
  var node = '';

  for (let i = 0; i < mainObject.allComments.length; i++) {
    let value = `<div class="usericon margin-left-20">
      <div class="inner-usericon">
          <img src="user-icon.png" alt="icon" >
      </div>
      <div class="inner-userdetail">
        <h5 class="user-name">${ mainObject.allComments[i].username }</h5>
        <p class="user-comment">${ mainObject.allComments[i].comments }</p>
        <span class="reply" data-id="${i}">Reply</span>
        <span class="share">share</span>
      </div>    
    </div>  <div class="container-form" id="usercomment" style="display:none">
    <div class="">
      <textarea name="comments" id="usercomments" cols="30" rows="10" placeholder="start writing"></textarea>
    </div>
    <div>
      <div class="container-user">
        <input type="text" name="username" id="userusername" placeholder="username" class="comment-width">
        <button class="postComments" >Comment</button>
      </div>
    </div>
  </div> `;
    if(mainObject.allComments[i].userComments){
      for (let j = 0; j < mainObject.allComments[i].userComments.length; j++) {
      let userValue = `<div class="usericon" style="margin-left: 32px;">
              <div class="inner-usericon">
                  <img src="user-icon.png" alt="icon" >
              </div>
              <div class="inner-userdetail">
                <h5 class="user-name">${ mainObject.allComments[i].userComments[j].username }</h5>
                <p class="user-comment">${ mainObject.allComments[i].userComments[j].comment }</p>
                <span class="reply" data-id="${i}">Reply</span>
                <span class="share">share</span>
              </div>    
            </div>  <div class="container-form" id="usercomment" style="display:none">
            <div class="">
              <textarea name="comments" id="usercomments" cols="30" rows="10" placeholder="start writing"></textarea>
            </div>
            <div>
              <div class="container-user">
                <input type="text" name="username" id="userusername" placeholder="username" class="comment-width">
                <button class="postComments" >Comment</button>
              </div>
            </div>
          </div>`
        value += userValue;
      }

    }

    node += value;
  }
  document.getElementById("userCommentThread").innerHTML = node;
}

function userComments(){
  var postComments = document.querySelector('.postComments');
  postComments.addEventListener('click', function () {
    console.log('post');
    
    let comment = document.getElementById('usercomments').value;
    let username = document.getElementById('userusername').value;
    let userComments = {
      comment,
      username,
      userComments:[]
    };
    
    mainObject.allComments[0].userComments.push(userComments);
    console.log(mainObject);
    document.getElementById('usercomment').style.display = 'none';
    showUserComments()
    // mainObject.allCommentsDetails[0]
    // showUserComments();
    // return false;
  });
}



function resetUserInput() {
  document.getElementById('comments').value = '';
  document.getElementById('username').value = '';
}


document.addEventListener("DOMContentLoaded", init, false);