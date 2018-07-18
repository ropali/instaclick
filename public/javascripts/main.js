
// increament like count

$('.likes').click(function(){
    $(this).addClass('liked');
    let postId = $(this).attr('data-postid');
    
    $.ajax({
        url: '/post/like/' + postId,
        type: 'POST',
        data: {
            
        },
        success: function (response) {
            console.log(response);
            var $counter = $(this).first('.like-counter');

            $counter.text(response.likes);//set new count
                
        },
        error: function (err) {
            console.log(err);

        }
    });
    


});

function increamentLike(postId){
    
    
}