"use client";
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Form.module.css';
import Image from 'next/image';
import { HiAtSymbol } from "react-icons/hi";
import { FaRegKeyboard } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import Layout from '@/layout/layout';
import { signIn , useSession} from 'next-auth/react';
import login_validate from '@/lib/validate'; // Import the validation function
import { useRouter } from 'next/navigation';

// Define the SignInPage component
const SignInPage = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const session = useSession();

    // Google Sign-In Handler function
    const handleGoogleSignIn = async () => {
        await signIn('google', { callbackUrl: '/' });
    };

    // useEffect(() => {
    //     // Check session status and redirect if authenticated
    //     if (session?.status === 'authenticated') {
    //         router.replace('/dashboard');
    //     }
    // },[] );

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Handle submit called")
    // e.preventDefault();

    //     // Validate email and password
    //     const validationErrors = login_validate({
    //         email, 
    //         password,
    //         // Add username as an empty string for login validation
    //         username: ''
    //     });

    //     // Check if there are validation errors
    //     if (Object.keys(validationErrors).length > 0) {
    //         // If there are validation errors, set the errors state accordingly
    //         setErrors(validationErrors);
    //         return; // Exit the function early
    //     }

    //     // If there are no validation errors, proceed with sign-in
    //     try {
    //         setLoading(true); // Set loading state to true while signing in
    //         // Perform sign-in
    //         await signIn('credentials', {
    //             email,
    //             password,
    //             redirect: false // Redirect to dashboard if login successful
    //         });
    //     } catch (error) {
    //         console.error('Sign-in error:', error);
    //         setErrors({ 'email': 'Error occurred while signing in' });
    //     } finally {
    //         setLoading(false); // Reset loading state after sign-in attempt
    //     }
};


    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                {/* Title */}
                <div className='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
                    <p className='w-3/4 mx-auto text-gray-400'>Welcome Back</p>
                </div>
                {/* Form */}
                <form className='flex flex-col gap-5 ' onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className={styles.input_group}>
                        <input
                            type='email'
                            placeholder='Email'
                            name='email'
                            className={styles.input_text}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className='icon flex items-center px-4'>
                            <HiAtSymbol size={25} />
                        </span>
                    </div>
                    {errors.email && <span className='text-rose-500'>{errors.email}</span>}
                    {/* Password Input */}
                    <div className={styles.input_group}>
                        <input
                            type={`${show ? "text" : "password"}`}
                            placeholder='Password'
                            name='password'
                            className={styles.input_text}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                            <FaRegKeyboard size={25} />
                        </span>
                    </div>
                    {errors.password && <span className='text-rose-500'>{errors.password}</span>}
                    {/* Login Button */}
                    <div className='input-button'>
                        <Button variant="login" size="full" type="submit">
                            Login
                        </Button>
                    </div>
                    {/* Google Sign-In Button */}
                    <div className='input-button'>
                        <Button variant="auth_btn" size="full" onClick={handleGoogleSignIn}>
                            Sign in with Google
                            <Image src='/assets/google.svg' height="20" width="20" alt='google' />
                        </Button>
                    </div>
                </form>
                {/* Bottom */}
                <p className='text-center text-gray-400 '>
                    Don't have an account yet? <Link href='/sign-up'><span className='text-blue-700'>Sign Up</span></Link>
                </p>
            </section>
        </Layout>
    );
};

export default SignInPage;
