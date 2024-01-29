import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
}

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const { showToast } = useAppContext()
  const { register, watch, handleSubmit, formState: {errors} } = useForm<RegisterFormData>()

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({message: "Registration Success!", type: "SUCCESS"})
      await queryClient.invalidateQueries("validateToken")
      navigate("/")
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: "ERROR"})
    }
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1 text-gray-700 text-sm font-bold">
          <label htmlFor="first-name">First name</label>
          <input
            {...register("firstName", { required: "This field is required"})}
            id="first-name"
            className="border rounded w-full py-1 px-2 font-normal"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </div>
        <div className="flex-1 text-gray-700 text-sm font-bold">
          <label htmlFor="last-name">Last name</label>
          <input
            {...register("lastName", { required: "This field is required"})}
            id="last-name"
            className="border rounded w-full py-1 px-2 font-normal"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </div>
      </div>
      <div className="flex-1 text-gray-700 text-sm font-bold">
        <label htmlFor="email">Email</label>
        <input
          {...register("email", { required: "This field is required"})}
          type="email"
          id="email"
          className="border rounded w-full py-1 px-2 font-normal"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex-1 text-gray-700 text-sm font-bold">
        <label htmlFor="password">Password</label>
        <input
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })}
          type="password"
          id="password"
          className="border rounded w-full py-1 px-2 font-normal"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <div className="flex-1 text-gray-700 text-sm font-bold">
        <label htmlFor="re-password">Confirm Password</label>
        <input
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (val) => {
              if (!val) {
                return "This field is required"
              } else if (watch("password") !== val) {
                return "Your passwords do no match"
              }
            }
          })}
          type="password"
          id="re-password"
          className="border rounded w-full py-1 px-2 font-normal"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500">
          Create Account
        </button>
      </div>
    </form>
  )
}

export default Register;