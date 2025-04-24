import { BaseModelDto } from '@adocasts.com/dto/base'
import UsersAdmin from '#models/users_admin'

export default class UsersAdminDto extends BaseModelDto {
  // declare static table = users_admin: string
  declare id: number
  declare fullName: string | null
  declare email: string
  declare password: string
  declare createdAt: string
  declare updatedAt: string | null

  constructor(usersAdmin?: UsersAdmin) {
    super()

    if (!usersAdmin) return
    // this.static table = users_admin = usersAdmin.static table = users_admin
    this.id = usersAdmin.id
    this.fullName = usersAdmin.fullName
    this.email = usersAdmin.email
    this.password = usersAdmin.password
    this.createdAt = usersAdmin.createdAt.toISO()!
    this.updatedAt = usersAdmin.updatedAt?.toISO()!
  }
}