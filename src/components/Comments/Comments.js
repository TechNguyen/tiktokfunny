import classNames from 'classnames/bind'
import Styles from './Comments.module.scss'
import { getDatabase, ref, set } from 'firebase/database'
import { useState } from 'react'
import { getAuth } from 'firebase/auth'
const cx = classNames.bind(Styles)
function Comments() {
    const [comment, setComment] = useState('')
    const auth = getAuth()
    const handleWriteComment = async () => {
        const db = getDatabase()
        console.log(auth)
        set(ref(db, 'comments'), {
            userID: auth.currentUser.uid,
            title: comment,
        })
            .then(() => {
                alert('success')
            })
            .catch(() => {
                alert('error')
            })
    }
    return (
        <div>
            <input
                type="text"
                onChange={(e) => {
                    setComment(e.target.value)
                }}
                value={comment}
            />
            <button onClick={handleWriteComment}>ADD COMMENTS</button>
        </div>
    )
}
export default Comments
