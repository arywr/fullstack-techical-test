import { Controller, Get, HttpCode } from "@nestjs/common";
import { CitizenService } from "./citizen.service";

@Controller("/api/citizens")
export class CitizenController {
  constructor(private citizenService: CitizenService) {}

  @Get('/genders')
  @HttpCode(200)
  async getByGender(): Promise<any> {
    const response = await this.citizenService.getByGender({}); 
    return { data: response };
  }  

  @Get('/educations')
  @HttpCode(200)
  async getByEducation(): Promise<any> {
    const response = await this.citizenService.getByEducation({}); 
    return { data: response };
  }

  @Get('/religions')
  @HttpCode(200)
  async getByReligion(): Promise<any> {
    const response = await this.citizenService.getByReligion({}); 
    return { data: response };
  }

  @Get('/races')
  @HttpCode(200)
  async getByRace(): Promise<any> {
    const response = await this.citizenService.getByRace({}); 
    return { data: response };
  }
  
  @Get('/locations')
  @HttpCode(200)
  async getByLocations(): Promise<any> {
    const response = await this.citizenService.getByLocation({}); 
    return { data: response };
  }
}