import FormResponses from "./components/form-responses";
import AuthenticatedLayout from "@/components/layouts/authenticated";

export default function Page({ params }: any) {
  return (
    <AuthenticatedLayout>
      <FormResponses formUUID={params.form} />
    </AuthenticatedLayout>
  );
}
