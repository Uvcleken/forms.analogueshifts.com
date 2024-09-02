import GuestLayout from "@/components/layouts/guest";
import ShowResult from "./components/show-result";

function Page({ params }: any) {
  return (
    <GuestLayout>
      <ShowResult resultUUID={params.uuid} />
    </GuestLayout>
  );
}

export default Page;
