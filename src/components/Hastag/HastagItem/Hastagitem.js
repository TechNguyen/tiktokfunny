import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import Styles from './HastagItem.module.scss'
const cx = classNames.bind(Styles)
function HastagItem({ title, icon, darkMode }) {
    return (
        <div className={cx('Hastag-item')}>
            <FontAwesomeIcon
                icon={icon}
                className={cx('icon-hastag', {
                    dark: darkMode,
                })}
            />
            <p>{title}</p>
        </div>
    )
}

export default HastagItem
