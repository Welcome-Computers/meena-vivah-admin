import { VerifySession } from "@/lib/modules/admin/VerifySession";

export default async function handler(req: any, res: any) {
  try {
    const admin = await VerifySession(req);

    if (!admin) {
      return res.status(401).json({
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      admin,
    });
  } catch {
    return res.status(401).json({
      success: false,
    });
  }
}
