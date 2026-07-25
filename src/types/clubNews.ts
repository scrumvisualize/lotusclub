export interface ClubNews {

    id?: string;

    type: 
      | "News"
      | "Update"
      | "Chit Funds"
      | "Other";


    // Normal News fields
    title?: string;
    newsType?: 
      | "Club Update"
      | "Trip"
      | "Outing"
      | "Celebration";


    // Chit Fund fields
    fundAmount?: number;
    numberOfPeople?: number;
    duration?: string;
    startDate?: string;
    endDate?: string;


    description: string;


    createdBy?: string;

    createdDate?: any;

    updatedDate?: any;
}