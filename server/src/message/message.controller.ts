import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from "@nestjs/common";
import { MessageService } from "./message.service";
import { SendMessageRequest } from "request/message.request";

@Controller("/api/messages")
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('')
  @HttpCode(200)
  async index(): Promise<any> {
    const response = await this.messageService.getMessages();
    return { data: response };
  }

  @Post('/send')
  @HttpCode(200)
  async send(
    @Body() request: SendMessageRequest
  ): Promise<any> {
    try {
      const response = await this.messageService.sendMessage(request); 
      return { data: response };
    } catch (error) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error,
      })
    }
  }
}