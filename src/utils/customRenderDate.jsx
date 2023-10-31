import { format } from "date-fns";

const customRenderDate = (date) => {
  return format(new Date(date), "dd/MM/yyyy");
};
export default customRenderDate;
