"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function VerifyEmailMessage() {

    const router = useRouter();
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-800]">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <a className="text-2xl mb-6 flex items-center" href="#">
            <span>Verify Your Email</span>
          </a>
          <p className="text-center mb-6">You will need to verify your email to complete the registration</p>
          <img
            alt="Verify Email Illustration"
            className="mb-6"
            height="200"
            src="/assets/mailbox.png"
            style={{
              aspectRatio: "200/200",
              objectFit: "cover",
            }}
            width="200"
          />
          <p className="text-center mb-6">
            An email has been sent to your registerd email with a link to verify your account.
          </p>
          <div className="flex space-x-4">
            
            <Button className="bg-indigo-600 text-white"
            onClick={
                () => router.push("/sign-in") }>
                    Go to Login</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
    

