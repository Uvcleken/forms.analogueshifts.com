import ShowFormLayout from "@/components/layouts/show-form";
import ShowForm from "./components/show-form";

function Page({ params }: any) {
  return (
    <ShowFormLayout>
      <ShowForm formUUID={params.uuid} />
    </ShowFormLayout>
  );
}

export default Page;
