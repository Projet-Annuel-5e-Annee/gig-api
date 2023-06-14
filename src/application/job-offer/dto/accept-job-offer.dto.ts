import { ExtraJobRequestEntity } from "../../../infrastructure/entities/extra-job-request.entity";
import {ApiProperty} from "@nestjs/swagger";

export class AcceptJobOfferDto {
  @ApiProperty()
  company_id: number;
  @ApiProperty()
  job_title: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  is_available: boolean;
  @ApiProperty()
  spots: number;
  @ApiProperty({type: ExtraJobRequestEntity, isArray: true})
  requests: ExtraJobRequestEntity[];
}