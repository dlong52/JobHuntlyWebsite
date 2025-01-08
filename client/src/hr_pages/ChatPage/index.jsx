import React, { useState } from "react";
import {
  Box,
  Breadcrumbs,
  Typography,
  Avatar,
  InputBase,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CommonAvatar, CommonIcon } from "../../ui";
import { RouteBase } from "../../constants/routeUrl";
import { emptyChat } from "../../assets/images";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: inputMessage, sender: "Me" },
      ]);
      setInputMessage("");
    }
  };

  return (
    <div className="flex flex-col gap-y-5">
      {/* Header */}
      <Box className="flex justify-between p-5 bg-white rounded-md shadow-md">
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 500,
            color: "var(--neutrals-100)",
          }}
        >
          Kết nối
        </Typography>
        <Breadcrumbs
          separator={<CommonIcon.NavigateNext />}
          aria-label="breadcrumb"
          className="flex items-center"
        >
          <Link to={RouteBase.Home} className="text-primary">
            <CommonIcon.HomeRounded fontSize="small" />
          </Link>
          <Typography
            sx={{ fontWeight: 500, fontSize: "14px", color: "var(--neutrals-60)" }}
          >
            Kết nối
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box className="grid grid-cols-12 gap-5">
        {/* Sidebar */}
        <Box className="col-span-3 p-5 bg-white rounded-md shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <CommonAvatar active />
            <Typography
              fontSize={"16px"}
              color="var(--neutrals-100)"
              fontWeight={500}
            >
              Nguyễn Đức Long
            </Typography>
          </div>
          <Box className="my-4">
            <InputBase
              fullWidth
              placeholder="Tìm kiếm email"
              startAdornment={<CommonIcon.Search sx={{ marginRight: "8px" }} />}
              sx={{
                background: "#f5f5f5",
                borderRadius: "8px",
                padding: "4px 12px",
                fontSize: "14px",
              }}
            />
          </Box>

          <Divider />
        </Box>

        {/* Chat Area */}
        <Box className="col-span-9 p-5 bg-white rounded-md shadow-md">
          {/* Chat Header */}
          <div className="flex items-center gap-2 pb-5 border-b">
            <CommonAvatar active />
            <Typography
              fontSize={"16px"}
              color="var(--neutrals-100)"
              fontWeight={500}
            >
              Nguyễn Văn A
            </Typography>
          </div>

          {/* Chat Messages */}
          <Box className="mt-5 h-[400px] overflow-y-auto">
            {messages.length === 0 ? (
              <Box className="size-full flex flex-col gap-4 items-center justify-center">
                <img src={emptyChat} alt="" className="h-1/3" />
                <Typography fontSize={"14px"} color="var(--neutrals-60)">
                  Bạn không có cuộc trò chuyện nào
                </Typography>
              </Box>
            ) : (
              <Box className="flex flex-col gap-3">
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    className={`flex ${
                      message.sender === "Me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <Typography
                      sx={{
                        background: message.sender === "Me" ? "#e0f7fa" : "#f5f5f5",
                        padding: "8px 12px",
                        borderRadius: "12px",
                        maxWidth: "70%",
                        wordBreak: "break-word",
                      }}
                    >
                      {message.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Chat Input */}
          <Box className="mt-5 flex items-center gap-3">
            <InputBase
              fullWidth
              placeholder="Nhập tin nhắn..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              sx={{
                background: "#f5f5f5",
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "14px",
              }}
            />
            <CommonIcon.Send
              sx={{ color: "var(--primary)", cursor: "pointer" }}
              onClick={handleSendMessage}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ChatPage;
