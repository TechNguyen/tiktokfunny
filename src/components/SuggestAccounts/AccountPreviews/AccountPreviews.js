import styles from './AccountPreviews.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import Images from '~/components/Images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/Button'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)
function AccountPreviews({
    avatar,
    nickname,
    lastname,
    tick,
    followersCount,
    likesCount,
    darkMode,
}) {
    return (
        <div
            className={cx('wrapper', {
                darkPre: darkMode,
            })}
        >
            <div className={cx('account-wrapper')}>
                <Images className={cx('account-avatar')} src={avatar} alt={lastname} />
                <Button primarybtn={true}>Follow</Button>
            </div>
            <div className={cx('account-infor')}>
                <h4 className={cx('account-name')}>
                    <strong>{lastname}</strong>
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
        </div>
    )
}
AccountPreviews.propTypes = {
    src: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    tick: PropTypes.bool.isRequired,
    followersCount: PropTypes.number.isRequired,
    likesCount: PropTypes.number.isRequired,
}
export default AccountPreviews
