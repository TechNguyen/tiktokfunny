import * as instance from '~/utils/httPsresquest'
export const suggest = async () => {
    try {
        const res = await instance.get(`/users/suggested`, {
            params: {
                page: 1,
                per_page: 12,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}
