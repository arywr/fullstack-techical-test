"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useSendMessageMutation } from "@/service/message";

type ProducerForm = {
  message: string
}

export function Producer() {
  const [message, setMessage] = useState<string[]>([]);

  const [sendMessage] = useSendMessageMutation();

  const form = useForm<ProducerForm>({
    defaultValues: {
      message: "value"
    }
  });

  const onSubmit = async (data: ProducerForm) => {
    try {
      await sendMessage({ value: data.message, key: "key" }).unwrap();
      form.reset();
      const temp = message;
      temp.push(data.message);
      setMessage(temp);
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <h1 className="text-lg font-semibold">Producer</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((el, index) => (
          <div key={`${index}`} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            <p className="text-sm">{el}</p>
          </div>
        ))}
      </main>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <footer className="flex items-center space-x-2 p-2 border-t">
          <Input {...form.register("message")} className="flex-1" placeholder="Type a message" />
          <Button size="sm" type="submit">Send</Button>
        </footer>
      </form>
    </>
  )
}