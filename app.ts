import { Request, Response, Express } from "express";
import express from 'express'



const app: Express = express();
const PORT: Number = 3000;
const Root: "/" = "/";
let con: number = 0;
let connections: any = [];




// Route.
app.get(Root, (req: Request, res: Response) => {
    res.send("hello world");
})

app.get("/data", (req: Request, res: Response) => {
    res.json({
        data: 'success',
        Type: true,
    });

})


let Server = app.listen(PORT, () => {

    console.log("port is running on the " + PORT);
});








// Handle the connection.
Server.on("connection", (connection: any) => {
    connections.push(connection);

    connection.on("close", function () {
        connections = connections.filter((cur: any) => {
            cur !== connection
        })
    })
})

// Close the Connection.
connections.forEach((curr: any) => {
    curr.close();
});


module.exports = { app, Server }
