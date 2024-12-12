import { DataSource } from "typeorm"
import { User } from "../entities/user-identify"
import { Message } from "../entities/message-identify";


const { DB_HOST , 
        DB_PORT , 
        DB_USERNAME , 
        DB_PASSWORD , 
        DB_DATABASE} = process.env


export const databaseConnection = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: parseInt(DB_PORT || "3306"),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [ User, Message],
    synchronize: false,
    logging: true,
})


// if (databaseConnection) {
//  console.log("Database connected successfully bro!")
// } else {
//     console.log("Database not connected");
    
// }
databaseConnection.initialize()
.then(() => console.log("Database connected successfully bro!"))
.catch((err) => console.log("Error connecting to the database bro !:", err));
