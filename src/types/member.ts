export type BookingPlayer = {
    uid: string;
    membershipNo: string;
    name: string;
    rummyAmount?: number;
    rummyPoolAmt?: number;
};

export type BankerNote = {
    id: string;
    text: string;
    createdBy: string;
    createdAt: number;
};