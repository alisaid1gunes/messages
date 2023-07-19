import { Test, TestingModule } from '@nestjs/testing';
import { SeedService } from './seed.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Room } from '../rooms/entities/room.entity';
import {RoomMessage} from "../room-messages/entities/rom-message.entity";

describe('SeedService', () => {
  let seedService: SeedService;
  let userRepository: Repository<User>;
  let roomRepository: Repository<Room>;
  let roomMessageRepository: Repository<RoomMessage>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Room),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(RoomMessage),
          useClass: Repository,
        },
      ],
    }).compile();

    seedService = module.get<SeedService>(SeedService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roomRepository = module.get<Repository<Room>>(getRepositoryToken(Room));
    roomMessageRepository = module.get<Repository<RoomMessage>>(
        getRepositoryToken(RoomMessage)
    );


    jest.spyOn(userRepository, 'save').mockResolvedValue(Promise.resolve<User>({} as User));
    jest.spyOn(roomRepository, 'save').mockResolvedValue(Promise.resolve<Room>({} as Room));
    jest.spyOn(roomMessageRepository, 'save').mockResolvedValue(
        Promise.resolve<RoomMessage>({} as RoomMessage)
    );
  });

  describe('seed', () => {
    it('should seed data', async () => {

      await seedService.seed();


      expect(userRepository.save).toHaveBeenCalledTimes(10);
      expect(roomRepository.save).toHaveBeenCalledTimes(5);
      expect(roomMessageRepository.save).toHaveBeenCalledTimes(20);
    });
  });
});
