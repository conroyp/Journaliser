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

// Attach click listener to comment style line items
// Moved here from inline click handler as manifest v2 security
// policy forbids such nonsense
$(document).ready(function(){
    // If an option has been selected already, highlight it
    if (localStorage["journalCommenters"] !== undefined)
    {
        $('#'+localStorage["journalCommenters"]).addClass('popup_active');
    }

    $('.popup_item').click(function(){
        setPref(this.id);
    });
});
