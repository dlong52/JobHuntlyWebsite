import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  CircularProgress,
  Badge,
  Tooltip,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CommonAvatar, CommonIcon } from "../../ui";
import { RouteBase } from "../../constants/routeUrl";
import { emptyChat, startConversation } from "../../assets/images";
import { Form, Formik } from "formik";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import { useSelector } from "react-redux";
import { useGetAllConversations } from "../../hooks/modules/conversation/useGetAllConversations";
import { useConvertData, useQueryParams } from "../../hooks";
import { useGetUser } from "../../hooks/modules/user/userGetUser";
import { useGetAppliedJobs } from "../../hooks/modules/application/useGetAppliedJobs";
import { ROLE } from "../../constants/enum";
import { useGetMessage } from "../../hooks/modules/message/useGetMessage";
import { Logo } from "../../components";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";
import socket from "../../utils/socket";

// Message component for better rendering performance
const ChatMessage = React.memo(({ message, isCurrentUser }) => (
  <Box
    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}
  >
    <div className="flex flex-col">
     
      <Typography
        className={`rounded-2xl px-4 py-2 max-w-md break-words ${
          isCurrentUser
            ? "bg-blue-100 text-blue-900 rounded-br-none"
            : "bg-gray-100 text-gray-900 rounded-bl-none"
        }`}
      >
        {message.content}
      </Typography>
      <Typography
        variant="body2"
        className={`${
          isCurrentUser ? "text-right" : "text-left"
        } !text-xs text-neutrals-80 mt-1`}
      >
        {message.timestamp
          ? new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : ""}
      </Typography>
    </div>
  </Box>
));

// Conversation list item component
const ConversationItem = React.memo(
  ({ conversation, isActive, onClick, lastMessage }) => {
    const candidate = conversation?.participants?.find(
      (participant) => participant.role !== ROLE.EMPLOYER
    );

    if (!candidate) return null;

    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all hover:bg-blue-50 ${
          isActive ? "bg-blue-100" : "bg-gray-50"
        }`}
      >
        <Badge
          variant="dot"
          color="success"
          invisible={!candidate.user_id?.online}
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <CommonAvatar
            src={candidate.user_id?.profile?.avatar_url}
            className="border-2 border-white"
          />
        </Badge>
        <div className="flex-1 overflow-hidden">
          <Typography className="font-medium text-gray-900 truncate">
            {candidate.user_id?.profile?.name}
          </Typography>
          {lastMessage && (
            <Typography className="text-sm text-gray-500 truncate">
              {lastMessage.content}
            </Typography>
          )}
        </div>
        {lastMessage && lastMessage.timestamp && (
          <Typography className="text-xs text-gray-400">
            {new Date(lastMessage.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        )}
      </div>
    );
  }
);

const ChatPage = () => {
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { id, chat: conversationId } = useQueryParams();
  const prevConversationIdRef = useRef(null);

  // Media queries for responsive design
  const isMobile = useMediaQuery("(max-width:768px)");
  const isTablet = useMediaQuery("(min-width:769px) and (max-width:1024px)");

  const user = useSelector((state) => state.user);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Get user data
  const { data: userData } = useGetUser(id, { enabled: !!id });
  const { dataConvert: receiver } = useConvertData(userData);

  // Get applied jobs
  const { data: jobsData, isLoading: isJobsLoading } = useGetAppliedJobs(
    user?.user_id,
    {}
  );
  const { dataConvert: appliedJobs } = useConvertData(jobsData);

  // Get conversations
  const {
    data: cvsData,
    refetch: refetchConversation,
    isLoading: isConversationsLoading,
  } = useGetAllConversations(user?.user_id);
  const { dataConvert: conversations } = useConvertData(cvsData);

  // Get messages
  const {
    data: messageData,
    refetch: refetchMessage,
    isLoading: isMessagesLoading,
  } = useGetMessage(conversationId, { enabled: !!conversationId });
  const { dataConvert: messageContent } = useConvertData(messageData);
  const [messages, setMessages] = useState([]);

  const [currentConversation, setCurrentConversation] = useState(null);

  // Reset sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  // Custom hook for handling clicks outside a component
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiPickerRef]);

  // Filter conversations based on search term
  const filteredConversations = useMemo(() => {
    if (!conversations) return [];
    return conversations.filter((conversation) => {
      const candidate = conversation?.participants?.find(
        (participant) => participant.role !== ROLE.EMPLOYER
      );
      if (!candidate) return false;

      const candidateName = candidate.user_id?.profile?.name || "";
      return candidateName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [conversations, searchTerm]);

  // Reset messages when switching conversations
  useEffect(() => {
    if (prevConversationIdRef.current !== conversationId) {
      setMessages([]);
      prevConversationIdRef.current = conversationId;
    }
  }, [conversationId]);

  // Set messages when messageContent changes
  useEffect(() => {
    if (messageContent) {
      setMessages(messageContent);
    }
  }, [messageContent]);

  // Set current conversation
  useEffect(() => {
    if (conversations && conversationId) {
      const current = conversations.find((conv) => conv._id === conversationId);
      if (current) {
        setCurrentConversation(current);
      }
    } else {
      setCurrentConversation(null);
    }
  }, [conversations, conversationId]);

  // Handle socket connection and messages
  useEffect(() => {
    if (conversationId) {
      // Leave previous conversation if there was one
      if (
        prevConversationIdRef.current &&
        prevConversationIdRef.current !== conversationId
      ) {
        socket.emit("leaveConversation", {
          conversationId: prevConversationIdRef.current,
        });
      }

      // Join new conversation
      socket.emit("joinConversation", { conversationId });

      const handleReceiveMessage = ({ conversationId: convId, message }) => {
        if (convId === conversationId) {
          setMessages((prevMessages) => [...prevMessages, message]);
          refetchConversation();
        }
      };

      socket.on("receiveMessage", handleReceiveMessage);

      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
      };
    }
  }, [conversationId, refetchConversation]);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (conversationId) {
      refetchMessage();
    }
  }, [conversationId, refetchMessage]);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = useCallback(
    (values, { resetForm }) => {
      if (values.textMessage && values.textMessage.trim()) {
        const newMessage = {
          conversationId,
          senderId: user?.user_id,
          content: values.textMessage.trim(),
          timestamp: new Date().toISOString(),
        };

        socket.emit("sendMessage", newMessage);
        resetForm();
        scrollToBottom();
      }
    },
    [conversationId, user?.user_id]
  );

  const handleConversationSelect = useCallback(
    (conversation) => {
      if (conversation._id === conversationId) return; // Skip if already selected

      navigate(`${RouteBase.HRChat}?chat=${conversation._id}`);

      // Close sidebar on mobile after selection
      if (isMobile) {
        setSidebarOpen(false);
      }
    },
    [navigate, conversationId, isMobile]
  );

  // Get current chat user
  const currentChatUser = useMemo(() => {
    if (!currentConversation) return null;

    const candidate = currentConversation?.participants?.find(
      (participant) => participant.role !== ROLE.EMPLOYER
    );

    return candidate?.user_id;
  }, [currentConversation]);

  // Render chat header
  const renderChatHeader = () => {
    if (!currentChatUser) return null;

    return (
      <div className="flex items-center justify-between pb-4 border-b">
        {isMobile && (
          <IconButton
            onClick={() => setSidebarOpen(true)}
            className="mr-2 text-gray-600"
          >
            <CommonIcon.Menu />
          </IconButton>
        )}
        <div className="flex items-center gap-3">
          <Badge
            variant="dot"
            color="success"
            invisible={!currentChatUser?.online}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <CommonAvatar
              src={currentChatUser?.profile?.avatar_url}
              className="border-2 border-white"
            />
          </Badge>
          <div>
            <Typography className="font-medium text-gray-900">
              {currentChatUser?.profile?.name}
            </Typography>
            {/* <Typography className="text-sm text-gray-500">
              {currentChatUser?.online ? "Đang trực tuyến" : "Ngoại tuyến"}
            </Typography> */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip title="Thông tin">
            <IconButton
              size="small"
              className="text-gray-600 hover:text-blue-600"
            >
              <CommonIcon.Info />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  };

  // Render sidebar content
  const renderSidebarContent = () => (
    <>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <Logo path={RouteBase.HROverview} className="h-8" />
            <Typography className="!font-bold !text-sm text-primary">
              Tuyển dụng
            </Typography>
          </div>
          {isMobile && (
            <IconButton onClick={() => setSidebarOpen(false)}>
              <CommonIcon.Close />
            </IconButton>
          )}
        </div>
        <InputBase
          fullWidth
          placeholder="Tìm kiếm người dùng"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startAdornment={<CommonIcon.Search className="mr-2 text-gray-400" />}
          className="bg-gray-100 rounded-full px-4 py-2 text-sm"
        />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-3">
        {isConversationsLoading ? (
          <div className="flex justify-center p-4">
            <CircularProgress size={24} />
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="text-center p-4 text-gray-500">
            Không tìm thấy cuộc trò chuyện nào
          </div>
        ) : (
          <div className="space-y-2">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation._id}
                conversation={conversation}
                isActive={conversation._id === conversationId}
                onClick={() => handleConversationSelect(conversation)}
                lastMessage={conversation.lastMessage}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - responsive implementation */}
      {isMobile ? (
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          PaperProps={{
            sx: {
              width: "85%",
              maxWidth: "320px",
            },
          }}
        >
          <div className="flex flex-col h-full bg-white">
            {renderSidebarContent()}
          </div>
        </Drawer>
      ) : (
        <div
          className={`${
            isTablet ? "w-1/3" : "w-1/4"
          } flex flex-col bg-white border-r border-gray-200`}
        >
          {renderSidebarContent()}
        </div>
      )}

      {/* Chat Area */}
      <div
        className={`${
          isMobile ? "w-full" : isTablet ? "w-2/3" : "w-3/4"
        } flex flex-col bg-white`}
      >
        {conversationId ? (
          <>
            {/* Chat Header */}
            <div className="p-4">{renderChatHeader()}</div>

            {/* Chat Messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 bg-gray-50"
            >
              {isMessagesLoading ? (
                <div className="flex justify-center items-center h-full">
                  <CircularProgress size={32} />
                </div>
              ) : messages?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <img
                    src={emptyChat}
                    alt="No messages"
                    className="h-40 mb-4 opacity-70"
                  />
                  <Typography className="text-gray-500 text-sm text-center px-4">
                    Bắt đầu cuộc trò chuyện của bạn bằng cách gửi tin nhắn đầu
                    tiên
                  </Typography>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={message._id || index}
                      message={message}
                      isCurrentUser={message.sender_id === user?.user_id}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <Formik
                initialValues={{ textMessage: "" }}
                onSubmit={handleSendMessage}
              >
                {({ setFieldValue, values }) => (
                  <Form className="flex items-center gap-2">
                    <div className="relative">
                      <IconButton
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        size="small"
                        className="!text-primary hover:text-blue-600"
                      >
                        <CommonIcon.EmojiEmotions />
                      </IconButton>

                      {showEmojiPicker && (
                        <div
                          ref={emojiPickerRef}
                          className="absolute bottom-12 left-0 shadow-lg rounded-lg z-10"
                          style={{
                            maxWidth: "100vw",
                            transform: isMobile ? "scale(0.8)" : "none",
                            transformOrigin: "bottom left",
                          }}
                        >
                          <Picker
                            data={emojiData}
                            theme="light"
                            onEmojiSelect={(emoji) =>
                              setFieldValue(
                                "textMessage",
                                values.textMessage + emoji.native
                              )
                            }
                          />
                        </div>
                      )}
                    </div>

                    <FormikField
                      name="textMessage"
                      component={InputField}
                      size="large"
                      sx={{
                        fieldset: {
                          borderRadius: "999px",
                        },
                      }}
                      placeholder="Nhập tin nhắn..."
                    />

                    <IconButton
                      type="submit"
                      className="!text-primary hover:bg-blue-50"
                      disabled={!values.textMessage.trim()}
                    >
                      <CommonIcon.SendRounded />
                    </IconButton>
                  </Form>
                )}
              </Formik>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gray-50">
            {isMobile && !conversationId && (
              <IconButton
                onClick={() => setSidebarOpen(true)}
                className="absolute top-4 left-4 text-gray-600"
              >
                <CommonIcon.Menu />
              </IconButton>
            )}
            <img
              src={startConversation}
              alt="Select a conversation"
              className="h-80 mb-4"
            />
            <Typography fontSize={"25px"} className="text-gray-700 font-medium mb-2 text-center px-4">
              Chưa có cuộc trò chuyện nào được chọn
            </Typography>
            <Typography className="text-gray-500 text-sm max-w-md text-center px-4">
              {isMobile
                ? "Nhấn vào biểu tượng menu để chọn cuộc trò chuyện"
                : "Chọn một cuộc trò chuyện từ bên trái để bắt đầu cuộc trò chuyện mới"}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ChatPage);
