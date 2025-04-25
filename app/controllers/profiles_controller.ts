import AdminChangePassword from '#actions/admin/change_password'
import { changePasswordValidator } from '#validators/profile'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {

    async myAccount({ inertia }: HttpContext) {
        return inertia.render('profile/settings')
    }

    @inject()
    async changeMyPassword({ request, response, auth, session }: HttpContext, changePassword: AdminChangePassword) {

        // console.log(auth.user)
        const data = await request.validateUsing(changePasswordValidator)
        console.log(data)
        await auth.authenticate()
        const user = await changePassword.handle({ data, auth })
        console.log("useruser", user)
        if (!user) {
            return response.redirect().back()
        }
        session.flash('success', 'Password updated')
        return response.redirect().toRoute('user.myaccount')

    }
}