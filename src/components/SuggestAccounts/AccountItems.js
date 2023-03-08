import PropTypes from 'prop-types'
import styles from './SuggestAccounts.module.scss'
import classNames from 'classnames/bind'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Images from '../Images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Wrapper as PopperWrapper } from '~/components/Popper/Popper'
import Tippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'
import AccountPreviews from './AccountPreviews'
const cx = classNames.bind(styles)
function AccountItems({
    avatar,
    nickname,
    lastname,
    tick,
    followersCount,
    likesCount,
    bio,
    darkMode,
}) {
    const preview = () => {
        return (
            <div className={cx('preview')}>
                <PopperWrapper>
                    <AccountPreviews
                        avatar={avatar}
                        nickname={nickname}
                        lastname={lastname}
                        tick={tick}
                        followersCount={followersCount}
                        likesCount={likesCount}
                        darkMode={darkMode}
                    />
                </PopperWrapper>
            </div>
        )
    }
    return (
        <Tippy interactive render={preview} delay={[800, 300]} placement="bottom">
            <div
                className={cx('accountWrapper', {
                    dark: darkMode,
                })}
            >
                <Images className={cx('account-avatar')} src={avatar} alt={lastname} />
                <div className={cx('account-infor')}>
                    <h4 className={cx('account-name')}>
                        {lastname}
                        {tick && (
                            <FontAwesomeIcon
                                icon={faCircleCheck}
                                className={cx('account-icon')}
                            />
                        )}
                    </h4>
                    <p className={cx('account-username')}>{nickname}</p>
                </div>
            </div>
        </Tippy>
    )
}

AccountItems.propTypes = {
    src: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    tick: PropTypes.bool.isRequired,
    followersCount: PropTypes.number.isRequired,
    likesCount: PropTypes.number.isRequired,
    bio: PropTypes.string.isRequired,
}

export default AccountItems
