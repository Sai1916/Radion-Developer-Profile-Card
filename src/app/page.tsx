"use client";

import CardComp from "@/components/Card";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { Button } from "@/components/ui/button";
import { QrCode, Share } from "lucide-react";
import { useState } from "react";
import sumedhImg from "@/assets/sumedh.jpg";


export default function Home() {
  const [showQR, setShowQR] = useState(false);
  const onClickShare = async () => {
    if (navigator.share) {
      await navigator
        .share({
          title: "Sumedh's Radion Dev Profile",
          text: "Check out my profile on on-radion.com/public/saisumedh19",
          url: "https://www.on-radion.com/public/saisumedh19",
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };

  const onGenerateQR = () => {
    setShowQR(true);
  };

  return (
    <div className="font-sans flex flex-col items-center w-screen min-h-screen p-8 gap-8 sm:p-14">
      <div className="w-full flex justify-center">
        {/* <CardComp onClickShare={onClickShare}/> */}
        <CardComp />
      </div>
      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button className="cursor-pointer" onClick={onClickShare}>
          <Share />
          <p>Share</p>
        </Button>
        <Button className="bg-[#FF4FB9] cursor-pointer" onClick={onGenerateQR}>
          <QrCode />
          <p>Generate QR Code</p>
        </Button>
      </div>
      {showQR && (
        <QRCodeGenerator
          username="saisumedh19"
          size={240}
          fgColor="#0f172a"
          bgColor="#f1f5f9"
          // logoUrl="/vercel.svg"
          logoUrl={sumedhImg.src}
        />
      )}
    </div>
  );
}
