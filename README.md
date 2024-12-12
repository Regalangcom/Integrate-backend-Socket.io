// export function SocketServer() {
// io.on("connection", (client: any) => {
// console.log("connected to socket ", client.id);

// client.on("new_user", (data: any ) => {

// const existingUser = active_user.find(user => user.user_id === data.id);

// if (!existingUser) {
// // Jika belum ada, tambahkan user baru ke active_user
// let obj: ActiveUser = {
// user_id: data.id,
// socket_io: client.id
// };
// active_user.push(data);
// console.log("User added:", data);
// } else if (existingUser.socket_io !== client.id) {
// existingUser.socket_io = client.id;
// console.log("User already connected, socket updated:", existingUser);
// } else {
// console.log("Duplicate socket, no action taken.");
// }
// });

// client.on("disconnect", () => {
// console.log("disconnected from socket ", client.id);

// const index = active_user.findIndex(user => user.socket_io === client.id);
// if (index !== -1) {
// active_user.splice(index, 1);
// console.log("User removed from active_user:", client.id);
// }
// });
// });
// }

import { io } from "../index"; // Import socket.io
import { Message } from "../entities/message"; // Import model Message
import { databaseConnection } from "../database/db"; // Import koneksi DB

export function SocketServer() {
io.on("connection", (client: any) => {
console.log("User connected with socket id:", client.id);

        // Mendengarkan event 'send_message' dari client
        client.on("send_message", async (data: { user_id: number, message: string }) => {
            const { user_id, message } = data;

            // Simpan pesan ke database
            try {
                const newMessage = new Message();
                newMessage.user_id = user_id;
                newMessage.message = message;

                // Menyimpan pesan ke database
                const messageRepository = databaseConnection.getRepository(Message);
                await messageRepository.save(newMessage);
                console.log("Message saved:", newMessage);

                // Kirim pesan ke semua client yang terhubung
                io.emit("message", {
                    user_id,
                    message,
                    created_at: newMessage.created_at
                });

            } catch (error) {
                console.error("Error saving message:", error);
            }
        });

        // Menangani event disconnect
        client.on("disconnect", () => {
            console.log("User disconnected with socket id:", client.id);
        });
    });

}

     // Menangani user baru yang terhubung

// client.on("new_user", (data: any) => {
// console.log(`User ${client.id} connected with socket id: ${client.id}`);
// // Tambahkan user ke active_user
// active_user.push({ user_id: data.id, socket_io: client.id });
// // Kirim daftar pengguna yang online
// io.emit("online_users", active_user);
// });

// export function SocketServer() {
// io.on("connection", (client: any) => {
// console.log("connected to socket ", client.id);

// // Mendengarkan event send_message dari client
// client.on("send_message", async (data :{ message: string}) => {

// const { message} = data;

// try {
// const newMessage = new Message()
// // newMessage.id = id;
// newMessage.message = message

// const getMessage = databaseConnection.getRepository(Message)
// await getMessage.save(newMessage);

// console.log("Received message:", newMessage);

// io.emit("message", message); // Ini akan memicu event 'message' di client

// } catch (error) {
// console.log("error saving message" , error);

// }

// // Kirim pesan ke semua client yang terhubung
// // io.emit("message", message); // Ini akan memicu event 'message' di client
// });

// // Menangani user baru yang terhubung
// client.on("new_user", (data: any) => {
// console.log(`User ${data.id} connected with socket id: ${client.id}`);
// // Kirim daftar pengguna yang online (misalnya menggunakan active_user)
// io.emit("online_users", active_user);
// });

// // Menangani ketika client terputus
// client.on("disconnect", () => {
// console.log("User disconnected:", client.id);
// // Hapus user yang terputus dari daftar active_user dan kirimkan daftar terbaru
// io.emit("online_users", active_user);
// });
// });
// }
