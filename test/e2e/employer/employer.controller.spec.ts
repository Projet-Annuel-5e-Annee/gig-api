import { EmployerController } from "../../../src/application/employer/employer.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { EmployerService } from "../../../src/domain/services/employer/employer.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { EmployerEntity } from "../../../src/infrastructure/entities/employer.entity";
import { JobOfferService } from "../../../src/domain/services/job-offer/job-offer.service";
import { CompanyEntity } from "../../../src/infrastructure/entities/company.entity";
import { JobOfferEntity } from "../../../src/infrastructure/entities/job-offer.entity";
import { CompanyService } from "../../../src/domain/services/company/company.service";

describe('EmployerController', () => {
  let controller: EmployerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployerController],
      providers: [
        EmployerService,
        JobOfferService,
        CompanyService,
        {
          provide: getRepositoryToken(EmployerEntity),
          useValue: EmployerEntity
        },
        {
          provide: getRepositoryToken(CompanyEntity),
          useValue: CompanyEntity
        },
        {
          provide: getRepositoryToken(JobOfferEntity),
          useValue: JobOfferEntity
        }
      ],
    }).compile();

    controller = module.get<EmployerController>(EmployerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});