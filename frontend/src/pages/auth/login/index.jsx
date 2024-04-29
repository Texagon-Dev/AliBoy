
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import supabase from "@/lib/supabase";

const SignIn = () => {

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLogin = async (e) => {} //Login

return <div className="grid h-screen grid-cols-2">
    {/* LEFT IMAGE SECTION */}
    <section className="relative hidden px-12 md:grid bg-primary size-full place-content-center">
      <h2 className="absolute text-6xl text-white arvo-bold top-5 left-5">LOGO</h2>
      <img
        width={612}
        height={612}
        src="/src/assets/images/login.png" alt="signup" className="object-contain m-auto "
      />
    </section>
    {/* RIGHT FORM SECTION */}
    <section className="container flex flex-col items-start col-span-2 text-left size-full md:col-span-1 ">

      <Form>
        <form className="w-full max-w-lg mx-auto my-12 md:my-auto " >
          <div className="mb-8 space-y-4 leading-relaxed">
            <h1 className="text-4xl arvo-bold">Account Login</h1>
            <p className="text-xl text-muted">
              If you are already a member you can login with your email address and password.
            </p>
          </div>
          <div className="my-6">
            <Label className="arvo-bold" htmlFor="email">Email address</Label>
            <Input type="email" placeholder="user@email.com" id="email" className="p-2 border rounded-full" />
          </div>
          <div className="my-6">
            <Label className="arvo-bold" htmlFor="password">Password</Label>
            <Input type="password" placeholder="Pa$$word" id="password" className="p-2 border rounded-full" />
          </div>

          <div className="flex items-center my-6 space-x-2">
            <Checkbox />
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </Label>
          </div>

          <Button className="w-full rounded-full">Login</Button>

          <p className="my-6 text-center text-muted">
            Already have an account ? <Link to="/signup" className="text-primary">Sign Up here</Link>
          </p>
        </form>
      </Form>
    </section>
  </div>
};
export default SignIn;
