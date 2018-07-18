const canvas = document.getElementById('canvas');

// get context of canvas
const ctx = canvas.getContext('2d');

var img = new Image(); // will be reassigend

var fileName = '';

// Get all the buttons

const uploadBtn = document.getElementById('file-upload');
const postImageBtn = document.getElementById('post-image');
const revertFiltersBtn = document.getElementById('remove-filters');


// Upload File
uploadBtn.addEventListener('change', (e) => {
    // Get File
    const file = document.getElementById('file-upload').files[0];
    
    
    // Init FileReader
    const reader = new FileReader();

    if(file){
        // Set file name
        fileName = file.name;

        reader.readAsDataURL(file);
    }

    reader.addEventListener('load', () => {
        // Craete the image
        // set src
        img.src = reader.result;

        // On img load add to canvas
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            // Draw img on canvas
            ctx.drawImage(img, 0, 0, img.width, img.height);

            canvas.removeAttribute('data-caman-id');
        }
    }, false);

});

// Add filters & effects

document.addEventListener('click', (e) => {
    // get the all the buttons with filter-btn class
    const classArray = e.target.classList;
    
    // targets the different filter buttons
    if (classArray.contains('brightness-add')){
        
        Caman('#canvas', img, function(){
            this.brightness(10).render();
        });
    }
    else if (classArray.contains('brightness-remove')){
        Caman('#canvas', img, function () {
            this.brightness(-10).render();
        });
    }
    else if (classArray.contains('contrast-remove')) {
        Caman('#canvas', img, function () {
            this.contrast(-10).render();
        });
    }
    else if (classArray.contains('contrast-add')) {
        Caman('#canvas', img, function () {
            this.contrast(10).render();
        });
    }
    else if (classArray.contains('saturation-remove')) {
        Caman('#canvas', img, function () {
            this.saturation(-10).render();
        });
    }
    else if (classArray.contains('saturation-add')) {
        Caman('#canvas', img, function () {
            this.saturation(10).render();
        });
    }
    else if (classArray.contains('vibrance-remove')) {
        Caman('#canvas', img, function () {
            this.vibrance(-10).render();
        });
    }
    else if (classArray.contains('vibrance-add')) {
        Caman('#canvas', img, function () {
            this.vibrance(10).render();
        });
    }

    // Effects
    if (classArray.contains('vintage')) {
        disableButton('.vintage');

        Caman('#canvas', img, function () {
            this.vintage().render(function(){
                $('.vintage').text('Vintage');
            });
        });
    }
    else if (classArray.contains('lomo')) {
        disableButton('.lomo');
        Caman('#canvas', img, function () {
            this.lomo().render(function(){
                $('.lomo').text('Lomo');
            });
        });
    }
    else if (classArray.contains('clarity')) {
        disableButton('.clarity');
        Caman('#canvas', img, function () {
            this.clarity().render(function(){
                $('.clarity').text('Clarity');
            });
        });
    }
    else if (classArray.contains('sin-city')) {
        disableButton('.sin-city');

        Caman('#canvas', img, function () {
            this.sinCity().render(function(){
                $('.sin-city').text('Sin City');
            });
        });
    }
    else if (classArray.contains('cross-process')) {
        disableButton('.cross-process');
        Caman('#canvas', img, function () {
            this.crossProcess().render(function(){
                $('.cross-process').text('Cross Process');
            });
        });
    }
    else if (classArray.contains('pinhole')) {
        disableButton('.pinhole');
        Caman('#canvas', img, function () {
            this.pinhole().render(function(){
                $('.pinhole').text('Pinhole');
            });
        });
    }
    else if (classArray.contains('nostalgia')) {
        disableButton('.nostalgia');
        Caman('#canvas', img, function () {
            this.nostalgia().render(function(){
                $('.nostalgia').text('Nostalgia');
            });
        });
    }
    else if (classArray.contains('her-majesty')) {
        disableButton('.her-majesty');
        Caman('#canvas', img, function () {
            this.herMajesty().render(function(){
                $('.her-majesty').text('Her Majesty');
            });
        });
    }
    else if (classArray.contains('greyscale')) {
        disableButton('.greyscale');
        Caman('#canvas', img, function () {
            this.greyscale().render(function(){
                $('.greyscale').text('Greyscale');;
            });
        });
    }
    else if (classArray.contains('invert')) {
        disableButton('.invert');
        Caman('#canvas', img, function () {
            this.invert().render(function(){
                $('.invert').text('Invert');
            });
        });
    }

});

// Remove all filters & effects
revertFiltersBtn.addEventListener('click', (e) => {
    Caman('#canvas', img, function(){
        this.revert();
        enableButtons();
    })
});

// Download Image
postImageBtn.addEventListener('click', (e) => {
    

    if (fileName == '') {
        $('#error-msg').text('Select an image to upload!');
        $('#profile-edit-error').slideDown('slow');
        e.preventDefault();
    }


    // Get file ext
    const fileExt = fileName.split('.')[1];

    // Init new filname
    let newFileName;

    // Check img type
    if(fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'png'){
        newFileName = fileName.split('.')[0] + '-' + new Date().getTime() + '.'+fileExt;

        const canvasData = canvas.toDataURL("image/"+fileExt);
        
        //change the state of the post button   
        postImageBtn.innerText = "";

        //document.getElementById('post-image-icon').classList.add('fa fa-circle-o-notch fa-spin fa-fw');

        var ImageURL = canvasData;
        // Split the base64 string in data and contentType
        var block = ImageURL.split(";");
        // Get the content type of the image
        var contentType = block[0].split(":")[1];
        // get the real base64 content of the file
        var imageData = block[1].split(",")[1];

        $('#post-image').text('Posting...');
        $('#post-image').attr('disabled', 'disabled');

        $.ajax({
            type: 'POST',
            url: '/post/upload/',
            dataType: 'json',
            data: {
                imageData: imageData,
                contentType: contentType,
                fileName : newFileName,
            },
            
            success: function(response){
                if(response.success){
                    $('#post-image').removeAttr('disabled');
                    postImageBtn.innerText = "Post Image";
                    // Show success message
                    $('#profile-edit-success').slideDown('slow');
                }
                
            },
            error: function(err){
                $('#post-image').removeAttr('disabled');
                postImageBtn.innerText = "Post Image";
                $('#error-msg').text('Server Error : Unable to upload post!');
                $('#profile-edit-error').slideDown('slow');
            }
        });
        
    }
});


function disableButton(className){
    var btn = $(className);
    btn.text('Rendering...');
    btn.css({ 'background-color': '#E69751', 'border-color':'#E69751'});
}

function enableButtons(){
    $('.effects').css({ 'background-color': '#31B0D5', 'border-color': '#31B0D5' });
}


$('.close').click(function(){
    $('.msg').slideUp('slow');
});




