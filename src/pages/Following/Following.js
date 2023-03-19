import * as videoList from '~/service/videoApi'
import Video from '~/components/Video'
import { useEffect, useRef, useState } from 'react'
import Styles from './Following.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(Styles)
function Following(props) {
    const rootElemet = props.rootElemet
    const curentUser = props.stateCurent
    const [videos, setVideo] = useState([])
    const [state, setState] = useState('for-you')
    const [ListPlay, setListPlay] = useState([])
    const [num, setNum] = useState(1)
    useEffect(() => {
        const fetchApi = async () => {
            const result = await videoList.videoItem(state, num)
            setVideo(result)
        }
        fetchApi()
    }, [state, num])
    const [isPlaying, setisPlayting] = useState(true)
    const handleUser = props.handleUser
    const handPlaying = () => {
        isPlaying === true ? setisPlayting(false) : setisPlayting(true)
    }
    return (
        //     <div className={cx('list-wrapper')}>
        //         {videos.map((vd, index) => (
        //             <Video
        //                 videoID={vd.id}
        //                 key={index}
        //                 nickname={vd.user.nickname}
        //                 avatar={vd.user.avatar}
        //                 firstname={vd.user.first_name}
        //                 lastname={vd.user.last_name}
        //                 description={vd.description}
        //                 music={vd.music}
        //                 video={vd.file_url}
        //                 thumb={vd.thumb_url}
        //                 likeCount={vd.likes_count}
        //                 cmtCount={vd.comments_count}
        //                 shareCount={vd.shares_count}
        //                 likesCount={vd.user.likes_count}
        //                 bio={vd.user.bio}
        //                 followersCount={vd.user.followers_count}
        //                 tick={vd.user.tick}
        //                 isFollow={vd.user.is_followed}
        //                 videos={videos}
        //                 btnClick={handleUser}
        //                 hanleForm={props.hanleForm}
        //                 rootElemet={rootElemet}
        //                 isPlay={isPlaying}
        //                 handPlaying={handPlaying}
        //                 stateCurent={curentUser}
        //                 setList={setListPlay}
        //                 darkMode={props.darkMode}
        //                 ListPlay={ListPlay}
        //             />
        //         ))}
        //     </div>
        // )

        <h1>Hello</h1>
    )
}

export default Following
