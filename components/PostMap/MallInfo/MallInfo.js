import Link from 'next/link'

import styles from './MallInfo.module.scss'

export default function MallInfo(props) {

    return <div className={`
            ${styles.MallInfo}
            ${props.mall.fields ? styles.active : ''}
            primary-stroke
        `}>
        {props.mall.fields ?
            <>
                <div>
                    <h3>{props.mall.fields.title}</h3>
                    <span>{props.mall.fields.location}</span>
                </div>
                <div className={styles.linkContainer}>
                    <span className={`${styles.close} secondary-color`} tabIndex='0' onClick={() => props.setPostFromLatLong([0,0])}>×</span>
                    <Link href={`/post/${props.mall.fields.title}`}>
                        <a 
                            className='button primary-color'
                            onMouseEnter={(e) => e.target.classList.add('primary-stroke')}
                            onMouseLeave={(e) => e.target.classList.remove('primary-stroke')}
                        >
                            <h3 style={{pointerEvents: 'none'}}>Visit →</h3>
                        </a>
                    </Link>
                </div>
            </>
        :
            ''
        }
    </div>
}
