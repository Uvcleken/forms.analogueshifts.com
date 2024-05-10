import CreateForm from "./components/create-form";
import AuthenticatedLayout from "@/components/layouts/authenticated";

export default function Page() {
  return (
    <AuthenticatedLayout>
      <CreateForm />
    </AuthenticatedLayout>
  );
}
