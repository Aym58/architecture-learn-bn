interface GetPostListItemDto {
  id: number;
  text: string;
  project: { id: number };
}

export interface GetPostListDto {
  list: GetPostListItemDto[];
}
