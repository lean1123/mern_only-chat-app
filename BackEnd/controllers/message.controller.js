import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/Socket.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) conversation.messages.push(newMessage._id);

    // await conversation.save();
    // await newMessage.save();

    // This will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // SocketIO funtion here
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessgae", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error at sendMessage in message controller", error.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const convensation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!convensation) return res.status(200).json([]);

    const messages = convensation.messages;

    res.status(201).json(messages);
  } catch (error) {
    console.log("Error at getMessage in message controller", error.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

// 65d8c885052e165b632fbea4
