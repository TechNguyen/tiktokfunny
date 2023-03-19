import Header from '~/components/Layout/components/Header/Header'
import Sidebar from '~/components/Layout/components/SideBar/SideBar'
import Signup from '../components/Signup'
import Home from '~/pages/Home'
import styles from './DefaultLayout.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { useState, createContext, useEffect } from 'react'
import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsUpToLine } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive'
import SidebarWindow from '../components/SidebarWindow'
const cx = classNames.bind(styles)
export const ThemeContext = createContext()
function DefaultLayout({ children }) {
    const [signin, setSignup] = useState(false)
    const [curentUser, setCurentUser] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [isShow, setisShow] = useState(false)
    const isWindow = useMediaQuery({
        query: '(min-width: 1155px)',
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 690px)',
    })
    const homeRef = useRef()
    const handleTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                setisShow(true)
            } else {
                setisShow(false)
            }
        })
    })
    const rootElemet = useRef()
    const handleShowSign = () => {
        setSignup(signin === true ? false : true)
    }
    const handleCurentUser = () => {
        setCurentUser(curentUser === true ? false : true)
    }
    const handleSetDark = () => {
        setDarkMode(darkMode === true ? false : true)
    }
    return (
        <ThemeContext.Provider value={signin}>
            <div ref={rootElemet} className={cx('rootElement')}></div>
            <div
                className={cx('wrapper', {
                    dark: darkMode,
                })}
            >
                <div className={cx('form-sign')}>
                    {signin && (
                        <Signup
                            func={handleShowSign}
                            handleUser={handleCurentUser}
                            dark={darkMode}
                        />
                    )}
                </div>
                <Header
                    func={handleShowSign}
                    stateCurent={curentUser}
                    singoutfnc={handleCurentUser}
                    lightodar={handleSetDark}
                    darkColor={darkMode}
                />
                <div className={cx('container')}>
                    {isWindow ? (
                        <SidebarWindow
                            hanleForm={handleShowSign}
                            darkMode={darkMode}
                            isWindow={isWindow}
                        />
                    ) : (
                        <Sidebar
                            hanleForm={handleShowSign}
                            darkMode={darkMode}
                            isWindow={isWindow}
                        />
                    )}
                    <div
                        className={cx('content', {
                            isMobile: isMobile,
                        })}
                    >
                        <Home
                            handleUser={handleCurentUser}
                            hanleForm={handleShowSign}
                            rootElemet={rootElemet}
                            stateCurent={curentUser}
                            darkMode={darkMode}
                            ref={homeRef}
                        />
                    </div>
                </div>

                <div
                    className={cx('onTopWrapper', {
                        ontop: isShow,
                        hidenTop: !isShow,
                        darkIconTop: darkMode,
                    })}
                >
                    <FontAwesomeIcon
                        icon={faArrowsUpToLine}
                        className={cx('icon-top')}
                        onClick={handleTop}
                    />
                </div>
            </div>
        </ThemeContext.Provider>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}
export default DefaultLayout
