export type Grade = {
  id: string,
  grade: number,
  subjectId: number,
  subjectName: string,
  studentId: number,
  date: string
}


export type StudentWithGrades = {
  studentId: number,
  studentFirstName: string,
  studentLastName: string
  grades: Grade[]
}
