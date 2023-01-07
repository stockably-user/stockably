import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "../../types/apiResponse";
import { checkForActiveSession } from "../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sb = await checkForActiveSession(req, res);

  if (sb) {
    const {
      data: { user },
    } = await sb.auth.getUser();

    res.status(200).json({ message: "Success", payload: user } as ApiResponse);
  } else {
    res
      .status(200)
      .json({ message: "Could not get user", payload: {} } as ApiResponse);
  }
}
