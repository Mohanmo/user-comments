var allComments = {
  list:[
      // {
      //   userComment:'root1',
      //   userName:'root1',
      //   allComments:[
      //     {
      //       userComment:'sub',
      //       userName:'sub',
      //       allComments:[]
      //     },
      //     {
      //       userComment:'sub',
      //       userName:'sub',
      //       allComments:[]
      //     }
      //   ]
      // },
      // {
      //   userComment:'root2',
      //   userName:'root2',
      //   allComments:[
      //     {
      //       userComment:'sub2',
      //       userName:'sub2',
      //       allComments:[]
      //     },
      //     {
      //       userComment:'sub2',
      //       userName:'sub2',
      //       allComments:[{
      //         userComment:'sub2-1',
      //         userName:'sub2-1',
      //         allComments:[{
      //           userComment:'sub2-2',
      //           userName:'sub2-2',
      //           allComments:[ {
      //             userComment:'sub2-1',
      //             userName:'sub2-1',
      //             allComments:[{
      //               userComment:'sub2-2',
      //               userName:'sub2-2',
      //               allComments:[]
      //             }]
      //           }]
      //         }]
      //       }]
      //     }
      //   ]
      // }
  ]
};

//Dom Registeration;
var postBtn = document.getElementById('submit');
postBtn.addEventListener('click',postComment,false);

function postComment(e){  
    console.log(e);
    let userComment = document.getElementById('main-id-comment').value;
    let userName = document.getElementById('main-id-username').value;

    allComments.list.push({
      userComment,
      userName,
      allComments:[]
    })
    resetInput();
    renderComments();  
    console.log(...allComments.list);    
}

function renderComments(){
    let appendHTML = `<div>
    <div class="user-image">
      <img src="./assets/user-icon.png" alt="">
    </div>
    <div class="user-details">
      <h6>username</h6>
      <h6>comments</h6>
      <span>Reply</span><span>Share</span>
          <div>
              <div class="user-image">
                <img src="./assets/user-icon.png" alt="">
              </div>

              <div class="user-details">
                <h6>username</h6>
                <h6>comments</h6>
                <span>Reply</span><span>Share</span>
              </div>
              <div class="comment-container">
                  <div class="text-area-comments">
                      <textarea placeholder="Start writing" cols="30" rows="5"></textarea>
                  </div>        
                  <div class="text-input-comments">
                      <input type="text" placeholder="username"><button type="submit">Comment</button>
                  </div>        
              </div>
        </div>
    </div>
  </div>`;

    var text = '';
    var j = 0; 
    var k = 0;
(function recurse(value) {  
 
  for(let i = 0; i < value.length; i++) {
    k++;             
        let append = `<div style="margin-left: ${j*20}px;">
        <div class="user-image">
          <img src="./assets/user-icon.png" alt="">
        </div>
        <div class="user-details">
          <h6>${value[i].userName}</h6>
          <h6>${value[i].userComment}</h6>
          <span id="reply${k}" onclick="appendReplyHTML(${i},${k})">Reply</span><span>Share</span>                          
        </div>
        <div id="append${k}"></div>
      </div>`
      text += append;
      document.getElementById('main-comment-container').innerHTML = text;
      // document.getElementById('reply'+k).addEventListener('click', appendReplyHTML(e,k),false);
        if(value[i].allComments.length !== 0){          
          j = j+1; 
          recurse(value[i].allComments);   
        }       
    }
    j=0;   
  }(allComments.list))
  // recurse(allComments.list);  
}

function appendReplyHTML(i,k){
  alert(k);
  let commentHTML = `<div class="comment-container">
                          <div class="text-area-comments">
                              <textarea placeholder="Start writing" id="usercomment${k}" cols="30" rows="5"></textarea>
                          </div>        
                          <div class="text-input-comments">
                              <input type="text" placeholder="username" id="username${k}"><button type="submit" onclick="userCommentInsection(${i},${k})">Comment</button>
                          </div>        
                      </div>`;

  document.getElementById('append'+k).innerHTML = commentHTML;  
}

function userCommentInsection(index,id){
  console.log(id);  
    
  let userComment = document.getElementById('usercomment'+id).value;
  let userName = document.getElementById('username'+id).value;
  console.log(id,userName,userComment);  
  allComments.list[index].allComments.push({
    userComment,
    userName,
    allComments:[]
  })

  document.getElementById('append'+id).innerHTML = '';
console.log(allComments.list)


renderComments();
}

function showUserComments(){
    console.log('reply called');
    
}


function resetInput(){
  document.getElementById('main-id-comment').value = '';
  document.getElementById('main-id-username').value = '';
}