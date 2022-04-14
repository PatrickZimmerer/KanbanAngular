export class Task {
  title: string;
  category: string;
  description: string;
  dueDate: string;
  urgency: string;
  assignedTo: string;
  board: string;

  constructor(obj?: any) {
    this.title = obj ? obj.title : '';
    this.category = obj ? obj.category : '';
    this.description = obj ? obj.description : '';
    this.dueDate = obj ? obj.dueDate : '';
    this.urgency = obj ? obj.urgency : '';
    this.assignedTo = obj ? obj.assignedTo : '';
    this.board = obj ? obj.board : '';
  }

  public toJSON() {
    return {
      title: this.title,
      category: this.category,
      description: this.description,
      dueDate: this.dueDate,
      urgency: this.urgency,
      assignedTo: this.assignedTo,
      board: this.board,
    };
  }
}
