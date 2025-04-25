import { Head, useForm, } from '@inertiajs/react'
import { FormEvent, useState } from 'react';
import IconHome from '~/components/Icon/IconHome';
import IconUser from '~/components/Icon/IconUser';
import IconX from '~/components/Icon/IconX';
import DefaultLayout from '~/components/Layouts/DefaultLayout'


type FormErrors = Partial<
    Record<'currentPassword' | 'password' | 'password_confirmation', string>
> & {
    E_INVALID_CREDENTIALS?: string
}

type Props = {
    errors?: FormErrors
    messages?: Record<string, string>
}
export default function Page({ errors, messages }: Props) {

    const [tabs, setTabs] = useState<string>('general');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    const { data, setData, post, processing, } = useForm({
        currentPassword: '',
        password: '',
        password_confirmation: '',
    })


    const handleChangePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post("/my-account/change-password")
    }

    return (
        <>
            <Head title="User Setting" />

            <DefaultLayout >
                <div>
                    <ul className="flex space-x-2 rtl:space-x-reverse">
                        <li>
                            <a href="#" className="text-primary hover:underline">
                                Users
                            </a>
                        </li>
                        <li className="before:content-['/'] before:mr-2">
                            <span>Account Settings</span>
                        </li>
                    </ul>
                    <div className="pt-5">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Settings</h5>
                        </div>
                        <div>
                            <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                                <li className="inline-block">
                                    <button
                                        onClick={() => toggleTabs('general')}
                                        className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'general' ? '!border-primary text-primary' : ''}`}
                                    >
                                        <IconHome />
                                        General
                                    </button>
                                </li>
                                <li className="inline-block">
                                    <button
                                        onClick={() => toggleTabs('security')}
                                        className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'security' ? '!border-primary text-primary' : ''}`}
                                    >
                                        <IconUser className="w-5 h-5" />
                                        Security
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {tabs === 'general' ? (
                            <div>
                                <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black">
                                    <h6 className="text-lg font-bold mb-5">General content here</h6>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {/* // content here */}
                                    </div>
                                </form>
                            </div>
                        ) : (
                            ''
                        )}
                        {tabs === 'security' ? (
                            <div>
                                <div className="grid grid-cols-1 gap-5">
                                    <div className="panel">
                                        <div className="mb-5">
                                            <h5 className="font-semibold text-lg mb-4">Change Password</h5>
                                        </div>
                                        <div className="mb-5">
                                            <form onSubmit={handleChangePasswordSubmit}>
                                                {messages?.success && (

                                                    <div className="flex items-center p-3.5 rounded text-success bg-success-light dark:bg-success-dark-light">
                                                        <span className="pr-2 ">
                                                            {messages?.success}
                                                        </span>
                                                        <button type="button" className="ml-auto  hover:opacity-80">
                                                            <IconX className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                )}
                                                {errors?.E_INVALID_CREDENTIALS && (
                                                    <div className="flex items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light justify-between">
                                                        <span className="pr-2 ">
                                                            <strong className="mr-1">Error!</strong> {errors?.E_INVALID_CREDENTIALS}
                                                        </span>
                                                        <button type="button" className="ml-auto  hover:opacity-80">
                                                            <IconX className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                )}
                                                {errors?.password && (
                                                    <div className="flex items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light justify-between">
                                                        <span className="pr-2">
                                                            <strong className="mr-1 ">Error!</strong> {errors?.password}
                                                        </span>
                                                        <button type="button" className="ml-auto hover:opacity-80">
                                                            <IconX className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                )}

                                                <div className="mb-5">
                                                    <div>
                                                        <label htmlFor="currentPassword">Current Password</label>
                                                        <input id="currentPassword" type="password" className="form-input" onChange={(e) => setData('currentPassword', e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="newPassword">New Password</label>
                                                    <input id="newPassword" type="password" className="form-input" onChange={(e) => setData('password', e.target.value)} />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="verifyNewPassword">Verify new Password</label>
                                                    <input id="verifyNewPassword" type="password" className="form-input" onChange={(e) => setData('password_confirmation', e.target.value)} />
                                                </div>
                                                <button type="submit" className="btn btn-primary">

                                                    {processing ? (
                                                        <span className="animate-ping w-3 h-3 ltr:mr-4 rtl:ml-4 inline-block rounded-full bg-white"></span>

                                                    ) : " Change my password"}

                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>

            </DefaultLayout>
        </>
    )
}