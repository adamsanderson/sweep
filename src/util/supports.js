import browser from "webextension-polyfill"

export const supportData = {
  browserAction: {
    onClickModifiers: false
  }
}

Object.seal(supportData)

export function initSupportData() {
  return window._supportData = supportData
}

export function getSupportData() {
  return window._supportData || browser.extension.getBackgroundPage()._supportData
}