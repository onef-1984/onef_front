export type GetEditorsPick = {
  id: string;
  description: string;
  createdAt: string;
  report: {
    id: string;
    title: string;
    book: {
      cover: string;
    };
    user: {
      nickname: string;
    };
  };
};
