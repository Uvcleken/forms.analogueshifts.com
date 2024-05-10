import FormsDashboard from "./components/home";
import AuthenticatedLayout from "@/components/layouts/authenticated";
import { Suspense } from "react";

function FormFallbackLoading() {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <AuthenticatedLayout>
      <Suspense fallback={<FormFallbackLoading />}>
        <FormsDashboard />
      </Suspense>
    </AuthenticatedLayout>
  );
}
