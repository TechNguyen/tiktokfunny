import Styles from './Video.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMusic,
    faHeart,
    faComment,
    faShare,
    faPlay,
    faPause,
    faVolumeHigh,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'
import AccountUser from './AccountUser'
import Images from '../Images'
import { useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { InView } from 'react-intersection-observer'
import Comments from '../Comments'
import { useMediaQuery } from 'react-responsive'
import { query } from 'firebase/database'
const cx = classNames.bind(Styles)
function Video({
    nickname,
    avatar,
    firstname,
    lastname,
    description,
    music,
    video,
    likeCount,
    cmtCount,
    shareCount,
    tick,
    likesCount,
    bio,
    followersCount,
    isFllow,
    btnClick,
    hanleForm,
    rootElemet,
    isPlay,
    handPlaying,
    stateCurent,
    setList,
    ListPlay,
    darkMode,
    videoID,
}) {
    const videoRef = useRef()
    const rangRef = useRef()
    const [play, setPlay] = useState(true)
    const [volumn, setVolumn] = useState(true)
    const handleClick = () => {
        if (play === true) {
            setPlay(false)
            handlePlay()
        } else {
            setPlay(true)
            handlePause()
        }
    }
    const hanleVolumn = () => {
        if (volumn === true) {
            setVolumn(false)
            videoRef.current.volume = 0
        } else {
            setVolumn(true)
            videoRef.current.volume = 1
        }
    }
    const handlePlay = () => {
        videoRef.current.play()
        setPlay(false)
    }
    const handlePause = () => {
        videoRef.current.pause()
        setPlay(true)
    }
    const changVolume = () => {
        let min = rangRef.current.min
        let max = rangRef.current.max
        let val = rangRef.current.value
        rangRef.current.style.backgroundSize =
            ((val - min) * 100) / (max - min) + '% 100%'
        videoRef.current.volume = parseFloat(((val - min) * 100) / (max - min) / 100)
        if (videoRef.current.volume === 0) {
            setVolumn(false)
        } else {
            setVolumn(true)
        }
    }
    const { ref, inView, entry } = useInView({
        root: rootElemet.current,
        rootMargin: '-10% 0 -20% 0',
        threshold: 1,
    })
    const handleVideo = (inView, entry) => {
        if (!inView) {
            setPlay(true)
        } else if (inView) {
            setList(videoRef.current)
            ListPlay.pause()
            entry.target.querySelector('video').play()
            setPlay(false)
        }
    }
    const isDesktop = useMediaQuery({
        query: '(max-width: 900px)',
    })
   
    return (
        <InView onChange={handleVideo}>
            {({ inView, ref, entry }) => (
                <div
                    className={cx('video-item', {
                        isDeskTop_Mobile: isDesktop,
                    })}
                >
                    <div className={cx('video')}>
                        <div className={cx('video-avartar')}>
                            <Images
                                className={cx('account-avatar')}
                                src={avatar}
                                alt={lastname}
                            />
                        </div>
                        <div className={cx('video-title')}>
                            <AccountUser
                                firstname={firstname}
                                lastname={lastname}
                                avatar={avatar}
                                nickname={nickname}
                                tick={tick}
                                followersCount={followersCount}
                                likesCount={likesCount}
                                bio={bio}
                            />
                            <p className={cx('video-description')}>{description}</p>
                            <span className={cx('video-music')}>
                                <FontAwesomeIcon
                                    icon={faMusic}
                                    className={cx({ darkMode: darkMode })}
                                />
                                <p>{music}</p>
                            </span>
                            <div className={cx('video-src')} ref={ref}>
                                <div className={cx('video-main')}>
                                    <video ref={videoRef} src={video} loop></video>
                                    <span className={cx('video-nav')}>
                                        {play === true ? (
                                            <FontAwesomeIcon
                                                onClick={handleClick}
                                                className={cx('icon', {
                                                    play: true,
                                                })}
                                                icon={faPlay}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                onClick={handleClick}
                                                className={cx('icon', {
                                                    play: true,
                                                })}
                                                icon={faPause}
                                            />
                                        )}
                                    </span>
                                    <span className={cx('video-volumn')}>
                                        <div className={cx('range-volume')}>
                                            <input
                                                step={1}
                                                min={0}
                                                max={100}
                                                ref={rangRef}
                                                type="range"
                                                onChange={changVolume}
                                                className={cx('volume-range-btn')}
                                            ></input>
                                        </div>
                                        <div className={cx('icon-volumn')}>
                                            {volumn === true ? (
                                                <FontAwesomeIcon
                                                    onClick={hanleVolumn}
                                                    className={cx('icon')}
                                                    icon={faVolumeHigh}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    onClick={hanleVolumn}
                                                    className={cx('icon')}
                                                    icon={faVolumeXmark}
                                                />
                                            )}
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('video-action')}>
                            <span className={cx('video-heart')}>
                                {stateCurent ? (
                                    <span className={cx('video-action_icon')}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </span>
                                ) : (
                                    <span
                                        className={cx('video-action_icon')}
                                        onClick={hanleForm}
                                    >
                                        <FontAwesomeIcon icon={faHeart} />
                                    </span>
                                )}
                                <p>{likeCount}</p>
                            </span>
                            <span className={cx('video-comment')}>
                                {stateCurent ? (
                                    <span className={cx('video-action_icon')}>
                                        <FontAwesomeIcon icon={faComment} />
                                    </span>
                                ) : (
                                    <span
                                        className={cx('video-action_icon')}
                                        onClick={hanleForm}
                                    >
                                        <FontAwesomeIcon icon={faComment} />
                                    </span>
                                )}
                                <p>{cmtCount}</p>
                            </span>
                            <span className={cx('video-share')}>
                                <span className={cx('video-action_icon')}>
                                    <FontAwesomeIcon icon={faShare} />
                                </span>
                                <p>{shareCount}</p>
                            </span>
                        </div>
                    </div>
                    {!isFllow ? (
                        stateCurent ? (
                            <Button outline={true} darkMode={darkMode}>
                                Follow
                            </Button>
                        ) : (
                            <Button
                                outline={true}
                                onClick={hanleForm}
                                darkMode={darkMode}
                            >
                                Follow
                            </Button>
                        )
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </InView>
    )
}
Video.propTypes = {
    nickname: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    music: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    cmtCount: PropTypes.number.isRequired,
    shareCount: PropTypes.number.isRequired,
    tick: PropTypes.bool.isRequired,
    bio: PropTypes.string.isRequired,
    followersCount: PropTypes.number.isRequired,
    likesCount: PropTypes.number.isRequired,
}
export default Video
