import HastagItem from './HastagItem'
import hasTaglist from './HastagItem/HasTagArrlist'
import Styles from './Hastag.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
const cx = classNames.bind(Styles)
function Hastag(props) {
    const [hastags, setHasTaglist] = useState([])
    useEffect(() => {
        hasTaglist.map((tag) => {
            setHasTaglist((pre) => [...pre, tag])
        })
    }, [])
    return (
        <div className={cx('hastag-wrapper')}>
            <h5>Khám phá</h5>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {hastags.map((tag, index) => (
                    <HastagItem
                        key={index}
                        title={tag.title}
                        icon={tag.icon}
                        darkMode={props.darkMode}
                    />
                ))}
            </div>
        </div>
    )
}

export default Hastag
