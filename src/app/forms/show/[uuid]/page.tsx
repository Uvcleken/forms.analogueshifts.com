import ShowForm from "./components/show-form";
import GuestLayout from "@/components/layouts/guest";

function Page({ params }: any) {
  return (
    <GuestLayout>
      <ShowForm formUUID={params.uuid} />
    </GuestLayout>
  );
}

export default Page;
