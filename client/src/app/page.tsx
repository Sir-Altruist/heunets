"use client"

import Image from "next/image";
import Logo from "@/assets/images/logo.jpg"
import { Button, InputField } from "@/components/shared";
import { useState, useContext } from "react";
import validations from "@/validations";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/auth";
import { AuthServices } from "@/services";
import { Alert } from "@/components/helpers";


export default function Home() {
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertStatus, setAlertStatus] = useState<any>("")
  const [alertTrigger, setAlertTrigger] = useState(false)
  const { updateLoginData, loginData: { email, password} } = useContext(AuthContext)

  const router = useRouter()
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const handlers = {
    onChange({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
      const { name, value } = target
      updateLoginData((prev: any) => ({
        ...prev,
        [name]: value
      }))
    },

    async handleSubmit(e: React.FormEvent){
      e.preventDefault()
      setErrors({});
      try {
        await validations.login({
          email,
          password
        });

        setLoading(true)
        const response: any = await AuthServices.login({ email, password})
        if(response.status === "success"){
          localStorage.setItem("access_token", response.details.token)
          setAlertTrigger(true)
          setAlertStatus("success")
          setAlertMessage(response.message)
          router.push("/dashboard/tickets")
          setTimeout(() => setAlertTrigger(false), 3000)
        } else {
          setAlertTrigger(true)
          setAlertStatus("error")
          setAlertMessage(response.message)
          setTimeout(() => setAlertTrigger(false), 3000)
        }
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const validationErrors: {
            email?: string,
            password?: string
          } = {};
          error.inner.forEach((err) => {
            if (err.path) {
              validationErrors[err.path as keyof typeof validationErrors] = err.message;
            }
          });
          setErrors(validationErrors)
        }
      } finally {
        setLoading(false)
      }
    }
  }


  return (
    <div className="w-full min-h-screen bg-[#EFF5FF] py-[200px]">
      {/* Card */}
      <div className="bg-[#fff] w-[500px] mx-auto py-10 px-8 rounded-[10px]">
        
        {/* Logo */}
        <div className="w-full flex  flex-col gap-4 justify-center items-center">
          <Image src={Logo} alt="logo" className="size-10" />
          <div className="flex flex-col justfiy-center items-center">
            <h1 className="text-[24px] text-[#1E293B] font-bold">Work Item Tracker</h1>
            <span className="text-[#64748b] text-center">Enter your credentials to access your account</span>
          </div>
        </div>

        {/* Form */}
        <form 
        className="mt-8 flex flex-col gap-4" 
        onSubmit={e => handlers.handleSubmit(e)}
        >
          <InputField
          label="Email"
          placeholder="Please enter your email address"
          inputType="email"
          name="email"
          handlers={handlers}
          error={errors.email as string}
          value={email}
          />

          <InputField
          label="Password"
          placeholder="Please enter your passowrd"
          inputType="password"
          name="password"
          handlers={handlers}
          error={errors.password as string}
          value={password}
          />
          <div className="mt-5">
            <Button 
            size="full" 
            text={loading ? "Loading..." : "Login"}
            type="submit"
            />
          </div>
        </form>
      </div>
      {alertTrigger && <Alert 
      message={alertMessage} 
      type={alertStatus} 
      onClose={() => setAlertTrigger(false)} 
      isVisible={alertTrigger}
      />}
    </div>
  );
}
