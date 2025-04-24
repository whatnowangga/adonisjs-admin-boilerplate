import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import WebLogout from '#actions/auth/web_logout'

export default class LogoutsController {
    @inject()
    async handle({ response }: HttpContext, webLogout: WebLogout) {
        await webLogout.handle()

        return response.redirect().toRoute('login.show')
    }
}