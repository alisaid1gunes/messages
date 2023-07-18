import {Controller, Get, HttpException, HttpStatus} from '@nestjs/common';
import {RoomService} from './rooms.service';
import {RoomDTO} from "./dto/room.dto";


@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomService: RoomService) {
    }

    @Get()
    async findAll(): Promise<ControllerResponse<any>> {
        try {
            const result = await this.roomService.getRooms();
            return {result, message: 'All rooms found'}
        } catch (error) {
            throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
        }
    }

}
