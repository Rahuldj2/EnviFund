/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

// next.config.mjs

export default {
  env: {
    // RazorPay keys
    RAZORPAY_KEY: 'rzp_live_pLQ2G1r2QaXglO',
    RAZORPAY_SECRET: '0o3sOBg5NSkbAbvGy1QEwjEa',
//     GOOGLE_SHEETS_PRIVATE_KEY:"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDZPgayhBHru9XM\npVqf5kFJ8PrDUl8iMPYsRtV4YvsLN5ElT16o4xDSS8kqo9/2EXXOcsyH1YJmOxQg\nA4iX++2D/AA5zgD03BFTPGBUbrBtINNu4/Qu8h915aSVaNEyyrm2ESZQQAoOn9Uc\nH+gq5wYWSlFad272x0XYapdJ+kgPgSjLSjM2c/CE/fH4lcUjFpmyR9n9eUbNUELV\nknYS5VVfPgtCPRSf68CpXVXUV+BfbGdrW1vpOofIBg1WcINXw9MShVMwz0Ypv9Sm\n5Ync9U9ot+MCElJ2IxPC43xswK+6/v6E9yLNRLRV1tunF5heEtcoHBcn1W3k22Zc\n4srMOb9pAgMBAAECgf9VtSLvSyvG1VSEaLhYXX9krK5CYT0nQCnfThLqbCKfSkz5\na1btSqhYT44ORJkXe8v+p0wKSzInIyfNeZdqXvpWGBX+uEeoUyqCrE9VAFaat1iz\nZzvvSZcf7HoCeFgQseqS6jEzeBB/tI9fiTcPthWwtaFjD7u3oObteyA1D4lek9wp\n0B6a57XiMxG1DedWpVtY0VtPIf9WyqP7fWyjUCmTYXkDzqEgPZNmKJQWdTliITxN\nYKsjxslm1ywHiaJNy0cVwZYS7W4rwkSKOMiYM0nqdadbOySKE7oRu0dC41LWXAvg\nj+dwg24i970j923Bppfp2A1s6bPip4PeZ5n2NNECgYEA+O0KbDYHnwCknAlhuG4f\nF4OvVAShQblX5UOeGs+iyoe3wiTqsg9tKvvY2o1TlzYWnW/u9NWQWzz+nqB84WTy\nb5wdpI4GjtCTKVS9Geoi1Lrg1NzrFuOFvNNqNLpwyf/PtNEbC126tlNnxcx0kiOh\nCDjnfDhBgYs3UxLySNI7pL0CgYEA32p75FubrUzQlYmBE1C46h7x/Mdx21PfEhp+\nu0Fj/7e7Y/4yVg+OjHPk2vhZrGpWwUhxi8kIJHzEE8r3BTOiSmwuN/AOaIZRk8Bx\nH04cR7EDPDxB2U2fMxRU6e643tLMuylyMMcxnAuQWgPwJ+GHu8MB/6OgRZMIckeb\nrCMIzh0CgYEAx/KPZrBXms6HapbWmbBK5TZvhMtbRFG+Wnff7aVPG+O8JQRGSNS/\nWcGGRLc0p8dYjwm0JZHOLJtn4r8C0IGngyMhZGZ4ugqryo04gDJj3ABoTFNPusjz\nSeN/8e64XmlOy+0TDiQxr/Z66pT6JdDcrqAWwN7nL0lGHUKgvwGvyvkCgYAO71Ja\n4JjWi+UBqhB71xCVbf4lNLvyuneWATlpkSR7KrAXLh31TNLtpq2syZ9M/ErSXuJg\nQs8NiV2eKRo8OchmizbHvH9qE1iOtPWa7yDK1hVuSGTqftrekkRe4vtuwc630Dx2\n8EnrsYYzzkGWmOf28EFI8oo7PGn7IbhRWII1LQKBgQCRmQbDi3Kyp7RewPyz+7w4\nURGMrNSjI81f5WcBi0j1U6YLTvglGlMDft2q6F0ACf/WTgbhG+wAPIDZfQGILr6q\ntT0UJttBLt/6fAs7IYk9vnHES7X4X6JkOIkjRZO4bots3rhq2tTA4abUkxVsQnno\n09QvNDe06m/bv1Au9UT0bw==\n-----END PRIVATE KEY-----\n",
// GOOGLE_SHEETS_CLIENT_EMAIL:"neelpwm@instant-edudoc.iam.gserviceaccount.com",
// SPREADSHEET_ID:"1uAGb_f3Fy47ySpE_QNzIQr8jFqSe7pQhVcNN6BLORe0"
GOOGLE_APPLICATION_CREDENTIALS:'./instant-edudoc.json',
SHEET_ID:'1uAGb_f3Fy47ySpE_QNzIQr8jFqSe7pQhVcNN6BLORe0'
  },
};