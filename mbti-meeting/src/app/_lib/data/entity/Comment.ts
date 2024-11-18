import { Article } from '@/app/_lib/data/entity/Article';
import { Account } from '@/app/_lib/data/entity/Account';

export interface Comment {
    id: number | null;  // id는 nullable
    content: string;    // 댓글 내용
    createdAt: string;  // 댓글 작성 시간 (ISO 날짜 형식)
    likeCount: number;  // 좋아요 수
    article: Article;   // 연결된 게시글
    account: Account;   // 댓글 작성자
}