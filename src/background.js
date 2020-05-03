import browser from "webextension-polyfill"
import groupTabs from "./util/groupTabs"

// There are no background tasks or interactions yet,
// though some day… some day there will be.

browser.browserAction.onClicked.addListener((tab, event) => {
    if (event.modifiers.includes("Shift")) {
        browser.tabs.query({}).then(tabs => {
          const groups = groupTabs(tabs)
          groups.forEach(tabGroup => {
            const ids = tabGroup.tabs.map(tab => tab.id)

            browser.tabs.remove(ids)
          })
        })
    } else {
      browser.browserAction.setPopup({popup: "popup.html"})
      browser.browserAction.openPopup()
      browser.browserAction.setPopup({popup: ""})
    }
    
})