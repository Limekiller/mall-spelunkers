import { useRouter } from 'next/router';
import Head from 'next/head'
import { createContext, useEffect, useState } from 'react';

import ColorContext from '@/components/ColorContext';
import BlogFrame from '@/components/BlogFrame/BlogFrame.js'
import '../styles/globals.scss'

function App({ Component, pageProps }) {
  const [colorPair, setColorPair] = useState(['#7bcdcc', '#ed0a85']);

  const colorPairs = [
    ['#7bcdcc', '#ed0a85'],
    ['#15b58d', '#702b87'],
    ['#f2ec1e', '#7bcdcc']
  ]
  const setRandomColorPair = () => {
    const colorPair = colorPairs[Math.floor(Math.random() * colorPairs.length)]
    let style = window.document.createElement('style')
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
    <ColorContext.Provider value={{ colorPair: colorPair}}>
      <Component {...pageProps} />
    </ColorContext.Provider>
  </>
}

export default App
