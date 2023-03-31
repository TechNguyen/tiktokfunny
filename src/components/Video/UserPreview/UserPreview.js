import styles from './UserPreview.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import Images from '~/components/Images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/Button'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)
function UserPreview({
    avatar,
    firstname,
    nickname,
    lastname,
    tick,
    followersCount,
    likesCount,
    bio,
    darkMode,
}) {
    return (
        <div
            className={cx('wrapper', {
                darkMode: darkMode,
            })}
        >
            <div className={cx('account-wrapper')}>
                <Images className={cx('account-avatar')} src={avatar} alt={lastname} />
                <Button outline={true} isDark={darkMode}>
                    Follow
                </Button>
            </div>
            <div className={cx('account-infor')}>
                <div className={cx('account-detail')}>
                    <h4 className={cx('account-name')}>
                        <strong>{firstname + ' ' + lastname}</strong>
                        {tick && (
                            <FontAwesomeIcon
                                icon={faCircleCheck}
                                className={cx('account-icon')}
                            />
                        )}
                    </h4>
                    <p className={cx('account-username')}>{nickname}</p>
                    <span className={cx('account-analytics')}>
                        <strong className={cx('account-value')}>{followersCount}M</strong>
                        <p className={cx('account-label')}>Followers</p>
                        <strong className={cx('account-value')}>{likesCount}M</strong>
                        <p className={cx('account-label')}>Likes</p>
                    </span>
                </div>
                <div className={cx('account-bio')}>
                    <p>{bio}</p>
                </div>
            </div>
        </div>
    )
}
UserPreview.propTypes = {
    src: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    tick: PropTypes.bool.isRequired,
    followersCount: PropTypes.number.isRequired,
    likesCount: PropTypes.number.isRequired,
}
export default UserPreview
