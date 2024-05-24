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
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchOrders, updateLocalOrderStatus, updateOrderStatus } from "@/redux/features/customerOrdersSlice";
import { fetchAllUsers } from "@/redux/features/userSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateBookPrintingOrderStatus } from "@/lib/functions";

const DashboardTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.customerOrders.orders);
  const status = useSelector((state) => state.customerOrders.status);

  useEffect(() => {
    if (status === "idle") {
   
      dispatch(fetchAllUsers()).then(() => {
        dispatch(fetchOrders());
      });
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log("Orders", orders);
  }, [orders]);

  const statusColors = {
    Dispatched: "#FF9700",
    Printing: "#3182CE",
    Pending: "#FF0000",
    Delivered: "#27AC06",
  };

   const handleStatusChange = (orderId, selectedValue = "Pending") => {
    dispatch(updateOrderStatus({ orderId, status: selectedValue }));
    dispatch(updateLocalOrderStatus({ orderId, status: selectedValue }));
  };


  return (
    <div className="mt-8 md:h-[460px] ">
      <div className="p-4 border border-[#FAC0D3]  rounded-[24px] mb-8 ">
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
          <ScrollArea as={TableBody} className="h-[300px] w-full  border p-2">
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.printing_id}
                  className="flex justify-between items-center"
                >
                  <TableCell className="md:w-[300px] w-[150px] md:text-2xl raleway-regular px-0">
                    {order.user_name}
                  </TableCell>
                  <TableCell className="md:w-[300px] w-[150px]   md:text-2xl    raleway-regular px-0">
                    {" "}
                    {order.quantity}
                  </TableCell>
                  <TableCell className="md:w-[150px] w-[100px] md:text-2xl  raleway-regular px-0 ">
                    {" "}
                    <Select
                      value={order.order_status}
                      onValueChange={(selectedValue) =>
                        handleStatusChange(order.printing_id, selectedValue)
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue
                          // placeholder="Status"
                          value="Pending"
                          style={{
                            color: statusColors[order.order_status],
                          }}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Dispatched">Dispatched</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="md:w-[150px] w-[100px]  text-primary1-pink raleway-regular md:text-2xl">
                    <Dialog>
                      <DashboardOrderDetails order={order} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ScrollArea>
        </Table>
      </div>
    </div>
  );
};
export default DashboardTable;
