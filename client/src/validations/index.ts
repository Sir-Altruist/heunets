import { ILogin } from "@/interfaces";
import * as yup from "yup";

const validations =  {
    async login(payload: ILogin) {
        const schema = yup.object({
        email: yup
            .string()
            .email("Please enter a valid email address")
            .required("Email is required"),
        password: yup
            .string()
            .min(8, "Password must be at least 8 characters long")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/\d/, "Password must contain at least one number")
            .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
            ),
        });
        return await schema.validate(payload, { abortEarly: false });
    },

    async ticket(payload: { title: string; description: string}) {
        const schema = yup.object({
        title: yup
            .string()
            .required("title is required"),
        description: yup
            .string()
            .required("description is required"),
        });
        return await schema.validate(payload, { abortEarly: false });
    }
}

export default validations;