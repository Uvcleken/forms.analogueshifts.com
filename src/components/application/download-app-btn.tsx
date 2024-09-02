import Link from "next/link";
import Image from "next/image";

import PlayStore from "@/assets/images/playstore.svg";
import AppStore from "@/assets/images/appstore.svg";

export default function DownloadAppBtn({ platform }: { platform: string }) {
  return (
    <Link href="">
      <Image src={platform === "playstore" ? PlayStore : AppStore} alt="" />
    </Link>
  );
}
