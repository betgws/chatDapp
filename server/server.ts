import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// 웹소켓 연결 처리
io.on("connection", (socket) => {
  console.log("새로운 클라이언트 연결됨:", socket.id);

  socket.on("message", (msg) => {
    console.log(" 메시지 수신:", msg);
    io.emit("message", msg); // 모든 클라이언트에게 전송
  });

  socket.on("disconnect", () => {
    console.log("클라이언트 연결 해제:", socket.id);
  });
});

// 서버 실행
const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`웹소켓 서버가 ${PORT}번 포트에서 실행 중...`);
});