import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Box, Typography, InputBase, Divider } from "@mui/material";
import { CommonAvatar, CommonIcon } from "../../ui";
import { emptyChat } from "../../assets/images";
import { Logo } from "../../components";
import { Form, Formik } from "formik";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import { useSelector } from "react-redux";
const socket = io("http://localhost:5000");

const ConnectPage = () => {
  const user = useSelector((state)=>state.user);
  const [messages, setMessages] = useState([]);
  const conversationId = "12345";

  useEffect(() => {
    socket.emit("joinConversation", { conversationId });
    socket.on("receiveMessage", ({ conversationId: convId, message }) => {
      if (convId === conversationId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, [conversationId]);

  return (
    <Box className="fixed inset-0 grid grid-cols-12">
      <Box className="col-span-3 p-5 bg-white rounded-md border-r">
        <Logo />
        <Box className="my-4">
          <InputBase
            fullWidth
            placeholder="Tên công ty, tên nhà tuyển dụng"
            startAdornment={<CommonIcon.Search sx={{ marginRight: "8px" }} />}
            sx={{
              background: "#f5f5f5",
              borderRadius: "999px",
              padding: "10px 12px",
              fontSize: "14px",
            }}
          />
        </Box>
      </Box>
      <Box className="col-span-6 flex flex-col justify-between bg-white rounded-md">
        <div className="flex items-center gap-2 p-5 border-b">
          <CommonAvatar active />
          <Typography
            fontSize={"16px"}
            color="var(--neutrals-100)"
            fontWeight={500}
          >
            Nguyễn Văn A
          </Typography>
        </div>
        {/* Box chat */}
        <Box className="mt-5 flex-1 overflow-y-auto max-h-[500px]">
          {messages.length === 0 ? (
            <Box className="size-full flex flex-col gap-4 items-center justify-center">
              <img
                src={emptyChat}
                alt=""
                className="h-[200px] cursor-pointer"
              />
              <Typography fontSize={"14px"} color="var(--neutrals-60)">
                Bạn không có cuộc trò chuyện nào
              </Typography>
            </Box>
          ) : (
            <Box className="flex flex-col gap-3">
              {messages.map((message, index) => (
                <Box
                  key={index}
                  className={`flex ${
                    message.sender_id === "Me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <Typography
                    sx={{
                      background:
                        message.sender_id === "Me" ? "#e0f7fa" : "#f5f5f5",
                      padding: "8px 12px",
                      borderRadius: "12px",
                      maxWidth: "70%",
                      wordBreak: "break-word",
                    }}
                  >
                    {message.content}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Formik
          initialValues={{ textMessage: "" }}
          onSubmit={(values, { resetForm }) => {
            if (values.textMessage.trim()) {
              const newMessage = {
                conversationId,
                senderId: user?.user_id, // Replace with actual sender ID
                content: values.textMessage,
              };
              socket.emit("sendMessage", newMessage);
              resetForm(); // Reset input field after sending message
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-5 flex items-center gap-3 p-5 w-full">
              <FormikField
                name="textMessage"
                component={InputField}
                size="small"
                sx={{
                  fieldset: {
                    borderRadius: "999px",
                  },
                }}
                placeholder="Nhập tin nhắn..."
              />
              <button type="submit">
                <CommonIcon.Send
                  sx={{
                    color: "var(--primary)",
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                />
              </button>
            </Form>
          )}
        </Formik>
      </Box>
      <Box className="col-span-3 border-l p-5 overflow-y-auto">
        <Typography className="!font-semibold">
          Tin tuyển dụng đã ứng tuyển{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default ConnectPage;
