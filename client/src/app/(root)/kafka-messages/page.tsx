"use client";

import { Consumer } from "@/components/fragments/consumer";
import { Producer } from "@/components/fragments/producer";
import { useGetMessagesQuery } from "@/service/message";
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

  const { data } = useGetMessagesQuery(null, { pollingInterval: 1000 });

  useEffect(() => {
    const messages = [];
    for (let index = 0; index < data?.data?.length; index++) {
      const element = data?.data[index];
      messages.push(element?.text);
    }

    setMessage(messages);
  }, [data]);

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