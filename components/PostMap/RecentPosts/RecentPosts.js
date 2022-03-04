import Link from 'next/link'
import { useContext } from 'react'

import ColorContext from '@/components/ColorContext';
import styles from './RecentPosts.module.scss'

export default function RecentPosts(props) {

    const { colorPair } = useContext(ColorContext)

    return <div className={styles.RecentPosts}>
        {props.posts.map((post, index) => {
            return <Link href={`/post/${post.fields.title}`} key={index}>
                <a 
                    className={`
                        recentPost
                        ${styles.recentPost}
                        ${props.currPost.sys && props.currPost.sys.id  == post.sys.id ? 
                            `secondary-font ${styles.active}` : 
                            ''
                        }
                    `}
                    onMouseEnter={(e) => {
                        if (e.target.classList.contains('recentPost')) {
                            e.target.classList.add('secondary-font')
                        } else {
                            e.target.parentElement.classList.add('secondary-font')
                        }
                    }} 
                    onMouseLeave={(e) => {
                        if (e.target.classList.contains('recentPost')) {
                            e.target.classList.remove('secondary-font')
                        } else {
                            e.target.parentElement.classList.remove('secondary-font')
                        }
                    }}
                >
                    <img className={styles.postImage} src={props.images[post.sys.id]} style={{borderColor: colorPair[0]}} />
                    <h3>{post.fields.title}</h3>
                    <span>{post.fields.location}</span>
                </a>
            </Link>
        })}
    </div>
}
