import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
  // @ts-expect-error
  BrowserRepo,
  // @ts-expect-error
  LocalForageStorageAdapter,
  // @ts-expect-error
  BroadcastChannelNetworkAdapter,
  // @ts-expect-error
  BrowserWebSocketClientAdapter,
  Repo,
} from "automerge-repo"
import { RepoContext } from './hooks'

async function getRepo(url: string) {
  return await BrowserRepo({
    storage: new LocalForageStorageAdapter(),
    network: [
      new BroadcastChannelNetworkAdapter(),
      // new BrowserWebSocketClientAdapter(url)
    ],
  })
}

const params = new URLSearchParams(window.location.search);
const hostname = params.get("host") || "automerge-storage-demo.glitch.me"

getRepo(`wss://${hostname}`).then( repo => ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RepoContext.Provider value={repo}>
      <App />
    </RepoContext.Provider>
  </React.StrictMode>
))
