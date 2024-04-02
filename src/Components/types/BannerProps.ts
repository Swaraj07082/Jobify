export interface BannerProps {
  Jobs: Jobs[];
  query: string;
  setquery: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setlocation: React.Dispatch<React.SetStateAction<string>>;
}

export interface MainProps {
  Jobs: Jobs[];
  filtereddata: Jobs[];
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
