export interface Content {
  type: "narration" | "dialogue";
  speaker?: string;
  content: string;
}

export interface Mop {
  id: string;
  title: string;
  date: string;
  tags: string[];
  credit?: string;
  content: Content[];
}
