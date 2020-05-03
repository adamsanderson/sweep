export default function groupTabs(tabs) {
  const getUrl = createUrlMap(tabs)
  const groups = []

  let launchers
  [launchers, tabs] = partition(tabs, tab => {
    const url = getUrl(tab)

    // Match Zoom links
    if (url.hostname.endsWith('zoom.us')) {
      if (url.pathname.startsWith('/j/')) return true
      if (url.pathname.startsWith('/my/')) return true
    }

    // Match Slack links
    if (url.hostname.endsWith('slack.com')) {
      if (url.pathname.startsWith('/archives/')) return true
    }

    return false
  })

  if (launchers.length > 0) {
    groups.push({
      title: `Launcher tabs`,
      description: `These tabs are used to launch native applications`,
      tabs: launchers,
      safe: true,
    })
  }

  let blanks
  [blanks, tabs] = partition(tabs, tab => {
    const url = getUrl(tab)

    if (url.href === 'about:blank') return true
    if (url.href === 'about:newtab') return true
    if (url.href === 'chrome:newtab') return true

    return false
  })

  if (blanks.length > 0) {
    groups.push({
      title: `Blank tabs`,
      description: `These tabs are blank`,
      tabs: blanks,
      safe: true,
    })
  }

  return groups
}

function createUrlMap() {
  const cache = {}
  return function getUrl(tab) {
    const urlString = tab.url

    if (cache[urlString]) return cache[urlString]

    return cache[urlString] = new URL(urlString)
  }
}

function partition(arr, filter) {
  const included = []
  const excluded = []

  arr.forEach(item => filter(item) ? included.push(item) : excluded.push(item))
  return [included, excluded]
}