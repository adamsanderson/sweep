import browser from "webextension-polyfill"
import groupTabs from "./util/groupTabs"
import { initSupportData } from "./util/supports"
import { AUTO_SWEEP_OPTION } from "./constants"

// Expose supports so that the popup page can see it.
const supportData = initSupportData()

browser.browserAction.onClicked.addListener((tab, eventData) => {
  // Detect onClickModifiers support.
  supportData.browserAction.onClickModifiers = !!eventData

  // Firefox supports additional event data:
  if (eventData && eventData.modifiers.includes("Shift")) {
    closeSafeTabs()
  } else {
    browser.browserAction.setPopup({ popup: "popup.html" })
    browser.browserAction.openPopup()
    browser.browserAction.setPopup({ popup: "" })
  }
})

browser.idle.setDetectionInterval(15)
browser.idle.onStateChanged.addListener((idleState) => {
  if (idleState !== 'active') {
    browser.storage.local.get(AUTO_SWEEP_OPTION)
      .then(valueObject => {
        if (valueObject[AUTO_SWEEP_OPTION]) {
          closeSafeTabs({keepActive: true})
        }
      })
      .catch(error => { throw error })
  }
})

function closeSafeTabs({keepActive = false}) {
  browser.tabs.query({}).then(tabs => {
    const groups = groupTabs(tabs)
    groups.forEach(tabGroup => {
      if (tabGroup.safe) {
        let tabs = tabGroup.tabs
        if (keepActive) tabs = tabs.filter(tab => !tab.active)
        const ids = tabs.map(tab => tab.id)

        browser.tabs.remove(ids)
      }
    })
  })
}