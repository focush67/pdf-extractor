import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, LoginFormType } from "@/validations/login";
import axios from "axios";
import { useToken } from "@/custom-hooks/useToken";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const LoginForm = () => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  useToken();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormType) => {
    try {
      const response = await axios.post("api/login", values);
      if (response.data.status === 200) {
        toast.success("Login Successful");
        setStatus(true);
        navigate("/dashboard");
      } else {
        toast.error("Invalid Credentials");
        form.reset();
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  if (status) {
    navigate("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <div className="bg-gray-300 rounded-lg p-6 w-80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader className="animate-spin w-5 h-5 mr-2" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <div className="flex items-center justify-center mt-6">
          <div className="h-px bg-gray-500 w-20" />
          <span className="mx-4 text-gray-600">or</span>
          <div className="h-px bg-gray-500 w-20" />
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/register">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
