import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import {RoomMapper} from "./mapper/RoomMapper";
import {Pagination} from "../shared/pagination";

describe('RoomsService', () => {
  let service: RoomsService;
  let roomRepositoryMock: Repository<Room>;
  let roomMapperMock: any;

  beforeEach(async () => {
    roomMapperMock = {
      mapRoomToDTO: jest.fn().mockImplementation((room) => {
        return {
          id: room.id,
          lastMessage: room.messages[0],
        };
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: getRepositoryToken(Room),
          useClass: Repository, // Use the actual Repository class
        },
        {
          provide: RoomMapper,
          useValue: roomMapperMock,
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
    roomRepositoryMock = module.get<Repository<Room>>(getRepositoryToken(Room));
  });

  it('should return rooms', async () => {
    const mockRooms: any[] = [
      {
        id: 1,
        createdAt: '2023-07-19T01:21:34.568Z',
        isDeleted: false,
        messages: [
          {
            id: 1,
            content: 'Sample message',
            createdAt: '2023-07-19T01:21:34.568Z',
            sender: {
              id: 1,
              fullName: 'John Doe',
              photo: 'http://example.com/johndoe.jpg',
            },
            receiver: {
              id: 2,
              fullName: 'Jane Smith',
              photo: 'http://example.com/janesmith.jpg',
            },
          },
        ],
      },
    ];

    jest.spyOn(roomRepositoryMock, 'createQueryBuilder').mockReturnValueOnce({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValueOnce(mockRooms),
    } as any);

    const roomDTOs: any[] = [
      {
        id: 1,
        lastMessage: {
          id: 1,
          content: 'Sample message',
          createdAt: '2023-07-19T01:21:34.568Z',
          sender: {
            id: 1,
            fullName: 'John Doe',
            photo: 'http://example.com/johndoe.jpg',
          },
          receiver: {
            id: 2,
            fullName: 'Jane Smith',
            photo: 'http://example.com/janesmith.jpg',
          },
        },
      },
    ];

    const result = await service.getRooms(new Pagination(1, 5));

    expect(result).toEqual({ rooms: roomDTOs });
    expect(roomRepositoryMock.createQueryBuilder).toHaveBeenCalled();
    expect(roomMapperMock.mapRoomToDTO).toHaveBeenCalledTimes(mockRooms.length);
  });
});
