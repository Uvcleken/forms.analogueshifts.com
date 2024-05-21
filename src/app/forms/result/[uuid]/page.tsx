import ShowFormLayout from "@/components/layouts/show-form";
import ShowResult from "./components/show-result";

function Page({ params }: any) {
  return (
    <ShowFormLayout>
      <ShowResult resultUUID={params.uuid} />
    </ShowFormLayout>
  );
}

export default Page;
