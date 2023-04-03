import { Repository } from "typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { EntityCondition } from "../../../src/domain/utils/types/entity-condition.type";
import { ExtraService } from "../../../src/domain/services/extra/extra.service";
import { ExtraEntity } from "../../../src/infrastructure/entities/extra.entity";
import { ExtraDto } from "../../../src/application/extra/dto/extra.dto";

describe('ExtraService', () => {
  let service: ExtraService;
  let repository: Repository<ExtraEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExtraService,
        {
          provide: getRepositoryToken(ExtraEntity),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
            create: jest.fn().mockReturnValue({
                id: 1,
                user_id: 1,
                first_name: 'John',
                last_name: 'Doe',
                date_of_birth: new Date("2023-04-02T13:15:43.636Z"),
                address: '123 Test Street',
                function: 'Test',
                updated_at: new Date("2023-04-02T13:15:43.636Z"),
              }
            ),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExtraService>(ExtraService);
    repository = module.get<Repository<ExtraEntity>>(
      getRepositoryToken(ExtraEntity),
    );
  });

  describe('create', () => {
    it('should create a new extra', async () => {
      const mockExtra: ExtraEntity = {
        id: 1,
        user_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: new Date("2023-04-02T13:15:43.636Z"),
        address: '123 Test Street',
        function: 'Test',
        updated_at: new Date("2023-04-02T13:15:43.636Z"),
      };
      const createExtraDto: ExtraDto = {
        user_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: new Date("2023-04-02T13:15:43.636Z"),
        address: '123 Test Street',
        function: 'Test',
      };

      const extraRepositorySaveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(mockExtra);

      const result = await service.create(createExtraDto);

      expect(extraRepositorySaveSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockExtra);
    });
  });

  describe('findAll', () => {
    it('should return all extras', async () => {
      const extras = [
        {
          id: 1,
          user_id: 1,
          first_name: 'John',
          last_name: 'Doe',
          date_of_birth: new Date("2023-04-02T13:15:43.636Z"),
          address: '123 Test Street',
          function: 'Test',
          updated_at: new Date("2023-04-02T13:15:43.636Z"),
        },
        {
          id: 2,
          user_id: 2,
          first_name: 'Mark',
          last_name: 'Johns',
          date_of_birth: new Date("2023-04-02T13:15:43.636Z"),
          address: '321 Test Street',
          function: 'Test',
          updated_at: new Date("2023-04-02T13:15:43.636Z"),
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(extras as any);
      const result = await service.findAll();
      expect(result).toEqual(extras);
    });
  });

  describe('findOne', () => {
    it('should find and return a extra by fields', async () => {
      const fields: EntityCondition<ExtraEntity> = { id: 1 };
      const extra = {
        id: 1,
        user_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: new Date("2023-04-02T13:15:43.636Z"),
        address: '123 Test Street',
        function: 'Test',
        updated_at: new Date("2023-04-02T13:15:43.636Z"),
      };
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(extra as any);
      const result = await service.findOne(fields);
      expect(result).toEqual(extra);
    });
  });

  describe('update', () => {
    it('should update and return a user by id and update dto', async () => {
      const id = 1;
      const updateUserDto = { function: 'new function' };
      const extra = {
        id: 1,
        user_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: new Date("2023-04-02T13:15:43.636Z"),
        address: '123 Test Street',
        function: 'Test',
        updated_at: new Date("2023-04-02T13:15:43.636Z"),
      };
      jest.spyOn(repository, 'save').mockResolvedValueOnce(extra as any);
      const result = await service.update(id, updateUserDto);
      expect(result).toEqual(extra);
    });
  });

  describe('remove', () => {
    it('should delete a user by id', async () => {
      const id = 1;
      jest.spyOn(repository, 'delete').mockResolvedValueOnce(undefined as any);
      const result = await service.remove(id);
      expect(result).toBeUndefined();
    });
  });
});
