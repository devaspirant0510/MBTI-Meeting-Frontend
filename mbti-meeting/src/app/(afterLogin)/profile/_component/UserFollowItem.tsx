import { Follow } from '@/app/_lib/data/entity/Follow';
import { FC } from 'react';
import { Button, Divider } from '@nextui-org/react';
import ProfileNameText from '@/app/_components/atom/ProfileNameText';
import ProfileImageAvatar from '@/app/_components/atom/ProfileImageAvatar';

type Props = {
    follow: Follow
}
const UserFollowItem: FC<Props> = ({ follow }) => {
    return (
        <div>
            <div className={'flex justify-between items-center p-3'}>
                <div className={'flex items-center'}>

                    <ProfileImageAvatar member={follow.follower} />
                    <span className={'ml-4'}>
                        <ProfileNameText member={follow.follower!} />
                    </span>
                </div>
                <Button isDisabled>팔로잉 </Button>
            </div>
            <Divider />
        </div>
    );
};
export default UserFollowItem;