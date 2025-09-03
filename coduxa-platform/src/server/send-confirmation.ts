import express from "express"
import { Resend } from "resend"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())

const resend = new Resend(process.env.RESEND_API_KEY)

// Endpoint to send confirmation email
app.post("/send-confirmation", async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: "Email is required" })
  }

  try {
    const result = await resend.emails.send({
      from: "noreply@yourdomain.com", // You can use onresend.com sandbox domain first
      to: email,
      subject: "Confirm your account",
      html: `
        <h1>Welcome!</h1>
        <p>Click the link below to confirm your email:</p>
        <a href="https://yourapp.com/confirm?email=${encodeURIComponent(email)}">
          Confirm my email
        </a>
      `,
    })

    res.json({ success: true, result })
  } catch (error) {
    console.error("Error sending email:", error)
    res.status(500).json({ error: "Failed to send email" })
  }
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
