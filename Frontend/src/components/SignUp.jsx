import React, {useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import Logo from './utils/Logo'
import Button from './Button'
import Input from './Input'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import axios from 'axios'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await axios({
                method: 'POST',
                url:'http://localhost:8000/api/v1/users/register',
                data:{
                    'username': data.username,
                    'fullName': data.fullName,
                    'email': data.email,
                    'avatar': data.avatar[0],
                    'coverImage': data.coverImage[0],
                    'password': data.password,
                },
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (userData) {
               
                dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form id='myform' onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="user Name: "
                        placeholder="Enter your username"
                        {...register("username", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("fullName", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        type='file'
                        label="avatar: "
                        placeholder="avatar"
                        {...register("avatar", {
                            required: true,
                        })}
                        />
                        <Input
                        type='file'
                        label="coverImage: "
                        placeholder="coverImage"
                        {...register("coverImage", {
                            required: true,
                        })}
                        />

                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup