/**
 * Background script to skirt sandboxing and pass extension localstorage
 * back to front-end content scripts
 */
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse)
    {
        if (request.action == "getCommentPref")
        {
            sendResponse({commentPref: localStorage["journalComments"]});
        }
    }
);