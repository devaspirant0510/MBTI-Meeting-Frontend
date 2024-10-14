import {Article} from "@/app/_lib/data/entity/Article";
import {FC} from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Avatar} from "@nextui-org/react";
import {FavoriteBorder, Favorite,ChatBubbleOutline} from '@mui/icons-material';
type Props = {
    article: Article
}
const ArticleCard: FC<Props> = ({article}: Props) => {
    return (
        <Card >
            <CardHeader>
                <Avatar className={'mr-2'} name={article.account.member?.mbti?.toString()}/>
                <div className={'flex items-end'}>
                    <span className={'text-sm text-gray-500 mr-1'}>{article.account.member?.mbti?.toString()}</span>
                    <span className={'text-lg font-medium'}>{article.account.member?.nickName}</span>
                </div>
            </CardHeader>
            <CardBody>
                {article.content}
            </CardBody>
            <CardFooter>
                <FavoriteBorder />
                <ChatBubbleOutline/>
            </CardFooter>
        </Card>
    )

}
export default ArticleCard