import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "../common/prisma.service";
import { Logger } from "winston";

type ProvinceGenderQueryResponse = {
  province: string;
  total_men: bigint;
  total_female: bigint;
};

type EducationQueryResponse = {
  education_level: string;
  jumlah: bigint;
};

type ReligionQueryResponse = {
  religion: string;
  jumlah: bigint;
}

type RaceQueryResponse = {
  race: string;
  jumlah: bigint;
}

type CityQueryResponse = {
  city: string;
  jumlah: bigint;
}

@Injectable()
export class CitizenService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async getByGender(request: any) {
    this.logger.info(`service.getByGender - incoming request ${JSON.stringify(request)}`)
    
    const data = await this.prismaService.$queryRaw<ProvinceGenderQueryResponse[]>`
      SELECT province,
        SUM(CASE WHEN sex = 'male' THEN 1 ELSE 0 END) AS total_men,
        SUM(CASE WHEN sex = 'female' THEN 1 ELSE 0 END) AS total_female
      FROM citizens
      GROUP BY province;
    `;

    return data;
  }

  async getByEducation(request: any) {
    this.logger.info(`service.getByEducation - incoming request ${JSON.stringify(request)}`)
    
    const data = await this.prismaService.$queryRaw<EducationQueryResponse[]>`
      SELECT education_level, SUM(1) AS jumlah
      FROM citizens
      GROUP BY education_level
      ORDER BY jumlah DESC;
    `;

    return data;
  }

  async getByReligion(request: any) {
    this.logger.info(`service.getByReligion - incoming request ${JSON.stringify(request)}`)
    
    const data = await this.prismaService.$queryRaw<ReligionQueryResponse[]>`
      SELECT religion, SUM(1) AS jumlah
      FROM citizens
      GROUP BY religion
      ORDER BY jumlah DESC;
    `;

    return data;
  }

  async getByRace(request: any) {
    this.logger.info(`service.getByReligion - incoming request ${JSON.stringify(request)}`)
    
    const data = await this.prismaService.$queryRaw<RaceQueryResponse[]>`
      SELECT race, SUM(1) AS jumlah
      FROM citizens
      GROUP BY race
      ORDER BY jumlah DESC;
    `;

    return data;
  }

  async getByLocation(request: any) {
    this.logger.info(`service.getByLocation - incoming request ${JSON.stringify(request)}`)
    
    const data = await this.prismaService.$queryRaw<CityQueryResponse[]>`
      SELECT city, SUM(1) AS jumlah
      FROM citizens
      GROUP BY city
      ORDER BY jumlah DESC;
    `;

    return data;
  }
}