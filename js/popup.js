/**
 * Save the preferred comment style
 *
 * @param string opt key to determine selected option
 */
function setPref(opt)
{
    // Stick it in local storage
    localStorage["journalCommenters"] = opt;
    // Tell the current tab to toggle commenters/reload
    chrome.tabs.getSelected(
        null
        , function(tab)
        {
            chrome.tabs.sendRequest(
                tab.id
                , {commentPref: opt}
                , function(response) {
                }
            );
            window.close();
        }
    );
}