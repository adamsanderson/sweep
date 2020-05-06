import browser from "webextension-polyfill"
import groupTabs from "./util/groupTabs"
import { initSupportData } from "./util/supports"

// Expose supports so that the popup page can see it.
const supportData = initSupportData()

// There are no background tasks or interactions yet,
// though some day… some day there will be.

browser.browserAction.onClicked.addListener((tab, eventData) => {
  // Detect onClickModifiers support.
  supportData.browserAction.onClickModifiers = !!eventData

  // Firefox supports additional event data:
  if (eventData && eventData.modifiers.includes("Shift")) {
      browser.tabs.query({}).then(tabs => {
        const groups = groupTabs(tabs)
        groups.forEach(tabGroup => {
          if (tabGroup.safe) {
            const ids = tabGroup.tabs.map(tab => tab.id)

            browser.tabs.remove(ids)
          }
        })
      })
  } else {
    browser.browserAction.setPopup({popup: "popup.html"})
    browser.browserAction.openPopup()
    browser.browserAction.setPopup({popup: ""})
  } 
})