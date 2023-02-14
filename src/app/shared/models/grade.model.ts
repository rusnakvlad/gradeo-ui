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

export type GradeCreateModel = {
  grade: number,
  studentId: number,
  studyGroupId: number
  subjectId: number,
  date: string
}

export type GradeUpdateModel = {
  id: string,
  grade: number
}
