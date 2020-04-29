const name = "tabs"

// export function changeTab(tabId) {
//   return {
//     type: CHANGE_TAB, 
//     payload: { tabId }
//   }
// }

const initialState = {
  tabs: []
}

const reducer = (state = initialState, action) => {
  // switch (action.type) {
  //   case CHANGE_TAB:
  //     return { 
  //       ...state,
  //       activeTabId: action.payload.tabId
  //     } 
  // }

  return state
}

const selectors = {
  // getActiveTabId: (state) => {
  //   return state[name].activeTabId
  // }
}

export default {
  name,
  reducer,
  selectors,
}