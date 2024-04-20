"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import router, { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import {useState} from "react";

export default function VerifyEmail() {

    const router = useRouter();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    const verifyUserEmail = async () => {
        try {
            const response = await fetch("/api/users/verifyemail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            });
            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                setVerified(true);
                setError("");
            }
        } catch (error:any) {
            setError(error.message);
        }
    }

    useEffect(() => {
        setError("")
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[]);

    useEffect(() => {
        setError("")
        if (token.length > 0) {
            verifyUserEmail();
        }
    }
    ,[token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Card className="w-96">
                <CardHeader className="text-center">Email Verification</CardHeader>
                <CardContent>
                    {verified ? (
                        <div className="text-center">
                            <h1 className="text-lg font-bold">Email Verified</h1>
                            <p className="text-sm text-gray-600">Your email has been verified successfully.</p>
                            <Button onClick={() => router.push("/sign-in")} className="mt-4">Login</Button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h1 className="text-lg font-bold">Verifying Email</h1>
                            <p className="text-sm text-gray-600">Please wait while we verify your email.</p>
                        </div>
                    )}
                    {error && (
                        <div className="text-center mt-4">
                            <p className="text-sm text-red-500">{error}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

