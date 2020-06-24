import { partition } from "../../util/partition"

export default function processLaunchers(tabs, { urlMap }) {
  const [launchers, rest] = partition(tabs, tab => {
    const url = urlMap[tab.url]

    // Match Zoom links
    if (url.hostname.endsWith('zoom.us')) {
      if (url.pathname.startsWith('/j/')) return true
      if (url.pathname.startsWith('/s/')) return true
      if (url.pathname.startsWith('/my/')) return true
      if (url.pathname.startsWith('/postattendee')) return true
    }

    // Match Slack links
    if (url.hostname.endsWith('slack.com')) {
      if (url.pathname.startsWith('/archives/')) return true
      if (url.pathname.startsWith('/app_redirect')) return true
      if (url.pathname.includes('/signin_redirect')) return true
    }

    return false
  })

  return {
    group: {
      title: `Launcher tabs`,
      description: `These tabs are used to launch native applications`,
      tabs: launchers,
      safe: true,
    },
    rest
  }
}