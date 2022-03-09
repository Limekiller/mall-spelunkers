import { useRouter } from 'next/router';
import Head from 'next/head'
import { createContext, useEffect, useState } from 'react'

import ColorContext from '@/components/ColorContext'
import BlogFrame from '@/components/BlogFrame/BlogFrame.js'
import MallMap from '@/components/MallMap/MallMap'
import '../styles/globals.scss'

function App({ Component, pageProps }) {
  const [colorPair, setColorPair] = useState(['#7bcdcc', '#ed0a85']);

  const colorPairs = [
    ['#04d5d5', '#ed0a85'],
    ['#15b58d', '#702b87'],
    ['#ffef00', '#04d5d5']
  ]
  
  const setRandomColorPair = () => {
    // We prepend these styles directly in the document so we can change colors via CSS in a non-react way
    // We ALSO pass the colorPair val to the context provider so we can access them from React as well
    // Here we check if there is already a color scheme CSS tag on the document, and if so, remove it
    // So we don't add infinite CSS tags to the document 
    if (document.querySelector('#custom-color')) {
      document.querySelector('#custom-color').remove()
    }

    const colorPair = colorPairs[Math.floor(Math.random() * colorPairs.length)]
    let style = window.document.createElement('style')
    style.id = 'custom-color'
    style.innerHTML = 
      `.primary-color {
        fill: ${colorPair[0]} !important; 
        background: ${colorPair[0]};
      }
      .secondary-color {
        fill: ${colorPair[1]} !important; 
        background: ${colorPair[1]};
      }
      .primary-stroke {
        stroke: ${colorPair[1]} !important;
        border-color: ${colorPair[1]} !important;
      }
      .primary-font {
        color: ${colorPair[0]};
      }
      .secondary-font {
        color: ${colorPair[1]};
      }`
    document.head.appendChild(style)
    setColorPair(colorPair)
  }
  
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeComplete', setRandomColorPair)
  }, [router.events]);

  useEffect(() => {
    setRandomColorPair()
  }, [])
  
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <BlogFrame />
    <MallMap />
    <ColorContext.Provider value={{ colorPair: colorPair}}>
      <Component {...pageProps} />
    </ColorContext.Provider>
  </>
}

export default App
