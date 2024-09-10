import ShowForm from "./components/show-form";
import GuestLayout from "@/components/layouts/guest";
import { getForm } from "@/utils/show-form/get-form";

async function Page({ params }: any) {
  const form = await getForm(params.uuid);

  if (form) {
    console.log(form);
  }

  return (
    <GuestLayout>
      <ShowForm vet={form} formUUID={params.uuid} />
    </GuestLayout>
  );
}

export default Page;
