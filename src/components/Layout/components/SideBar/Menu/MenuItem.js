import styles from './Menu.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

const cx = classNames.bind(styles)

function MenuItem({ title, to, icon, activeIcon, darkMode }) {
    const isWindow = useMediaQuery({
        query: '(min-width: 1155px)',
    })
    return (
        <NavLink
            end
            to={to}
            className={(nav) =>
                cx('menu_item', {
                    active: nav.isActive,
                    dark: darkMode,
                    isWindow: !isWindow,
                })
            }
        >
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('active-icon')}>{activeIcon}</span>
            <span className={cx('menu-item_title')}>{title}</span>
        </NavLink>
    )
}
MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
}
export default MenuItem
