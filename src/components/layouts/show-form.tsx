import ApplicationLogo from "../application/application-logo";
import Link from "next/link";

export default function ShowFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      style={{ background: "rgb(243 244 246/1)" }}
      className="w-full min-h-screen"
    >
      <div className="flex justify-center pt-3 pb-20 px-3">
        <nav className="backdrop-blur-lg drop-shadow-lg border border-gray-100 w-full lg:rounded-full fixed z-30">
          <div className="w-full mx-auto px-4 lg:px-6 xl:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <ApplicationLogo />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {children}
    </section>
  );
}
