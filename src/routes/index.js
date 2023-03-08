import Home from '~/pages/Home/Home'
import Following from '~/pages/Following/index'
import Profile from '~/pages/Profile/index'
import Upload from '~/pages/Upload/index'
import Live from '~/pages/Live/index'
import { OnlyHeader } from '~/components/Layout'
import config from '~/config/config'
const publicRoutes = [
    { path: config.routers.home, component: Home },
    { path: config.routers.following, component: Following },
    { path: config.routers.profile, component: Profile },
    { path: config.routers.upload, component: Upload, layout: OnlyHeader },
    { path: config.routers.live, component: Live },
]
const privateRoutes = []

export { publicRoutes, privateRoutes }
