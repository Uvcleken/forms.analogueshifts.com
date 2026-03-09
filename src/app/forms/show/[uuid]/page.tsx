import ShowForm from "./components/show-form";
import GuestLayout from "@/components/layouts/guest";
import { getForm } from "@/utils/show-form/get-form";

async function Page({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;
  const form = await getForm(uuid);

  return (
    <GuestLayout>
      <ShowForm vet={form} formUUID={uuid} />
    </GuestLayout>
  );
}

export default Page;
