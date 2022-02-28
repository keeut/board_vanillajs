import express from "express";
import { getDataset, getContent, updateData, deleteData ,postContent} from "./controller/content.js";
import morgan from "morgan";
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('combined'))
app.get('/datas',getDataset)
app.get('/content',getContent)
app.post('/content',postContent)
app.put('/content',updateData)
app.delete('/data',deleteData)

app.listen(8080)