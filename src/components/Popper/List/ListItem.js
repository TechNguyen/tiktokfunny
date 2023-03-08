import Button from '~/components/Button/Button'
import classNames from 'classnames/bind'
import styles from './List.module.scss'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
const cx = classNames.bind(styles)
function ListItem({ data, onClick, darkColor }) {
    return (
        <Button
            href={data.to}
            className={cx('list-button-item', {
                dark: darkColor,
            })}
            onClick={onClick}
        >
            {data.src ? (
                <img src={data.src} alt={data.title} className={cx('header-img')} />
            ) : (
                <></>
            )}
            {data.title}
            {data.title === 'Dark mode' ? (
                <buttons
                    className={cx('button-dark', {
                        darkbg: darkColor,
                    })}
                >
                    <span
                        className={cx('button-dark_navgiation', {
                            dark: darkColor,
                        })}
                    ></span>
                </buttons>
            ) : (
                <></>
            )}
        </Button>
    )
}
ListItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}
export default ListItem
