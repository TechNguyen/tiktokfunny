import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind'
import Menu, { MenuItem } from './Menu'
import config from '~/config/config'
import {
    HomeIcon,
    LiveICon,
    FollowingIcon,
    HomeActiveIcon,
    LiveActiveICon,
    FollowingActiveIcon,
} from '~/components/Icons/Icons'
import SuggestAccounts from '~/components/SuggestAccounts'
import Hastag from '~/components/Hastag'
import Contact from '~/components/Contact'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
const cx = classNames.bind(styles)

function Sidebar(props) {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    to={config.routers.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                    darkMode={props.darkMode}
                ></MenuItem>
                <MenuItem
                    to={config.routers.following}
                    icon={<FollowingIcon />}
                    activeIcon={<FollowingActiveIcon />}
                    darkMode={props.darkMode}
                ></MenuItem>
                <MenuItem
                    to={config.routers.live}
                    icon={<LiveICon />}
                    activeIcon={<LiveActiveICon />}
                    darkMode={props.darkMode}
                ></MenuItem>
            </Menu>
            <SuggestAccounts darkMode={props.darkMode} isWindow={props.isWindow} />
        </aside>
    )
}
export default Sidebar
