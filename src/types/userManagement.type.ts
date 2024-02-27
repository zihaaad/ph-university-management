import {
  IAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.type";

export type TStudent = {
  _id: string;
  id: string;
  user: string;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  academicDepartment: IAcademicDepartment;
  admissionSemester: TAcademicSemester;
  academicFaculty: string;
  isDeleted: boolean;
  __v: number;
  fullName: string;
};

export type TName = {
  firstName: string;
  lastName: string;
  _id: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
};

export type TFaculty = {
  _id: string;
  id: string;
  user: string;
  designation: string;
  name: Name;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  academicDepartment: IAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  isDeleted: boolean;
  __v: number;
  fullName: string;
};

export interface Name {
  firstName: string;
  lastName: string;
  _id: string;
}
