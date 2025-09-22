export interface BookCard {
  id: number;
  tieuDe: string;
  gia: number;
  anh?: string;
}
export interface BookDetail extends BookCard {
  moTa?: string;
  assets?: { loai: "PDF" | "EPUB" | "PREVIEW"; url: string }[];
}
