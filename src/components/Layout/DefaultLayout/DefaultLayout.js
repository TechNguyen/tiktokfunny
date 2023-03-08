import Header from '~/components/Layout/components/Header/Header'
import Sidebar from '~/components/Layout/components/SideBar/SideBar'
import Signup from '../components/Signup'
import Home from '~/pages/Home'
import styles from './DefaultLayout.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { useState, createContext } from 'react'
import { useRef } from 'react'
const cx = classNames.bind(styles)
export const ThemeContext = createContext()
function DefaultLayout({ children }) {
    const [signin, setSignup] = useState(false)
    const [curentUser, setCurentUser] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
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
                        <Signup func={handleShowSign} handleUser={handleCurentUser} />
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
                    <Sidebar hanleForm={handleShowSign} darkMode={darkMode} />
                    <div className={cx('content')}>
                        <Home
                            handleUser={handleCurentUser}
                            hanleForm={handleShowSign}
                            rootElemet={rootElemet}
                            stateCurent={curentUser}
                            darkMode={darkMode}
                        />
                    </div>
                </div>
            </div>
        </ThemeContext.Provider>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}
export default DefaultLayout
