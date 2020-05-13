export default function groupTabs(tabs) {
  const getUrlObject = createUrlMap(tabs)
  const groups = []

  let launchers
  [launchers, tabs] = partition(tabs, tab => {
    const url = getUrlObject(tab)

    // Match Zoom links
    if (url.hostname.endsWith('zoom.us')) {
      if (url.pathname.startsWith('/j/')) return true
      if (url.pathname.startsWith('/s/')) return true
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
    const url = getUrlObject(tab)

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

  const groupedByUrl = {}
  let duplicates = []
  tabs.forEach(tab => {
    const url = tab.url
    if (!groupedByUrl[url]) groupedByUrl[url] = []
    groupedByUrl[url].push(tab)
  })

  Object.values(groupedByUrl).forEach(groupedTabs => {
    if (groupedTabs.length > 1) {
      // Sort descending by tab priority
      const tabsByAccessTime = groupedTabs.sort((a, b) => getTabPriority(b) - getTabPriority(a))
      duplicates = duplicates.concat(tabsByAccessTime.slice(1))
    }
  })

  if (duplicates.length > 0) {
    groups.push({
      title: `Duplicate tabs`,
      description: `These tabs are duplicates of other tabs you have open`,
      tabs: duplicates,
    })
  }

  return groups
}

function getTabPriority(tab) {
  // Active tabs are always given priority
  if (tab.active) return Infinity
  // Firefox tracks access times, more recently accessed tabs should be retained
  if (tab.lastAccessed) return tab.lastAccessed
  // As a proxy for recency, assume that tab ids are increasing and indicate more recent tabs
  return tab.id
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