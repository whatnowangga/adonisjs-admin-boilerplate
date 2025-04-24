/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const DashboardController = () => import('#controllers/dashboard_controller')
const AuthLoginController = () => import('#controllers/auth/login_controller')
const AuthLogoutController = () => import('#controllers/auth/logouts_controller')

router.get('/login', [AuthLoginController, 'show']).as('login.show').use(middleware.guest())
router.post('/login', [AuthLoginController, 'handleLogin']).as('login.submit').use(middleware.guest())
router.post('/logout', [AuthLogoutController, 'handle']).as('logout').use(middleware.auth())

router.group(() => {

    router.get('/', [DashboardController, 'index']).as('dashboard')

}).use(middleware.auth())