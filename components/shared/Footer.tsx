import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="wrapper flex flex-col items-center justify-center p-5 text-center">
        {/* Logo and SignedIn section */}
        <div className="w-full flex flex-col items-center sm:flex-col md:flex-col lg:flex-row lg:items-center lg:justify-between mb-4 mt-4 relative">
          {/* Logo */}
          <div className="mb-4 lg:mb-0 lg:absolute lg:left-0">
            <Link href="/">
              <Image
                src="/assets/images/logo.png"
                width={128}
                height={32}
                alt="Eventful logo"
              />
            </Link>
          </div>

          {/* SignedIn section */}
          <div className="flex-grow flex justify-evenly">
            <SignedIn>
              <nav className="flex flex-row gap-2">
                <NavItems />
              </nav>
            </SignedIn>
          </div>
        </div>

        <Separator
          decorative
          className="w-2/3 border-w-4 border-stroke-500 my-4"
        />

        {/* Office Address, Contact, and Social Media Links */}
        <div className="w-full flex flex-col items-center sm:flex-col md:flex-row md:items-start lg:flex-row lg:items-start lg:justify-evenly gap-8 pl-4 pr-4 mb-4">
          <div className="flex flex-col items-center sm:items-start md:items-start md:w-1/3 lg:w-auto gap-1">
            <p className="p-semibold-18">Office Address:</p>
            <p>123 Main St, Anytown,</p>
            <p>USA 12345</p>
          </div>

          <div className="flex flex-col items-center sm:items-start md:items-start md:w-1/3 lg:w-auto gap-1">
            <p className="p-semibold-18">Contact:</p>
            <p className="p-medium-16 flex gap-1">
              Email:
              <a
                href="mailto:info@eventful.com"
                className="text-primary hover:underline"
              >
                info@EventFul.com
              </a>
            </p>
            <p className="p-medium-16 flex gap-1">
              Tel:
              <a
                href="tel:+1234567890"
                className="text-primary hover:underline"
              >
                +1 (234) 567-890
              </a>
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start md:items-start md:w-1/3 lg:w-auto gap-1">
            <p className="p-semibold-18">Social Media Links:</p>
            <a
              href="https://twitter.com/EventFulApp"
              target="_blank"
              className="flex items-center text-primary hover:underline ml-[-8px]"
            >
              <img
                src="/assets/social/x.svg"
                alt="Twitter"
                width="32"
                height="32"
              />
              <p className="ml-2 p-medium-16">/X</p>
            </a>
            <a
              href="https://instagram.com/EventFulApp"
              target="_blank"
              className="flex items-center text-primary hover:underline"
            >
              <img
                src="/assets/social/instagram.svg"
                alt="Instagram"
                width="16"
                height="16"
              />
              <p className="ml-2 p-medium-16">/Instagram</p>
            </a>
          </div>
        </div>

        <Separator
          decorative
          className="w-2/3 border-w-4 border-stroke-500 my-4"
        />

        {/* Copyright information */}
        <div className="mt-4 flex items-center">
          <span>© 2024 EventFul | All Rights Reserved |</span>
          <a
            href="https://privacypolicy.com"
            target="_blank"
            className="ml-2 hover:underline text-primary"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
