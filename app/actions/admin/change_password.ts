import UserAdmin from "#models/users_admin"
import { changePasswordValidator } from "#validators/profile"
import { Authenticator } from "@adonisjs/auth"
import { Authenticators } from "@adonisjs/auth/types"
import { inject } from "@adonisjs/core"
import { HttpContext } from "@adonisjs/core/http"
import { Infer } from "@vinejs/vine/types"

type Params = {
  data: Infer<typeof changePasswordValidator>,
  auth: Authenticator<Authenticators>
}

@inject()
export default class AdminChangePassword {

  constructor(protected ctx: HttpContext) { }

  async handle({ data, auth }: Params) {
    const user = await UserAdmin.verifyCredentials(auth.user!.email, data.currentPassword)

    await user!.merge({ password: data.password }).save()

    return user
  }
}