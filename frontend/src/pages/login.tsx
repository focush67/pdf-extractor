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
      password: "******",
    },
  });

  const onSubmit = async (values: LoginFormType) => {
    const response = await axios.post("api/login", {
      body: values,
    });
    if (response.data.status === 200) {
      toast.success("Login Successsfull");
      setStatus(true);
      navigate("/dashboard");
    } else {
      toast.error("Invalid Credentials");
      form.reset();
    }
  };

  if (status) {
    navigate("/dashboard");
  }

  return (
    <div className="flex flex-col items-center bg-gray-300 w-fit justify-center p-4 m-auto mt-[10%] rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-fit">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
          </div>
          {form.formState.isSubmitting ? (
            <Button className="w-full mt-6" disabled>
              <Loader className="animate-spin w-full" />
            </Button>
          ) : (
            <Button className="w-full mt-6" type="submit">
              Login
            </Button>
          )}
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>

        <p className="text-center text-sm text-gray-600 mt-2">
          If you don&apos;t have an account, please&nbsp;
          <Link className="text-blue-500 hover:underline" to="/register">
            Sign up
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default LoginForm;
