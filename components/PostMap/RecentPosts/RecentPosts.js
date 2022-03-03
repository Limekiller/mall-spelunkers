import Link from 'next/link'
import { useEffect, useState } from 'react'

import styles from './RecentPosts.module.scss'

export default function RecentPosts(props) {

    return <div className={styles.RecentPosts}>
        {props.posts.map((post, index) => {
            return <div className={styles.recentPost} key={index}>
                <Link href={`/post/${post.fields.title}`}>
                    <a>
                        <img className={styles.postImage} src={props.images[post.sys.id]} />
                        <h3>{post.fields.title}</h3>
                        <span>{post.fields.location}</span>
                    </a>
                </Link>
            </div>
        })}
    </div>
}
