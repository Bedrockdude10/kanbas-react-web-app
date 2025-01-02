export default interface Assignment {
    _id: string;
    title: string;
    description: string;
    course: string;
    points: number;
    dueDate: string;
    availableFromDate: string;
    availableUntilDate: string;
    displayGradeAs: string,
    group: string,
    submissionType: string
  }