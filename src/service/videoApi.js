import * as instance from '~/utils/httPsresquest'
export const videoItem = async (type, page) => {
    try {
        const res = await instance.get(`/videos?type=${type}&page=${page}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
// https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=2
