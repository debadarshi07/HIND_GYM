import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
const router = express.Router();
const port = process.env.PORT || 4000;

config({path: "./config.env"});
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true
})
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

router.post("/send/mail", async (req, res, next) => {
    const { name, email, message } = req.body;
    if(!name || !email || !message) {
        return next(res.status(400).json({success: false, message: "Please provide all details."}));
    }
    try {
        await sendEmail({
            email: "domkar@gmail.com",
            subject: "Gym website",
            message,
            userEmail: email,
        });
        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
});

app.use(router);
app.listen(port, (err)=>{
    if(err) {
        console.log(err);
    } else{
        console.log(`Server listening at port ${port}`);
    }
});
