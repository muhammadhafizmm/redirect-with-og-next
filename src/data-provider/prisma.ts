import prisma from "@/lib/prisma";
import { ReferralType } from "@prisma/client";

export async function getShareSettingByType(type: ReferralType) {
  return prisma.setting
    .findFirst({ where: { type } })
    .then((setting) => {
      return setting;
    })
    .catch(() => {
      return null;
    });
}
