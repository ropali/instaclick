$(document).ready(function(){
    let url = window.location.href;
    // Seprate the post id from url
    let postId = url.substring(url.lastIndexOf('/') + 1, url.length);
    
    
    $('#btn-write-comment').click(function(){
        
        $('#btn-write-comment').slideUp(300);
        $('.comment-panel').slideDown(800);
    });

    $('#comment-btn').click(function(){
        let comment= $('#comment-box').val();
        
        if(comment != ''){
            $('#comment-btn').text('...');
            $.ajax({
                url: '/post/comments/' + postId,
                type: 'POST',
                data: {
                    comment: comment
                },
                success: function (response) {
                    $('#user-comment-panel').after(createCommentHTML(response.user.username, response.comment, response.user.profile, response.time));
                    $('#comment-btn').text('Comment')
                },
                error: function (err) {
                    console.log(err);

                }
            });
        }

    });

});




function createCommentHTML(comment_user, comment_text, comment_user_img, comment_time) {
    return '<div class="row">\
            <div class="panel panel-default user-comments">\
                <div class="panel-body ">\
                    <div class="row">\
                        <div class="col-xs-2">\
                            <img src='+ comment_user_img +' class="img img-circle pull-center comment-user-img" width="80%" alt="">\
                                    </div>\
                            <div class="col-xs-10">\
                                <div class="comment-user"><a href="">'+ comment_user +'</a></div>\
                                <div class="user-comments pull-left text-muted">'+ comment_text + '</div>\
                                <span class="text-muted pull-right post-time">' + timeSince(comment_time) + '</span>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>';
}