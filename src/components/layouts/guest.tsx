import Navigation from "@/components/application/navigation";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full">
      <Navigation />
      {children}
    </section>
  );
}
