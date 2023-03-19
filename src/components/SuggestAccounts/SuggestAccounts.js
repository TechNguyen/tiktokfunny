import styles from './SuggestAccounts.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import AccountItems from './AccountItems'
import { useEffect, useState } from 'react'
import * as suggest from '~/service/suggestApi'
const cx = classNames.bind(styles)
var firstList = []
var useListFist = []
function SuggestAccounts({ label, darkMode, isWindow }) {
    const [userList, setUserList] = useState([])
    const [show, setShow] = useState(true)
    useEffect(() => {
        const fetchApi = async () => {
            const result = await suggest.suggest()
            useListFist = [...result]
            for (let i = 0; i < 5; i++) {
                firstList[i] = useListFist[i]
            }
            setUserList(firstList)
        }
        fetchApi()
    }, [])
    const hanleShow = () => {
        if (show === true) {
            setUserList(useListFist)
            setShow(false)
        } else {
            setShow(true)
            setUserList(firstList)
        }
    }
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <div className={cx('suggest-wrapper')}>
                {userList.map((user) => (
                    <AccountItems
                        avatar={user.avatar}
                        nickname={user.nickname}
                        lastname={user.last_name}
                        tick={user.tick}
                        followersCount={user.followers_count}
                        likesCount={user.likes_count}
                        darkMode={darkMode}
                        isWindow={isWindow}
                    />
                ))}
            </div>
            {isWindow ? (
                <>
                    {show ? (
                        <p onClick={hanleShow} className={cx('handle-btn')}>
                            See all
                        </p>
                    ) : (
                        <p onClick={hanleShow} className={cx('handle-btn')}>
                            See less
                        </p>
                    )}
                </>
            ) : (
                <></>
            )}
        </div>
    )
}
SuggestAccounts.propTypes = {
    label: PropTypes.string.isRequired,
}
export default SuggestAccounts
