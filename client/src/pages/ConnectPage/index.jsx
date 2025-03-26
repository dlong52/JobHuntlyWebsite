import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Box, Typography, InputBase, IconButton, useMediaQuery, Drawer, AppBar, Toolbar } from "@mui/material";
import { CommonAvatar, CommonIcon } from "../../ui";
import { cpLogo, emptyChat, startConversation } from "../../assets/images";
import { Logo } from "../../components";
import { Form, Formik } from "formik";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import { useSelector } from "react-redux";
import { useConvertData, useQueryParams } from "../../hooks";
import { RouteBase } from "../../constants/routeUrl";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllConversations } from "../../hooks/modules/conversation/useGetAllConversations";
import { useGetAppliedJobs } from "../../hooks/modules/application/useGetAppliedJobs";
import { ConversationService } from "../../services/ConversationServices";
import { useGetUser } from "../../hooks/modules/user/userGetUser";
import { ROLE } from "../../constants/enum";
import { useGetMessage } from "../../hooks/modules/message/useGetMessage";
import socket from "../../utils/socket";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";

// Component tách biệt cho danh sách hội thoại
const ConversationList = ({ conversations, userId, navigate, activeChat, onConversationSelect, isMobile }) => {
  return (
    <Box className="flex flex-col gap-4">
      {conversations?.map((item) => {
        const companyR = item?.participants?.filter(
          (participant) => participant.role !== ROLE.CANDIDATE
        ) || [];
        
        const isActive = item._id === activeChat;
        
        return (
          <div
            onClick={() => {
              navigate(`${RouteBase.Connect}?chat=${item._id}`);
              onConversationSelect(item._id);
            }}
            key={item._id}
            className={`flex items-center gap-2 p-3 md:p-5 ${isActive ? 'bg-primary-light' : 'bg-slate-50'} rounded-md cursor-pointer`}
          >
            <CommonAvatar
              src={companyR[0]?.user_id?.company?.logo}
              className="!border !min-w-8"
            />
            <Box className="overflow-hidden">
              <Typography
                fontSize={isMobile ? "14px" : "16px"}
                color="var(--neutrals-100)"
                fontWeight={500}
                className="line-clamp-1"
              >
                {companyR[0]?.user_id?.company?.name}
              </Typography>
              <Typography
                fontSize={isMobile ? "12px" : "14px"}
                color="var(--neutrals-60)"
                fontWeight={400}
                className="truncate w-full"
              >
                {item?.last_message?.sender_id === userId && "Bạn: "}
                {item?.last_message?.content}
              </Typography>
            </Box>
          </div>
        );
      })}
    </Box>
  );
};

// Component tách biệt cho danh sách công việc đã ứng tuyển
const AppliedJobsList = ({ jobs, handleCreateConversation, isMobile }) => {
  return (
    <Box className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-10">
      {jobs?.map((item) => (
        <Box key={item?._id} className="flex items-center gap-2 md:gap-5 overflow-hidden w-full">
          <div className="flex w-4/5 gap-2 md:gap-3">
            <img
              src={item?.company?.logo || cpLogo}
              alt=""
              className="w-8 md:w-10 h-8 md:h-10 rounded-full object-cover"
            />
            <Box className="flex flex-col w-full">
              <span className="font-semibold text-xs md:text-sm truncate w-[150px]">
                {item?.title}
              </span>
              <span className="text-neutrals-60 text-xs md:text-sm truncate w-[150px]" >
                {item?.company?.name}
              </span>
            </Box>
          </div>
          <Link
            to={`${RouteBase.Connect}?id=${item?.posted_by}`}
            onClick={() => handleCreateConversation(item?.posted_by)}
            className="!bg-primary-light text-nowrap !rounded-full !text-primary h-fit py-1 px-2 text-xs font-medium ml-auto"
          >
            Nhắn tin
          </Link>
        </Box>
      ))}
    </Box>
  );
};

// Component tách biệt cho phần gửi tin nhắn
const MessageInput = ({ onSendMessage, showEmojiPicker, setShowEmojiPicker, emojiRef, buttonRef, isMobile }) => {
  return (
    <Formik
      initialValues={{ textMessage: "" }}
      onSubmit={onSendMessage}
    >
      {({ setFieldValue, values }) => (
        <Form className="mt-2 md:mt-5 flex items-center gap-2 md:gap-3 p-3 md:p-5 w-full relative">
          <IconButton
            ref={buttonRef}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            size={isMobile ? "small" : "medium"}
          >
            <CommonIcon.EmojiEmotions className="!text-primary !text-[24px] md:!text-[30px]" />
          </IconButton>
          {showEmojiPicker && (
            <Box
              ref={emojiRef}
              sx={{
                position: "absolute",
                bottom: isMobile ? "80px" : "100px",
                left: "20px",
                maxWidth: isMobile ? "calc(100vw - 40px)" : "auto"
              }}
              className="shadow rounded-[9px]"
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
            </Box>
          )}
          <FormikField
            name="textMessage"
            component={InputField}
            size="small"
            sx={{
              fieldset: {
                borderRadius: "999px",
              },
              fontSize: isMobile ? "14px" : "16px",
            }}
            placeholder="Nhập tin nhắn..."
          />
          <button type="submit">
            <CommonIcon.SendRounded
              sx={{
                color: "var(--primary)",
                cursor: "pointer",
                fontSize: isMobile ? "24px" : "30px",
              }}
            />
          </button>
        </Form>
      )}
    </Formik>
  );
};

// Component chính
const ConnectPage = () => {
  const navigate = useNavigate();
  const { id, chat } = useQueryParams();
  const user = useSelector((state) => state.user);
  
  // Media queries
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(min-width:769px) and (max-width:1024px)');
  
  // State
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(chat || "");
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  
  // Refs
  const boxRef = useRef(null);
  const emojiRef = useRef(null);
  const buttonRef = useRef(null);

  // Lấy thông tin người nhận
  const { data: userData } = useGetUser(id, { enabled: !!id });
  const { dataConvert: receiver } = useConvertData(userData);
  
  // Lấy danh sách công việc đã ứng tuyển
  const { data, isLoading: isLoadingJobs } = useGetAppliedJobs(user?.user_id, {});
  const { dataConvert: appliedJobs } = useConvertData(data);
  
  // Lấy danh sách hội thoại
  const { data: cvsData, refetch: refetchConversation } = useGetAllConversations(user?.user_id);
  const { dataConvert: conversations } = useConvertData(cvsData);
  
  // Lấy tin nhắn
  const conversationId = chat || id;
  const { data: messageData, refetch: refetchMessage } = useGetMessage(
    conversationId,
    { 
      enabled: !!conversationId,
      chat
    }
  );
  const { dataConvert: messageContent } = useConvertData(messageData);

  // Cập nhật activeConversationId khi chat thay đổi
  useEffect(() => {
    if (chat) {
      setActiveConversationId(chat);
      // Đóng drawer khi chọn hội thoại trên mobile
      if (isMobile) {
        setLeftDrawerOpen(false);
      }
    }
  }, [chat, isMobile]);

  // Cập nhật tin nhắn khi có dữ liệu mới hoặc khi chuyển hội thoại
  useEffect(() => {
    if (messageContent) {
      setMessages(messageContent);
    } else {
      setMessages([]);
    }
  }, [messageContent, activeConversationId]);

  // Đảm bảo refetch message khi chuyển đổi hội thoại
  useEffect(() => {
    if (conversationId) {
      refetchMessage();
    }
  }, [conversationId, refetchMessage]);

  // Xử lý khi chọn hội thoại
  const handleConversationSelect = useCallback((conversationId) => {
    setActiveConversationId(conversationId);
    setMessages([]); // Reset messages khi chuyển hội thoại để tránh hiển thị tin nhắn cũ
  }, []);

  // Xử lý tạo hội thoại mới
  const handleCreateConversation = useCallback(async (receiverId) => {
    try {
      const targetId = receiverId || receiver?._id;
      if (!!userData && !!user?.user_id && !!targetId) {
        await ConversationService.createConversation({
          participants: [
            {
              user_id: user?.user_id,
              username: user?.username,
              role: user?.role,
            },
            {
              user_id: targetId,
              username: receiver?.profile?.name,
              role: receiver?.role.name,
            },
          ],
        });
        refetchConversation();
        
        // Đóng drawer sau khi tạo hội thoại mới trên mobile
        if (isMobile) {
          setRightDrawerOpen(false);
        }
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  }, [userData, user, receiver, refetchConversation, isMobile]);

  // Xử lý gửi tin nhắn
  const handleSendMessage = useCallback(async (values, { resetForm }) => {
    try {
      if (values.textMessage.trim()) {
        const newMessage = {
          conversationId,
          senderId: user?.user_id,
          content: values.textMessage,
        };
        socket.emit("sendMessage", newMessage);
        resetForm();
        setShowEmojiPicker(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [conversationId, user?.user_id]);

  // Tìm hội thoại hiện tại dựa trên id trong URL
  useEffect(() => {
    if (!!id && conversations?.length) {
      const existingConversation = conversations.find((conversation) =>
        conversation.participants.some(
          (participant) =>
            participant.user_id._id === id && participant.role === ROLE.EMPLOYER
        )
      );
      if (existingConversation) {
        navigate(`${RouteBase.Connect}?chat=${existingConversation._id}`);
        setActiveConversationId(existingConversation._id);
      }
    }
  }, [id, conversations, navigate]);

  // Thiết lập hội thoại hiện tại dựa trên tham số chat
  useEffect(() => {
    if (chat && conversations?.length) {
      const foundConversation = conversations.find(
        (conversation) => conversation._id === chat
      );
      if (foundConversation) {
        setCurrentConversation(foundConversation);
      }
    }
  }, [chat, conversations]);

  // Thiết lập socket để nhận tin nhắn mới
  useEffect(() => {
    if (!conversationId) return;
    
    socket.emit("joinConversation", { conversationId });
    
    const handleReceiveMessage = ({ conversationId: convId, message }) => {
      if (convId === conversationId) {
        setMessages((prevMessages) => [...prevMessages, message]);
        refetchMessage();
        refetchConversation();
        if (boxRef.current) {
          boxRef.current.scrollTop = boxRef.current.scrollHeight;
        }
      }
    };
    
    socket.on("receiveMessage", handleReceiveMessage);
    
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [conversationId, refetchMessage, refetchConversation]);

  // Cuộn xuống dưới khi có tin nhắn mới
  useEffect(() => {
    if (boxRef.current && messages?.length > 0) {
      setTimeout(() => {
        if (boxRef.current) {
          boxRef.current.scrollTop = boxRef.current.scrollHeight;
        }
      }, 100); // Thêm một chút độ trễ để đảm bảo DOM đã được cập nhật
    }
  }, [messages]);

  // Đóng emoji picker khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Memoized components để tránh re-render không cần thiết
  const employerInfo = useMemo(() => {
    if (!currentConversation) return null;
    
    const employers = currentConversation.participants
      .filter(participant => participant.role === ROLE.EMPLOYER);
      
    if (!employers || employers.length === 0) return null;
      
    return employers.map(participant => (
      <Box className="flex p-3 md:p-5 shadow-sm border-b items-center gap-2" key={participant.user_id._id}>
        <CommonAvatar
          src={participant.user_id?.company?.logo}
          className="!border !w-8 !h-8 md:!w-10 md:!h-10"
        />
        <Typography
          fontSize={isMobile ? "14px" : "16px"}
          color="var(--neutrals-100)"
          fontWeight={500}
          className="line-clamp-1"
        >
          {participant.user_id?.company?.name}
        </Typography>
      </Box>
    ));
  }, [currentConversation, isMobile]);

  // Hiển thị nội dung tin nhắn
  const renderMessages = useMemo(() => {
    if (!messages || messages.length === 0) {
      if (!currentConversation) return null;
      
      const employers = currentConversation.participants
        .filter(participant => participant.role === ROLE.EMPLOYER);
      
      if (!employers || employers.length === 0) return null;
      
      return (
        <Box className="size-full flex flex-col gap-4 items-center justify-center p-4">
          {employers.map(participant => (
            <Box className="flex flex-col items-center gap-2" key={participant.user_id._id}>
              <CommonAvatar
                src={participant.user_id?.company?.logo}
                className="!border !size-[60px] md:!size-[80px]"
              />
              <Typography
                fontSize={isMobile ? "14px" : "16px"}
                color="var(--neutrals-100)"
                fontWeight={500}
                className="line-clamp-1 text-center"
              >
                {participant.user_id?.company?.name}
              </Typography>
              <Typography
                className="!text-neutrals-80 text-center"
                fontSize={isMobile ? "12px" : "14px"}
              >
                Hãy bắt đầu cuộc trò chuyện bằng một lời chào 😍
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    
    return (
      <Box className="flex flex-col gap-2 md:gap-3">
        {messages.map((message) => (
          <Box
            key={message?._id || Math.random().toString()}
            className={`flex px-3 md:px-5 ${
              message?.sender_id === user?.user_id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <Typography
              sx={{
                padding: isMobile ? "6px 10px" : "8px 12px",
                maxWidth: isMobile ? "85%" : "70%",
                wordBreak: "break-word",
              }}
              className={`${
                message.sender_id === user?.user_id
                  ? "!text-white !bg-primary"
                  : "!bg-primary-light !text-primary"
              } !text-xs md:!text-sm rounded-full`}
            >
              {message?.content}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }, [messages, currentConversation, user?.user_id, isMobile]);

  // Nội dung sidebar trái
  const leftSidebarContent = (
    <>
      <Box className={isMobile ? "p-4" : "p-5"}>
        <Logo />
        <Box className="my-4">
          <InputBase
            fullWidth
            placeholder="Tên công ty, tên nhà tuyển dụng"
            startAdornment={<CommonIcon.Search sx={{ marginRight: "8px" }} />}
            sx={{
              background: "#f5f5f5",
              borderRadius: "999px",
              padding: isMobile ? "8px 10px" : "10px 12px",
              fontSize: isMobile ? "12px" : "14px",
            }}
          />
        </Box>
        <ConversationList 
          conversations={conversations} 
          userId={user?.user_id} 
          navigate={navigate}
          activeChat={activeConversationId}
          onConversationSelect={handleConversationSelect}
          isMobile={isMobile}
        />
        {userData && (
          <div className="flex items-center gap-2 p-3 md:p-5 bg-slate-50 mt-4">
            <CommonAvatar  
              src={receiver?.company?.logo} 
              className="!border !w-8 !h-8 md:!w-10 md:!h-10" 
            />
            <Typography 
              fontSize={isMobile ? "14px" : "16px"} 
              color="var(--neutrals-100)" 
              fontWeight={500}
            >
              {receiver?.company?.name}
            </Typography>
          </div>
        )}
      </Box>
    </>
  );

  // Nội dung sidebar phải
  const rightSidebarContent = (
    <Box className={isMobile ? "p-4" : "p-5"}>
      <Typography className="!font-semibold" fontSize={isMobile ? "14px" : "16px"}>
        Tin tuyển dụng đã ứng tuyển
      </Typography>
      <AppliedJobsList 
        jobs={appliedJobs} 
        handleCreateConversation={handleCreateConversation} 
        isMobile={isMobile}
      />
    </Box>
  );

  // Giá trị width cho các sidebar
  const leftDrawerWidth = isMobile ? "85%" : isTablet ? "35%" : "25%";
  const rightDrawerWidth = isMobile ? "85%" : isTablet ? "35%" : "25%";

  return (
    <>
      {/* Mobile AppBar */}
      {isMobile && (
        <AppBar position="fixed" sx={{ backgroundColor: "white", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="primary"
              onClick={() => setLeftDrawerOpen(true)}
            >
              <CommonIcon.Menu />
            </IconButton>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "var(--primary)", textAlign: "center" }}>
              {currentConversation ? 
                currentConversation.participants.find(p => p.role === ROLE.EMPLOYER)?.user_id?.company?.name || "Chat" : 
                "Chat"}
            </Typography>
            
            <IconButton
              edge="end"
              color="primary"
              onClick={() => setRightDrawerOpen(true)}
            >
              <CommonIcon.Work />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Responsive Layout */}
      <Box className="fixed inset-0 grid grid-cols-1 md:grid-cols-12" sx={{ paddingTop: isMobile ? "56px" : 0 }}>
        {/* Sidebar trái - Desktop và Tablet */}
        {!isMobile && (
          <Box className={`hidden md:block ${isTablet ? 'md:col-span-4' : 'md:col-span-3'} bg-white rounded-md border-r overflow-y-auto`}>
            {leftSidebarContent}
          </Box>
        )}

        {/* Sidebar trái - Mobile (Drawer) */}
        {isMobile && (
          <Drawer
            anchor="left"
            open={leftDrawerOpen}
            onClose={() => setLeftDrawerOpen(false)}
            sx={{
              '& .MuiDrawer-paper': { width: leftDrawerWidth, boxSizing: 'border-box' },
            }}
          >
            {leftSidebarContent}
          </Drawer>
        )}

        {/* Chat Area */}
        <Box className={`col-span-1 ${isTablet ? 'md:col-span-8' : 'md:col-span-6'} flex flex-col justify-end bg-white rounded-md overflow-hidden`}>
          {/* Trạng thái không có hội thoại */}
          {!!conversations?.length && !chat && (
            <Box className="size-full flex flex-col gap-2 items-center justify-center p-4">
              <img src={startConversation} className="w-1/2 md:w-1/3" alt="Bắt đầu cuộc trò chuyện" />
              <Typography fontSize={isMobile ? "14px" : "16px"} className="!text-neutrals-80 text-center">
                Hãy bắt đầu cuộc trò chuyện của bạn với nhà tuyển dụng nào đó
              </Typography>
            </Box>
          )}
          {!conversations?.length && (
            <Box className="size-full flex flex-col gap-4 items-center justify-center p-4">
              <img src={emptyChat} alt="Không có tin nhắn" className="w-[150px] md:w-[200px]" />
              <Typography fontSize={isMobile ? "14px" : "16px"} className="!text-neutrals-80 text-center">
                Không có cuộc trò chuyện nào
              </Typography>
              <Typography fontSize={isMobile ? "12px" : "14px"} className="!text-neutrals-60 text-center">
                Hãy bắt đầu cuộc trò chuyện với nhà tuyển dụng nào đó
              </Typography>
            </Box>
          )}

          {/* Khu vực hiển thị tin nhắn */}
          {!!chat && (
            <>
              {/* Thông tin người nhận từ tham số URL - Trên desktop */}
              {!isMobile && userData && (
                <div className="flex items-center gap-2 p-3 md:p-5 border-b">
                  <CommonAvatar 
                    src={receiver?.company?.logo} 
                    className="!border !w-8 !h-8 md:!w-10 md:!h-10" 
                  />
                  <Typography 
                    fontSize={isMobile ? "14px" : "16px"} 
                    color="var(--neutrals-100)" 
                    fontWeight={500}
                  >
                    {receiver?.company?.name}
                  </Typography>
                </div>
              )}
              
              {/* Thông tin người nhận từ hội thoại */}
              {!isMobile && employerInfo}
              
              {/* Box tin nhắn */}
              <Box 
                ref={boxRef} 
                className="flex-1 overflow-y-auto py-4 md:py-14 max-h-[calc(100vh-140px)] md:max-h-[500px]"
              >
                {renderMessages}
              </Box>
              
              {/* Input gửi tin nhắn */}
              <MessageInput 
                onSendMessage={handleSendMessage}
                showEmojiPicker={showEmojiPicker}
                setShowEmojiPicker={setShowEmojiPicker}
                emojiRef={emojiRef}
                buttonRef={buttonRef}
                isMobile={isMobile}
              />
            </>
          )}
        </Box>

        {/* Sidebar phải - Desktop và Tablet */}
        {!isMobile && (
          <Box className={`hidden md:block ${isTablet ? 'md:col-span-4' : 'md:col-span-3'} border-l bg-white overflow-y-auto`}>
            {rightSidebarContent}
          </Box>
        )}

        {/* Sidebar phải - Mobile (Drawer) */}
        {isMobile && (
          <Drawer
            anchor="right"
            open={rightDrawerOpen}
            onClose={() => setRightDrawerOpen(false)}
            sx={{
              '& .MuiDrawer-paper': { width: rightDrawerWidth, boxSizing: 'border-box' },
            }}
          >
            {rightSidebarContent}
          </Drawer>
        )}
      </Box>
    </>
  );
};

export default ConnectPage;