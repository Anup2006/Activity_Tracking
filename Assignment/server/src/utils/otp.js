import nodemailer from "nodemailer";

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey", 
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `<h2>Your OTP is ${otp}</h2><p>Valid for 10 minutes</p>`
  });
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export {
    generateOTP,
    sendOTPEmail,
}
