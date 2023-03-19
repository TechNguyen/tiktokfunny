import styles from './SideBar.module.scss'
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
import LoginAno from '~/components/LoginAnother'
import SuggestAccounts from '~/components/SuggestAccounts'
import Hastag from '~/components/Hastag'
import Contact from '~/components/Contact'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
const cx = classNames.bind(styles)

function SidebarWindow(props) {
    const handleFormLogin = props.hanleForm
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For You"
                    to={config.routers.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                    darkMode={props.darkMode}
                ></MenuItem>
                <MenuItem
                    title="Following"
                    to={config.routers.following}
                    icon={<FollowingIcon />}
                    activeIcon={<FollowingActiveIcon />}
                    darkMode={props.darkMode}
                ></MenuItem>
                <MenuItem
                    title="Live"
                    to={config.routers.live}
                    icon={<LiveICon />}
                    activeIcon={<LiveActiveICon />}
                    darkMode={props.darkMode}
                ></MenuItem>
            </Menu>
            <LoginAno handleForm={handleFormLogin} darkMode={props.darkMode} />
            <SuggestAccounts
                label="Suggested accounts"
                darkMode={props.darkMode}
                isWindow={props.isWindow}
            />
            <Hastag darkMode={props.darkMode} />
            <Contact />
        </aside>
    )
}
export default SidebarWindow
