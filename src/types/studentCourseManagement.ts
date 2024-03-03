import {TCourse} from ".";

export type TOfferedCourse = {
  _id: string;
  semesterRegistration: string;
  academicSemester: string;
  academicFaculty: string;
  academicDepartment: string;
  course: TCourse;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  enrolledCourses: any[];
  isAlreadyEnrolled: boolean;
  completedCourses: any[];
  completedCourseIds: any[];
  isPreRequisitesFulFilled: boolean;
};

export type TOfferedCourseItem = {
  courseTitle: string;
  sections: Section[];
};

export interface Section {
  section: number;
  _id: string;
  days: string[];
  startTime: string;
  endTime: string;
}
