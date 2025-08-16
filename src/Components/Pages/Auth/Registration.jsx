import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from './../../Provider/AuthProvider';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import UseAxisosPublic from '../../hooks/UseAxisosPublic';

const Registration = () => {
    let { googleSignIn, createUser, updateUserProfile } = useContext(AuthContext)
    let navigate = useNavigate();
    let axiosPublic = UseAxisosPublic();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                updateUserProfile(data.name)
                    .then(() => {
                        reset();
                        axiosPublic.post('/users', {
                            name: data.name,
                            email: data.email,
                        })
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "You SignUp SuccessFully..!",
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })

            })

    }

    let handleGoogleSingIn = () => {
        googleSignIn()
            .then(res => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                    .then(res => {
                        console.log(res);
                    })
                navigate('/')
            })
    }

    return (
        <div className="">
            <div className="md:w-1/2 mx-auto p-8">
                <h2 className="text-2xl border-b pb-2 border-black font-semibold text-gray-700 text-center mb-6">
                    Registration
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            id="email"
                            className="input input-bordered w-full"
                            placeholder="Type here"
                        />
                        {errors.name?.type === "required" && (
                            <p role="alert" className='text-red-500'>Name is required</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            id="email"
                            className="input input-bordered w-full"
                            placeholder="Type here"
                        />
                        {errors.email?.type === "required" && (
                            <p role="alert" className='text-red-500'>Email is required</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            id="password"
                            className="input input-bordered w-full"
                            placeholder="Type here"
                        />
                        {errors.password?.type === "required" && (
                            <p role="alert" className='text-red-500'>Pass is required</p>
                        )}
                    </div>
                    {/* Sign In Button */}
                    <button className="btn bg-green-400 text-white font-[400] w-full">Register</button>
                </form>

                {/* Links */}
                <p className="text-sm text-center mt-4">
                    Already register?{" "}
                    <Link to='/login' className="text-primary font-medium">
                        Go to Login
                    </Link>
                </p>
                <div className="divider">Or sign in with</div>
                {/* Social Icons */}
                <div className="flex justify-center gap-4">
                    <button onClick={handleGoogleSingIn} className="btn w-full btn-outline">
                        <FaGoogle></FaGoogle>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Registration;