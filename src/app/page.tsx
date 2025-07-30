"use client";

import CardComp from "@/components/Card";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { Button } from "@/components/ui/button";
import { QrCode, Share } from "lucide-react";
import { useState } from "react";
import sumedhImg from "@/assets/sumedh.jpg";
import Image from "next/image";
import { createPassObject, createWalletClass } from "@/lib/middleware";
import { motion } from "motion/react";

export default function Home() {
  const [showQR, setShowQR] = useState(false);
  const onClickShare = async () => {
    if (navigator.share) {
      await navigator
        .share({
          title: "Sumedh's Radion Dev Profile",
          text: "Check out my profile on on-radion.com/public/saisumedh19",
          // url: "https://www.on-radion.com/public/saisumedh19",
          url: "https://radion-dev-profile-card.vercel.app/",
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };

  const onGenerateQR = () => {
    setShowQR(true);
  };

  const onAddToGoogleWallet = async () => {
    await createWalletClass();
    const url = await createPassObject();
    window.open(url, "_blank");
  };

  return (
    <div className="font-sans flex flex-col items-center w-screen min-h-screen p-8 gap-8 sm:p-14">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full flex justify-center"
      >
        {/* <CardComp onClickShare={onClickShare}/> */}
        <CardComp />
      </motion.div>
      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex gap-2"
      >
        <Button className="cursor-pointer" onClick={onClickShare}>
          <Share />
          <p>Share</p>
        </Button>
        <Button className="bg-[#FF4FB9] cursor-pointer" onClick={onGenerateQR}>
          <QrCode />
          <p>Generate QR Code</p>
        </Button>
      </motion.div>
      {showQR && (
        <QRCodeGenerator
          username="saisumedh19"
          size={240}
          fgColor="#0f172a"
          bgColor="#f1f5f9"
          logoUrl={sumedhImg.src}
        />
      )}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Button variant={"ghost"} onClick={onAddToGoogleWallet}>
          <Image
            src={"/wallet-button.png"}
            className="h-10 w-52 cursor-pointer"
            width={150}
            height={150}
            alt="Add to Google Wallet"
            priority
          />
        </Button>
      </motion.div>
    </div>
  );
}
