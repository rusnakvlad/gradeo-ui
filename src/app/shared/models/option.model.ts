export enum DictionaryOptionType {
    Gender = 0,
    Ethnicity = 1,
    ParentalLevelOfEducation = 2,
    Lunch = 3,
    TestPreparationCourse = 4,
}
export type DictionaryOptionModel = {

    optionType: DictionaryOptionType,
    optionValue: string,
}