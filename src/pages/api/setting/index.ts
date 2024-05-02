import prisma from '@/lib/prisma'
import { Setting } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Response {
  message?: string
  error: boolean
  data: Setting[] | null
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
 if (req.method === 'GET') {
    prisma.setting.findMany().then((data) => {
      console.log(data)
      res.status(200).json({
        data,
        error: false,
        message: 'Settings data fetched successfully'
      })
    }).catch((error) => {
      res.status(500).json({
        data: null,
        error: true,
        message: error.message,
      })
    })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}