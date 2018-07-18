// Prevents the user from entering more than 150 chars in bio

var textarea = document.getElementById('bio');
var updateProfileBtn = document.getElementById('update-profile');


textarea.addEventListener('keyup', (e) => {
    let textValue = textarea.value;
    updateCounter(textValue);
    if (textValue.length > 150) {
        alert('Cannot enter more than 150 characters!');
        // Trim  the exceeding chars
        textarea.value = trimChars(textValue);
    }

});

function updateCounter(str) {
    var counter = document.getElementById('text_counter');
    var chars_left = 150 - str.length;

    if (chars_left < 0) {
        counter.innerText = '(Chars left : 0' + ')';
    }
    else {
        counter.innerText = '(Chars left : ' + chars_left + ')';
    }
}

function trimChars(str) {
    return str.substring(0, 150);
}


// Get the img url

var imgUploadInput = document.getElementById('img-upload');

imgUploadInput.addEventListener('change', (e) => {
    
    readURL(imgUploadInput);
    
});


// URL reader
function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            
            $('.user-img').attr('src', e.target.result);
            
        }

        reader.readAsDataURL(input.files[0]);
    }
}


// Update the profile data

updateProfileBtn.addEventListener('click', (e) => {
    
    //Check if bio is not empty
    if(textarea.value == ''){
        $('#error-msg').text('You Must Write Something In Bio!');
        $('#profile-edit-error').show();
        e.preventDefault();
    }

    document.forms['update-form'].submit();


});


// Close button for message dialog
$('.close').click(function(){
    $('#profile-edit-error').slideUp('slow');
});

// Image cropping 

// function cropImage(inputFile) {
//     $image_crop = $('#image_demo').croppie({
//         enableExif: true,
//         viewport: {
//             width: 100,
//             height: 100,
//             type: 'square'
//         },
//         boundary: {
//             width: 400,
//             height: 600
//         }
//     });

//     let reader = new FileReader();
//     reader.onload = function(event){
//         $image_crop.croppie('bind', {
//             url: event.target.result,

//         }).then(function(){
//             console.log('bind complete');
            
//         });

//     }

//     reader.readAsDataURL(inputFile.files[0]);
//     $('#uploadimageModal').modal('show');
// }