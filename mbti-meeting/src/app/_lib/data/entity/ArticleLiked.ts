import { Article } from '@/app/_lib/data/entity/Article';
import { Account } from '@/app/_lib/data/entity/Account';

export interface ArticleLiked {
    id:number;
    article:Article,
    account:Account,
    likedAt:string
}