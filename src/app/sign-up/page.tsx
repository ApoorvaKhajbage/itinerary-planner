"use client"
import { useState } from 'react';
import Layout from '@/layout/layout';
import Link from 'next/link';
import Head from 'next/head';
import { FaArrowLeft, FaRegKeyboard } from "react-icons/fa6";
import { HiAtSymbol, HiOutlineUser } from "react-icons/hi";
import { Button } from '@/components/ui/button';
import styles from '@/styles/Form.module.css';
import { registerValidate } from '@/lib/validate';
import { useRouter } from 'next/navigation';
import {toast} from 'react-hot-toast';

const SignUpPage = () => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const cpassword = e.target.cpassword.value;

        const validationErrors = registerValidate({ username, email, password, cpassword });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
        
            if (res.status === 400) {
                const data = await res.json();
                setErrors({ ...errors, message: data.message || "This email is already registered" });
            } else if (res.status === 200) {
                setErrors({ ...errors, message: "" });
                // Redirect or show success message
                toast.success("Signed up successfully");
                console.log("Signed up successfully");
                router.push("/verifymessage");
            } else {
                setErrors({ ...errors, message: "Error occurred while signing up" });
            }
        } catch (error) {
            setErrors({ ...errors, message: "Error occurred while signing up" });
            console.error("API error:", error);
        }
        


        setLoading(false);
    };

    return (
        <Layout>
            <Head>
                <title>Sign Up</title>
            </Head>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="flex justify-end">
                <Link href="/" >
                    <FaArrowLeft className="text-black text-xl cursor-pointer" />
                </Link>
            </div>
            
                <div className='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
                    <p className='w-3/4 mx-auto text-gray-400'>Let's start the journey</p>
                </div>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className={styles.input_group}>
                        <input 
                            type='text' 
                            placeholder='Username' 
                            name='username' 
                            className={styles.input_text}
                            required
                        />
                        <span className='icon flex items-center px-4'>
                            <HiOutlineUser size={25} />
                        </span>
                    </div>
                    {errors.username && <span className='text-rose-500'>{errors.username}</span>}
                    <div className={styles.input_group}>
                        <input 
                            type='text' 
                            placeholder='Email' 
                            name='email' 
                            className={styles.input_text}
                            required
                        />
                        <span className='icon flex items-center px-4'>
                            <HiAtSymbol size={25} />
                        </span>
                    </div>
                    {errors.email && <span className='text-rose-500'>{errors.email}</span>}
                    <div className={styles.input_group}>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            name='password' 
                            className={styles.input_text} 
                            required
                        />
                        <span className='icon flex items-center px-4'>
                            <FaRegKeyboard size={25} />
                        </span>
                    </div>
                    {errors.password && <span className='text-rose-500'>{errors.password}</span>}
                    <div className={styles.input_group}>
                        <input 
                            type='password' 
                            placeholder='Confirm Password' 
                            name='cpassword' 
                            className={styles.input_text} 
                            required
                        />
                        <span className='icon flex items-center px-4'>
                            <FaRegKeyboard size={25} />
                        </span>
                    </div>
                    {errors.cpassword && <span className='text-rose-500'>{errors.cpassword}</span>}
                    {/* login buttons    */}
                    <div className='input-button'>
                        <Button 
                            variant="login" 
                            size="full" 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Sign Up"}
                        </Button>
                    </div>
                </form>
                {/* bottom */}
                <p className='text-center text-gray-400 '>
                    Already have an account?  <Link href='/sign-in'><span className='text-blue-700'>Sign In</span></Link>
                </p>
            </section>
        </Layout>
    );
};

export default SignUpPage;
