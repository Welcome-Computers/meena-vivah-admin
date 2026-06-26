
export default async function handler(req: any, res: any) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new Error("No Refresh Token");
    }

    // const decoded = jwt.verify(
    //   refreshToken,
    //   process.env.JWT_SECRET_REFRESH_TOKEN!,
    // ) as any;

    // // create a new token
    // const accessToken = jwt.sign(
    //   {
    //     id: decoded.id,
    //     mobile: decoded.mobile,
    //   },
    //   process.env.JWT_SECRET_TOKEN!,
    //   {
    //     expiresIn: "15m",
    //   },
    // );

    // // set cookie
    // const accessCookie = serialize("accessToken", accessToken, {
    //   httpOnly: true,
    //   path: "/",
    //   maxAge: 15 * 60,
    // });

    // res.setHeader("Set-Cookie", accessCookie);

    return res.status(200).json({
      success: true,
    });
  } catch {
    return res.status(401).json({
      success: false,
    });
  }
}
