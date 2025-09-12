export interface Book {
  id: number;
  tieuDe: string;
  gia: number;
  anh?: string;
}
export interface BookDetail extends Book {
  moTa?: string;
  assets?: { loai: "PDF" | "EPUB" | "PREVIEW"; url: string }[];
}
