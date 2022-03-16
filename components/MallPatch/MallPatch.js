import { useContext } from 'react'

import ColorContext from '@/components/ColorContext';
import styles from './MallPatch.module.scss'

export default function MallPatch(props) {
    const { colorPair } = useContext(ColorContext)

    const titleOffset = 250 - (props.title.length * 13)
    const locationOffset = 250 - (props.location.length * 13) + (Math.abs(props.title.length - props.location.length))

    let textPathTitle =
        `<textPath class="secondary-color" startOffset="${titleOffset}" alignment-baseline="top" xlink:href="#curve">
            ${props.title}
        </textPath>`
    let textPathLocation =
        `<textPath class="secondary-color" startOffset="${locationOffset}" xlink:href="#curve">
            ${props.location}
        </textPath>`
  
    return (
    <div className='mall-patch'>
        <div className={`${styles.outerCircle} primary-color primary-stroke`}>
            <div 
                className={`${styles.innerCircle} primary-stroke`}
                style={{backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='999rem' stroke='%23${colorPair[1].slice(1)}' stroke-width='0.25rem' stroke-dasharray='0.5rem%2c 1rem' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`}}
            >
                <svg className={styles.topText} viewBox="0 0 500 500">
                    <path id="curve" d="
                        M 75, 250
                        a 175,175 0 1,1 350,0
                        a 175,175 0 1,1 -350,0" 
                    />
                    <text dy='-12' dangerouslySetInnerHTML={{__html: textPathTitle}} width="500"></text>
                    <text className={styles.locationPath} dy='-12' dangerouslySetInnerHTML={{__html: textPathLocation}} width="500"></text>
                </svg>
            </div>
            <img 
                className={styles.patchCenter} 
                src={props.patchImage}
                alt='Small image at the center of the patch representing this mall'
            />
            
        </div>
    </div>
  )
}
