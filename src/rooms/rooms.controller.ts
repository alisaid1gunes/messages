import {Controller, Get, HttpException, HttpStatus} from '@nestjs/common';
import {RoomsService} from './rooms.service';


@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {
    }

    @Get()
    async findAll(): Promise<ControllerResponse<any>> {
        try {
            const result = await this.roomsService.getRooms();
            return {result, message: 'All rooms found'}
        } catch (error) {
            throw new HttpException('Rooms not found', HttpStatus.NOT_FOUND);
        }
    }

}
