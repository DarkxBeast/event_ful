import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex ">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/logo.png"
            width={128}
            height={32}
            alt="Eventful logo"
          ></Image>
        </Link>

        <SignedIn>
          <nav
            className="md:flex-between hidden  max-w-xs justify-center
                pl-80 gap-50
                "
          >
            <NavItems />
          </nav>
        </SignedIn>

        <div
          className="flex w-full justify-end pr-4
             gap-3"
        >
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size={"lg"}>
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
