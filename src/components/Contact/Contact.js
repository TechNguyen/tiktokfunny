import { useEffect, useState } from 'react'
import ListContact from './ListContact'
import Styles from './Contact.module.scss'
import classNames from 'classnames/bind'
import { Wrapper as PopperWrapper } from '~/components/Popper/Popper'
import Tippy from '@tippyjs/react'
const cx = classNames.bind(Styles)
function Contact() {
    const [list, setUserList] = useState([])
    useEffect(() => {
        ListContact.map((list) => {
            setUserList((pre) => [...pre, list])
        })
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-wrapper')}>
                {list.map((item, index) => (
                    <a key={index} href={item.href}>
                        {item.title}
                    </a>
                ))}
            </div>
            <div className={cx('sub-contact')}>
                <p className={cx('sub-contact_title')}>©Ducthang 2023 TikTok</p>
            </div>
        </div>
    )
}

export default Contact
