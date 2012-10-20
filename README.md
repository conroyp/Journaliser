Journaliser
-------------------

One of the innovations TheJournal.ie brought to online news in Ireland was 
making user interaction central to each story. This has resulted in a vibrant
community growing up around the site, adding a different set of perspectives to
each article published.

However.. As with all online communities, sometimes the comments can get a 
bit.. noisy. 

To this end, this simple chrome extension will turn off the regular
comments on the site, and replace them with choice quotes from either The 
Muppets, Modern Family, The Thick of It or The West Wing.
N.B. The Thick of It contains some very unparliamentary language, so may not be
all that safe for work or for sensitive eyes.

Adding new comments
-------------
* Add a js file to the content dir containing characters and quotes (see format of
existing muppets.js/thickofit.js/westwing.js files)
* Add entry for this file to popup.html (allows user to toggle between comments)
* Add icon to /i/ folder to be shown on user popup
* Add an entry for this js file to manifest.json, content_scripts->js, before journaliser.js

Installation
-------------

Available in the (https://chrome.google.com/webstore/detail/journaliser/ljhhfoppgnahjngcphlhipkihnaeigaf)[Chrome Store].
