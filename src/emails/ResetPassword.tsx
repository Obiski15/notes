import config from "@/config"
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Section,
  Text,
} from "@react-email/components"

export default function ResetPasswordEmail({
  email,
  resetLink,
}: {
  email: string
  resetLink: string
}) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Text style={title}>Reset Your Password</Text>

          <Text>Hi {email},</Text>

          <Text>
            We received a request to reset your password. Click the button below
            to choose a new one. This link will expire in{" "}
            <strong>
              {/* milliseconds to minute */}
              {Math.ceil(
                config.AUTH.passwordResetTokenExpiresIn / 1000 / 60
              )}{" "}
              minutes
            </strong>{" "}
            for your security.
          </Text>

          <Section>
            <Button style={button} href={resetLink}>
              Reset Password
            </Button>
          </Section>

          <Text style={{ marginTop: "20px" }}>
            If the button above doesn’t work, you can also reset your password
            by copying and pasting the URL below into your browser:
          </Text>

          <Link href={resetLink} style={link}>
            {resetLink}
          </Link>

          <Text>
            If you didn’t request this, please ignore this email. Your password
            will remain unchanged.
          </Text>

          <Text style={footer}>
            &copy; {new Date().getFullYear()} Notes. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  margin: 0,
  padding: 0,
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f4f4f7",
  color: "#333",
}

const container = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
}

const title = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#111",
}

const button = {
  padding: "12px 24px",
  backgroundColor: "hsl(241 59% 44%)",
  color: "#ffffff",
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  display: "inline-block",
  fontSize: "16px",
}

const link = {
  color: "#007BFF",
  wordBreak: "break-all" as const,
  fontSize: "14px",
}

const footer = {
  marginTop: "40px",
  fontSize: "12px",
  color: "#999",
  textAlign: "center" as const,
}
