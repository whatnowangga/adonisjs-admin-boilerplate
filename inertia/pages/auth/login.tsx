import { Head, useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import IconLockDots from '~/components/Icon/IconLockDots'
import IconMail from '~/components/Icon/IconMail'
import IconX from '~/components/Icon/IconX'

type formErrors = Partial<Record<'email' | 'password' | 'remember', string>> & {
    E_INVALID_CREDENTIALS?: string,
    E_TOO_MANY_REQUESTS?: string
}

export default function Login({ errors }: { errors?: formErrors }) {

    const { data, setData, post, processing, errors: formErrors } = useForm({
        email: '',
        password: '',
        remember: false,
    })
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post("/login")
    }

    return (
        <>
            <Head title="Login" />
            <div>
                <div className="absolute inset-0">
                    <img src="/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
                </div>
                <div className="relative flex min-h-screen items-center justify-center bg-[url(/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                    <img src="/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                    <img src="/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                    <img src="/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                    <img src="/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                    <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                        <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                            <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                            <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">

                                <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                    <img src="/images/auth/login.svg" alt="Cover Image" className="w-full" />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                            <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                                <a href="/" className="w-8 block lg:hidden">
                                    <img src="https://react.vristo.sbthemes.com/assets/images/logo.svg" alt="Logo" className="mx-auto w-10" />
                                </a>
                            </div>
                            <div className="w-full max-w-[440px] lg:mt-16">
                                <div className="mb-10">
                                    <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                    <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                                </div>

                                <form className="space-y-5 dark:text-white" onSubmit={handleSubmit}>
                                    {errors?.E_INVALID_CREDENTIALS && (
                                        <div className="flex items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light justify-between">
                                            <span className="ltr:pr-2 rtl:pl-2">
                                                <strong className="ltr:mr-1 rtl:ml-1">Error!</strong> {errors?.E_INVALID_CREDENTIALS}
                                            </span>
                                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                                <IconX className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                    {errors?.E_TOO_MANY_REQUESTS && (
                                        <div className="flex items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light justify-between">
                                            <span className="ltr:pr-2 rtl:pl-2">
                                                <strong className="ltr:mr-1 rtl:ml-1">Error!</strong> {errors?.E_TOO_MANY_REQUESTS}
                                            </span>
                                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                                <IconX className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}


                                    <div>
                                        <label htmlFor="Email">Email</label>
                                        <div className="relative text-white-dark">
                                            <input id="Email" type="email" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <IconMail fill={true} />
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="Password">Password</label>
                                        <div className="relative text-white-dark">
                                            <input id="Password" type="password" placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" onChange={(e) => setData('password', e.target.value)} />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <IconLockDots fill={true} />
                                            </span>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]" disabled={processing}>
                                        {processing ? (
                                            <span className="animate-ping w-3 h-3 ltr:mr-4 rtl:ml-4 inline-block rounded-full bg-white"></span>

                                        ) : "Sign in"}
                                    </button>
                                </form>
                            </div>
                            <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}