import ResponseContent from "./components/response-content";
import AuthenticatedLayout from "@/components/layouts/authenticated";

export default function Page({ params }: any) {
  return (
    <AuthenticatedLayout>
      <ResponseContent uuid={params.response} />
    </AuthenticatedLayout>
  );
}
