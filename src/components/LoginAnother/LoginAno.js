import classNames from 'classnames/bind'
import styles from './LoginAno.module.scss'
const cx = classNames.bind(styles)
function LoginAno(props) {
    return (
        <div className={cx('wrapper')}>
            <h3
                className={cx('login-title', {
                    darkPhara: props.darkMode,
                })}
            >
                Log in to follow creators, like videos, and view comments.
            </h3>
            <button
                className={cx('login-btn', {
                    dark: props.darkMode,
                })}
                onClick={props.handleForm}
            >
                Log in
            </button>
        </div>
    )
}

export default LoginAno
