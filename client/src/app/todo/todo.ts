export class Todo {
    _id: string;
    owner: string;
    status: boolean;
    body: string;
    category: string;
  }

  export type TodoCategory = 'groceries' | 'homework' | 'software design' | 'video games';
