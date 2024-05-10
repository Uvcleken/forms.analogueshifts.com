import AuthenticationLayout from "@/components/layouts/authentication";
import LoginForm from "./components/login-form";

function Page() {
  return (
    <AuthenticationLayout>
      <LoginForm />
    </AuthenticationLayout>
  );
}

export default Page;
