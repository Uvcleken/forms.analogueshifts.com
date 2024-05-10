import AuthenticationLayout from "@/components/layouts/authentication";
import RegisterForm from "./components/register-form";

function Page() {
  return (
    <AuthenticationLayout>
      <RegisterForm />
    </AuthenticationLayout>
  );
}

export default Page;
