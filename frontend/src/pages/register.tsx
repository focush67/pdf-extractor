import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RegisterFormType, registerSchema } from "@/validations/register";
import axios from "axios";
import toast from "react-hot-toast";
import { useToken } from "@/custom-hooks/useToken";
import { Loader } from "lucide-react";

const RegisterForm = () => {
  useToken();
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormType) => {
    try {
      const response = await axios.post("/api/register", values);
      if (response.data.status === 200) {
        toast.success("User successfully registered, proceed to login");
        form.reset();
      } else if (response.data.status === 302) {
        toast.error("Please try again");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
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
                    <Input placeholder="johndoe" {...field} />
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
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-enter your password"
                      {...field}
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
                "Sign up"
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
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
