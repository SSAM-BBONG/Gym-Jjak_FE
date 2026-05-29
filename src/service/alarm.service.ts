// import { Alarm } from "@/feature/alarm/type";
// import { fetchSetting } from "@/lib/api";

// export const getAlarms = async (): Promise<Alarm[]>=> {
//     const response = await fetchSetting.get('/users/me/notifications');

//     return response.data;
// }

// export const deleteAlarm = async (id: number): Promise<Alarm> => {
//     const response = await fetchSetting.delete(`/users/me/notifications/${id}`);
//     return response.data;
// }

// export const deleteAllAlarm = async (): Promise<Alarm> => {
//     const response = await fetchSetting.delete(`/users/me/notifications/delete-read`);
//     return response.data;
// }