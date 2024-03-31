"use client"

import React, { useState } from 'react';
import Layout from '@/layout/layout';
import Link from 'next/link';
import Head from 'next/head';
import { FaRegKeyboard } from "react-icons/fa6";
import { HiAtSymbol } from "react-icons/hi";
import { Button } from '@/components/ui/button';
import styles from '@/styles/Form.module.css';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ message?: string }>({});


    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
    
        // Perform client-side validation
        if (!email.trim() || !password.trim()) {
            setErrors({ message: "Please fill in all fields." });
            setLoading(false);
            return;
        }
    
        try {
            const res = await fetch("/api/users/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                // Log the response from the server
                console.error("Sign-in error:", data);
                setErrors({ message: data.error || "Sign in failed." });
                setLoading(false);
                return;
            }
    
            // Redirect to dashboard or home page after successful sign-in
            router.push("/dashboard");
        } catch (error) {
            console.error("Sign-in error:", error);
            setErrors({ message: "An error occurred while signing in." });
            setLoading(false);
        }
    };
    

    return (
        <Layout>
            <Head>
                <title>Sign In</title>
            </Head>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div className='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'>Sign In</h1>
                </div>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className={styles.input_group}>
                        <input 
                            type='email' 
                            placeholder='Email' 
                            name='email' 
                            className={styles.input_text}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span className='icon flex items-center px-4'>
                            <HiAtSymbol size={25} />
                        </span>
                    </div>
                    <div className={styles.input_group}>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            name='password' 
                            className={styles.input_text} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className='icon flex items-center px-4'>
                            <FaRegKeyboard size={25} />
                        </span>
                    </div>
                    {errors && errors.message && <span className='text-red-500'>{errors.message}</span>}

                    <div className='input-button'>
                        <Button 
                            variant="login" 
                            size="full" 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Sign In"}
                        </Button>
                    </div>
                </form>
                <p className='text-center text-gray-400 '>
                    Don't have an account? <Link href='/sign-up'><span className='text-blue-700'>Sign Up</span></Link>
                </p>
            </section>
        </Layout>
    );
};

export default SignInPage;
