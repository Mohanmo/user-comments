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

function recurse(value) {  
  for(let i = 0; i < value.length; i++) {             
        let append = `<div style="margin-left: ${j*20}px;">
        <div class="user-image">
          <img src="./assets/user-icon.png" alt="">
        </div>
        <div class="user-details">
          <h6>${value[i].userName}</h6>
          <h6>${value[i].userComment}</h6>
          <span class="reply${i}">Reply</span><span>Share</span>                          
        </div>
        <div id="append${i}"></div>
      </div>`
      text += append;
      document.getElementById('main-comment-container').innerHTML = text;
      document.getElementsByClassName('reply'+i)[0].addEventListener('click',function(e){

        let commentHTML = `<div class="comment-container">
                                <div class="text-area-comments">
                                    <textarea placeholder="Start writing" class="usercomment${i}" cols="30" rows="5"></textarea>
                                </div>        
                                <div class="text-input-comments">
                                    <input type="text" placeholder="username" class="username${i}"><button type="submit" onclick="userCommentInsection(${i})">Comment</button>
                                </div>        
                            </div>`;

        document.getElementById('append'+i).innerHTML = commentHTML;

      })
        if(value[i].allComments.length !== 0){          
          j = j+1; 
          recurse(value[i].allComments);   
        }       
    }
    j=0;   
  }
  recurse(allComments.list);  
}

function userCommentInsection(id){
  console.log(id);  
    
  let userComment = document.getElementsByClassName('usercomment'+id)[0].value;
  let userName = document.getElementsByClassName('username'+id)[0].value;
  console.log(id,userName,userComment);  
  allComments.list[id].allComments.push({
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