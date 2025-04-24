import UserAdmin from '#models/users_admin'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await UserAdmin.create({
      fullName: "Andrew Gryffin",
      email: "andrew.gryf.dev@gmail.com",
      password: "P@ssw0rd!"
    })
  }
}