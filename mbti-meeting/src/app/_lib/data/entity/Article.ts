import {Account} from "@/app/_lib/data/entity/Account";
import {ArticleImage} from "@/app/_lib/data/entity/ArticleImage";

export interface Article {
    id:number,
    content:string,
    account:Account,
    images:ArticleImage[],
    likeCount:number,
    commentCount:number,
    createdAt:string
}