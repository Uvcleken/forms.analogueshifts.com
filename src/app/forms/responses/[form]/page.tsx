import FormResponses from "./components/form-responses";
import AuthenticatedLayout from "@/components/layouts/authenticated";

export default async function Page({
  params,
}: {
  params: Promise<{ form: string }>;
}) {
  const { form } = await params;
  return (
    <AuthenticatedLayout>
      <FormResponses formUUID={form} />
    </AuthenticatedLayout>
  );
}
