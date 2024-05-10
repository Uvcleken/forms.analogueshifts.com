import FormContent from "./components/form-content";
import AuthenticatedLayout from "@/components/layouts/authenticated";

export default function Page({ params }: any) {
  return (
    <AuthenticatedLayout>
      <FormContent uuid={params.uuid} />
    </AuthenticatedLayout>
  );
}
