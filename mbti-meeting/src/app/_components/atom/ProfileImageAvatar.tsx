import { Avatar } from '@nextui-org/react';
import { Member } from '@/app/_lib/data/entity/Member';
import { FC } from 'react';

type Props = {
    member?: Member,
    size?: 'sm' | 'md' | 'lg',
    constantSize?:number
}
const ProfileImageAvatar: FC<Props> = ({ member, size ,constantSize}) => {
    console.log("profile member " ,member);
    if(!member){
        return <></>
    }
    if (member.profileImage) {
        if(constantSize){
            return (
                <Avatar
                    style={{
                        width:constantSize,
                        height:constantSize
                    }}
                    name={member.mbti?.toString()}
                    src={member.profileImage?.file.profileUrl} />
            );
        }
        return (
            <Avatar
                size={size ? size : 'lg'}
                name={member.mbti?.toString()}
                src={member.profileImage?.file.profileUrl} />
        );
    }
    return (
        <Avatar size={size ? size : 'lg'} name={member.mbti?.toString()} />
    );
};

export default ProfileImageAvatar;