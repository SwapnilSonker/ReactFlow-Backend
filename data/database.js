import mongoose from "mongoose"

export const ConnectDB =() => { mongoose.connect(process.env.MONGO_DB,{
    dbName:"reactflow"
}).then((c)=> console.log(`Database Connected Successfully with the port number`)).catch((e)=>console.log(e))
}
