
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardOrderDetails from "./DashboardOrderDetails";
import { useSelector,  useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCustomerOrders } from "@/redux/features/customerOrdersSlice";


const DashboardTable = () => {

  const dispatch = useDispatch()
  // const orders = [
  //   { id: 1, name: "Product A", quantity: 5, status: "Dispatched" },
  //   { id: 2, name: "Product B", quantity: 10, status: "Printing" },
  //   { id: 3, name: "Product C", quantity: 8, status: "Pending" },
  //   { id: 4, name: "Product D", quantity: 3, status: "Delivered" },
  // ];
  
  const { orders, status, error } = useSelector(
    (state) => state.customerOrders
  );

 useEffect(() => {
   dispatch(fetchCustomerOrders());
 }, [dispatch]);
  
  const statusColors = {
    Dispatched: "#FF9700",
    Printing: "#3182CE",
    Pending: "#FF0000",
    Delivered: "#27AC06",
  };


  return (
    <div className="overflow-x-auto overflow-auto mt-8 md:h-[460px] ">
      <div className="p-4 border border-[#FAC0D3]  rounded-[24px] mb-8">
        <h1 className="arvo-bold md:text-4xl text-3xl leading-[16px]  mt-4 mb-4">
          Customer Orders
        </h1>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow className="flex justify-between items-center ">
              <TableHead className="md:w-[300px] w-[150px]  arvo-regular  text-start text-primary1-blue  lg:text-[28px] md:text-2xl   tracking-[5%] leading-[16px] py-2 px-0 ">
                Name
              </TableHead>
              <TableHead className="md:w-[300px] w-[150px]  arvo-regular  text-start text-primary1-blue  lg:text-[28px] md:text-2xl   tracking-[5%] leading-[16px] py-2 px-0 ">
                Ordered Quantity
              </TableHead>
              <TableHead className="md:w-[150px] w-[100px]  arvo-regular  text-start text-primary1-blue  lg:text-[28px] md:text-2xl   tracking-[5%] leading-[16px] py-2 px-0">
                Status
              </TableHead>
              <TableHead className="md:w-[150px] w-[100px]  arvo-regular  text-start text-primary1-blue  lg:text-[28px] md:text-2xl   tracking-[5%] leading-[16px] py-2 px-0">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="flex justify-between items-center"
              >
                <TableCell className="md:w-[300px] w-[150px] md:text-2xl raleway-regular px-0">
                  {order.name}
                </TableCell>
                <TableCell className="md:w-[300px] w-[150px]   md:text-2xl    raleway-regular px-0">
                  {" "}
                  {order.quantity}
                </TableCell>
                <TableCell
                  className="md:w-[150px] w-[100px] md:text-2xl  raleway-regular px-0 "
                  style={{ color: statusColors[order.status] }}
                >
                  {" "}
                  {order.status}
                </TableCell>
                <TableCell className="md:w-[150px] w-[100px]  text-primary1-pink raleway-regular md:text-2xl">
                  <Dialog >
                   <DashboardOrderDetails/>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default DashboardTable;
