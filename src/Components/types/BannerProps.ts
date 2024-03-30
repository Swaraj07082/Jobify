export interface JobsArray {
  Jobs: Jobs[];
}

export interface Jobs {
  id: number;
  companyName: string;
  jobTitle: string;
  companyLogo: string;
  minPrice: string;
  maxPrice: string;
  salaryType: string;
  jobLocation: string;
  postingDate: string;
  experienceLevel: string;
  employmentType: string;
  description: string;
}

