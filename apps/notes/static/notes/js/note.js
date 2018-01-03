$(document).ready(function () {
    $('#new_note').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr('action'),
            method: 'post',
            data: $(this).serialize(),
            success: function (serverResponse) {
                $('.container').replaceWith(serverResponse);
                console.log(serverResponse);
            }
        })
    })

    // on click of note description it will generate form dynamically and then u can update it and submit it
    $(document).on('click', '.desc', function () {
        console.log("in click");
        var currNote = $(this).children('.note_content').text();
        var currId = $(this).children('.note_id').attr('value');
        var currentURL = `update/${currId}`
        var csrf = $($('meta')[1]).attr('content')
        $(this).replaceWith(`
        <form id='edit_note' note_id='${currId}' action='${currentURL}' method='post'>
        ${csrf}      
        <textarea name="update" cols="42" rows="5">${currNote}</textarea>
        <br>
        <input type="submit" name="submit">
        </form>
        `)
    });

    // once you click on submit of description it will send ajax request with note id to update url and replace it with new serverresponse
    $(document).on('submit', '#edit_note', function (e) {
        var currId = $(this).attr('note_id')
        e.preventDefault();
        $.ajax({
            url: `update/${currId}`,
            method: 'post',
            data: $(this).serialize(),
            success: function (serverResponse) {
                $('.notes').replaceWith(serverResponse);
                console.log(serverResponse);
            }
        })
    });

    $(document).on('click', 'deleteNote', function (e) {
        var currId = $(this).attr('noteid')
        e.preventDefault();
        $.ajax({
            url: $(this).attr('href'),
            method: 'get',
            success: function(serverResponse){
                $('.notes').replaceWith(serverResponse);
            }
        })
    });

});

