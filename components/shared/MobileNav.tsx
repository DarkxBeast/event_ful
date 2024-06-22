import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import Image from "next/image";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="assets/icons/menu.svg"
            alt="Menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col bg-white md:hidden">
          <Image
            src="/assets/images/wordmark-logo.png"
            alt="logo"
            width={128}
            height={32}
          />

          <Separator className="border border-grey-50" />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
