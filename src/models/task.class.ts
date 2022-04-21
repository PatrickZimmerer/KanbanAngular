export class Task {
  title: string;
  category: string;
  description: string;
  dueDate: number;
  urgency: string;
  assignedTo: string;
  location: string;
  //customIdName: string;

  constructor(obj?: any) {
    this.title = obj ? obj.title : '';
    this.category = obj ? obj.category : '';
    this.description = obj ? obj.description : '';
    this.dueDate = obj ? obj.dueDate : '';
    this.urgency = obj ? obj.urgency : '';
    this.assignedTo = obj ? obj.assignedTo : '';
    this.location = obj ? obj.location : '';
    //this.customIdName = obj ? obj.customIdName : '';
  }

  public toJSON() {
    return {
      title: this.title,
      category: this.category,
      description: this.description,
      dueDate: this.dueDate,
      urgency: this.urgency,
      assignedTo: this.assignedTo,
      location: this.location,
      // customIdName: this.customIdName,
    };
  }
}
