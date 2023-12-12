const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
    "1067619667949-essts73le5fjah4irkogjde8ndgll6ab.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
    "1//04Pa2Rw5LLjWpCgYIARAAGAQSNwF-L9Ire8BMEcJnXjTkDQ0JyGZwn5_mufAQBPhZo4Y2BbI8rE8hjDD1Bpk_djYwgIZIlfueHuE";

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL,
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "anisgurnadi21@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: "LAB BASIS DATA A<anisgurnadi21@gmail.com>",
            to: "peminjamankomputer@gmail.com",
            subject: "Mengabulkan Pemohonan Peminjaman lab",
            text: "contoh pemberitahuan permohonan ruangan",
        };

        const result = await transport.sendMail(mailOptions);
        console.log("Email berhasil dikirim:", result);
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
}

sendMail();
