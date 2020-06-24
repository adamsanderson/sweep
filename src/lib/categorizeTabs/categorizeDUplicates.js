export default function categorizeDuplicates(tabs) {
  const groupedByUrl = {}
  let duplicates = []
  let rest = []
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
    } else {
      rest.push(groupedTabs[0])
    }
  })

  return {
    group: {
      title: `Duplicate tabs`,
      description: `These tabs are duplicates of other tabs you have open`,
      tabs: duplicates,
    },
    rest
  }
}

function getTabPriority(tab) {
  // Active tabs are always given priority
  if (tab.active) return Infinity
  // Firefox tracks access times, more recently accessed tabs should be retained
  if (tab.lastAccessed) return tab.lastAccessed
  // As a proxy for recency, assume that tab ids are increasing and indicate more recent tabs
  return tab.id
}