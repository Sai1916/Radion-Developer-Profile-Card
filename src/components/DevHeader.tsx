import Image from "next/image";
import React from "react";
import sumedhImg from "@/assets/sumedh.jpg";

type DevHeaderProps = {
  name: string;
  title: string;
};

const DevHeader = ({ name, title }: DevHeaderProps) => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <Image
        src={sumedhImg}
        width={150}
        height={150}
        className="w-20 h-20 object-cover rounded-full"
        alt="Developer Image"
      />
      <div className="flex flex-col items-center">
        <p className="text-base md:text-xl font-bold">{name}</p>
        <p className="text-sm font-light">{title}</p>
      </div>
    </div>
  );
};

export default DevHeader;
