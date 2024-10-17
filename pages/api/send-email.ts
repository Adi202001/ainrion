import { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from '@/lib/sendEmail'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body

    try {
      const result = await sendEmail(name, email, message)
      if (result.success) {
        res.status(200).json(result)
      } else {
        res.status(500).json(result)
      }
    } catch (error: unknown) {
      console.error('Error in send-email API:', error)
      res.status(500).json({ success: false, message: 'Server error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}