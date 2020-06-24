import categorizeLaunchers from './categorizeLaunchers'
import categorizeBlanks from './categorizeBlanks'
import categorizeDuplicates from './categorizeDUplicates'

const STRATEGIES = [
  categorizeLaunchers,
  categorizeBlanks,
  categorizeDuplicates
]

export default function categorizeTabs(tabs) {
  const urlMap = createUrlMap(tabs)
  const groups = []

  STRATEGIES.forEach(strategy => {
    const { group, rest } = strategy.call(null, tabs, { urlMap })
    if (group.tabs.length > 0) {
      groups.push(group)
    }

    tabs = rest
  })

  return groups
}

function createUrlMap(tabs) {
  const cache = {}
  tabs.forEach(tab => {
    const urlString = tab.url
    if (!cache[urlString]) {
      cache[urlString] = new URL(urlString)
    }
  })

  return cache
}