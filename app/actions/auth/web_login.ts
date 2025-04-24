import UserAdmin from '#models/users_admin'
import { loginValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import limiter from '@adonisjs/limiter/services/main'
import { Infer } from '@vinejs/vine/types'

type Params = {
    data: Infer<typeof loginValidator>
}

@inject()
export default class WebLogin {
    constructor(protected ctx: HttpContext) { }

    get limit() {
        return limiter.use({
            requests: 3,
            duration: '3 hours',
            blockDuration: '24 hours',
        })
    }

    async handle({ data }: Params) {
        const key = this.getRateKey(data.email)

        const [error, user] = await this.limit.penalize(key, () => {
            console.log(data)
            return UserAdmin.verifyCredentials(data.email, data.password)
        })

        if (error) {
            this.ctx.session.flashAll()
            this.ctx.session.flashErrors({
                E_TOO_MANY_REQUESTS: 'Too many login attempts, please try again later',
            })
            return null
        }

        await this.ctx.auth.use('web').login(user, data.remember)

        return user
    }

    getRateKey(email: string) {
        return `login_${this.ctx.request.ip()}_${email}`
    }

    async clearRateLimits(email: string) {
        return this.limit.delete(this.getRateKey(email))
    }
}