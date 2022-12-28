import { useState, useEffect } from 'react'

import styles from './Search.module.scss'

export default function Search(props) {

    const [active, setactive] = useState(true)

    useEffect(() => {
        if (props.mapActive) {
            props.setSearchVal('')
        }
    }, [props.mapActive])

    useEffect(() => {
        if (active) {
            document.querySelector('#search').value = ''
            document.querySelector('#search').focus()
        }
    }, [active])    

    return <div className={styles.Search}>
        <button 
            className={`
                ${styles.mapIcon} 
                secondary-color
                ${active ? styles.active : ''}
            `} 
            onClick={() => {setactive(true); props.setMapActive(true); }}
        >
            <svg width="752pt" height="752pt" version="1.1" viewBox="0 0 752 752" xmlns="http://www.w3.org/2000/svg">
                <path d="m347.59 465.98c26.496 0.023437 52.223-8.8828 73.027-25.289l78.52 78.52 20.078-20.078-78.52-78.52c22.191-28.32 30.301-65.191 22.043-100.21s-31.992-64.375-64.496-79.793c-32.504-15.418-70.258-15.219-102.6 0.54297-32.344 15.758-55.766 45.367-63.652 80.469-7.8906 35.102 0.60938 71.883 23.098 99.965 22.488 28.086 56.523 44.418 92.5 44.391zm0-208.38c23.863 0 46.75 9.4805 63.625 26.355s26.355 39.762 26.355 63.625c0 23.863-9.4805 46.75-26.355 63.625s-39.762 26.355-63.625 26.355c-23.863 0-46.75-9.4805-63.625-26.355s-26.355-39.762-26.355-63.625c0-23.863 9.4805-46.75 26.355-63.625s39.762-26.355 63.625-26.355z" fill="#fff"/>
            </svg>
        </button>

        <input 
            id='search'
            placeholder='Search malls...'
            className={`
                ${styles.searchText} 
                ${active ? styles.active : ''}
                primary-stroke
            `} 
            type='text' 
            onChange={(e) => props.setSearchVal(e.target.value)}
        />
    </div>
}
