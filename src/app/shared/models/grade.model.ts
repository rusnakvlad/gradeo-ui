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

export type GradeFilterModel = {
  studyGroupId: number,
  subjectId: number,
  startDate: Date,
  endDate: Date,
}

export type DateRangeFilter = {
  startDate: Date,
  endDate: Date
}

export type GradePredictionModel = {
  gender: string
  ethnicity: string
  parental_level_of_education: string
  lunch: string
  test_preparation_course: string
  reading_score: number
  writing_score: number
}
