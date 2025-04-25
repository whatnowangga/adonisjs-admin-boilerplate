import vine from '@vinejs/vine'

export const changePasswordValidator = vine.compile(
    vine.object({
        currentPassword: vine.string(),
        password: vine.string().confirmed()
    })
)