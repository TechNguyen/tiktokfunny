import PropTypes from 'prop-types'
import Styles from './Video.module.scss'
import classNames from 'classnames/bind'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Images from '../Images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Wrapper as PopperWrapper } from '~/components/Popper/Popper'
import Tippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'
import UserPreview from './UserPreview/UserPreview'
const cx = classNames.bind(Styles)
function AccountUser({
    avatar,
    nickname,
    firstname,
    lastname,
    tick,
    followersCount,
    likesCount,
    bio,
}) {
    const preview = () => {
        return (
            <div className={cx('preview')}>
                <PopperWrapper>
                    <UserPreview
                        avatar={avatar}
                        nickname={nickname}
                        firstname={firstname}
                        lastname={lastname}
                        tick={tick}
                        followersCount={followersCount}
                        likesCount={likesCount}
                        bio={bio}
                    />
                </PopperWrapper>
            </div>
        )
    }
    return (
        <Tippy interactive render={preview} delay={[800, 300]} placement="bottom">
            <div className={cx('accountWrapper')}>
                <span className={cx('video-title-phara')}>
                    <h6 className={cx('user-name')}>{nickname}</h6>
                    <p>{firstname + ' ' + lastname}</p>
                    {tick && (
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                            className={cx('account-icon')}
                        />
                    )}
                </span>
            </div>
        </Tippy>
    )
}
export default AccountUser
