import FormContent from "./components/form-content";
import AuthenticatedLayout from "@/components/layouts/authenticated";

export default async function Page({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  return (
    <AuthenticatedLayout>
      <FormContent uuid={uuid} />
    </AuthenticatedLayout>
  );
}
