// Library
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

// Route
const routes = require("./src/routes");

// Config
const database = require("./src/configs/database");
const {
  checkElastic,
} = require("./src/configs/elasticsearch");
const { initSocket } = require("./src/configs/socket");
const syncServices = require("./src/elastic_services/syncServices");

// APP
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
const allowedOrigins = [
  "https://jobhuntlyclient.vercel.app",
  "http://localhost:8000",
];

// CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
// Connect database
database.connect();

routes(app);

// Check connect elasticsearch
// checkElastic();

// Innit socket
initSocket(server);
async function main() {
  try {
    console.log("🚀 Bắt đầu quá trình khởi tạo và đồng bộ...");
    
    // Khởi tạo dịch vụ
    await syncServices.initialize();
    console.log("✅ Đã khởi tạo dịch vụ đồng bộ thành công");

    // Kiểm tra kết nối Elasticsearch
    const elasticStatus = await checkElastic();
    console.log("🔍 Trạng thái Elasticsearch:", elasticStatus);

    // Tạo index jobs trước khi sync
    await syncServices.createJobIndex();
    console.log("📝 Đã kiểm tra/tạo index jobs");

    // Thực hiện sync jobs
    const syncedJobCount = await syncServices.syncJobsToElasticsearch();
    console.log(`📊 Đã đồng bộ ${syncedJobCount} jobs thành công`);

  } catch (error) {
    console.error("❌ Lỗi trong quá trình khởi tạo và đồng bộ:", error);
    // Nếu muốn ứng dụng vẫn chạy được dù sync thất bại
    // Có thể comment lại dòng throw hoặc xử lý theo logic riêng
    // throw error;
  }
}
main();
// Server listening
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
