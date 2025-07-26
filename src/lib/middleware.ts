"use server";

import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// TODO: Define Issuer ID
const issuerId = process.env.NEXT_PUBLIC_GOOGLE_WALLET_ISSUER_ID;

// TODO: Define Class ID
const classId = `${issuerId}.${process.env.NEXT_PUBLIC_GOOGLE_WALLET_CLASS_ID}`;

const getCredentials = () => {
  const base64 = process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS_JSON!;
  const jsonStr = Buffer.from(base64, "base64").toString("utf-8");
  return JSON.parse(jsonStr);
};

// console.log('GOOGLE_APPLICATION_CREDENTIALS_JSON:', process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS_JSON);

const credentials = getCredentials();

export const createPassObject = async () => {
  // TODO: Create a new Generic pass for the user
  const objectId = `${issuerId}.${uuidv4()}`;

  const genericObject = {
    id: objectId,
    classId,
    hexBackgroundColor: "#4285f4",
    // logo: {
    //    contentDescription:{
    //     defaultValue: {
    //         language: "en",
    //         value: "RADION",
    //     },
    //   }
    // },
    cardTitle: {
      defaultValue: {
        language: "en",
        value: "Radion",
      },
    },
    header: {
        defaultValue: {
            language: "en",
            value: "Sai Sumedh Chittelu",
        },
    },
    subheader: {
      defaultValue: {
        language: "en",
        value: "Full Stack Developer",
      },
    },

    linksModuleData: {
      uris: [
        {
          uri: "https://github.com/Sai1916",
          description: "GitHub",
        },
        {
          uri: "https://linkedin.com/in/saisumedhchittelu",
          description: "LinkedIn",
        },
        {
          uri: "https://www.saisumedh.com",
          description: "Portfolio",
        },
      ],
    },

    heroImage: {
      sourceUri: {
        uri: "https://avatars.githubusercontent.com/u/52703087?v=4",
      },
      contentDescription:{
        defaultValue: {
            language: "en",
            value: "Full Stack Developer",
        },
      }
    },

    // barcode: {
    //   type: 'QR_CODE',
    //   value: objectId,
    // },
    textModulesData: [
      {
        id: 'skills',
        header: 'SKILLS',
        body: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Next.js', 'React-Native'].join(" · "),
      },
    ],
  };

  // TODO: Create the signed JWT and link
  const claims = {
    iss: credentials.client_email,
    aud: "google",
    origins: ["http://localhost:3000", "https://radion-dev-profile-card.vercel.app/"],
    typ: "savetowallet",
    payload: {
      genericObjects: [genericObject],
    },
  };

  const token = jwt.sign(claims, credentials.private_key, {
    algorithm: "RS256",
  });
  const saveUrl = `https://pay.google.com/gp/v/save/${token}`;
//   console.log("token: ", token);
  return saveUrl;
};
