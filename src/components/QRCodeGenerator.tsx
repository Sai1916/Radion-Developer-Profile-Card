"use client";

import { QRCodeCanvas } from "qrcode.react";
import { motion } from "motion/react";
import React, { useRef } from "react";
import { Button } from "./ui/button";

type Props = {
  username: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  logoUrl?: string;
};

const QRCodeGenerator = ({
  username,
  size = 200,
  fgColor = "#000000",
  bgColor = "#ffffff",
  logoUrl = "/logo.png",
}: Props) => {
  // const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  const qrRef = useRef<HTMLDivElement>(null);
  // const profileUrl = `https://on-radion.com/public/${username}`;
  const profileUrl = "https://radion-dev-profile-card.vercel.app/";

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx || !logoUrl) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = logoUrl;

    image.onload = () => {
      const logoSize = size * 0.2;
      const x = (canvas.width - logoSize) / 2;
      const y = (canvas.height - logoSize) / 2;

      ctx.drawImage(image, x, y, logoSize, logoSize);

      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `${username}_qr.png`;
      link.click();
    };
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        ref={qrRef}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative bg-white p-2 rounded-lg shadow-md flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <QRCodeCanvas
          value={profileUrl}
          size={size}
          fgColor={fgColor}
          bgColor={bgColor}
          includeMargin={true}
          level="H"
        />
        {/* {logoUrl && (
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-30%, -30%)",
              width: size * 0.2,
              height: size * 0.2,
              borderRadius: "12px",
              overflow: "hidden",
            //   backgroundColor: "blue",
              padding: 4,
            }}
          >
            <img onLoad={() => setIsLogoLoaded(true)} src={logoUrl} width={100} height={100} alt="logo" className="w-full h-full rounded-full object-cover" />
          </div>
        )} */}
      </motion.div>

      <Button
        onClick={downloadQR}
        // disabled={!isLogoLoaded}
        className="bg-blue-600 text-white px-4 cursor-pointer py-2 rounded hover:bg-blue-700 transition"
      >
        {/* {isLogoLoaded ? "Download QR Code" : "Loading Logo..."} */}
        Download QR Code
      </Button>
    </div>
  );
};

export default QRCodeGenerator;
