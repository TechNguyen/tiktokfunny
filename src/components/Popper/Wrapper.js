import classNames from 'classnames/bind'
import styles from './Popper.module.scss'
import PropTypes from 'prop-types'
const cx = classNames.bind(styles)

function Wrapper({ children, flex = false, darkMode }) {
    return <div className={cx('wrapper')}>{children}</div>
}
Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    flex: PropTypes.bool,
}

export default Wrapper