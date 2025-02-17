"use client";

import { Consumer } from "@/components/fragments/consumer";
import { Producer } from "@/components/fragments/producer";
import { useEffect, useState } from "react";

type Message = {
  text: string,
  value: string,
}

type MessageResponse = {
  data: [Message]
}

const KafkaMessagePage = () => {
  const [message, setMessage] = useState<string[]>([]);
  
  const fetchMessage = async () => {
    const messages = [];
    const res = await fetch('http://localhost:3005/api/messages')
    const data: MessageResponse = await res.json()
    for (let index = 0; index < data?.data?.length; index++) {
      const element = data?.data[index];
      messages.push(element?.text);
    }

    setMessage(messages);
  }

  useEffect(() => {
    fetchMessage();
    const interval = setInterval(fetchMessage, 1000); // Fetch every 1 second
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-16">
      <div>
        <Producer />
      </div>
      <div>
        <Consumer data={message} />
      </div>
    </div>
  )
}

export default KafkaMessagePage;