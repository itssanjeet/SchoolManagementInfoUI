import { Course } from './course.model';

export class Student {
    id: Number;
    firstName: string;
    lastName: string;
    email: string;
    courses: Course[];
}