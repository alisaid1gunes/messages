import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomDTO } from './dto/room.dto';

class RoomServiceMock {
  async getRooms(): Promise<RoomDTO[]> {
    const roomDTOs: RoomDTO[] = [
      {
        id: 1,
        lastMessage: {
          content: 'Sample content',
          createdAt: new Date().toISOString(),
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
      // Add other room objects here
    ];

    return roomDTOs;
  }
}

describe('RoomsController', () => {
  let controller: RoomsController;
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [{ provide: RoomsService, useClass: RoomServiceMock }],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return rooms', async () => {
    const rooms = await controller.findAll();
    expect(rooms.result).toBeDefined();
    expect(rooms.result.length).toBeGreaterThan(0);
  });

  it('should call getRooms method of RoomsService', async () => {
    const getRoomsSpy = jest.spyOn(service, 'getRooms');
    await controller.findAll();
    expect(getRoomsSpy).toHaveBeenCalled();
  });

  it('should throw an error if getRooms method of RoomsService throws an error', async () => {
    const errorMessage = 'Rooms not found';
    jest.spyOn(service, 'getRooms').mockRejectedValue(new Error(errorMessage));

    try {
      await controller.findAll();
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
