import GuestLayout from "@/components/layouts/guest";
import ShowResult from "./components/show-result";

async function Page({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;
  return (
    <GuestLayout>
      <ShowResult resultUUID={uuid} />
    </GuestLayout>
  );
}

export default Page;
