import styles from './MallPatch.module.scss'

export default function MallPatch(props) {
    const titleOffset = 250 - (props.title.length * 13)
    const locationOffset = 250 - (props.location.length * 13) + (Math.abs(props.title.length - props.location.length) * props.location.length)

    let textPathTitle =
        `<textPath class="secondary-color" startOffset="${titleOffset}" alignment-baseline="top" xlink:href="#curve">
            ${props.title}
        </textPath>`
    let textPathLocation =
        `<textPath class="secondary-color" startOffset="${locationOffset}" xlink:href="#curve" alignment-baseline="bottom" side="right">
            ${props.location}
        </textPath>`
  
    return (
    <div className='mall-patch'>
        <div className={`${styles.outerCircle} primary-color primary-stroke`}>
            <div className={`${styles.innerCircle} primary-stroke`}>
                <svg className={styles.topText} viewBox="0 0 500 500">
                    <path id="curve" d="
                        M 75, 250
                        a 175,175 0 1,1 350,0
                        a 175,175 0 1,1 -350,0" 
                    />
                    <text dy='-12' dangerouslySetInnerHTML={{__html: textPathTitle}} width="500"></text>
                    <text dy='65' dangerouslySetInnerHTML={{__html: textPathLocation}} width="500"></text>
                </svg>
            </div>
            <img className={styles.patchCenter} src={props.patchImage} />
            
        </div>
    </div>
  )
}
