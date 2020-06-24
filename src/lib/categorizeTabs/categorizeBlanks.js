import { partition } from "../../util/partition"

export default function categorizeBlanks(tabs, { urlMap }) {
  const [blanks, rest] = partition(tabs, tab => {
    const url = urlMap[tab.url]

    if (url.href === 'about:blank') return true
    if (url.href === 'about:newtab') return true
    if (url.href === 'chrome:newtab') return true

    return false
  })

  return {
    group: {
      title: `Blank tabs`,
      description: `These tabs are blank`,
      tabs: blanks,
      safe: true,
    },
    rest
  }
}