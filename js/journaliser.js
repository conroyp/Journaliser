/**
 * Swap out the commenters on thejournal.ie for notable characters
 *
 */

// Make a call to background to find our preferred comment filter
chrome.extension.sendRequest(
    {action: "getCommentPref"}
    , function(response) {
        swapCommenters(response.commentPref);
    }
);

// Listen for preference change
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse)
    {
        // If it's default, we can't extract TJ commenters, so force reload
        if (request.commentPref == 'default')
        {
            window.location.reload();
        }
        else
        {
            swapCommenters(request.commentPref);
        }
    }
);

var characters;


/**
 * Swap the journal comments out for those of charPref
 *
 * @param string charPref - var name of character array
 */
function swapCommenters(charPref)
{
    if (charPref != "default")
    {
        // @TODO: Not wild about eval - array index?
        characters = eval(charPref);
        $.each(
            $('.comment')
            , function(i, k)
            {
                // Get commenter's socmed id - use it as basis for character sub
                var authorLink = $(".avatar", $(k)).attr('data-original');
                var character = getCharacter(authorLink);

                // Stop lazy loading from borking images
                // Run before src change to stop lazy loading skipping in ahead of
                // us and putting in user's correct avatar
                $(".avatar", $(k)).attr('data-original', character.image);
                // Replace image, name and link
                $(".avatar", $(k)).attr('src', character.image);
                $(".url", $(k)).attr('href', character.link);
                $(".url", $(k)).text(character.name);

                // Replace comment
                var currentComment = $(".text", $(k)).html();

                var charComment = getComment(currentComment, character);
                $(".text", $(k)).html(charComment);
            }
        );
    }
}


/**
 * Find a character for the given user string
 *
 * The user string is the user's social media avatar url. It's passed in
 * rather than a random assignment so that a commenter will have a consistent
 * character matched to them.
 *
 * @param string userStr - user identifying string (socmed avatar url)
 *
 * @return object character
 */
function getCharacter(userStr)
{
    // Thin wrapper
    return getItem(userStr, characters);
}

/**
 * Get a character's quote
 *
 * A comment string is passed in to ensure consistency - same quote will
 * always be pulled for the same input comment.
 *
 * @param string commentStr - user's comment
 * @param object character  - pre-selected character
 *
 * @return string quote
 */
function getComment(commentStr, character)
{
    // Character may not have quotes. In this case,
    // just send back the same string
    if(character.quotes.length == 0)
    {
        return commentStr;
    }

    return getItem(commentStr, character.quotes);
}


/**
 * Extract an element from an array based on the string supplied.
 *
 * The index is determined by taking the total
 * ascii value of the string then modding it by
 * the size of the array. The result is the index to be used in
 * the array.
 * The ascii value is used here for simplicity - md5 etc could
 * also be used.
 *
 * @param string str - input string
 * @param array arr  - array from which element shall be selected
 *
 * @return mixed element from array arr
 */
function getItem(str, arr)
{
    var asciiTotal = 0;
    // Running ascii total as md5 not available by default, simplicity
    for(var i=0; i<str.length; i++)
    {
        asciiTotal += str.charCodeAt(i);
    }

    var arrIndex = asciiTotal % arr.length;

    return arr[arrIndex];
}