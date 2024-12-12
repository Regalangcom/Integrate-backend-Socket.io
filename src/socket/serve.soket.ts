import { databaseConnection } from "../database/db";
import { Message } from "../entities/message-identify";
import { User } from "../entities/user-identify";
import { io } from "../index";

type ActiveUser = {
   user_id: number;
   socket_io: string;
};

export const active_user: ActiveUser[] = [];


export function SocketServer() {
   io.on("connection", (client: any) => {
     console.log("connected to socket ", client.id);

     // listen event send_message dari client
     client.on("send_message", async (data: { message: string }) => {
       const { message } = data;

       if (!message || message.trim() === "") {
         console.log("Received an empty message. Skipping save.");
         return; // Jika pesan kosong, batalkan penyimpanan
       }

       try {
         const newMessage = new Message();
         newMessage.message = message;

         const messageRepository = databaseConnection.getRepository(Message);
         await messageRepository.save(newMessage); // Simpan pesan ke database

         console.log("Received message:", newMessage);

         // Kirim pesan ke semua client yang terhubung
         io.emit("message", message); // Ini akan memicu event 'message' di client
       } catch (error) {
         console.log("Error saving message:", error);
       }
     });



     // Menangani ketika client terputus
     client.on("disconnect", () => {
       console.log("User disconnected:", client.id);
       // Hapus user yang terputus dari daftar active_user
       const index = active_user.findIndex((user) => user.socket_io === client.id);
       if (index !== -1) {
         active_user.splice(index, 1);
       }
       // Kirim daftar pengguna yang online yang baru
       io.emit("online_users", active_user);
     });
   });
}



export const sendMessageToUser = async (userId: number, message: string , email : string) => {

   const user = databaseConnection.getRepository(User)
   const get = await user.findOne({where : { email }})
   
   if (get) {
      const user = active_user.find((user) => user.user_id === userId);
      io.to(user?.socket_io).emit("message", message);
      console.log(get);
      
      console.log(`Message sent to userId ${userId}:`, message);
      // console.log("message");
   } else {
      console.log(`User with userId ${userId} not connected`);
   }
};

