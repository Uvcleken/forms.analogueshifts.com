import FormsDashboard from "./components/home";
import AuthenticatedLayout from "@/components/layouts/authenticated";
import FormFallbackLoading from "./components/fallback-loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <AuthenticatedLayout>
      <Suspense fallback={<FormFallbackLoading />}>
        <FormsDashboard />
      </Suspense>
    </AuthenticatedLayout>
  );
}
