import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { 
  wrapStore,
  Store as ProxyStore,
  applyMiddleware as applyProxyMiddleware 
} from 'webext-redux'
import deepDiff from 'webext-redux/lib/strategies/deepDiff/diff'
import patchDeepDiff from 'webext-redux/lib/strategies/deepDiff/patch'
import thunk from 'redux-thunk'

import ENV from '../util/env'

import backgroundActions from './middleware/backgroundActions'
import logger from './middleware/logger'
import promise from './middleware/promise'

import tabs from './modules/tabs'

export const initialState = {}
export const reducers = {}
export const sharedMiddleware = [thunk, promise]
export const middleware = [backgroundActions, ...sharedMiddleware]
export const enhancers = []

const REDUX_PORT_NAME = "Sweep"

// Register Modules:
function addModule(module) {
  if (!module.name) throw new Error("Name required")

  if (module.reducer)     reducers[module.name] = module.reducer
  if (module.middleware)  middleware.push(module.middleware)
  if (module.enhancer)    enhancers.push(module.enhancer)
}

// Add our local modules
addModule(tabs)

// Add the logger last so that it can report on everything:
if (!ENV.production) {
  middleware.push(logger)
}

// Create store
export const rootReducer = combineReducers(reducers)
const enhancedMiddleware = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export function createBackgroundStore() {
  const store = createStore(
    rootReducer,
    initialState,
    enhancedMiddleware
  )
  
  // Wrap store with webext-redux
  wrapStore(store, {
    portName: REDUX_PORT_NAME,
    diffStrategy: deepDiff,
  })

  return store
}

export function createProxyStore() {
  const proxy = new ProxyStore({
    portName: REDUX_PORT_NAME,
    patchStrategy: patchDeepDiff,
  })

  return applyProxyMiddleware(proxy, ...sharedMiddleware)
}