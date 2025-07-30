/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt from "jsonwebtoken";
import { GoogleAuth } from "google-auth-library";
import { v4 as uuidv4 } from "uuid";

// TODO: Define Issuer ID
const issuerId = process.env.NEXT_PUBLIC_GOOGLE_WALLET_ISSUER_ID;

// TODO: Define Class ID
// const classId = `${issuerId}.${process.env.NEXT_PUBLIC_GOOGLE_WALLET_CLASS_ID}`;
const classId = `${issuerId}.dev_profile_card_new3`;

const baseUrl = "https://walletobjects.googleapis.com/walletobjects/v1";

const getCredentials = () => {
  const base64 = process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS_JSON!;
  const jsonStr = Buffer.from(base64, "base64").toString("utf-8");
  return JSON.parse(jsonStr);
};

// console.log('GOOGLE_APPLICATION_CREDENTIALS_JSON:', process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS_JSON);

const credentials = getCredentials();

export const getAuthClient = async () => {
  const credentials = getCredentials();
  const auth = new GoogleAuth({
    credentials,
    scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
  });
  return await auth.getClient();
};

export const createWalletClass = async () => {
  const authClient = await getAuthClient();

  const genericClass = {
    id: classId,
    classTemplateInfo: {
      cardTemplateOverride: {
        cardRowTemplateInfos: [
          {
            oneItem: {
              item: {
                firstValue: {
                  fields: [{ fieldPath: "object.textModulesData['skills']" }],
                },
              },
            },
          },
          // {
          //   threeItems: {
          //     startItem: {
          //       firstValue: {
          //         fields: [{ fieldPath: 'object.linksModuleData.uris[0].description' }],
          //       },
          //     },
          //     middleItem: {
          //       firstValue: {
          //         fields: [{ fieldPath: 'object.linksModuleData.uris[1].description' }],
          //       },
          //     },
          //     endItem: {
          //       firstValue: {
          //         fields: [
          //           { fieldPath: 'object.linksModuleData.uris[2].description' },
          //         ],
          //       },
          //     },
          //   },
          // },
          {
            twoItems: {
              startItem: {
                firstValue: {
                  fields: [{ fieldPath: "object.textModulesData['github']" }],
                },
              },
              endItem: {
                firstValue: {
                  fields: [
                    { fieldPath: "object.textModulesData['portfolio']" },
                  ],
                },
              },
            },
          },
          {
            oneItem: {
              item: {
                firstValue: {
                  fields: [{ fieldPath: "object.textModulesData['linkedin']" }],
                },
              },
            },
          },
        ],
      },

      detailsTemplateOverride: {
        detailsItemInfos: [
          {
            item: {
              firstValue: {
                fields: [
                  { fieldPath: "object.linksModuleData.uris[0]" },
                ],
              },
            },
          },
          {
            item: {
              firstValue: {
                fields: [
                  { fieldPath: "object.linksModuleData.uris[1]" },
                ],
              },
            },
          },
          {
            item: {
              firstValue: {
                fields: [
                  { fieldPath: "object.linksModuleData.uris[2]" },
                ],
              },
            },
          },
        ],
      },
    },
  };

  try {
    await authClient.request({
      url: `${baseUrl}/genericClass/${classId}`,
      method: "GET",
    });

    // await authClient.request({
    //   url: `${baseUrl}/genericClass/${classId}`,
    //   method: "PATCH",
    //   data: genericClass,
    // });

    console.log("Class already exists.");
  } catch (err: any) {
    console.log("error: ", err.response);
    if (err.response && err.response?.status === 404) {
      await authClient.request({
        url: `${baseUrl}/genericClass`,
        method: "POST",
        data: genericClass,
      });

      // await authClient.request({
      //   url: `${baseUrl}/genericClass/${classId}`,
      //   method: "PATCH",
      //   data: genericClass,
      // });
      // console.log("Class created:", response.data);
    } else {
      throw err;
    }
  }
};

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
          id: "github",
        },
        {
          uri: "https://linkedin.com/in/saisumedhchittelu",
          description: "LinkedIn",
          id: "linkedin",
        },
        {
          uri: "https://www.saisumedh.com",
          description: "Portfolio",
          id: "portfolio",
        },
      ],
    },
    heroImage: {
      sourceUri: {
        uri: "https://avatars.githubusercontent.com/u/52703087?v=4",
      },
      contentDescription: {
        defaultValue: {
          language: "en",
          value: "Full Stack Developer",
        },
      },
    },
    textModulesData: [
      {
        header: "SKILLS",
        body: [
          "HTML",
          "CSS",
          "JavaScript",
          "React.js",
          "Next.js",
          "React-Native",
        ].join(" · "),
        id: "skills",
      },
      {
        header: "Github",
        body: "Sai1916",
        id: "github",
      },
      {
        header: "LinkedIn",
        body: "saisumedhchittelu",
        id: "linkedin",
      },
      {
        header: "Portfolio",
        body: "saisumedh.com",
        id: "portfolio",
      },
    ],
  };

  // TODO: Create the signed JWT and link
  const claims = {
    iss: credentials.client_email,
    aud: "google",
    origins: [
      "http://localhost:3000",
      "https://radion-dev-profile-card.vercel.app/",
    ],
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
