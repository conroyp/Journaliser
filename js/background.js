/**
 * Background script to skirt sandboxing and pass extension localstorage
 * back to front-end content scripts
 */
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse)
    {
        if (request.action == "getCommentPref")
        {
            // Could be first run with no localstorage val
            if (localStorage["journalCommenters"] === undefined)
            {
                localStorage["journalCommenters"] = "default";
            }

            sendResponse({commentPref: localStorage["journalCommenters"]});
        }
    }
);