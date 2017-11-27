$(function () {
    $("#form").validate({
        rules: {
            to: { required: true, multiemails: true },
            cc: { multiemails: true },
            bcc: { multiemails: true },
            subject: "required",
            message: "required"
        },
        messages: {
            to: "",
            cc: "",
            bcc: "",
            subject: "",
            message: ""
        }
    });

    $("input[type!='file'], textarea").on('focusout', function (e) {
        var button = $(".button-submit");
        if ($("#form").valid()) {
            button.prop("disabled", false);
        } else {
            button.prop("disabled", true);
        }
    });
});

jQuery.validator.addMethod(
    "multiemails",
    function (value, element) {
        if (this.optional(element)) // return true on optional element
            return true;
        var emails = value.split(/[,]+/); // split element by , and ;
        valid = true;
        for (var i in emails) {
            value = emails[i];
            valid = valid &&
                jQuery.validator.methods.email.call(this, $.trim(value), element);
        }
        return valid;
    },

    jQuery.validator.messages.multiemails
);

$("#file-upload").on("change", function () {
    //Clean all the images
    $('.thumbnails-images').html("");

    for (var i = 0; i < this.files.length; i++) {
        var fr = new FileReader();
        fr.onload = function (e) {
            $('.thumbnails-images').append(
                '<div id="img_000' + i + '" class="image">' +
                '   <img class="img-thumbnail" src="' + e.target.result + '">' +
                '   <div class="img-overlay" onclick="deleteImage(this)">' +
                '       <i id="span-image" class="fa fa-trash" aria-hidden="true"></i>' +
                '   </div> ' +
                '</div> ');
        }
        fr.readAsDataURL(this.files[i]);
    }

    if (this.files.length > 0) {
        $(".thumbnails").css("display", "flex");
    } else {
        $(".thumbnails").css("display", "none");
    }
});

function deleteImage(e) {
    var parent = e.parentNode;

    document.getElementById("thumbnails-images").removeChild(parent);

    if (document.getElementById("thumbnails-images").children.length < 1) {
        $(".thumbnails").css("display", "none");
    }
}