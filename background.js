
async function onBefore(details) {
  console.log(`onBeforeNavigate to: ${details.url}`, details.tabId);

    const visits = await browser.history.getVisits({ url:  details.url  });
    console.log('#visits: ' , visits.length);
    if(visits.length <= 1){
        // show page_action
        if( ! await browser.pageAction.isShown({tabId: details.tabId})// object
){
        await browser.pageAction.show(details.tabId)
        console.log("showing pageAction");
        }
    }else {
        if( await browser.pageAction.isShown({tabId: details.tabId})// object
){
        // hide page_action
        await browser.pageAction.hide(details.tabId)
        console.log("hidding pageAction");
        }
    }
}



browser.webNavigation.onCompleted.addListener(
	onBefore
);



