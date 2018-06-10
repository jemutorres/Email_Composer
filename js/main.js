$(function () {
    $("#form").validate({
        rules: {
            to: { required: true, multiemails: true },
            cc: { multiemails: true },
            bcc: { multiemails: true },
            subject: { required: true },
            message: { required: true }
        },
        messages: {
            to: "",
            cc: "",
            bcc: "",
            subject: "",
            message: ""
        }
    });

    $("input[type!='file'], textarea").on('keyup', function (e) {
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
    // Get the existing files
    var totalFiles = $("#thumbnails-images").children().length;

    var lastId = 0;
    if(totalFiles > 0) {
        var lastChild = $("#thumbnails-images").children(":last-child");
        lastId = parseInt($(lastChild).attr("data-internal"));
    }

    for (var i = 0; i < this.files.length; i++) {
        var fr = new FileReader();
        var nextId = lastId + 1;
        fr.onload = function (e) {
            var dataImg = {
                id:     nextId,
                src:    e.target.result
            };
            var template = $('#template-img').html();
            var newImg = Mustache.render(template, dataImg);
            $('#thumbnails-images').append(newImg);
        }
        fr.readAsDataURL(this.files[i]);

        totalFiles++;
    }

    if (totalFiles > 0) {
        $("#thumbnails").css("display", "flex");
    } else {
        $("#thumbnails").css("display", "none");
    }
});

function deleteImage(e) {
    var img = $(e).parent();
    img.remove();

    if ($("#thumbnails-images").children().length < 1) {
        $("#thumbnails").css("display", "none");
    }
}