require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(fileUpload({
    limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2 GB
    useTempFiles: true,
    tempFileDir: "/tmp/",
    safeFileNames: false,
    abortOnLimit: true,
}))

app.post("/upload", (req, res) => {
    // add auth up here

    if (!req.files || !req.body || !req.body.password || req.body.password != process.env.PASSWORD) {

        return res.status(400).send("Invalid user input.")

    } else {

        const uploadFile = req.files.uploadedFile;
        if (uploadFile == undefined) return res.status(400).send("No files were uploaded.");

        let uploadFileName = uploadFile.name.replaceAll(" ", "_");
        let targetPath = path.normalize(__dirname + "/public/files/" + uploadFileName);

        if (fs.existsSync(targetPath)) return res.status(500).send("File name taken.");

        uploadFile.mv(targetPath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("An error occured.");
            }
            return res.status(200).send("files/" + uploadFileName);
        });

    }
})

app.listen(port, (req, res) => {
    console.log("node-cdn is now running on port " + port);
})