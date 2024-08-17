import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

import { login_user } from '@/apis/auth.api'

const LoginPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handle_login = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await login_user(input)
            if (data.success) {
                toast.success(data.message);
                setInput({
                    email: "",
                    password: ""
                });
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex items-center w-screen h-screen justify-center'>
            <form
                onSubmit={handle_login}
                className='shadow-lg flex flex-col gap-5 p-8'
            >
                <div className='my-4'>
                    <h1 className='text-center font-bold text-xl'>LOGO</h1>
                    <p className='text-sm text-center'>Login to see photos & videos from your friends</p>
                </div>

                <div>
                    <span className='font-medium'>Email</span>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                    />
                </div>
                <div>
                    <span className='font-medium'>Password</span>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                    />
                </div>
                {
                    loading ? (
                        <Button>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type='submit'>Login</Button>
                    )
                }
                <span className='text-center'>Dosent have an account? <Link to="/register" className='text-blue-600'>Signup</Link></span>
            </form>
        </div>
    )
}

export default LoginPage