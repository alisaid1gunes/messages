import {RoomDTO} from "../dto/room.dto";
import {UserDTO} from "../dto/user.dto";
import {Injectable} from "@nestjs/common";

@Injectable()
export class RoomMapper {

    public mapRoomToDTO(room: any): RoomDTO {
        const sender = this.mapUserToDTO(room.messages[0]?.sender);
        const receiver = this.mapUserToDTO(room.messages[0]?.receiver);

        return {
            id: room.id,
            lastMessage: {
                content: room.messages[0]?.content,
                createdAt: room.messages[0]?.createdAt.toISOString(),
                sender,
                receiver,
            }

        };
    }

    public mapUserToDTO(user: any): UserDTO {

        return {
            id: user.id,
            fullName: user.fullName,
            photo: user.photo,
        };
    }
}
