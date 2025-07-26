import React from "react";
import { CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Github, Globe, Linkedin } from "lucide-react";

type SocialsProps = {
  socials: {
    type: string;
    url: string;
  }[];
};

const CardFooterComp = ({ socials }: SocialsProps) => {
  return (
    <CardFooter className="flex items-center justify-between gap-2">
      {socials.map((item) => (
        <Button
          key={item.type}
          variant="secondary"
          asChild
          className={`${item.type === "github" ? 'bg-gray-500' : ( item.type === "linkedin" ? 'bg-blue-500' : 'bg-red-500')} "text-white hover:bg-black hover:text-white hover:scale-110"`}
        >
          <Link href={item.url} target="_blank">
            {item.type === "github" ? <Github />: ( item.type === "linkedin" ? <Linkedin /> : <Globe /> )}
            {item.type === "github" ? "Github" : ( item.type === "linkedin" ? "Linkedin" : "Portfolio" )}
          </Link>
        </Button>
      ))}
      {/* <Button
        variant="secondary"
        asChild
        className="bg-blue-500 text-white dark:bg-blue-600 hover:bg-black hover:text-white hover:scale-110"
      >
        <Link href={data.linkedIn} target="_blank">
          <Linkedin />
          LinkedIn
        </Link>
      </Button>
      <Button
        variant="secondary"
        asChild
        className="bg-red-500 text-white dark:bg-blue-600 hover:bg-black hover:text-white hover:scale-110"
      >
        <Link href={data.portfolio} target="_blank">
          <Globe />
          Portfolio
        </Link>
      </Button> */}
    </CardFooter>
  );
};

export default CardFooterComp;
