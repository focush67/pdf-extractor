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
    const response = await axios.post("api/register", {
      body: values,
    });

    if (response.data.status === 200) {
      toast.success("User successfully registered, proceed to login");
      form.reset();
    } else if (response.data.status === 302) {
      toast.error("Please try again");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-300 w-fit justify-center p-4 m-auto mt-[8%] rounded-lg">
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
                  <FormLabel>Re-Enter your password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Re-Enter your password"
                      type="password"
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
              Sign up
            </Button>
          )}
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>

        <p className="text-center text-sm text-gray-600 mt-2">
          If you don&apos;t have an account, please&nbsp;
          <Link className="text-blue-500 hover:underline" to="/login">
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default RegisterForm;
