import load from "./loader"
import express from "express"

const app = express()
load(app)

const port = process.env.PORT || 1234
app.listen(port, () => console.log("launched on port" + port))
